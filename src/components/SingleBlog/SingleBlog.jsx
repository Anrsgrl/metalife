import React from 'react';
import "./SingleBlog.scss";
import { Link, useNavigate } from 'react-router-dom';

const SingleBlog = (props) => {
    const { image, title, size, hashtags } = props;
    const blogUrl = title.toLowerCase().split(" ").join("-");
    const navigate = useNavigate()
    return (
        <button type='button' onClick={() => navigate(`/blogs/${blogUrl}`)} className={`clean-button single-blog ${size ? "sm-size" : "col-12 col-md-6 col-lg-4 py-2"}`}>
            <div className="blog-content">
                <div className="blog-top">
                    <img src={image} alt="blog" />
                    <h6 className='p-2 pb-1'>{title}</h6>
                </div>
                <div className="hashtags pb-1 px-2">
                    {hashtags?.slice(0, 3).map((item) => (
                        <Link to={`/blog/${item}`}>#{item}</Link>
                    ))}
                </div>
            </div>
        </button>
    )
}

export default SingleBlog;