"use client";

import useFadeUpOnView from "@/helpers/gsapAnimation/useFadeUpOnView";
import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [
  {
    text: `Grows with your business, from startup to enterprise, without requiring system changes. Grows with your business, from startup to enterprise, without requiring system changes.`,
    name: "John Doe",
    role: "Business Partner",
  },
  {
    text: `Grows with your business, from startup to enterprise, without requiring system changes. Grows with your business, from startup to enterprise, without requiring system changes.`,
    name: "John Doe",
    role: "Business Partner",
  },
  {
    text: `Grows with your business, from startup to enterprise, without requiring system changes. Grows with your business, from startup to enterprise, without requiring system changes.`,
    name: "John Doe",
    role: "Business Partner",
  },
  {
    text: `Grows with your business, from startup to enterprise, without requiring system changes. Grows with your business, from startup to enterprise, without requiring system changes.`,
    name: "John Doe",
    role: "Business Partner",
  },
];

const ReviewSection = () => {
  const titleRef = useRef(null);

  useFadeUpOnView(titleRef);
  return (
    <section className="py-20">
      <div className="px-4">
        {/* Heading */}
        <h2
          ref={titleRef}
          className="my-10 text-center text-3xl font-bold text-gray-800 lg:text-4xl"
        >
          What Our Customer Says
        </h2>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-full rounded-xl bg-white p-6 shadow-sm">
                {/* Quote Icon */}
                <div className="text-primary mb-4 text-4xl font-bold">“</div>

                {/* Review Text */}
                <p className="text-muted mb-6 text-sm leading-relaxed">
                  {item.text}
                </p>

                {/* User */}
                <div className="flex items-center gap-3">
                  <Image
                    src="https://i.ibb.co.com/7xz4Xwgf/profile.png"
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-primary text-sm font-semibold">
                      {item.name}
                    </h4>
                    <p className="text-muted text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
