import React from 'react';
import "./Lessons.scss";
import design from "../../../../assets/images/design.png";
import backend from "../../../../assets/images/backend.png";
import frontend from "../../../../assets/images/frontend.png";
import fullstack from "../../../../assets/images/fullstack.png";
import ui from "../../../../assets/images/ui.png";
import d from "../../../../assets/images/3d.png";
import Lesson from '../../../../components/Lesson/Lesson';
import LessonsMobile from './LessonsMobile';

const Lessons = () => {
    return (
        <div className="lessons pt-3 container">
            <h2 className='text-center py-4 '>Get started Lessons</h2>
            <div className="lessons-desktop">
                <div className="row">
                    <Lesson title="Fullstack developer" p="Html, Css, Javascript, React, MongoDB, Java and ExpressJS" image={fullstack} />
                    <Lesson title="Frontend developer" p="Html, Css, Javascript and React" image={frontend} />
                    <Lesson title="Backend developer" p=" MongoDB, Java and ExpressJS" image={backend} />
                    <Lesson title="UI/UIX Designer" p="Figma and AdobeXD" image={ui} />
                    <Lesson title="Interior Designer" p="Autodesk, SketchUp Pro and TurboCAD" image={design} />
                    <Lesson title="3D Modelling" p="Blender and Cinema4D" image={d} />
                </div>
            </div>
            <LessonsMobile />
        </div>
    )
}

export default Lessons;