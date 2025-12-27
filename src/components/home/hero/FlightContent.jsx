"use client";

import DateSelecet from "@/components/UI/DateSelecet";
import PillButton from "@/components/UI/PillButton";
import Select from "@/components/UI/Select";
import gsap from "gsap";
import { ArrowRightLeft } from "lucide-react";
import { useRef, useState } from "react";

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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  console.log("fromDate :", fromDate);
  console.log("toDate :", toDate);
  const fromWrapRef = useRef(null);
  const toWrapRef = useRef(null);
  const containerRef = useRef(null);
  const swapBtnRef = useRef(null);
  const swapIconRef = useRef(null);

  const createGhost = (text, rect) => {
    const ghost = document.createElement("div");
    ghost.innerText = text;
    ghost.className =
      "fixed z-50 px-3 py-2 bg-white rounded-md shadow text-sm pointer-events-none mt-[26px]";

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
    if (!fromWrapRef.current || !toWrapRef.current) return;

    const fromRect = fromWrapRef.current.getBoundingClientRect();
    const toRect = toWrapRef.current.getBoundingClientRect();

    const fromGhost = createGhost(
      `${selectedFormAirPort.city} ${selectedFormAirPort._id}`,
      fromRect
    );

    const toGhost = createGhost(
      `${selectedToAirPort.city} ${selectedToAirPort._id}`,
      toRect
    );

    const dx = toRect.left - fromRect.left;
    const dy = toRect.top - fromRect.top;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        fromGhost.remove();
        toGhost.remove();
      },
    });

    // hide real selects
    tl.to([fromWrapRef.current, toWrapRef.current], {
      opacity: 0,
      duration: 0.2,
    });

    // move ghosts
    tl.to(
      fromGhost,
      {
        x: dx,
        y: dy,
        duration: 0.6,
      },
      "<"
    );

    tl.to(
      toGhost,
      {
        x: -dx,
        y: -dy,
        duration: 0.6,
      },
      "<"
    );

    // swap state AFTER animation
    tl.call(() => {
      setSelectedFormAirPort(selectedToAirPort);
      setSelectedToAirPort(selectedFormAirPort);
    });

    // show real selects back
    tl.to([fromWrapRef.current, toWrapRef.current], {
      opacity: 1,
      duration: 0.25,
    });
  };

  const handleHoverIn = () => {
    gsap.to(swapBtnRef.current, {
      // y: -3,
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
      <div className="mt-4 flex justify-between gap-3 ">
        {/* airport */}
        <div
          ref={containerRef}
          className="flex space-x-2.5 items-center relative col-span-4"
        >
          <div ref={fromWrapRef} className="">
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
            ref={swapBtnRef}
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

          <div ref={toWrapRef} className="">
            <Select
              name="To"
              options={options}
              value={selectedToAirPort}
              // isMulti
              // isClearable
              onChange={setSelectedToAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </div>
        </div>

        <div className="mt-auto">
          <DateSelecet
            tripType={"One Way"}
            // tripType={"Round Trip"}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            name={"Select Date"}
          />
        </div>
        <div className="">
          <button>Search Button</button>
        </div>
      </div>
    </section>
  );
};

export default FlightContent;
