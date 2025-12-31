"use client";

import PillButton from "@/components/UI/PillButton";
import { AIRPORTS } from "@/demo/data/AIRPORTS";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import MultiCity from "./MultiCity";
import OneWay from "./OneWay";
import RoundTrip from "./RoundTrip";


const FlightContent = () => {
  const [selectedType, setSelectedType] = useState("One Way");
  const contentRef = useRef(null);

  const handleTypeeClick = (type) => {
    if (type === selectedType) return;
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        setSelectedType(type);
      },
    });
  };

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      },
    );
  }, [selectedType]);

  return (
    <section className="-mt-1 w-full rounded-xl bg-white p-4 shadow-md lg:w-260 lg:rounded-tl-none lg:p-8">
      {/* pill button */}
      <div className="flex space-x-1.5">
        <PillButton
          action={() => handleTypeeClick("One Way")}
          type={selectedType === "One Way"}
          name="One Way"
        />
        <PillButton
          action={() => handleTypeeClick("Round Trip")}
          type={selectedType === "Round Trip"}
          name="Round Trip"
        />
        <PillButton
          action={() => handleTypeeClick("Multi-City")}
          type={selectedType === "Multi-City"}
          name="Multi-City"
        />
      </div>

      {/* select */}
      <div ref={contentRef}>
        {selectedType === "One Way" && <OneWay options={AIRPORTS} />}
        {selectedType === "Round Trip" && <RoundTrip options={AIRPORTS} />}
        {selectedType === "Multi-City" && <MultiCity options={AIRPORTS} />}
      </div>
    </section>
  );
};

export default FlightContent;
