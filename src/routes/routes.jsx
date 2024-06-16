import { Route, Routes } from "react-router-dom";
import Order from "../pages/Order/Order.jsx";
import Portfolio from "../pages/Portfolio/Portfolio.jsx";
import Search from "../pages/Search/Search.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import SingleLesson from "../pages/SingleLesson/SingleLesson.jsx";
import User from "../pages/User/User.jsx";
import Home from "../pages/Home/Home.jsx";
import LessonVideo from "../pages/LessonVideo/LessonVideo.jsx";
import LessonsPage from "../pages/LessonsPage/LessonsPage.jsx";
import Error from "../pages/Error/Error.jsx";
import Blogs from "../pages/Blogs/Blogs.jsx";
import BlogDetail from "../pages/Blogs/components/BlogDetail/BlogDetail.jsx";
import Code from "../pages/Code/Code.jsx";
import Contact from "../pages/Contact/Contact.jsx";
const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;
