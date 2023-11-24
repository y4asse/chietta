// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZkSPDFCuiG93jXGIFvKyBdlRFqOwIctE",
  authDomain: "cheeta-38f77.firebaseapp.com",
  projectId: "cheeta-38f77",
  storageBucket: "cheeta-38f77.appspot.com",
  messagingSenderId: "556481697677",
  appId: "1:556481697677:web:a9ba5811e69568b18f0fc4",
  measurementId: "G-2WFZHD4YM6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
