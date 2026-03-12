// Firebase initialization and utilities
import { initializeApp } from "firebase/app";
import { getAnalytics as getFirebaseAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// Your web app's Firebase configuration (hard‑coded for now, can be moved to env)
const firebaseConfig = {
  apiKey: "AIzaSyBOd-S8Bkbx2wjVPPO-qINc94-4csmK-Ro",
  authDomain: "facial-recog-c3770.firebaseapp.com",
  projectId: "facial-recog-c3770",
  storageBucket: "facial-recog-c3770.firebasestorage.app",
  messagingSenderId: "512639278979",
  appId: "1:512639278979:web:9847cd3cb981e93bb0a0b6",
  measurementId: "G-PBQLCRWZKJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getFirebaseAnalytics(app);
export const db = getFirestore(app);

// helper exports for firestore operations that are used elsewhere
export {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
};
