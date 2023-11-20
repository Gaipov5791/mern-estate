// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-185a6.firebaseapp.com",
  projectId: "mern-estate-185a6",
  storageBucket: "mern-estate-185a6.appspot.com",
  messagingSenderId: "944843635236",
  appId: "1:944843635236:web:d9e413a7a02b8a9fdf76b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);