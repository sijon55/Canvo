import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyAdhB_yjN18Lv8x8U9l_aGfO7icYaDiolk",
  authDomain: "canvo-9b476.firebaseapp.com",
  projectId: "canvo-9b476",
  storageBucket: "canvo-9b476.firebasestorage.app",
  messagingSenderId: "1011949830890",
  appId: "1:1011949830890:web:f4c7532da4fddfcab54d93"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
