import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

let initialised = false;

function initFirebase() {
  if (initialised) return;
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccount) {
    admin.initializeApp({ credential: admin.credential.cert(JSON.parse(serviceAccount)) });
  } else {
    // Fall back to Application Default Credentials in CI/cloud environments
    admin.initializeApp();
  }
  initialised = true;
}

export async function verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
  initFirebase();
  return admin.auth().verifyIdToken(token);
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing auth token' });
    return;
  }
  verifyToken(header.slice(7))
    .then((decoded) => {
      (req as any).user = decoded;
      next();
    })
    .catch(() => res.status(401).json({ error: 'Invalid auth token' }));
}
