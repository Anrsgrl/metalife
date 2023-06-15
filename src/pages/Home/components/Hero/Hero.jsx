import React from 'react';
import "./Hero.scss";
import vector from "../../../../assets/images/vector.png";

const Hero = () => {
    return (
        <div className="hero container py-5">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Metalife</h1>
                    <p>Can you wish best of dreams</p>
                    <button class="button-50 mt-3">Get started to learn</button>
                </div>
                <div className="hero-vector">
                    <img className='w-100' src={vector} alt="vector" />
                </div>
            </div>
        </div>
    )
}

export default Hero;