import React from "react";
import "./SingleLessonBlogs.scss";
import SingleBlog from "../../../../components/SingleBlog/SingleBlog";
import { FadeLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useBlogsList } from "../../../../firebase/getFunctions";
import ScrollContainer from "react-indiana-drag-scroll";

const SingleLessonBlogs = (props) => {
  const { last, title } = props;
  const blogs = useBlogsList();
  const { lessonPath } = useParams();
  const filteredBlogs = blogs?.filter((e) => e.hashtags?.includes(lessonPath));

  const lastBlogs = blogs
    ?.sort((a, b) => b.time.toDate() - a.time.toDate())
    .slice(0, 5);

  const finalResult = last ? lastBlogs : filteredBlogs;

  return (
    <div data-aos="fade-up" className="single-lesson-blogs py-5 container">
      {!last ? (
        <h3 data-aos="fade-up" className="py-1">
          Bu mövzu barədə bəzi bloglar
        </h3>
      ) : (
        <h2 data-aos="fade-up" className="section-heading py-2">
          {title}
        </h2>
      )}
      <ScrollContainer className="lesson-blogs py-1">
        {!blogs || blogs.length === 0 ? (
          <FadeLoader color="#4A4AB5" />
        ) : finalResult.length === 0 ? (
          <p className="text-muted">Bu mövzu barədə blog tapılmadı</p>
        ) : (
          finalResult.map((blog) => (
            <SingleBlog
              key={blog?.id}
              title={blog?.title}
              image={blog?.blog_image}
              hashtags={blog?.hashtags}
              size={true}
            />
          ))
        )}
      </ScrollContainer>
    </div>
  );
};

export default SingleLessonBlogs;
