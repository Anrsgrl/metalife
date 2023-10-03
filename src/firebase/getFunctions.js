import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./config";
import { onAuthStateChanged } from "firebase/auth";

//* Get list of User elements
export const useUsersList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState([]);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollectionRef]);

  const loggedUser = currentUser
    ? userData.find((user) => user.email === currentUser.email)
    : null;

  return { currentUser, userData, loggedUser };
};

//* Get list of Blog elements
export const useBlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const blogsCollectionRef = collection(db, "blogs");

  useEffect(() => {
    const getBlogs = async () => {
      const data = await getDocs(blogsCollectionRef);
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBlogs();
  }, [blogsCollectionRef]);

  return blogs;
};

//* Get list of Video elements
export const useVideosList = () => {
  const [videosList, setVideosList] = useState([]);
  const videosCollectionRef = collection(db, "videos");

  useEffect(() => {
    const getVideos = async () => {
      const data = await getDocs(videosCollectionRef);
      setVideosList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getVideos();
  }, [videosCollectionRef]);

  return videosList;
};

//* Get list of Video elements
export const useCodeList = () => {
  const [codesList, setCodesList] = useState([]);
  const codesCollectionRef = collection(db, "codes");

  useEffect(() => {
    const getVideos = async () => {
      const data = await getDocs(codesCollectionRef);
      setCodesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getVideos();
  }, [codesCollectionRef]);

  return codesList;
};
