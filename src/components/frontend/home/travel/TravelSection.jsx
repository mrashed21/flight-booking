"use client";

import Container from "@/components/common/Container/Container";
import { Autoplay, EffectCoverflow, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useFadeUpOnView from "@/helpers/useFadeUpOnView";
import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

/* ---------------- DATA ---------------- */
const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400",
  },
];

const TravelSection = () => {
  const titleRef = useRef(null);

  useFadeUpOnView(titleRef);
  return (
    <section className="bg-[#f8fafc] py-20">
      <Container>
        {/* HEADER */}
        <div className="mt-10 mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Still Interested in Traveling to Sydney?
          </h2>
          <p className="mt-2 text-gray-500">
            There is a limited number of seats available. Complete your booking
            to secure yours.
          </p>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[EffectCoverflow, Autoplay, Mousewheel]}
          effect="coverflow"
          centeredSlides
          loop={true}
          grabCursor
          mousewheel={{ forceToAxis: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1.3 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 180,
            modifier: 1,
            slideShadows: false,
          }}
          className="-z-10 pb-12"
        >
          {banners.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="h-60 overflow-hidden rounded-2xl bg-white shadow-xl">
                <Image
                  width={200}
                  height={200}
                  src={item.image}
                  alt="travel"
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default TravelSection;
