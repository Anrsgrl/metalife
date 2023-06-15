import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import LessonsPage from './pages/LessonsPage/LessonsPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<LessonsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
