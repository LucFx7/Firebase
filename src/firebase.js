// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDII8JxBoom82empfnG25cg5YCkxl2xg5A",
  authDomain: "splitfast-7c984.firebaseapp.com",
  projectId: "splitfast-7c984",
  storageBucket: "splitfast-7c984.firebasestorage.app",
  messagingSenderId: "690771507144",
  appId: "1:690771507144:web:ccdb5d3414f6fee08a32fd",
  measurementId: "G-J0JMMNJSGQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); // Aquí exportas Firestore para usar en Dashboard

