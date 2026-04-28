import React, { use } from "react";
import "swiper/css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import reviewLogo from "../../../assets/customer-top.png";

const Reviews = ({ reviewsPromise }) => {
  const review = use(reviewsPromise);
  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="py-15">
        <div className="flex flex-col items-center text-center mb-9">
          <img className="mb-4" src={reviewLogo} alt="" />
          <h2 className="font-bold text-4xl md:text-5xl text-secondary">
            What our customers are sayings
          </h2>
          <p className="text-gray-500 mt-9 max-w-3xl mx-auto">
            Enhance posture, mobility and wel-being effortiessly with Postur
            Pro. Achieve proper alignment, reduce pain and strengthen your body
            with ease!
          </p>
        </div>

        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay, EffectCoverflow, Pagination]}
        >
          {review.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
