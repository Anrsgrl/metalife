import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "./config";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

//* Get list of User elements
export const useUsersList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const usersCollectionRef = useMemo(() => collection(db, "users"), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
        toast.error(error.message);
      }
    };

    if (currentUser) {
      getUsers();
    }
  }, [usersCollectionRef, currentUser]);

  const loggedUser = currentUser
    ? userData.find((user) => user.email === currentUser.email)
    : null;

  return { currentUser, userData, loggedUser, loading };
};

//* Get list of Blog elements
export const useBlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const blogsCollectionRef = useMemo(() => collection(db, "blogs"), []);

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
  const videosCollectionRef = useMemo(() => collection(db, "videos"), []);

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
  const codesCollectionRef = useMemo(() => collection(db, "codes"), []);

  useEffect(() => {
    const getVideos = async () => {
      const data = await getDocs(codesCollectionRef);
      setCodesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getVideos();
  }, [codesCollectionRef]);

  return codesList;
};
