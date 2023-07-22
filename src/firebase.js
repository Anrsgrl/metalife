import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, ref, ref as storageRef, uploadBytes } from "firebase/storage";
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
    try {
        if (currentUser.photoURL) {
            const oldPhotoRef = ref(storage, currentUser.photoURL);
            await deleteObject(oldPhotoRef);
        }
        const fileRef = storageRef(storage, `profile-images/${currentUser.uid}.png`);
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        // Update the user profile with the new photoURL
        await updateProfile(auth.currentUser, { photoURL });

        // Check if the currentUser.photoURL exists (not null or empty)
        // If it exists, delete the old profile photo

        return photoURL;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
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
    const [blogs, setBlogs] = useState([])
    const [videos, setVideos] = useState([])

    const usersCollectionRef = useRef(collection(db, "users"));
    const blogsCollectionRef = useRef(collection(db, "blogs"));
    const videosCollectionRef = useRef(collection(db, "videos"));

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

    useEffect(() => {
        const getBlogs = async () => {
            const data = await getDocs(blogsCollectionRef.current);
            setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getBlogs();
    }, []);

    useEffect(() => {
        const getVideos = async () => {
            const data = await getDocs(videosCollectionRef.current);
            setVideos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getVideos();
    }, []);

    const loggedUser = currentUser ? userData.find((user) => user.email === currentUser.email) : null;

    return { currentUser, loggedUser, blogs, userData, videos };
}




