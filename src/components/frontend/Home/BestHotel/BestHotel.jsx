"use client";

import Container from "@/components/common/Container/Container";
import useFadeUpOnView from "@/helpers/gsapAnimation/useFadeUpOnView";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

/* ---------- DEMO DATA ---------- */
const destinations = [
  {
    city: "OCEAN PARADISE",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image: "https://i.ibb.co.com/7dWdd7n5/7379d081835e1f116d07df84a6bd1cf6.jpg",
  },
  {
    city: "HOTEL THE COX TODAY",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image:
      "https://i.ibb.co.com/v4gZNpqk/photo-1512941937669-90a1b58e7e9c.jpg",
  },
  {
    city: "SEA PEARL BEACH RESORT SPA",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image: "https://i.ibb.co.com/VY7mRKmH/images.jpg",
  },
  {
    city: "SAYMON HERITAGE RESIDENCE",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image:
      "https://i.ibb.co.com/xtyB15Hf/images-1.jpg",
  },
   {
    city: "OCEAN PARADISE",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image: "https://i.ibb.co.com/7dWdd7n5/7379d081835e1f116d07df84a6bd1cf6.jpg",
  },
  {
    city: "HOTEL THE COX TODAY",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image:
      "https://i.ibb.co.com/v4gZNpqk/photo-1512941937669-90a1b58e7e9c.jpg",
  },
  {
    city: "SEA PEARL BEACH RESORT SPA",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image: "https://i.ibb.co.com/VY7mRKmH/images.jpg",
  },
  {
    city: "SAYMON HERITAGE RESIDENCE",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image:
      "https://i.ibb.co.com/xtyB15Hf/images-1.jpg",
  },
  
];

const BestHotel = () => {
  const titleRef = useRef(null);

  useFadeUpOnView(titleRef);

  return (
    <section className="bg-surface py-4">
      <Container>
        {/* HEADER */}
        <div className="mb-14 text-center">
          <h2
            ref={titleRef}
            className="text-3xl font-bold text-gray-800 lg:text-4xl"
          >
            Best Hotels in Cox's Bazar
          </h2>

          <p className="text-muted mx-auto mt-3 max-w-xl">
            Discover the vibrant culture Of Bangladesh And the breathtaking beauty Of Cox's Bazar. Start planning your journey today!
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            loop
            navigation={{
              prevEl: ".dest-prev",
              nextEl: ".dest-next",
            }}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {destinations.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="group relative h-65 cursor-pointer overflow-hidden rounded-2xl">
                  {/* IMAGE */}
                  <Image
                    width={200}
                    height={200}
                    src={item.image}
                    alt={item.city}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{item.city}</h3>
                    <p className="text-sm text-white/80">{item.date}</p>
                    <p className="mt-1 text-sm">
                      Economy from{" "}
                      <span className="font-semibold">{item.price}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* NAVIGATION */}
          <div className="mt-10 flex justify-center gap-4">
            <button className="dest-prev hover:border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 transition">
              <ChevronLeft className="text-gray-500" />
            </button>
            <button className="dest-next hover:border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 transition">
              <ChevronRight className="text-primary" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BestHotel;
