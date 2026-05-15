// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPvTkvJ3raKopksMndpAfIW-FM2s-XhmE",
  authDomain: "findive-id.firebaseapp.com",
  projectId: "findive-id",
  storageBucket: "findive-id.firebasestorage.app",
  messagingSenderId: "331871619984",
  appId: "1:331871619984:web:47a89476fa1a06505c8115",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);