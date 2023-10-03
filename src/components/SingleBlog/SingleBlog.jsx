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
          {!imageLoaded && <div className="skeleton h-100"></div>}
          <img
            src={image}
            alt="blog"
            style={{ display: imageLoaded ? "block" : "none" }}
            onLoad={handleImageLoad}
          />
          <h6 className={!imageLoaded ? "skeleton m-0 pb-5" : "p-2 pb-2"}>
            {imageLoaded && title}
          </h6>
        </div>
        <div
          className={`hashtags ${
            !imageLoaded ? "skeleton m-0 pb-2" : "pb-2 px-4 mb-1 "
          }`}
        >
          {imageLoaded &&
            hashtags?.slice(0, 3).map((item) => (
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
