import React from "react";
import "./Footer.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content px-2">
          <div className="footer-contact">
            <h3>Əlaqə məlumatları</h3>
            <ul>
              <li>
                Telefon: <a href="tel:+994503765058">+994503765058</a>
              </li>
              <li>
                E-poçt: <a href="mailto:info@metalife.az">info@metalife.az</a>
              </li>
              <li>Baki, Nəsimi, Məhəmməd Füzuli, 73, 28</li>
            </ul>
          </div>
          <div className="footer-location">
            <iframe
              title="location"
              aria-label="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24308.49673281931!2d49.83440194999999!3d40.396397099999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d79869956a3%3A0x9f949d3fb038a1f0!2zTmVzaW1pLCBCYWvDvCwgQmFrw7w!5e0!3m2!1str!2saz!4v1687095853021!5m2!1str!2saz"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="footer-content px-2">
          <span>Copyright 2023 © Bütün Hüquqlar Qorunur</span>
          <div className="contact-icons">
            <button
              type="button"
              title="Facebook"
              aria-label="Facebook"
              className="clean-button"
              onClick={() =>
                window.open("https://www.instagram.com/metalife_official_/")
              }
            >
              <AiFillFacebook />
            </button>
            <button
              type="button"
              title="Instagram"
              aria-label="Instagram"
              className="clean-button"
              onClick={() =>
                window.open("https://www.instagram.com/metalife_official_/")
              }
            >
              <AiFillInstagram />
            </button>
            <button
              type="button"
              title="Twitter"
              aria-label="Twitter"
              className="clean-button"
              onClick={() =>
                window.open("https://www.instagram.com/metalife_official_/")
              }
            >
              <AiFillTwitterSquare />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
