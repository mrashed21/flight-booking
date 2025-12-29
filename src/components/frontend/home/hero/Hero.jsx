"use client";
import Container from "@/components/common/Container/Container";
import HeroButton from "@/components/UI/HeroButton";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import FlightContent from "./Flight/FlightContent";
import TourContent from "./Tour/TourContent";
import VisaContent from "./Visa/VisaContent";

const Hero = () => {
  const [selectedService, setSelectedService] = useState("Flight");
  const contentRef = useRef(null);

  const handleServiceClick = (service) => {
    if (service === selectedService) return;
    gsap.to(contentRef.current, {
      opacity: 0.8,
      scaleX: 0.5,
      duration: 0.5,
      ease: "power1.inOut",
      transformOrigin: "left center",
      onComplete: () => {
        setSelectedService(service);
      },
    });
  };

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0.8, scaleX: 0.5, transformOrigin: "left center" },
      { opacity: 1, scaleX: 1, duration: 0.4, ease: "power1.inOut" }
    );
  }, [selectedService]);

  return (
    <section className="bg-[url(https://i.ibb.co.com/kVK09VVw/john-cameron-WRQix-Jtep3-A-unsplash.jpg)] h-182 bg-cover bg-center flex items-end justify-center pb-16">
      <Container>
        <h1 className="text-center text-3xl lg:text-7xl font-bold text-white leading-tight lg:leading-snug">
          Discover the Beauty of the World with Every Tour
        </h1>
        <p className="text-center text-white max-w-lg mx-auto hidden md:flex md:mt-5">
          From breathtaking landscapes to hidden gems — explore curated tours
          designed to create memories that last a lifetime.
        </p>

        <div className="">
          {/* button */}
          <div className="flex items-center justify-start gap-1 mt-5">
            <HeroButton
              action={() => handleServiceClick("Flight")}
              type={selectedService === "Flight"}
              activeImage="/icons/flight-active.svg"
              inActiveImage="/icons/flight-inactive.svg"
              name="Flight"
            />
            <HeroButton
              action={() => {
                handleServiceClick("Tour");
              }}
              type={selectedService === "Tour"}
              activeImage="/icons/tour-active.svg"
              inActiveImage="/icons/tour-inactive.svg"
              name="Tour"
            />

            <HeroButton
              action={() => {
                handleServiceClick("Visa");
              }}
              type={selectedService === "Visa"}
              activeImage="/icons/visa-active.svg"
              inActiveImage="/icons/visa-inactive.svg"
              name="Visa"
            />
          </div>
          {/* content */}
          <div ref={contentRef}>
            {selectedService === "Flight" && <FlightContent />}
            {selectedService === "Tour" && <TourContent />}
            {selectedService === "Visa" && <VisaContent />}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
