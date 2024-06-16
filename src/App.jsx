import { useEffect, useRef, useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Toaster } from "react-hot-toast";
import DragButton from "./components/DragButton/DragButton.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Loading from "./components/Loading/Loading.jsx";
import AppRoutes from "./routes/routes.jsx";
import { HelmetProvider } from "react-helmet-async";
function App() {
  const [loading, setLoading] = useState(true);
  const [dragMenu, setDragMenu] = useState(false);
  const dragRef = useRef();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2000);
  }, []);

  return (
    <HelmetProvider>
      {loading && <Loading />}
      <Header />
      <main>
        <Toaster />
        <DragButton
          dragRef={dragRef}
          dragMenu={dragMenu}
          setDragMenu={setDragMenu}
        />
        <div ref={dragRef} className="drag-field"></div>
        <AppRoutes />
      </main>
      <Footer />
    </HelmetProvider>
  );
}

export default App;
