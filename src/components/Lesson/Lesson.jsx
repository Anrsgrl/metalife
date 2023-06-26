import React from 'react';
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Lesson = (props) => {
    const { image, title, p, path } = props;
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(`/lessons/${path}`)} data-aos="fade-up" type='button' className="col-9 col-md-5 col-lg-3 skeleton-loader clean-button me-0 me-md-4 mb-4 p-0 lesson">
            <img src={image} alt="design" />
            <div className="lesson-text px-2">
                <h3>{title}</h3>
                <p>
                    {p}
                </p>
            </div>
            <div className="lesson-footer">
                <button type='button' className='clean-button p-3'>Daha çox <AiOutlineRight /></button>
            </div>
        </button>
    )
}

export default Lesson;