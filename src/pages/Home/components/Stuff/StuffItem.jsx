import React from 'react';
import { AiFillLinkedin, AiFillInstagram, AiFillTwitterSquare, AiFillGithub, AiFillBehanceSquare } from "react-icons/ai";

const StuffItem = (props) => {
    const { image, name, position, instagram, linkedin, twitter, github, behance } = props;
    return (
        <div data-aos="fade-up" className="stuff-item skeleton-loader m-2">
            <div className="stuff-image">
                <img src={image} alt="boy" />
            </div>
            <div className="stuff-info py-3">
                <h6>{name}</h6>
                <p className='p-0 m-0'>{position}</p>
                <div className="stuff-buttons">
                    {linkedin &&
                        <button onClick={() => { window.open(linkedin) }} className='clean-button'>
                            <AiFillLinkedin />
                        </button>}
                    {github &&
                        <button onClick={() => { window.open(github) }} className='clean-button'>
                            <AiFillGithub />
                        </button>}
                    {behance &&
                        <button onClick={() => { window.open(behance) }} className='clean-button'>
                            <AiFillBehanceSquare />
                        </button>}
                    {instagram &&
                        <button onClick={() => { window.open(instagram) }} className='clean-button'>
                            <AiFillInstagram />
                        </button>}
                    {twitter &&
                        <button onClick={() => { window.open(twitter) }} className='clean-button'>
                            <AiFillTwitterSquare />
                        </button>}
                </div>
            </div>
        </div>
    )
}

export default StuffItem;