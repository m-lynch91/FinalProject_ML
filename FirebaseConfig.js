import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwEQfrBw3tUCFNx0Csp-yidYwf8Qc7htQ",
  authDomain: "remembrall-f6528.firebaseapp.com",
  projectId: "remembrall-f6528",
  storageBucket: "remembrall-f6528.appspot.com",
  messagingSenderId: "961602363414",
  appId: "1:961602363414:web:dc4750d30c12966f979537",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { db, firestore, auth };
