import React from "react";
import SingleBlog from "../../components/SingleBlog/SingleBlog";
import { useBlogsList } from "../../firebase/getFunctions";

const Blogs = () => {
  const blogs = useBlogsList();

  return (
    <div className="blogs container py-5">
      <div className="row py-5">
        {blogs?.length === 0 && (
          <>
            <SingleBlog />
            <SingleBlog />
            <SingleBlog />
            <SingleBlog />
            <SingleBlog />
            <SingleBlog />
          </>
        )}
        {blogs?.map((blog) => (
          <SingleBlog
            key={blog.id}
            title={blog?.title}
            image={blog?.blog_image}
            hashtags={blog?.hashtags}
            size={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
