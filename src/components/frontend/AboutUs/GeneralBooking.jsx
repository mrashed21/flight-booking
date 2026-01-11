"use client";

import useFadeUpOnView from "@/helpers/gsapAnimation/useFadeUpOnView";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const GeneralBooking = () => {
  const titleRef = useRef(null);
  const comingSoonRef = useRef(null);

  useFadeUpOnView(titleRef);

  useEffect(() => {
    if (!comingSoonRef.current) return;

    gsap.fromTo(
      comingSoonRef.current,
      { opacity: 0.3, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
      },
    );
  }, []);

  return (
    <section className="bg-primary-soft rounded-xl px-10 py-20">
      <div>
        <h2
          ref={titleRef}
          className="my-10 text-center text-3xl font-bold text-gray-800 lg:text-4xl"
        >
          Gneral Booking Process
        </h2>
      </div>

      <div className="flex h-100 w-full items-center justify-center rounded-xl bg-white shadow">
        <h2
          ref={comingSoonRef}
          className="text-primary text-3xl font-bold tracking-wide"
        >
          Coming Soon...
        </h2>
      </div>
    </section>
  );
};

export default GeneralBooking;
