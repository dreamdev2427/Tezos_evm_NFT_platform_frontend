import React from "react";
// Import Swiper React components
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export interface ICarouselProps {
  children: React.ReactNode;
  itemsLength: number;
}

export default function Carousel({
  children,
  itemsLength,
}: ICarouselProps): JSX.Element {
  return (
    <>
      <Swiper
        slidesPerView={itemsLength > 4 ? 4 : 2}
        slidesPerGroup={itemsLength > 4 ? 4 : 2}
        spaceBetween={10}
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: itemsLength > 2 ? 2 : 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: itemsLength > 3 ? 3 : 2,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: itemsLength > 4 ? 4 : 2,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
      >
        {children}
      </Swiper>
    </>
  );
}
