import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeixVQZimO8aAKafs5AqgyeNlpizFN8eE",
  authDomain: "todosite-7e3af.firebaseapp.com",
  projectId: "todosite-7e3af",
  storageBucket: "todosite-7e3af.firebasestorage.app",
  messagingSenderId: "535476183262",
  appId: "1:535476183262:web:d4abf98abef23ecac9a24f",
  measurementId: "G-WMX43Z90QY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);