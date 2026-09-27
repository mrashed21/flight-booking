"use client";
import Container from "@/components/common/Container/Container";
import Image from "next/image";

import useFadeUpOnView from "@/helpers/gsapAnimation/useFadeUpOnView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import FaqAccordion from "./FaqAccordion";
import TermsSwiper from "./TermsSwiper";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "1",
    title: "Search",
    desc: "Select destination, journey date & number of travelers on flight tab. Click 'Search'.",
  },
  {
    step: "2",
    title: "Select",
    desc: "Select preferred flight. Click 'Select'.",
  },
  {
    step: "3",
    title: "Book",
    desc: "Log in to your profile. Select offer. Provide guest details and click 'Confirm Booking'.",
  },
  {
    step: "4",
    title: "Payment",
    desc: "Provide BIN number of your card (first 6 digits). Check discount details and click 'Proceed to Payment'.",
  },
];
const Offer = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useFadeUpOnView(titleRef);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reset play reset",
        },
      },
    );
  }, []);
  return (
    <Container>
      {/* offer banner */}
      <div className="">
        <Image
          src={"https://i.ibb.co.com/d0bghmSd/Rectangle-41395.png"}
          width={1600}
          height={400}
          alt="offer banner"
        />
      </div>
      {/* offer card */}
      <div ref={containerRef} className="px-4 py-16">
        <div className="">
          <h2
            ref={titleRef}
            className="my-10 text-center text-3xl font-bold text-gray-800 lg:text-4xl"
          >
            How to avail the offer
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="relative mt-10 rounded-xl bg-white p-4 text-center shadow-sm"
              >
                <div className="text-primary absolute -top-9 left-1/2 -translate-x-1/2 font-bold">
                  <p className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-5xl">
                    {item.step}
                  </p>
                </div>

                <h3 className="text-primary mt-5 mb-2 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-muted mb-4 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TermsSwiper />
      <FaqAccordion titleRef={titleRef}/>
    </Container>
  );
};

export default Offer;
