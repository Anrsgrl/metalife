import React from 'react';
import "./Header.scss";
import logo from "../../assets/images/logo3.png";
import { BiMenuAltLeft } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="container py-2">
                <div className="header-content">
                    <button className="hamburger mobile clean-button p-0">
                        <BiMenuAltLeft />
                    </button>
                    <div className="header-left p-0">
                        <button className="logo-button p-0 clean-button">
                            <img src={logo} alt="logo" />
                        </button>
                        <ul className='header-menu desktop m-0 ps-4'>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/lessons">Lessons</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                    <div className="header-profile">
                        <button className="account mobile clean-button p-0">
                            <VscAccount />
                        </button>
                        <div className="desktop-buttons desktop">
                            <select name="sort-list" id="sort-list">
                                <option value="en">EN</option>
                                <option value="aze">AZE</option>
                                <option value="ru">RU</option>
                            </select>
                            <button className="sign-in px-3 clean-button">
                                Sign in
                            </button>
                            <button className="clean-button sign-up p-2">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;