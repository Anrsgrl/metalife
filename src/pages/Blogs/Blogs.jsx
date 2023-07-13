import React from 'react';
import "./Blogs.scss";
import SingleBlog from '../../components/SingleBlog/SingleBlog';
import FadeLoader from "react-spinners/FadeLoader";
import BlogForm from './components/BlogForm/BlogForm';
import { useAuth } from '../../firebase';

const Blogs = () => {
    const { blogs } = useAuth();
    console.log(blogs)

    if (!blogs || blogs.length === 0) {
        return <div className="container py-5">
            <FadeLoader color="#4A4AB5" />
        </div>
    }

    return (
        <div className="blogs container py-5">
            <div className="row">
                {blogs?.map((blog) => (
                    <SingleBlog key={blog.id} title={blog?.title} image={blog?.blog_image} hashtags={blog?.hashtags} size={false} />
                ))}
            </div>
            <BlogForm />
        </div>
    )
}

export default Blogs;