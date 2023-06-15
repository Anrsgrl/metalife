import React from 'react';
import "./Application.scss";
import phone from "../../../../assets/images/Phone1.png";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";

const Application = () => {
    return (
        <div className="application my-5 container">
            <div className="application-content p-3 h-100">
                <div className="application-text py-3">
                    <h3 className='px-1'>You can get our mobile application</h3>
                    <div className="application-buttons">
                        <button className='application-btn m-2'><AiFillAndroid />Android</button>
                        <button className='application-btn m-2'><AiFillApple />IOS</button>
                    </div>
                </div>
                <div className="application-image">
                    <img src={phone} alt="phone" />
                </div>
            </div>
        </div>
    )
}

export default Application;