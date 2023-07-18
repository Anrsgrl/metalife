import React, { useState } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import "./Nav.scss";
import { hashtags } from '../../data/Hashtags';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchTerm(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?searchItem=${searchTerm}`);
    };

    return (
        <div className="navv p-0 container">
            <form onSubmit={(e) => handleSubmit(e)} className="search-bar">
                <input onChange={(e) => handleInputChange(e.target.value.toLocaleLowerCase())} value={searchTerm} type="text" placeholder='Axtarış...' name="" id="" className='ps-2 pe-4' />
                <button type="submit"><BiSearchAlt /></button>
            </form>
            <ul className='px-0 pt-1 m-0 hashtags'>
                {hashtags.map((hashtag) => (
                    <li key={hashtag}><Link className='text-muted' to="/">#{hashtag}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Nav;