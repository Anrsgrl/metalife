import React from 'react';
import "./Lessons.scss";
import Lesson from '../../../../components/Lesson/Lesson';
import LessonsMobile from './LessonsMobile';
import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { lessonList } from './LessonList';

const Lessons = (props) => {
    const { show } = props;
    const navigate = useNavigate();
    return (
        <div className="lessons text-center pt-3 container">
            <h2 data-aos="fade-up" className='section-heading py-4'>Get started Lessons</h2>
            <div className="lessons-desktop">
                <div className="row">
                    {lessonList.slice(0, 6).map((item) => (
                        <Lesson key={item.id} title={item.title} p={item.describe} image={item.image} />
                    ))}
                </div>
            </div>
            <LessonsMobile />
            {show && <button data-aos="fade-up" onClick={() => navigate("lessons")} className='show-more clean-button'>Show more <VscDebugStart /></button>}
        </div>
    )
}

export default Lessons;