"use client";

import CommonButton from "@/components/UI/CommonButton";
import PillButton from "@/components/UI/PillButton";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import MultiCityModify from "./MultiCityModify";
import OneWayModify from "./OneWayModify";
import RoundTripModify from "./RoundTripModify";

const SearchModal = ({
  options,
  classOptions,
  openModifyModal,
  setOpenModifyModal,
  handleTypeeClick,
  selectedType,
  contentRef,
  selectedFormAirPort,
  setSelectedFormAirPort,
  selectedToAirPort,
  setSelectedToAirPort,
  selectedClassOptions,
  setSeletedClassOptions,
  departureTime,
  setDepartureTime,
  handleSwapAirport,
  hoverAnim,
  fromWrapRef,
  toWrapRef,
  containerRef,
  swapBtnRef,
  swapIconRef,
}) => {
  const modalRef = useRef(null);

  /* ---------- ESC close ---------- */
  useEffect(() => {
    if (!openModifyModal) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenModifyModal(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [openModifyModal, setOpenModifyModal]);

  /* ---------- outside click ---------- */
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenModifyModal(false);
    }
  };

  if (!openModifyModal) return null;

  return (
    <div
      // onMouseDown={handleBackdropClick}
      className="scrollbar-hide fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-white/20 p-2 backdrop-blur-xs lg:p-0"
    >
      {/* modal */}
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-xl bg-white/80 p-6 shadow-2xl backdrop-blur-xl"
      >
        {/* close button */}
        <button
          onClick={() => setOpenModifyModal(false)}
          className="bg-warning fixed -top-1 -right-1 cursor-pointer rounded-full p-1 text-white transition"
        >
          <X size={22} />
        </button>

        {/* content */}
        <div className="flex space-x-1 justify-center items-center">
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

        <div ref={contentRef}>
          {selectedType === "One Way" && (
            <OneWayModify
              options={options}
              classOptions={classOptions}
              selectedFormAirPort={selectedFormAirPort}
              setSelectedFormAirPort={setSelectedFormAirPort}
              selectedToAirPort={selectedToAirPort}
              setSelectedToAirPort={setSelectedToAirPort}
              selectedClassOptions={selectedClassOptions}
              setSeletedClassOptions={setSeletedClassOptions}
              departureTime={departureTime}
              setDepartureTime={setDepartureTime}
              handleSwapAirport={handleSwapAirport}
              hoverAnim={hoverAnim}
              fromWrapRef={fromWrapRef}
              toWrapRef={toWrapRef}
              containerRef={containerRef}
              swapBtnRef={swapBtnRef}
              swapIconRef={swapIconRef}
            />
          )}
          {selectedType === "Round Trip" && <RoundTripModify />}
          {selectedType === "Multi-City" && <MultiCityModify />}
        </div>

        <CommonButton
          onClick={() => setOpenModifyModal(false)}
          className="mt-5 w-full py-1.5"
        >
          {" "}
          Search{" "}
        </CommonButton>
      </div>
    </div>
  );
};

export default SearchModal;
