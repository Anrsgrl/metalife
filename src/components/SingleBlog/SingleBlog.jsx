import React from 'react';
import "./SingleBlog.scss";
import { Link, useNavigate } from 'react-router-dom';

const SingleBlog = (props) => {
    const { image, title } = props;
    const navigate = useNavigate()
    return (
        <button type='button' onClick={() => navigate("/blogs")} className="clean-button single-blog">
            <div className="blog-content">
                <div className="blog-top">
                    <img src={image} alt="blog" />
                    <h6 className='p-2 pb-1'>{title}</h6>
                </div>
                <div className="hashtags pb-1 px-2">
                    <Link to="/blog/frontend">#frontend</Link>
                    <Link to="/blog/http">#http</Link>
                    <Link to="/blog/https">#https</Link>
                </div>
            </div>
        </button>
    )
}

export default SingleBlog;