import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "./config";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

const useCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const collectionRef = useMemo(
    () => collection(db, collectionName),
    [collectionName]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        setData(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error(`Error fetching ${collectionName}: `, error);
        toast.error(error.message);
      }
    };

    fetchData();
  }, [collectionRef, collectionName]);

  return data;
};

export const useUsersList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const usersData = useCollection("users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return unsubscribe;
  }, []);

  const loggedUser = currentUser
    ? usersData.find((user) => user.email === currentUser.email)
    : null;

  return {
    currentUser,
    userData: usersData,
    loggedUser,
    loading: !usersData.length,
  };
};

export const useBlogsList = () => useCollection("blogs");
export const useVideosList = () => useCollection("videos");
export const useCodeList = () => useCollection("codes");
