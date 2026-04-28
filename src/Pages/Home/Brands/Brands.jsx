import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";
const brandsLogo = [
  amazon,
  amazonVector,
  casio,
  moonstar,
  randstad,
  star,
  startPeople,
];
const Brands = () => {
  return (
    <div className="max-w-7xl mx-auto bg-gray-100 px-5">
      <div className="py-15">
        <h2 className="text-center text-4xl md:text-5xl text-secondary font-bold mb-9">
          Our Trusted Brands
        </h2>

        <Swiper
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={10}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {brandsLogo.map((logo, i) => (
            <SwiperSlide key={i}>
              <img src={logo} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
