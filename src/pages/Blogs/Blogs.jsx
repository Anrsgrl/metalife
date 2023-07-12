import React from 'react';
import "./Blogs.scss";
import SingleBlog from '../../components/SingleBlog/SingleBlog';
import FadeLoader from "react-spinners/FadeLoader";
import BlogForm from './components/BlogForm/BlogForm';

const Blogs = ({ blogs }) => {
    return (
        <div className="blogs container py-5">
            <div className="row">
                {!blogs && <FadeLoader color="#4A4AB5" />}
                {blogs?.map((blog) => (
                    <SingleBlog key={blog.id} title={blog?.title} image={blog?.blog_image} hashtags={blog?.hashtags} size={false} />
                ))}
            </div>
            <BlogForm />
        </div>
    )
}

export default Blogs;