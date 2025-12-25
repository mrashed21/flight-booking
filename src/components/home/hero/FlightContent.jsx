"use client";
import PillButton from "@/components/UI/PillButton";
import { useState } from "react";

const FlightContent = () => {
  const [selectedType, setSelectedType] = useState("One Way");
  //   const contentRef = useRef(null);

  const handleTypeeClick = (type) => {
    if (type === setSelectedType) return;
    setSelectedType(type);
    // gsap.to(contentRef.current, {
    //   opacity: 0.8,
    //   scaleX: 0.5,
    //   duration: 0.5,
    //   ease: "power1.inOut",
    //   transformOrigin: "left center",
    //   onComplete: () => {
    //     setSelectedService(service);
    //   },
    // });
  };

  //   useEffect(() => {
  //     gsap.fromTo(
  //       contentRef.current,
  //       { opacity: 0.8, scaleX: 0.5, transformOrigin: "left center" },
  //       { opacity: 1, scaleX: 1, duration: 0.4, ease: "power1.inOut" }
  //     );
  //   }, [selectedService]);
  return (
    <section className="bg-white h-80 rounded-xl rounded-tl-none shadow-md w-220 p-8">
      {/* pill button */}
      <div className=" flex space-x-1.5">
        <PillButton
          action={() => {
            handleTypeeClick("One Way");
          }}
          type={selectedType === "One Way"}
          name={"One Way"}
        />
        <PillButton
          action={() => {
            handleTypeeClick("Round Trip");
          }}
          type={selectedType === "Round Trip"}
          name={"Round Trip"}
        />
        <PillButton
          action={() => {
            handleTypeeClick("Multi-City");
          }}
          type={selectedType === "Multi-City"}
          name={"Multi-City"}
        />
      </div>

      {/* search feild */}
      <div className="">
        
      </div>
    </section>
  );
};

export default FlightContent;
