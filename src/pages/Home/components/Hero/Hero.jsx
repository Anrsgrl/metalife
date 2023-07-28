import React from 'react';
import "./Hero.scss";
import vector from "../../../../assets/images/hero-vector.svg";
import { useNavigate } from 'react-router-dom';

const Hero = ({ handleContentLoad }) => {
    const navigate = useNavigate();
    return (
        <div className="hero container py-5">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Metalife</h1>
                    <p>Xəyalların ən yaxşısını arzu edə bilərsənmi?</p>
                    <button onClick={() => navigate("/lessons")} className="btn-blue mt-3">Öyrənməyə başla</button>
                </div>
                <div className="hero-vector skeleton-loading">
                    <img onLoad={handleContentLoad} className='w-100' src={vector} alt="vector" />
                </div>
            </div>
        </div>
    )
}

export default Hero;