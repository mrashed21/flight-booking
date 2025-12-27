"use client";

import PillButton from "@/components/UI/PillButton";
import Select from "@/components/UI/Select";
import gsap from "gsap";
import { ArrowRightLeft } from "lucide-react";
import { useRef, useState } from "react";

const options = [
  {
    _id: "DAC",
    airport_name: "Hazrat Shahjalal International Airport (DAC)",
  },
  { _id: "DEL", airport_name: "Indira Gandhi International Airport (DEL)" },
  { _id: "DXB", airport_name: "Dubai International Airport (DXB)" },
  { _id: "DOH", airport_name: "Hamad International Airport (DOH)" },
  { _id: "LHR", airport_name: "London Heathrow Airport (LHR)" },
  { _id: "JFK", airport_name: "John F. Kennedy International Airport (JFK)" },
  { _id: "SIN", airport_name: "Singapore Changi Airport (SIN)" },
  { _id: "KUL", airport_name: "Kuala Lumpur International Airport (KUL)" },
  { _id: "HKG", airport_name: "Hong Kong International Airport (HKG)" },
  { _id: "BKK", airport_name: "Suvarnabhumi Airport (BKK)" },
  { _id: "CDG", airport_name: "Charles de Gaulle Airport (CDG)" },
  { _id: "AMS", airport_name: "Amsterdam Schiphol Airport (AMS)" },
  { _id: "FRA", airport_name: "Frankfurt Airport (FRA)" },
  { _id: "IST", airport_name: "Istanbul Airport (IST)" },
  { _id: "SYD", airport_name: "Sydney Kingsford Smith Airport (SYD)" },
];
const FlightContent = () => {
  const [selectedType, setSelectedType] = useState("One Way");
  const fromWrapRef = useRef(null);
  const toWrapRef = useRef(null);
  const containerRef = useRef(null);
  const swapBtnRef = useRef(null);
  const swapIconRef = useRef(null);

  const createGhost = (text, rect) => {
    const ghost = document.createElement("div");
    ghost.innerText = text;
    ghost.className =
      "absolute z-50 px-3 py-2 bg-white rounded-md shadow text-sm pointer-events-none mt-[26px]";

    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    ghost.style.width = `${rect.width}px`;

    document.body.appendChild(ghost);
    return ghost;
  };

  const handleTypeeClick = (type) => {
    if (type === selectedType) return;
    setSelectedType(type);
  };

  const [selectedFormAirPort, setSelectedFormAirPort] = useState(options[0]);
  const [selectedToAirPort, setSelectedToAirPort] = useState(options[3]);
 
  const handleSwapAirport = () => {
    const fromRect = fromWrapRef.current.getBoundingClientRect();
    const toRect = toWrapRef.current.getBoundingClientRect();

    const fromGhost = createGhost(selectedFormAirPort.airport_name, fromRect);
    const toGhost = createGhost(selectedToAirPort.airport_name, toRect);

    const tl = gsap.timeline({
      onComplete: () => {
        fromGhost.remove();
        toGhost.remove();
      },
    });

    // fade real selects
    tl.to([fromWrapRef.current, toWrapRef.current], {
      opacity: 0,
      duration: 0.3,
    });

    // cross move ghosts
    tl.to(
      fromGhost,
      {
        x: toRect.left - fromRect.left,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.to(
      toGhost,
      {
        x: fromRect.left - toRect.left,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "<"
    );

    // swap state mid-way
    tl.call(() => {
      setSelectedFormAirPort((prev) => {
        setSelectedToAirPort(prev);
        return selectedToAirPort;
      });
    });

    // show real selects back
    tl.to([fromWrapRef.current, toWrapRef.current], {
      opacity: 1,
      duration: 0.5,
    });
  };

  const handleHoverIn = () => {
    gsap.to(swapBtnRef.current, {
      y: -3,
      scale: 1.05,
      boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
      duration: 0.25,
      ease: "power3.out",
    });

    gsap.to(swapIconRef.current, {
      rotate: 180,
      scale: 1.15,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleHoverOut = () => {
    gsap.to(swapBtnRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.25,
      ease: "power3.inOut",
    });

    gsap.to(swapIconRef.current, {
      rotate: 0,
      scale: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  };

  return (
    <section className="bg-white h-80 rounded-xl rounded-tl-none shadow-md w-full lg:w-220 p-4 lg:p-8 -mt-1">
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
      <div className="mt-4">
        <div
          ref={containerRef}
          className="flex space-x-2.5 items-center relative"
        >
          <div ref={fromWrapRef} className="max-w-md w-full">
            <Select
              name="From"
              options={options}
              value={selectedFormAirPort}
              onChange={setSelectedFormAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </div>

          <button
            // ref={swapBtnRef}
            type="button"
            onClick={handleSwapAirport}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
            className="mt-5 p-2 rounded-full bg-primary text-white text-xs cursor-pointer flex items-center justify-center shrink-0"
          >
            <span ref={swapIconRef} className="inline-block">
              <ArrowRightLeft size={16} />
            </span>
          </button>

          <div ref={toWrapRef} className="max-w-md w-full">
            <Select
              name="To"
              options={options}
              value={selectedToAirPort}
              onChange={setSelectedToAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightContent;
