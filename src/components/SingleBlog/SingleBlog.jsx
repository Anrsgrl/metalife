import React, { useState } from "react";
import "./SingleBlog.scss";
import { Link, useNavigate } from "react-router-dom";

const SingleBlog = (props) => {
  const { image, title, size, hashtags } = props;
  const blogUrl = title?.toLowerCase().split(" ").join("-");
  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <button
      type="button"
      disabled={!imageLoaded}
      onClick={() => navigate(`/blogs/${blogUrl}`)}
      className={`clean-button single-blog ${
        size ? "sm-size" : "col-12 col-md-6 col-lg-4 py-2"
      }`}
    >
      <div className={`blog-content ${imageLoaded ? "image-loaded" : ""}`}>
        <div className="blog-top">
          {!imageLoaded && <div className="skeleton"></div>}
          <img
            src={image}
            alt="blog"
            style={{ display: imageLoaded ? "block" : "none" }}
            onLoad={handleImageLoad}
          />
          <h6 className={`p-2 pb-1 ${!imageLoaded && "skeleton"}`}>
            {imageLoaded && title}
          </h6>
        </div>
        <div
          className={`hashtags pb-1 px-2 mb-1 ${
            imageLoaded ? "visible" : "hidden"
          }`}
        >
          {hashtags?.slice(0, 3).map((item) => (
            <Link key={item} to={`/blog/${item}`}>
              #{item}
            </Link>
          ))}
        </div>
      </div>
    </button>
  );
};

export default SingleBlog;
