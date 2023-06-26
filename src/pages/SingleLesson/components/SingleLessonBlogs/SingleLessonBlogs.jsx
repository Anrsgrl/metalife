import React from 'react';
import "./SingleLessonBlogs.scss";
import SingleBlog from '../../../../components/SingleBlog/SingleBlog';

const SingleLessonBlogs = () => {
    return (
        <div className="single-lesson-blogs py-3">
            <h3 className='py-1'>Bu mövzu barədə bəzi bloglar</h3>
            <div className="lesson-blogs pt-1 pb-2  ">
                <SingleBlog title="Http və Https arasındaki fərqliliklər nədir?" image="https://ithemes.com/wp-content/uploads/2022/11/HTTP-vs-HTTPS.png" />
                <SingleBlog title="CSS3 yoxsa SCSS?" image="https://codersera.com/blog/wp-content/uploads/2020/04/css_vs_scss.jpg" />
                <SingleBlog title="CSS3 yoxsa SCSS?" image="https://codersera.com/blog/wp-content/uploads/2020/04/css_vs_scss.jpg" />
                <SingleBlog title="CSS3 yoxsa SCSS?" image="https://codersera.com/blog/wp-content/uploads/2020/04/css_vs_scss.jpg" />
                <SingleBlog title="CSS3 yoxsa SCSS?" image="https://codersera.com/blog/wp-content/uploads/2020/04/css_vs_scss.jpg" />
            </div>
        </div>
    )
}

export default SingleLessonBlogs;