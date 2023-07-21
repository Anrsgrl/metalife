import React from 'react';
import "./BlogDetail.scss";
import { useParams } from 'react-router';
import FadeLoader from "react-spinners/FadeLoader";
import { MdDateRange } from "react-icons/md";
import { Link } from 'react-router-dom';
import SingleBlog from '../../../../components/SingleBlog/SingleBlog';
import { useAuth } from '../../../../firebase';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';


const BlogDetail = () => {
    const { blogs } = useAuth();
    const { blogUrl } = useParams();
    const blog = blogs?.find((blog) => blog?.title.replace("?", "").toLowerCase().split(" ").join("-") === blogUrl);
    if (!blog || blog?.length === 0) {
        return <div className="container py-5">
            <FadeLoader color="#4A4AB5" />
        </div>
    }

    const blogLink = window.location.href;
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
                                <li key={hashtag}><Link className='text-muted' to={`/search?searchItem=${hashtag}`}>#{hashtag}</Link></li>
                            ))}
                        </ul>
                        <div className="blog-time">
                            <MdDateRange />{formattedTime}
                        </div>
                    </div>
                    <h1 className="section-heading py-2">{title}</h1>
                    <div style={{ wordWrap: 'break-word' }} className="py-5 blog-content" dangerouslySetInnerHTML={{ __html: content }} />
                    <div className="blog-footer pt-5">
                        <div className="author-side">
                            <img src={author_image} alt="" />
                            <div className="blog-footer-texts ps-2">
                                <h6>{author}</h6>
                                {author === "Nazir Nadirov" && <p className="text-muted m-0">Qurucu, CEO</p>}
                            </div>
                        </div>
                        <div className="share-side">
                            <h6>Paylaş:</h6>
                            <div className="share-buttons">
                                <FacebookShareButton url={blogLink} className="share-button">
                                    <FacebookIcon size={40} />
                                </FacebookShareButton>
                                <TwitterShareButton url={blogLink} className="share-button">
                                    <TwitterIcon size={40} />
                                </TwitterShareButton>
                                <LinkedinShareButton url={blogLink} className="share-button">
                                    <LinkedinIcon size={40} />
                                </LinkedinShareButton>
                            </div>
                        </div>
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


