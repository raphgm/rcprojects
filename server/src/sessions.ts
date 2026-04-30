import Dockerode from 'dockerode';
import { v4 as uuidv4 } from 'uuid';

const docker = new Dockerode();

const LAB_IMAGE = process.env.LAB_IMAGE ?? 'realcloud-lab:latest';
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

export interface Session {
  id: string;
  userId: string;
  labId: string;
  containerId: string;
  createdAt: Date;
  timeoutHandle: ReturnType<typeof setTimeout>;
}

const sessions = new Map<string, Session>();

export async function createSession(userId: string, labId: string): Promise<Session> {
  const id = uuidv4();

  const container = await docker.createContainer({
    Image: LAB_IMAGE,
    Cmd: ['/bin/bash'],
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    OpenStdin: true,
    Tty: true,
    Env: [
      `SESSION_ID=${id}`,
      `LAB_ID=${labId}`,
      `USER_ID=${userId}`,
    ],
    Labels: { 'realcloud.session': id, 'realcloud.lab': labId },
    HostConfig: {
      // Isolate: no network access to host, limited resources
      NetworkMode: 'none',
      Memory: 512 * 1024 * 1024,   // 512 MB
      CpuPeriod: 100000,
      CpuQuota: 50000,              // 0.5 CPU
      AutoRemove: true,
    },
  });

  await container.start();

  const timeoutHandle = setTimeout(() => destroySession(id), SESSION_TTL_MS);

  const session: Session = {
    id,
    userId,
    labId,
    containerId: container.id,
    createdAt: new Date(),
    timeoutHandle,
  };

  sessions.set(id, session);
  return session;
}

export function getSession(id: string): Session | undefined {
  return sessions.get(id);
}

export async function destroySession(id: string): Promise<void> {
  const session = sessions.get(id);
  if (!session) return;

  clearTimeout(session.timeoutHandle);
  sessions.delete(id);

  try {
    const container = docker.getContainer(session.containerId);
    await container.kill();
  } catch {
    // Container may have already exited — ignore
  }
}

// Attach a WebSocket duplex stream to the container's TTY
export async function attachToContainer(containerId: string) {
  const container = docker.getContainer(containerId);
  return container.attach({
    stream: true,
    stdin: true,
    stdout: true,
    stderr: true,
    hijack: true,
  });
}
