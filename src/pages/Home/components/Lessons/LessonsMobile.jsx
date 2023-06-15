import React from 'react';
import "./Lessons.scss";
import design from "../../../../assets/images/design.png";
import backend from "../../../../assets/images/backend.png";
import frontend from "../../../../assets/images/frontend.png";
import fullstack from "../../../../assets/images/fullstack.png";
import ui from "../../../../assets/images/ui.png";
import d from "../../../../assets/images/3d.png";
import Lesson from '../../../../components/Lesson/Lesson';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const LessonsMobile = () => {
    return (
        <div className="lessons-mobile">
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
            >
                <SwiperSlide>
                    <Lesson title="Fullstack developer" p="Html, Css, Javascript, React, MongoDB, Java and ExpressJS" image={fullstack} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson title="Frontend developer" p="Html, Css, Javascript and React" image={frontend} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson title="Backend developer" p=" MongoDB, Java and ExpressJS" image={backend} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson title="UI/UIX Designer" p="Figma and AdobeXD" image={ui} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson title="Interior Designer" p="Autodesk, SketchUp Pro and TurboCAD" image={design} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson title="3D Modelling" p="Blender and Cinema4D" image={d} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default LessonsMobile;