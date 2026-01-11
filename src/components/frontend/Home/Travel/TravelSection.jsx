"use client";

import Container from "@/components/common/Container/Container";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

/* ---------------- DATA ---------------- */
const banners = [
  {
    image:
      "https://i.ibb.co.com/vxvCQpFF/Black-and-Orange-Modern-Elegant-Black-Friday-Ticket.png",
    url: "/offer/sydney",
  },
  {
    image:
      "https://i.ibb.co.com/vxBpdFmX/Black-and-Orange-Modern-Elegant-Black-Friday-Ticket-1.png",
    url: "/offer/melbourne",
  },
  {
    image:
      "https://i.ibb.co.com/TMx2sK10/Black-and-Orange-Modern-Elegant-Black-Friday-Ticket-2.png",
    url: "/offer/brisbane",
  },
  {
    image:
      "https://i.ibb.co.com/6czqXkR5/Black-and-Orange-Modern-Elegant-Black-Friday-Ticket-3.png",
    url: "/offer/perth",
  },
];

const TravelSection = () => {
  return (
    <section className="bg-surface py-16">
      <Container>
        {/* HEADER */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
            Still Interested in Traveling to Sydney?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Limited seats available. Complete your booking to secure yours.
          </p>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Autoplay]}
          loop
          centeredSlides
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          spaceBetween={28}
          breakpoints={{
            0: { slidesPerView: 1.15 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-6"
          style={{ transform: "none" }}
        >
          {banners.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <Link href={item.url} className="-cz-max block">
                  <div
                    className={`relative overflow-hidden rounded-2xl transition-all duration-500 ease-out ${
                      isActive
                        ? "-translate-y-2 scale-110 shadow-xl shadow-black/10"
                        : "scale-95 opacity-70 blur-[0.3px]"
                    } `}
                  >
                    <Image
                      src={item.image}
                      alt="Travel deal banner"
                      width={600}
                      height={400}
                      className="h-60 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    {/* subtle overlay for depth */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default TravelSection;
