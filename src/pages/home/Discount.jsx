// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import './discountSliderStyle.css'


const Discount = () => {
  return (
    <div className="text-center my-10">
      <h2 className="text-3xl font-bold mb-5 md:mb-10">Discounts</h2>
      <h3>
        Slider5 is visible when you slide to 2,3, or 4, and slider5 has
        &apos;swiper-slide-visible&apos; className
      </h3>{" "}
      <br />
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={2} // Default to 2 slides per view
        breakpoints={{
          768: { // When window width is >= 768px
            slidesPerView: 3, // Show 3 slides
          },
        }}
        className="mySwiper w-screen md:w-[800px] h-80 border">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Discount;