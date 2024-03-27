import React from "react";
import "./Partner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper";
import partner1 from "../../../../assets/images/partner-farajov.webp";
import partner2 from "../../../../assets/images/partner-caspian.webp";
import partner3 from "../../../../assets/images/partner-mogan.webp";

const Partner = () => {
  return (
    <div className="container partners pb-3 pt-5">
      <h2 data-aos="fade-up" className="section-heading py-2">
        Partnyorlar
      </h2>
      <Swiper
        modules={[A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          567: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <div data-aos="fade-up" className="partner-image">
            <img src={partner1} alt="caspian" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div data-aos="fade-up" className="partner-image">
            <img src={partner2} alt="caspian" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div data-aos="fade-up" className="partner-image">
            <img src={partner3} alt="caspian" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Partner;
