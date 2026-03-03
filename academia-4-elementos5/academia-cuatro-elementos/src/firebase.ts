import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported as isMessagingSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  ...(import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? { databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL }
    : {}),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const analyticsPromise = isAnalyticsSupported().then((supported) =>
  supported ? getAnalytics(app) : null,
);

export const messagingPromise = isMessagingSupported().then((supported) =>
  supported ? getMessaging(app) : null,
);

export default app;
