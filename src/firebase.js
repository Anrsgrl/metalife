import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3tPwLbt8uAq_MR9g7L0kFZyg2jWbU5JM",
    authDomain: process.env.AUTH_DOMAIN,
    projectId: "metalife-e327e",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app)
