import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import LessonsPage from './pages/LessonsPage/LessonsPage';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Portfolio from './pages/Portfolio/Portfolio';
import DragButton from './components/DragButton/DragButton';
import { useRef } from 'react';
import Order from './pages/Order/Order';
import Contact from './pages/Contact/Contact';
import SingleLesson from './pages/SingleLesson/SingleLesson';
import LessonVideo from './pages/LessonVideo/LessonVideo';
import User from './pages/User/User';
import Error from './pages/Error/Error';

function App() {
  const main = useRef();
  return (
    <>
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
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:userName" element={<User />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
