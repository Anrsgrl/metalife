import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DragButton from "./components/DragButton/DragButton";
import Home from "./pages/Home/Home";
import LessonsPage from "./pages/LessonsPage/LessonsPage";
import SingleLesson from "./pages/SingleLesson/SingleLesson";
import LessonVideo from "./pages/LessonVideo/LessonVideo";
import Portfolio from "./pages/Portfolio/Portfolio";
import Order from "./pages/Order/Order";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./pages/Blogs/components/BlogDetail/BlogDetail";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Contact from "./pages/Contact/Contact";
import User from "./pages/User/User";
import Settings from "./pages/Settings/Settings";
import Error from "./pages/Error/Error";
import Search from "./pages/Search/Search";
import Code from "./pages/Code/Code";
import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Loading from "./components/Loading/Loading";
import { useEffect } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  const main = useRef();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2000);
  }, []);
  return (
    <>
      {loading && <Loading />}
      <Header />
      <main ref={main}>
        <DragButton main={main} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessons/:lessonPath" element={<SingleLesson />} />
          <Route path="/lessons/:lessonPath/videos" element={<LessonVideo />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/order" element={<Order />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:blogUrl" element={<BlogDetail />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:userName" element={<User />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={<Error />} />
          <Route path="/search" element={<Search />} />
          <Route path="/code" element={<Code />} />
          <Route path="/code/:codeName" element={<Code />} />
          <Route path="/code/:codeName/:codeTitle" element={<Code />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
