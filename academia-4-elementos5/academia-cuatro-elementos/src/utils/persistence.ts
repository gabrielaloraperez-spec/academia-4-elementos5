import { GameState } from '../constants/gameConstants';

const DB_NAME = 'academia-pwa-db';
const STORE_NAME = 'kv';
const DB_VERSION = 1;

const GAME_STATE_KEY = 'game-state';
const APP_SESSION_KEY = 'app-session';

export interface AppSessionState {
  currentScreen: 'welcome' | 'map' | 'level' | 'domain_challenge' | 'knowledge' | 'boss' | 'gameover';
  currentLevelId: number;
  challengeLevelId: number;
  pendingPerfectChallenge: boolean;
  gameOverScore: number;
  isBossGameOver: boolean;
  updatedAt: number;
}

export interface PersistedGameState {
  data: GameState;
  updatedAt: number;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putValue<T>(key: string, value: T): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function deleteValue(key: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function getValue<T>(key: string): Promise<T | null> {
  const db = await openDb();
  const result = await new Promise<T | null>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).get(key);
    request.onsuccess = () => resolve((request.result as T) ?? null);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return result;
}

export async function saveGameStateToIndexedDb(data: GameState): Promise<void> {
  await putValue<PersistedGameState>(GAME_STATE_KEY, { data, updatedAt: Date.now() });
}

export async function loadGameStateFromIndexedDb(): Promise<PersistedGameState | null> {
  return getValue<PersistedGameState>(GAME_STATE_KEY);
}

export async function saveAppSessionToIndexedDb(session: Omit<AppSessionState, 'updatedAt'>): Promise<void> {
  await putValue<AppSessionState>(APP_SESSION_KEY, { ...session, updatedAt: Date.now() });
}

export async function loadAppSessionFromIndexedDb(): Promise<AppSessionState | null> {
  return getValue<AppSessionState>(APP_SESSION_KEY);
}

export async function clearLocalProgress(): Promise<void> {
  localStorage.removeItem('academiaGameState');
  await Promise.all([
    deleteValue(GAME_STATE_KEY),
    deleteValue(APP_SESSION_KEY),
  ]);
}
