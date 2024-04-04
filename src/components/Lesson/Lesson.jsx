import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Lesson = (props) => {
  const { image, title, p, path } = props;
  const navigate = useNavigate();
  return (
    <div
      title={title}
      aria-label={title}
      onClick={() => navigate(`/lessons/${path}`)}
      data-aos="fade-up"
      className="col-9 col-md-5 col-xl-3 me-0 me-md-4 mb-4 p-0 lesson"
    >
      <img src={image} alt="design" loading="lazy" />
      <div className="lesson-text px-2">
        <h3 title={title} aria-label={title}>
          {title}
        </h3>
        <p aria-label={p}>{p}</p>
      </div>
      <div className="lesson-footer">
        <button
          aria-label="Daha çox"
          title="Daha çox"
          type="button"
          className="clean-button p-3"
        >
          Daha çox <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default Lesson;
