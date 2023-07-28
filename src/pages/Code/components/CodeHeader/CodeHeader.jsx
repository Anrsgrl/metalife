import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'

const CodeHeader = ({ openDragMenu }) => {
    return (
        <div className="code-header pb-2">
            <ul className="code-names p-0 m-0">
                <li><NavLink to={"/code/html"} type='button' className='clean-button p-2'>Html</NavLink></li>
                <li><NavLink to={"/code/css"} type='button' className='clean-button p-2'>Css</NavLink></li>
                <li><NavLink to={"/code/js"} type='button' className='clean-button p-2'>Javascript</NavLink></li>
            </ul>
            <div className="code-tools">
                <button type='button' className='clean-button' onClick={() => openDragMenu()}><BiSearchAlt2 /></button>
            </div>
        </div>
    )
}

export default CodeHeader