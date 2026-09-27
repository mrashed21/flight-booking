"use client";

import useFadeUpOnView from "@/helpers/gsapAnimation/useFadeUpOnView";
import Image from "next/image";
import { useRef } from "react";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [
  {
    text: "SkyWings made my Dubai trip booking incredibly smooth. Got the visa approved within 3 days and the flight tickets were cheaper than anywhere else. Highly recommended!",
    name: "Rahim Uddin",
    role: "Frequent Traveler",
    rating: 5,
    avatar: "https://i.ibb.co.com/7xz4Xwgf/profile.png",
  },
  {
    text: "I booked the Maldives honeymoon package and it was absolutely perfect. The team handled everything — flight, hotel, transfers. Not a single hiccup!",
    name: "Nusrat Jahan",
    role: "Honeymooner",
    rating: 5,
    avatar: "https://i.ibb.co.com/7xz4Xwgf/profile.png",
  },
  {
    text: "The Schengen visa process seemed very complicated but their team guided me step by step. Got approval on the first attempt. Amazing service!",
    name: "Tanvir Ahmed",
    role: "Business Traveler",
    rating: 5,
    avatar: "https://i.ibb.co.com/7xz4Xwgf/profile.png",
  },
  {
    text: "Best travel agency in Bangladesh! Booked flights for my entire family to Singapore. Great prices, fast confirmation, and 24/7 support. Will use again.",
    name: "Farida Khanam",
    role: "Family Traveler",
    rating: 4,
    avatar: "https://i.ibb.co.com/7xz4Xwgf/profile.png",
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
          What Our Travelers Say
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
          className="pb-10"
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-full rounded-xl bg-white p-6 shadow-sm">
                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < item.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="text-primary mb-3 text-3xl font-bold leading-none">
                  "
                </div>

                {/* Review Text */}
                <p className="text-muted mb-6 text-sm leading-relaxed">
                  {item.text}
                </p>

                {/* User */}
                <div className="flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={item.name}
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
