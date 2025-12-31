"use client";

import PillButton from "@/components/UI/PillButton";

import { airpotsData } from "@/demo/data/AirPorts";
import { CLASS_OPTIONS } from "@/demo/data/ClassType";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import SearchContent from "./searchContent/SearchContent";
import SearchSidebar from "./searchContent/SearchSidebar";
import SearchMultiCity from "./searchType/SearchMultiCity";
import SearchOneWay from "./searchType/SearchOneWay";
import SearchRoundTrip from "./searchType/SearchRoundTrip";

const Search = () => {
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
    <section className="py-10">
      <div className="flex justify-between">
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
        {/* search button */}
        <PillButton
          name="Modify"
          className="bg-primary-dark/20 text-primary-dark border-none"
        />
      </div>
      {/* select */}
      <div ref={contentRef}>
        {selectedType === "One Way" && (
          <SearchOneWay options={airpotsData} classOptions={CLASS_OPTIONS} />
        )}
        {selectedType === "Round Trip" && (
          <SearchRoundTrip options={airpotsData} classOptions={CLASS_OPTIONS} />
        )}
        {selectedType === "Multi-City" && (
          <SearchMultiCity options={airpotsData} classOptions={CLASS_OPTIONS} />
        )}

        {/* //todo search result */}
        <div className="mt-5 grid min-h-screen grid-cols-12 gap-2">
          {/* sidebar */}
          <div className="col-span-2">
            <SearchSidebar />
          </div>
          {/* search content */}
          <div className="col-span-10">
            <SearchContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
