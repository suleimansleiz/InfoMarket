// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgiv56JfObSaCdW_eaXXDarJ5jvhmG5d0",
  authDomain: "infomarket-12b66.firebaseapp.com",
  projectId: "infomarket-12b66",
  storageBucket: "infomarket-12b66.firebasestorage.app",
  messagingSenderId: "180755230874",
  appId: "1:180755230874:web:ebdd3e94bbb5de3b6c2f23",
  measurementId: "G-HM2QNMBZWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);