// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgiv56JfObSaCdW_eaXXDarJ5jvhmG5d0",
  authDomain: "infomarket-12b66.firebaseapp.com",
  projectId: "infomarket-12b66",
  storageBucket: "infomarket-12b66.appspot.com", // Corrected
  messagingSenderId: "180755230874",
  appId: "1:180755230874:web:ebdd3e94bbb5de3b6c2f23",
  measurementId: "G-HM2QNMBZWV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
