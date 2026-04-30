import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { requireAuth, verifyToken } from './auth';
import { createSession, getSession, destroySession, attachToContainer } from './sessions';

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3001);

// CORS — allow the frontend origin
const ALLOWED_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000';
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') { res.sendStatus(204); return; }
  next();
});

// ── REST ────────────────────────────────────────────────────────────────────

// POST /sessions  →  create a container session for a lab
app.post('/sessions', requireAuth, async (req, res) => {
  const { labId } = req.body as { labId?: string };
  if (!labId) { res.status(400).json({ error: 'labId is required' }); return; }

  try {
    const user = (req as any).user;
    const session = await createSession(user.uid, labId);
    res.status(201).json({ sessionId: session.id, labId: session.labId });
  } catch (err: any) {
    console.error('Failed to create session:', err);
    res.status(500).json({ error: 'Failed to start lab environment' });
  }
});

// DELETE /sessions/:id  →  tear down a session early
app.delete('/sessions/:id', requireAuth, async (req, res) => {
  await destroySession(req.params.id);
  res.sendStatus(204);
});

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ── WebSocket ────────────────────────────────────────────────────────────────

const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: '/sessions' });

wss.on('connection', async (ws: WebSocket, req) => {
  // Expect:  ws://host/sessions?sessionId=XXX&token=YYY
  const url = new URL(req.url ?? '', `http://${req.headers.host}`);
  const sessionId = url.searchParams.get('sessionId');
  const token = url.searchParams.get('token');

  if (!sessionId || !token) {
    ws.close(4001, 'sessionId and token are required');
    return;
  }

  // Verify identity
  try {
    await verifyToken(token);
  } catch {
    ws.close(4003, 'Unauthorized');
    return;
  }

  const session = getSession(sessionId);
  if (!session) {
    ws.close(4004, 'Session not found');
    return;
  }

  // Attach to the container's TTY stream
  let containerStream: NodeJS.ReadWriteStream;
  try {
    containerStream = await attachToContainer(session.containerId);
  } catch (err) {
    ws.close(4500, 'Failed to attach to container');
    return;
  }

  // Container → browser
  containerStream.on('data', (chunk: Buffer) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(chunk.toString('utf8'));
    }
  });

  containerStream.on('end', () => ws.close(1000, 'Container exited'));

  // Browser → container
  ws.on('message', (data) => {
    containerStream.write(data.toString());
  });

  ws.on('close', () => containerStream.destroy());
});

httpServer.listen(PORT, () => {
  console.log(`Realcloud Session API listening on :${PORT}`);
});
