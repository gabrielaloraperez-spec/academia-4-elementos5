import { AppSessionState, PersistedGameState } from './persistence';

interface AuthSession {
  localId: string;
  idToken: string;
  email: string;
}

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
const DB_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL as string | undefined;

const AUTH_KEY = 'academiaCloudAuth';

export function isCloudSyncConfigured(): boolean {
  const apiKey = API_KEY?.trim() ?? '';
  return apiKey.length > 10 && !apiKey.includes('REPLACE_WITH');
}

export function isCloudProgressConfigured(): boolean {
  const apiKey = API_KEY?.trim() ?? '';
  const dbUrl = DB_URL?.trim() ?? '';
  const hasRealApiKey = apiKey.length > 10 && !apiKey.includes('REPLACE_WITH');
  const hasSupportedDomain = dbUrl.includes('firebaseio.com') || dbUrl.includes('firebasedatabase.app');
  const hasRealDb = dbUrl.startsWith('https://') && hasSupportedDomain && !dbUrl.includes('YOUR_PROJECT_ID');
  return hasRealApiKey && hasRealDb;
}

export function getAuthSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function setAuthSession(session: AuthSession | null): void {
  if (!session) {
    localStorage.removeItem(AUTH_KEY);
    return;
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

async function authWithPassword(email: string, password: string, mode: 'signInWithPassword' | 'signUp'): Promise<AuthSession> {
  if (!API_KEY) throw new Error('Firebase API key no configurada');
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body?.error?.message ?? 'No se pudo autenticar';
    throw new Error(message);
  }

  const data = await response.json();
  const session: AuthSession = {
    localId: data.localId,
    idToken: data.idToken,
    email: data.email,
  };
  setAuthSession(session);
  return session;
}

export async function loginWithEmail(email: string, password: string): Promise<AuthSession> {
  return authWithPassword(email, password, 'signInWithPassword');
}

export async function registerWithEmail(email: string, password: string): Promise<AuthSession> {
  return authWithPassword(email, password, 'signUp');
}

export function logoutCloud(): void {
  setAuthSession(null);
}

interface CloudPayload {
  game: PersistedGameState;
  appSession: AppSessionState;
  lastSyncAt: number;
}

function getUserEndpoint(session: AuthSession): string {
  const baseUrl = (DB_URL ?? '').replace(/\/$/, '');
  return `${baseUrl}/academiaProgress/${session.localId}.json?auth=${session.idToken}`;
}

export async function pushCloudProgress(payload: CloudPayload): Promise<void> {
  const session = getAuthSession();
  if (!isCloudProgressConfigured() || !session) return;

  const response = await fetch(getUserEndpoint(session), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body?.error ?? `No se pudo sincronizar (${response.status})`;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }
}

export async function pullCloudProgress(): Promise<CloudPayload | null> {
  const session = getAuthSession();
  if (!isCloudProgressConfigured() || !session) return null;

  const response = await fetch(getUserEndpoint(session));
  if (!response.ok) return null;
  const data = await response.json();
  return data || null;
}
