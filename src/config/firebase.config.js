// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTDhWc-CbAryxFuLc3-WBbL0TZ2SD_C4k",
    authDomain: "democonformsec.firebaseapp.com",
    databaseURL: "https://democonformsec-default-rtdb.firebaseio.com",
    projectId: "democonformsec",
    storageBucket: "democonformsec.appspot.com",
    messagingSenderId: "280191851988",
    appId: "1:280191851988:web:f7d89088b58c650b668a41"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
