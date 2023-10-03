import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

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
    const fileRef = storageRef(
      storage,
      `profile-images/${currentUser.uid}.png`
    );
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    await updateProfile(auth.currentUser, { photoURL });

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
