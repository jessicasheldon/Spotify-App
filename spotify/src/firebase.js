// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOmucbgReO7ZhUECuXfMHWfqjCUaweZh0",
  authDomain: "spotify-app-f49d6.firebaseapp.com",
  projectId: "spotify-app-f49d6",
  storageBucket: "spotify-app-f49d6.firebasestorage.app",
  messagingSenderId: "411730570223",
  appId: "1:411730570223:web:a7719df46cbccbc5e8241a",
  measurementId: "G-SY3B4P996J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();