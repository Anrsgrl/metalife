import React, { useEffect, useState } from "react";
import "./BlogDetail.scss";
import { useParams } from "react-router";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import SingleBlog from "../../../../components/SingleBlog/SingleBlog";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import Loading from "../../../../components/Loading/Loading";
import { useBlogsList } from "../../../../firebase/getFunctions";

const BlogDetail = () => {
  const blogs = useBlogsList();
  const { blogUrl } = useParams();
  const [loading, setLoading] = useState(true);
  const [randomizedBlogs, setRandomizedBlogs] = useState([]);
  const decodedBlogUrl = decodeURIComponent(blogUrl);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    if (blogs && blogs.length > 0) {
      const shuffledBlogs = [...blogs]
        .filter(
          (blog) =>
            blog?.title.replace("?", "").toLowerCase().split(" ").join("-") !==
            decodedBlogUrl
        )
        .sort(() => Math.random() - 0.5);
      setRandomizedBlogs(shuffledBlogs);
    }
  }, [blogUrl, blogs, decodedBlogUrl]);

  const blog = blogs?.find(
    (blog) =>
      blog?.title.replace("?", "").toLowerCase().split(" ").join("-") ===
      decodedBlogUrl
  );
  if (!blog || blog?.length === 0) {
    return <Loading />;
  }

  const blogLink = `https://metalifegroup.com/blogs/${encodeURIComponent(
    decodedBlogUrl
  )}`;
  const quoteText = `${blog.title}  Bu ve daha fazla blog için sitemizi ziyaret edebilirsiniz:`;

  const { content, blog_image, title, author, author_image, time, hashtags } =
    blog;

  const formattedTime = time.toDate().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="blog-detail container py-5">
      <div className="row">
        <div className="blog-left col-12 col-lg-9">
          {loading && <Loading />}
          <img
            src={blog_image}
            className={` my-2 ${loading ? "loading" : "w-100"}`}
            alt="blog"
            onLoad={() => setLoading(false)}
          />
          <div className="blog-info">
            <ul className="px-0 pt-1 m-0 hashtags">
              {hashtags?.slice(0, 3).map((hashtag, index) => (
                <li key={index}>
                  <Link
                    className="text-muted"
                    to={`/search?searchItem=${hashtag}`}
                  >
                    #{hashtag}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="blog-time">
              <MdDateRange />
              {formattedTime}
            </div>
          </div>
          <h1 className="blog-title">{title}</h1>
          <div
            style={{ wordWrap: "break-word" }}
            className="py-3 blog-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="blog-footer pt-5">
            <div className="author-side">
              <img src={author_image} alt="" />
              <div className="blog-footer-texts ps-2">
                <h6>{author}</h6>
                {author === "Nazir Nadirov" && (
                  <p className="text-muted m-0">Qurucu, CEO</p>
                )}
              </div>
            </div>
            <div className="share-side">
              <h6>Paylaş:</h6>
              <div className="share-buttons">
                {[
                  TwitterShareButton,
                  FacebookShareButton,
                  TelegramShareButton,
                  LinkedinShareButton,
                  WhatsappShareButton,
                ].map((ShareButton, index) => (
                  <ShareButton
                    key={index}
                    hashtags={hashtags?.slice(0, 3)}
                    url={blogLink}
                    title={quoteText}
                    className="share-button"
                  >
                    {index === 0 ? (
                      <TwitterIcon size={40} />
                    ) : index === 1 ? (
                      <FacebookIcon size={40} />
                    ) : index === 2 ? (
                      <TelegramIcon size={40} />
                    ) : index === 3 ? (
                      <LinkedinIcon size={40} />
                    ) : (
                      <WhatsappIcon size={40} />
                    )}
                  </ShareButton>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="blog-right col-3">
          <h2 className="text-center">Digər bloqlar</h2>
          {randomizedBlogs?.slice(0, 5).map((blog, index) => (
            <SingleBlog
              key={index}
              title={blog?.title}
              image={blog?.blog_image}
              hashtags={blog?.hashtags}
              size={true}
              other={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
