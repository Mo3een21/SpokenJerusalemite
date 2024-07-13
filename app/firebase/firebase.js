// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDnIu5iewEIo22G-O1rx8CRasmHCAfpPmU",
  authDomain: "spokenjerusalemite-dda66.firebaseapp.com",
  projectId: "spokenjerusalemite-dda66",
  storageBucket: "spokenjerusalemite-dda66.appspot.com",
  messagingSenderId: "795683179779",
  appId: "1:795683179779:web:bf1803c2d2d948f09ced36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;