import React from 'react';
import { AiOutlinePlayCircle } from "react-icons/ai";

const Lesson = (props) => {
    const { image, title, p } = props;
    return (
        <div className="col-9 col-md-5 col-lg-3 me-0 me-md-4 mb-4 p-0 lesson">
            <img src={image} alt="design" />
            <div className="lesson-text">
                <h3>{title}</h3>
                <p>
                    {p}
                </p>
            </div>
            <div className="lesson-footer">
                <button className='clean-button p-3'>Watch lesson <AiOutlinePlayCircle /></button>
            </div>
        </div>
    )
}

export default Lesson;