// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC99j6taiyUYWqwlrSn8GyEpIhV3syruAU",
  authDomain: "react-food-b3bad.firebaseapp.com",
  projectId: "react-food-b3bad",
  storageBucket: "react-food-b3bad.appspot.com",
  messagingSenderId: "745136643119",
  appId: "1:745136643119:web:f5eae9fd38145fbbff3ada",
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
