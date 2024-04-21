import React, { useEffect } from "react";
import Lessons from "../Home/components/Lessons/Lessons";

const LessonsPage = () => {
  useEffect(() => {
    document.title = "Dərslər | Metalife";
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);
  return <Lessons show={false} />;
};

export default LessonsPage;
