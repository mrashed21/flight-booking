"use client";

import Container from "@/components/common/Container/Container";
import useFadeUpOnView from "@/helpers/useFadeUpOnView";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

/* ---------- DEMO DATA ---------- */
const destinations = [
  {
    city: "Tokyo, Japan",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=1200",
  },
  {
    city: "Sydney, Australia",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3lkbmV5JTJDJTIwQXVzdHJhbGlhfGVufDB8fDB8fHww",
  },
  {
    city: "Tokyo, Japan",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=1200",
  },
  {
    city: "Sydney, Australia",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3lkbmV5JTJDJTIwQXVzdHJhbGlhfGVufDB8fDB8fHww",
  },
  {
    city: "Tokyo, Japan",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=1200",
  },
  {
    city: "Sydney, Australia",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3lkbmV5JTJDJTIwQXVzdHJhbGlhfGVufDB8fDB8fHww",
  },
  {
    city: "Tokyo, Japan",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=1200",
  },
  {
    city: "Sydney, Australia",
    date: "15 Oct 2025 - 12 Nov 2025",
    price: "BDT 10,550",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3lkbmV5JTJDJTIwQXVzdHJhbGlhfGVufDB8fDB8fHww",
  },
];

const TopDestination = () => {
  const titleRef = useRef(null);

  useFadeUpOnView(titleRef);

  return (
    <section className="bg-surface py-20">
      <Container>
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2
            ref={titleRef}
            className="text-3xl lg:text-4xl font-bold text-gray-800"
          >
            Top Destination
          </h2>

          <p className="mt-3 text-muted max-w-xl mx-auto">
            From breathtaking landscapes to hidden gems – explore curated tours
            designed to create memories that last a lifetime.
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
                <div className="relative h-65 rounded-2xl overflow-hidden group cursor-pointer">
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.city}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{item.city}</h3>
                    <p className="text-sm text-white/80">{item.date}</p>
                    <p className="text-sm mt-1">
                      Economy from{" "}
                      <span className="font-semibold">{item.price}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* NAVIGATION */}
          <div className="flex justify-center gap-4 mt-10">
            <button className="dest-prev w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary transition cursor-pointer">
              <ChevronLeft className="text-gray-500" />
            </button>
            <button className="dest-next w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary transition cursor-pointer">
              <ChevronRight className="text-primary" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopDestination;
