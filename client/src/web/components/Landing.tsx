import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

const Landing = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.2)] z-10"></div>
      <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
        <h2 className="text-4xl font-bold mb-4">Latest Collection</h2>
        <p className="text-lg mb-8">Explore the new arrivals in our store</p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
          View Collection
        </button>
      </div>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper h-[calc(100vh-84.5px)] w-full"
      >
        <SwiperSlide>
          <img className="w-full h-full" src="/images/1.jpeg" alt="1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full" src="/images/2.jpeg" alt="2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full" src="/images/3.jpeg" alt="3" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full" src="/images/4.webp" alt="4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Landing;
