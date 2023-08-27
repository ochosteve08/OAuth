import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ee4b0.firebaseapp.com",
  projectId: "mern-auth-ee4b0",
  storageBucket: "mern-auth-ee4b0.appspot.com",
  messagingSenderId: "263566487394",
  appId: "1:263566487394:web:797465e7312de20343063b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
