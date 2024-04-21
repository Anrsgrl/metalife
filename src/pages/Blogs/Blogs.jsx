import React, { useEffect } from "react";
import SingleBlog from "../../components/SingleBlog/SingleBlog";
import { useBlogsList } from "../../firebase/getFunctions";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";

const Blogs = () => {
  const blogs = useBlogsList();
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(searchParams.get("page")) || 1;

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBlogs = blogs
    .sort((a, b) => b.time - a.time)
    .slice(startIndex, endIndex);
  useEffect(() => {
    document.title = `Bloqlar | Metalife`;
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);
  return (
    <div className="blogs container py-5">
      <div className="row pt-3">
        {displayedBlogs.map((blog) => (
          <SingleBlog
            key={blog.id}
            title={blog?.title}
            image={blog?.blog_image}
            hashtags={blog?.hashtags}
            size={false}
          />
        ))}
      </div>
      <div className="pagination-controls mt-4">
        <button
          type="button"
          onClick={() => navigate(`/blogs?page=${pageNumber - 1}`)}
          disabled={pageNumber === 1}
          className={`${
            pageNumber === 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"
          } btn-blue`}
        >
          <MdOutlineFirstPage className="w-5 h-5" />
        </button>
        <span>{`${pageNumber} / ${Math.ceil(
          blogs.length / itemsPerPage
        )}`}</span>

        <button
          onClick={() => navigate(`/blogs?page=${pageNumber + 1}`)}
          disabled={endIndex >= blogs.length}
          className={`${
            endIndex >= blogs.length
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          } btn-blue`}
        >
          <MdOutlineLastPage className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
