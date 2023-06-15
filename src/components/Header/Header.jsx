import React from 'react';
import "./Header.scss";
import logo from "../../assets/images/logo3.png";
import { BiMenuAltLeft } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";

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
                        <ul className='desktop m-0 ps-4'>
                            <li>
                                <button className="clean-button">Home</button>
                                <button className="clean-button">About</button>
                                <button className="clean-button">Lessons</button>
                                <button className="clean-button">Contact</button>
                            </li>
                        </ul>
                    </div>
                    <div className="header-profile">
                        <button className="account mobile clean-button p-0">
                            <VscAccount />
                        </button>
                        <div className="desktop-buttons desktop">
                            <button className="clean-button">
                                Lang
                            </button>
                            <button className="clean-button">
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