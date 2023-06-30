import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import LessonsPage from './pages/LessonsPage/LessonsPage';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Portfolio from './pages/Portfolio/Portfolio';
import DragButton from './components/DragButton/DragButton';
import { useEffect, useRef, useState } from 'react';
import Order from './pages/Order/Order';
import Contact from './pages/Contact/Contact';
import SingleLesson from './pages/SingleLesson/SingleLesson';
import LessonVideo from './pages/LessonVideo/LessonVideo';
import User from './pages/User/User';
import Error from './pages/Error/Error';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth, db } from './firebase';
import {
  collection,
  getDocs,
} from "firebase/firestore";
import Settings from './pages/Settings/Settings';

function App() {
  const main = useRef();
  const [userData, setUserData] = useState([])
  const [authUser, setAuthUser] = useState(null)
  const [loggedUser, setLoggedUser] = useState(null)

  // const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate()

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log("sign out")
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }
  console.log("userData", userData)
  const usersCollectionRef = useRef(collection(db, "users"));

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef.current);
      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    getUsers();

    return () => {
      unsubscribeAuth();
    };
  }, [authUser]);

  useEffect(() => {
    const findUser = () => {
      setLoggedUser(userData.find((e) => e.email === authUser?.email));
    };

    findUser();
  }, [userData, authUser]);

  return (
    <>
      <Header authUser={authUser} userSignOut={userSignOut} loggedUser={loggedUser} />
      <main ref={main}>
        <DragButton main={main} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessons/:lessonPath" element={<SingleLesson />} />
          <Route path="/lessons/:lessonPath/videos" element={<LessonVideo />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/order" element={<Order />} />
          <Route path="/sign-up" element={<SignUp loggedUser={loggedUser} />} />
          <Route path="/sign-in" element={<SignIn loggedUser={loggedUser} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:userName" element={<User loggedUser={loggedUser} />} />
          <Route path="/settings" element={<Settings loggedUser={loggedUser} />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
