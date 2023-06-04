// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCK3e5uvgwUht00ebblb0oaxC3lavx6gM",
  authDomain: "reactproject-pedro-b9fcd.firebaseapp.com",
  projectId: "reactproject-pedro-b9fcd",
  storageBucket: "reactproject-pedro-b9fcd.appspot.com",
  messagingSenderId: "867485408767",
  appId: "1:867485408767:web:dcd1641e1e8132aa681bca",
  measurementId: "G-F3ZF79QN33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);