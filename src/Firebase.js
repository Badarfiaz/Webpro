// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGc_NISr0BNJv-QjIFt7GumMUuFohhzVA",
  authDomain: "lab1-915ce.firebaseapp.com",
  projectId: "lab1-915ce",
  storageBucket: "lab1-915ce.firebasestorage.app",
  messagingSenderId: "869286082728",
  appId: "1:869286082728:web:5f0568b55cfe9ac4672a9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export {db};