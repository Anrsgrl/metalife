import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import React from 'react';
import { hashtags } from '../Nav/Hashtags';
import { Link } from 'react-router-dom';

const DragMenu = ({ dragMenu, closeDragMenu }) => {
    return (
        <div className={dragMenu ? "open-drag-menu" : "drag-menu"}>
            <div className="drag-menu-content container p-5">
                <button type="button" className='mb-4 p-1 close-button' onClick={() => closeDragMenu()}><AiOutlineClose /></button>
                <div className="search-bar">
                    <input type="text" placeholder='Search...' name="" id="" className='ps-2 pe-4' />
                    <button type="submit"><BiSearchAlt /></button>
                </div>
                <ul className='p-0 mt-2'>
                    {hashtags.map((hashtag) => (
                        <li className='pt-2'><Link to="/">#{hashtag}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DragMenu;