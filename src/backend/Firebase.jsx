import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_F_API_KEY,
  authDomain: import.meta.env.VITE_F_AUTHDOMAIN,
  projectId: import.meta.env.VITE_F_PROJECTID,
  storageBucket: import.meta.env.VITE_F_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_F_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_F_APPID,
  measurementId: import.meta.env.VITE_F_MEASUREMENTID,
  databaseURL: import.meta.env.VITE_F_DATABASEURL,
};

if (window.location.hostname === "localhost") {
  globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

if (import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

export { auth, googleProvider, database, firestore, storage, updateProfile };
