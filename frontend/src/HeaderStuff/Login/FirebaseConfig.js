import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPgUuON7wJlbTZq9zd_M06eLhwElABmPI",
  authDomain: "traviespot.firebaseapp.com",
  projectId: "traviespot",
  storageBucket: "traviespot.appspot.com",
  messagingSenderId: "113142773841",
  appId: "1:113142773841:web:083c588de6cc51cf06a070",
  measurementId: "G-00G38T490R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export default app; 