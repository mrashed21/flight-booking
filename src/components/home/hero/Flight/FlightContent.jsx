"use client";

import PillButton from "@/components/UI/PillButton";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import MultiCity from "./MultiCity";
import OneWay from "./OneWay";
import RoundTrip from "./RoundTrip";

const options = [
  {
    _id: "DAC",
    city: "Dhaka",
    country: "Bangladesh",
    airport_name: "Hazrat Shahjalal International Airport",
  },
  {
    _id: "DEL",
    city: "Delhi",
    country: "India",
    airport_name: "Indira Gandhi International Airport",
  },
  {
    _id: "DXB",
    city: "Dubai",
    country: "UAE",
    airport_name: "Dubai International Airport",
  },
  {
    _id: "DOH",
    city: "Doha",
    country: "Qatar",
    airport_name: "Hamad International Airport",
  },
];

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
      }
    );
  }, [selectedType]);

  return (
    <section className="bg-white rounded-xl rounded-tl-none shadow-md w-full lg:w-260 p-4 lg:p-8 -mt-1">
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
        {selectedType === "One Way" && <OneWay options={options} />}
        {selectedType === "Round Trip" && <RoundTrip options={options} />}
        {selectedType === "Multi-City" && <MultiCity options={options} />}
      </div>
    </section>
  );
};

export default FlightContent;
