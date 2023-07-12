import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function uploadProfilePhoto(file, currentUser) {
    const fileRef = storageRef(storage, `profile-images/${currentUser.uid}.png`);

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    await updateProfile(auth.currentUser, { photoURL });

    return photoURL;
}

export async function uploadBlogPhoto(file) {
    const storage = getStorage(app);
    const firestore = getFirestore(app);

    const fileRef = storageRef(storage, "blog-images/" + file.name);
    await uploadBytes(fileRef, file);

    const photoURL = await getDownloadURL(fileRef);

    const blogsCollection = collection(firestore, "blogs");
    const newBlogRef = await addDoc(blogsCollection, { blog_image: photoURL });

    return newBlogRef.id;
}

//! AUTH

export function useAuth() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const usersCollectionRef = useRef(collection(db, "users"));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef.current);
            setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        if (currentUser) {
            getUsers();
        }
    }, [currentUser]);

    const loggedUser = currentUser ? userData.find((user) => user.email === currentUser.email) : null;

    return { currentUser, loggedUser };
}



