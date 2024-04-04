import React from "react";
import "./Hero.scss";
import vector from "../../../../assets/images/hero-vector2.webp";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero container py-5">
      <div className="hero-content">
        <div className="hero-text">
          <h1 title="Metalife" aria-label="Metalife">
            Metalife
          </h1>
          <p aria-label="Xəyalların ən yaxşısını arzu edə bilərsənmi?">
            Xəyalların ən yaxşısını arzu edə bilərsənmi?
          </p>
          <button
            type="button"
            title="Öyrənməyə başla"
            aria-label="Öyrənməyə başla"
            onClick={() => navigate("/lessons")}
            className="btn-blue mt-3 hover-animation-white"
          >
            Öyrənməyə başla
          </button>
        </div>
        <div className="hero-vector skeleton-loading">
          <img className="w-100" src={vector} alt="vector" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
