// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAim7pWNhiTSMvmvYtZyBBh0voiNtXKTD4",
  authDomain: "shout-out-390416.firebaseapp.com",
  projectId: "shout-out-390416",
  storageBucket: "shout-out-390416.appspot.com",
  messagingSenderId: "128277701249",
  appId: "1:128277701249:web:60220980f1da94d151e380",
  measurementId: "G-BHXZ84TMJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};