import React from "react";
import "./Application.scss";
import phone from "../../../../assets/images/phone.webp";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";

const Application = () => {
  return (
    <div className="application-field">
      <div className="application py-5 container">
        <div className="application-content p-3 h-100">
          <div className="application-text text-center py-3">
            <h3
              title="Mobil tətbiqimizdən istifadə edə bilərsiniz"
              data-aos="fade-right"
              className="px-1"
            >
              Mobil tətbiqimizdən istifadə edə bilərsiniz
            </h3>
            <div className="application-buttons">
              <button
                type="button"
                aria-label="Android"
                title="Android"
                data-aos="fade-right"
                className="btn-white m-2"
              >
                <AiFillAndroid />
                Android
              </button>
              <button
                type="button"
                aria-label="IOS"
                title="IOS"
                data-aos="fade-right"
                className="btn-white m-2"
              >
                <AiFillApple />
                IOS
              </button>
            </div>
          </div>
          <div data-aos="fade-left" className="application-image">
            <img src={phone} alt="phone" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
