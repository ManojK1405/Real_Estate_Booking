// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9bbf5.firebaseapp.com",
  projectId: "mern-estate-9bbf5",
  storageBucket: "mern-estate-9bbf5.firebasestorage.app",
  messagingSenderId: "373454721924",
  appId: "1:373454721924:web:e2b254a0e3f2e8fabac3d1"
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);