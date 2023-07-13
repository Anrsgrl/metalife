import React from 'react';
import "./BlogDetail.scss";
import { useParams } from 'react-router';
import FadeLoader from "react-spinners/FadeLoader";
import { MdDateRange } from "react-icons/md";
import { Link } from 'react-router-dom';
import SingleBlog from '../../../../components/SingleBlog/SingleBlog';
import { useAuth } from '../../../../firebase';
const BlogDetail = () => {
    const { blogs } = useAuth();
    const { blogUrl } = useParams();
    const blog = blogs?.find((blog) => blog?.title.toLowerCase().split(" ").join("-") === blogUrl);

    if (!blog || blog?.length === 0) {
        return <div className="container py-5">
            <FadeLoader color="#4A4AB5" />
        </div>
    }

    const { content, blog_image, title, author, author_image, time, hashtags } = blog;

    const formattedTime = time.toDate().toLocaleString();

    return (
        <div className="blog-detail container py-5">
            <div className="row">
                <div className="blog-left col-12 col-lg-9">
                    <img src={blog_image} className="w-100 py-2" alt="blog" />
                    <div className='blog-info'>
                        <ul className='px-0 pt-1 m-0 hashtags'>
                            {hashtags?.slice(0, 3).map((hashtag) => (
                                <li key={hashtag}><Link className='text-muted' to="/">#{hashtag}</Link></li>
                            ))}
                        </ul>
                        <div className="blog-time">
                            <MdDateRange />{formattedTime}
                        </div>
                    </div>
                    <h1 className="section-heading py-2">{title}</h1>
                    <div style={{ wordWrap: 'break-word' }} className="py-5" dangerouslySetInnerHTML={{ __html: content }} />
                    <div className="blog-footer pt-5">
                        <img src={author_image} alt="" />
                        <h6>{author}</h6>
                    </div>
                </div>
                <div className="blog-right col-3">
                    <h3 className='text-center'>Digər bloglar</h3>
                    {blogs?.slice(0, 4).map((blog) => (
                        <SingleBlog key={blog.id} title={blog?.title} image={blog?.blog_image} hashtags={blog?.hashtags} size={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
