import React from 'react';
import { BiSearchAlt } from "react-icons/bi";
import "./Nav.scss";
import { hashtags } from '../../data/Hashtags';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navv p-0 container">
            <div className="search-bar">
                <input type="text" placeholder='Axtarış...' name="" id="" className='ps-2 pe-4' />
                <button type="submit"><BiSearchAlt /></button>
            </div>
            <ul className='px-0 pt-1 m-0 hashtags'>
                {hashtags.map((hashtag) => (
                    <li key={hashtag}><Link className='text-muted' to="/">#{hashtag}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Nav;