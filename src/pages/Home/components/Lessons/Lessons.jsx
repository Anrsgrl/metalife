import React from "react";
import "./Lessons.scss";
import Lesson from "../../../../components/Lesson/Lesson";
import LessonsMobile from "./LessonsMobile";
import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { lessonList } from "../../../../data/LessonList";

const Lessons = (props) => {
  const { show } = props;
  const navigate = useNavigate();
  return (
    <div className="lessons text-center pt-3 container">
      <h2
        title="Öyrənməyə başla"
        aria-label="Öyrənməyə başla"
        data-aos="fade-up"
        className="section-heading py-4"
      >
        Öyrənməyə başla
      </h2>
      <div className="lessons-desktop">
        <div className="row">
          {lessonList.slice(0, 6).map((item) => (
            <Lesson
              key={item.id}
              title={item.title}
              p={item.shortDescribe}
              image={item.image}
              path={item.path}
            />
          ))}
        </div>
      </div>
      <LessonsMobile />
      {show && (
        <button
          type="button"
          aria-label="More"
          title="More"
          data-aos="fade-up"
          onClick={() => navigate("/lessons")}
          className="show-more clean-button"
        >
          Daha çox göstər <VscDebugStart />
        </button>
      )}
    </div>
  );
};

export default Lessons;
