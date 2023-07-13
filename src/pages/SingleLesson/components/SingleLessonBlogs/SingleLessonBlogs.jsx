import React from 'react';
import "./SingleLessonBlogs.scss";
import SingleBlog from '../../../../components/SingleBlog/SingleBlog';
import { useAuth } from '../../../../firebase';
import { FadeLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';

const SingleLessonBlogs = () => {
    const { blogs } = useAuth();
    const { lessonPath } = useParams();
    const filteredBlogs = blogs.filter((e) => e.hashtags?.includes(lessonPath));

    return (
        <div className="single-lesson-blogs py-5">
            <h3 className='py-1'>Bu mövzu barədə bəzi bloglar</h3>
            <div className="lesson-blogs py-3">
                {!blogs || blogs.length === 0 ? (
                    <FadeLoader color="#4A4AB5" />
                ) : filteredBlogs.length === 0 ? (
                    <p className='text-muted'>Bu mövzu barədə blog tapılmadı</p>
                ) : (
                    filteredBlogs.map((blog) => (
                        <SingleBlog
                            key={blog?.id}
                            title={blog?.title}
                            image={blog?.blog_image}
                            hashtags={blog?.hashtags}
                            size={true}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default SingleLessonBlogs;
