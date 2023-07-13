import React from 'react';
import "./Blogs.scss";
import SingleBlog from '../../components/SingleBlog/SingleBlog';
import FadeLoader from "react-spinners/FadeLoader";
import { useAuth } from '../../firebase';

const Blogs = () => {
    const { blogs } = useAuth();

    if (!blogs || blogs.length === 0) {
        return <div className="container py-5">
            <FadeLoader color="#4A4AB5" />
        </div>
    }

    return (
        <div className="blogs container py-5">
            <div className="row py-5">
                {blogs?.map((blog) => (
                    <SingleBlog key={blog.id} title={blog?.title} image={blog?.blog_image} hashtags={blog?.hashtags} size={false} />
                ))}
            </div>
        </div>
    )
}

export default Blogs;