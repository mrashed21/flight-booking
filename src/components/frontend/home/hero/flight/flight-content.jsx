"use client";

import PillButton from "@/components/ui/pill-button";

import { airPortsData } from "@/demo/data/airports";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import MultiCity from "./multi-city";
import OneWay from "./one-way";
import RoundTrip from "./round-trip";

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
      <section ref={contentRef}>
        {selectedType === "One Way" && <OneWay options={airPortsData} />}
        {selectedType === "Round Trip" && <RoundTrip options={airPortsData} />}
        {selectedType === "Multi-City" && <MultiCity options={airPortsData} />}
      </section>
    </section>
  );
};

export default FlightContent;
