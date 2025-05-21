// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgkJSzasgH9tzl_YHV1F6dRaSoAiN4vfg",
  authDomain: "plant-care-tracker-6bc76.firebaseapp.com",
  projectId: "plant-care-tracker-6bc76",
  storageBucket: "plant-care-tracker-6bc76.firebasestorage.app",
  messagingSenderId: "556578660536",
  appId: "1:556578660536:web:f494d6b38911a7f189944d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);