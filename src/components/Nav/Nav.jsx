import React from 'react';
import { BiSearchAlt } from "react-icons/bi";
import "./Nav.scss";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {

    const [fixed, setFixed] = useState(false);
    const changeColor = () => {
        if (window.scrollY >= 96) {
            setFixed(true);
        } else {
            setFixed(false);
        }
    };

    window.addEventListener('scroll', changeColor);
    return (
        <div className="navv p-0 container">
            <div className={fixed ? "fixed-search-bar search-bar" : "search-bar"}>
                <input type="text" placeholder='Search...' name="" id="" className='ps-2 pe-4' />
                <button type="submit"><BiSearchAlt /></button>
            </div>
            <ul className='px-0 pt-1 m-0 hashtags'>
                <li><Link className='text-muted' to="/">#html</Link></li>
                <li><Link className='text-muted' to="/">#css</Link></li>
                <li><Link className='text-muted' to="/">#scss</Link></li>
                <li><Link className='text-muted' to="/">#javascript</Link></li>
                <li><Link className='text-muted' to="/">#react</Link></li>
                <li><Link className='text-muted' to="/">#java</Link></li>
                <li><Link className='text-muted' to="/">#mongodb</Link></li>
                <li><Link className='text-muted' to="/">#expressjs</Link></li>
                <li><Link className='text-muted' to="/">#figma</Link></li>
                <li><Link className='text-muted' to="/">#adobexd</Link></li>
                <li><Link className='text-muted' to="/">#autodesk</Link></li>
                <li><Link className='text-muted' to="/">#turbocad</Link></li>
            </ul>
        </div>
    )
}

export default Nav;