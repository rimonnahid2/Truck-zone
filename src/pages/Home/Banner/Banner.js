import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";


// import required modules
import { Pagination } from "swiper";

const Banner = () => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {/* <SwiperSlide>
          <img className="w-full" src="https://api.valogari.com/api/upload/images/microsoftteams-image-16--d1057.png" alt="" />
        </SwiperSlide> */}
        <SwiperSlide>
          <img className="w-full" src="https://www.kenworth.com.au/wp-content/uploads/2019/04/KW_TBITB_WebBanner_1480x600px_v2-1020x413.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="https://www.kenworth.com.au/wp-content/uploads/2019/04/KW_Model_T360_v2.jpg" alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img className="w-full" src="https://paccarparts.com.au/media/1/T360_MAIN_BANNER-1024x396.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;


