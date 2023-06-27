import React, { useEffect, useState } from 'react';
import "./SingleLesson.scss";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lessonList } from '../../data/LessonList';
import { TiArrowBack } from "react-icons/ti";
import SingleLessonBlogs from './components/SingleLessonBlogs/SingleLessonBlogs';

const SingleLesson = () => {
    const { lessonPath } = useParams();
    const lesson = lessonList.find((lesson) => lesson.path === lessonPath);
    const { image, describe, title } = lesson;
    const navigate = useNavigate()
    const [more, setMore] = useState(false);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    return (
        <div className="single-lesson container py-3">
            <button onClick={() => navigate(-1)} type="button" className='clean-button back'><TiArrowBack /></button>
            <div className="row py-3">
                <div className="col-12 col-lg-4">
                    <img src={image} alt="lesson" className='w-100 h-100' />
                </div>
                <div className="col-12 col-lg-8">
                    <h2 className='section-heading my-2'>{title}</h2>
                    <p className='py-2'>{describe}</p>
                    <p className='more-content'>Dərsi aşağıdaki düymələrdən online şəkildə ala bilər və ya kursumuzda canlı şəkildə dərslərə qoşula bilərsiniz.
                        <button onClick={() => setMore(true)} type='button' className={more ? "d-none" : "clean-button"}>daha çox...</button>
                        {more && <span> Bunun üçün saytın aşağısında qeyd olunan əlaqə yolları ilə bizimlə əlaqə saxlaya bilərsiniz. Əlavə sualınız yarandıqda isə <Link to="/contact">"Əlaqə" səhifəsindən</Link> bizə mail ata bilərsiniz.</span>}
                    </p>
                    <div className="single-lesson-buttons">
                        <button type="button" className='btn-blue'>Dərsi al</button>
                        <button onClick={() => navigate(`/lessons/${lessonPath}/videos`)} type="button" className='btn-white'>Pulsuz dərsləri izlə</button>
                    </div>
                </div>
            </div>
            <SingleLessonBlogs />
        </div>
    )
}

export default SingleLesson;