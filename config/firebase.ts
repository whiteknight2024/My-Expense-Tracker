// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//video 4 - 2:05 
//add these 3 below
import {initializeAuth, getReactNativePersistence} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoS0NfCPrdVKXzfPI34MnVGk023VqYn4M",
  authDomain: "expense-tracker-91906.firebaseapp.com",
  projectId: "expense-tracker-91906",
  storageBucket: "expense-tracker-91906.firebasestorage.app",
  messagingSenderId: "446789932622",
  appId: "1:446789932622:web:ba202dc1662c3281dc551f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//add auth variable
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

//setup database variable
export const firestore = getFirestore(app);