import React from 'react';
import "./Lessons.scss";
import design from "../../../../assets/images/design.png";
import Lesson from '../../../../components/Lesson/Lesson';
import LessonsMobile from './LessonsMobile';

const Lessons = () => {
    return (
        <div className="lessons pt-3 container">
            <h2 className='text-center py-4 '>Get started Lessons</h2>
            <div className="lessons-desktop">
                <div className="row">
                    <Lesson p="h" title="h" image={design} />
                    <Lesson p="h" title="h" image={design} />
                    <Lesson p="h" title="h" image={design} />
                    <Lesson p="h" title="h" image={design} />
                    <Lesson p="h" title="h" image={design} />
                    <Lesson p="h" title="h" image={design} />
                </div>
            </div>
            <LessonsMobile />
        </div>
    )
}

export default Lessons;