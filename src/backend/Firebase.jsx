import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, googleProvider, database, firestore, storage, updateProfile };
