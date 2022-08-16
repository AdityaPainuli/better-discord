// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhIx8dU9zGv8VpsqeKdPipfef7tPCJLl8",
  authDomain: "discord-1b486.firebaseapp.com",
  projectId: "discord-1b486",
  storageBucket: "discord-1b486.appspot.com",
  messagingSenderId: "1059824758084",
  appId: "1:1059824758084:web:fcf4127fd0c228a8443b11",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
