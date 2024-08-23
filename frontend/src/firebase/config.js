import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const appId = import.meta.env.VITE_FIREBASE_APP_ID
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const bucket = import.meta.env.VITE_FIREBASE_BUCKET
const messagingSenderId = import.meta.env.VITE_FIREBASE_SENDER_ID
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: bucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
