import React from 'react';
import "./Footer.scss";
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content px-2 container">
                <span>Copyright 2023 © All Right Reserved</span>
                <div className="contact-icons">
                    <button className='clean-button' onClick={() => window.open('https://www.instagram.com/metalife_official_/')}><AiFillFacebook /></button>
                    <button className='clean-button' onClick={() => window.open('https://www.instagram.com/metalife_official_/')}><AiFillInstagram /></button>
                    <button className='clean-button' onClick={() => window.open('https://www.instagram.com/metalife_official_/')}><AiFillTwitterSquare /></button>
                </div>
            </div>
        </footer>
    )
}

export default Footer;