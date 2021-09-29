import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firbaseSignOut,
  getAuth,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcFy5E7y7yRO-hr_BH4-MdTDIbYNI9aMo",
  authDomain: "gb-hw-lesson9.firebaseapp.com",
  databaseURL:
    "https://gb-hw-lesson9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gb-hw-lesson9",
  storageBucket: "gb-hw-lesson9.appspot.com",
  messagingSenderId: "490060131929",
  appId: "1:490060131929:web:1a44a4e157f8e59e944b48",
  measurementId: "G-2BM2L12X7V",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();

export const signUp = async (email, pass) => {
  await createUserWithEmailAndPassword(auth, email, pass);
};

export const login = async (email, pass) => {
  await signInWithEmailAndPassword(auth, email, pass);
};

export const signOut = async () => {
  await firbaseSignOut(auth);
};
