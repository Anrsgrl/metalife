import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import error from "./assets/images/error.svg";

function App() {
  return (
    <>
      <Header />
      {/* <main ref={main}>
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
        </Routes>
      </main> */}
      <div className="container py-5">
        <img src={error} alt="error" style={{ width: "100%" }} />
      </div>
      <Footer />
    </>
  );
}

export default App;
