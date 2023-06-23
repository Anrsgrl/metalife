import React from 'react';
import "./Hero.scss";
import vector from "../../../../assets/images/vector6.svg";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="hero container py-5">
            <div className="hero-content">
                <div className="hero-text">
                    <h1 data-aos="fade-right">Metalife</h1>
                    <p data-aos="fade-right">Xəyalların ən yaxşısını arzu edə bilərsənmi?</p>
                    <button onClick={() => navigate("/lessons")} data-aos="fade-right" className="btn-blue mt-3">Öyrənməyə başla</button>
                </div>
                <div className="hero-vector skeleton-loading">
                    <img data-aos="fade" className='w-100' src={vector} alt="vector" />
                </div>
            </div>
        </div>
    )
}

export default Hero;