import React, { useRef, useState, useEffect } from "react";
import "./Lessons.scss";
import Lesson from "../../../../components/Lesson/Lesson";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { lessonList } from "../../../../data/LessonList";

// Install Swiper modules
SwiperCore.use([Navigation, A11y]);

const LessonsMobile = () => {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current.swiper;

    const updateButtonsState = () => {
      if (swiper.isBeginning) {
        setIsFirstSlide(true);
      } else {
        setIsFirstSlide(false);
      }

      if (swiper.isEnd) {
        setIsLastSlide(true);
      } else {
        setIsLastSlide(false);
      }
    };

    swiper.on("slideChange", updateButtonsState);

    // Initial update
    updateButtonsState();

    return () => {
      swiper.off("slideChange", updateButtonsState);
    };
  }, []);

  const goToNextSlide = () => {
    if (swiperRef.current !== null && swiperRef.current.swiper !== null) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (swiperRef.current !== null && swiperRef.current.swiper !== null) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="lessons-mobile">
      <Swiper
        ref={swiperRef}
        spaceBetween={50}
        slidesPerView={1}
        parallax={true}
        navigation={false}
      >
        {lessonList.map((item) => (
          <SwiperSlide key={item.id}>
            <Lesson
              key={item.id}
              title={item.title}
              p={item.shortDescribe}
              image={item.image}
              path={item.path}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`swiper-button-prev ${isFirstSlide ? "disabled" : ""}`}
        onClick={goToPrevSlide}
      ></div>
      <div
        className={`swiper-button-next ${isLastSlide ? "disabled" : ""}`}
        onClick={goToNextSlide}
      ></div>
    </div>
  );
};

export default LessonsMobile;
