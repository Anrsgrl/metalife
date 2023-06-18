import React, { useState } from 'react';
import "./Header.scss";
import logo from "../../assets/images/logo3.png";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


const Header = () => {
    const navigate = useNavigate();
    const [hamburger, setHamburger] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const openHamburger = () => {
        setHamburger(true)
        document.body.style.overflow = 'hidden';
    }

    const closeHamburger = () => {
        setHamburger(false)
        setDropdown(false)
        document.body.style.overflow = 'unset';
    }


    return (
        <header>
            <div className="container py-2">
                <div className="header-content">
                    <button onClick={() => openHamburger()} className="hamburger mobile clean-button p-0">
                        <BiMenuAltLeft />
                    </button>
                    <div className="header-left p-0">
                        <button onClick={() => navigate("/")} className="logo-button p-0 clean-button">
                            <img src={logo} alt="logo" />
                        </button>
                        <ul className='header-menu desktop m-0 ps-4'>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/lessons">Lessons</NavLink></li>
                            <li className='dropdownn'>
                                Website Order
                                <ul className='dropdown-menuu'>
                                    <NavLink to="order">Order now</NavLink>
                                    <NavLink to="portfolio">Portfolio</NavLink>
                                </ul>
                            </li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                        <div className="hamburger-nav">
                            <AnimatePresence>
                                {hamburger &&
                                    <motion.aside key={hamburger}
                                        initial={{ left: -200, opacity: 0 }}
                                        animate={{ left: 0, opacity: 1 }}
                                        exit={{ left: -200, opacity: 0 }}
                                        transition={{
                                            duration: 0.3, opacity: { ease: "linear" },
                                        }} >
                                        <button className='close-button clean-button' onClick={() => closeHamburger()}><AiOutlineCloseCircle /></button>
                                        <div className="aside-content">
                                            <select name="sort-list" id="sort-list">
                                                <option value="en">EN</option>
                                                <option value="aze">AZE</option>
                                                <option value="ru">RU</option>
                                            </select>
                                            <ul className='aside-ul pt-2'>
                                                <li><NavLink to="/" onClick={() => closeHamburger()}>Home</NavLink></li>
                                                <li><NavLink to="/lessons" onClick={() => closeHamburger()}>Lessons</NavLink></li>
                                                <li>
                                                    <button onClick={() => setDropdown(!dropdown)} className='pb-1 clean-button open-dropdown p-0'>
                                                        Website Order <span className={dropdown && "rotate-arrow"}><MdKeyboardArrowDown /></span>
                                                    </button>
                                                    <ul className={dropdown ? 'aside-dropdown-open' : 'aside-dropdown'}>
                                                        <NavLink onClick={() => closeHamburger()} to="order">Order now</NavLink>
                                                        <NavLink onClick={() => closeHamburger()} to="portfolio">Portfolio</NavLink>
                                                    </ul>
                                                </li>
                                                <li><NavLink to="/contact" onClick={() => closeHamburger()}>Contact</NavLink></li>
                                            </ul>
                                        </div>
                                    </motion.aside>}
                            </AnimatePresence>
                        </div>
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