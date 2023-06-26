import React from 'react';
import "./Lessons.scss";
import Lesson from '../../../../components/Lesson/Lesson';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { lessonList } from '../../../../data/LessonList';

const LessonsMobile = () => {
    return (
        <div className="lessons-mobile">
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
            >
                {lessonList.slice(0, 6).map((item) => (
                    <SwiperSlide key={item.id}>
                        <Lesson key={item.id} title={item.title} p={item.shortDescribe} image={item.image} path={item.path} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default LessonsMobile;