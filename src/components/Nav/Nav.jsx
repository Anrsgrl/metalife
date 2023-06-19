import React from 'react';
import { BiSearchAlt } from "react-icons/bi";
import "./Nav.scss";
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navv p-0 container">
            <div className="search-bar">
                <input type="text" placeholder='Search...' name="" id="" className='ps-2 pe-4' />
                <button type="submit"><BiSearchAlt /></button>
            </div>
            <ul className='px-0 pt-1 m-0 hashtags'>
                <li><Link to="/">#html</Link></li>
                <li><Link to="/">#css</Link></li>
                <li><Link to="/">#scss</Link></li>
                <li><Link to="/">#javascript</Link></li>
                <li><Link to="/">#react</Link></li>
                <li className='mini-desktop'><Link to="/">#java</Link></li>
                <li className='mini-desktop'><Link to="/">#mongodb</Link></li>
                <li className='mini-desktop'><Link to="/">#expressjs</Link></li>
                <li className='desktop'><Link to="/">#figma</Link></li>
                <li className='desktop'><Link to="/">#adobexd</Link></li>
                <li className='desktop'><Link to="/">#autodesk</Link></li>
                <li className='desktop'><Link to="/">#turbocad</Link></li>
            </ul>
        </div>
    )
}

export default Nav;