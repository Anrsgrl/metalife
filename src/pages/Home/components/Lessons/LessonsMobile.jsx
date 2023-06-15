import React from 'react';
import "./Lessons.scss";
import design from "../../../../assets/images/design.png";
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
                    <Lesson p="h" title="h" image={design} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson p="h" title="h" image={design} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson p="h" title="h" image={design} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson p="h" title="h" image={design} />
                </SwiperSlide>
                <SwiperSlide>
                    <Lesson p="h" title="h" image={design} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default LessonsMobile;