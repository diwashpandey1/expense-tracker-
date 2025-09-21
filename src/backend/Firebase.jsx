// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; // Uncomment if you need Firebase Storage
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const database = getDatabase(app)
const firestore = getFirestore(app); 

const storage = getStorage(app); 


const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY
),
  isTokenAutoRefreshEnabled: true, // automatically refresh token
});
// const updateProfile = updateProfile(app);
export {auth, googleProvider, database, firestore, storage, updateProfile};

