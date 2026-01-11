"use client";

import RemainingTime from "@/components/UI/RemainingTime";
import gsap from "gsap";
import { Settings2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import MultiCityResult from "../SearchResult/MultiCity/MultiCityResult";
import OneWayResult from "../SearchResult/OneWay/OneWayResult";
import RoundTripResult from "../SearchResult/RoundTrip/RoundTripResult";
import { flights } from "./flightdata";

import PillButton from "@/components/UI/PillButton";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SearchContent = ({
  selectedType,
  setFilterDrowerOpen,
  filterDrowerOpen,
  setSelecttedFilter,
  selectedFilter,
  isScrolled,
  setOpenModifyModal,
  handleSearch,
}) => {
  const [openFlightDetails, setOpenFlightDetails] = useState(null);

  return (
    <section className="space-y-3">
      {/* ---------- RESULT HEADER ---------- */}
      <div
        className={`sticky top-16 flex items-center justify-between backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "cz-11 rounded-b-lg bg-white p-3 shadow-sm" : "px-3"
        } ${filterDrowerOpen ? "-z-10" : ""}`}
      >
        {isScrolled && (
          <>
            <PillButton
              name="Modify"
              action={() => {
                setOpenModifyModal(true);
              }}
              className={`bg-primary-dark/20 text-primary-dark flex h-8 max-h-12 shrink-0 items-center border-none lg:hidden ${isScrolled ? "order-2 lg:order-1" : ""}`}
            />
            <p className="hidden lg:flex lg:text-3xl">
              <span className="mr-1 font-semibold">{flights.length}</span>{" "}
              Available Flights
            </p>
          </>
        )}

        {!isScrolled && (
          <p className="lg:text-3xl">
            <span className="mr-1 font-semibold">{flights.length} </span>{" "}
            Available Flights
          </p>
        )}
        <div className="hidden gap-2 lg:flex">
          {/* CHEAPEST */}
          <button
            onClick={() => setSelecttedFilter("cheapest")}
            className={`text-primary cursor-pointer rounded-md border px-3 py-1 transition ${
              selectedFilter === "cheapest"
                ? "border-primary bg-primary-soft"
                : "border-muted hover:border-primary"
            } `}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/icons/cheapest.svg"
                alt="cheapest"
                width={18}
                height={18}
                className="h-4 w-4"
              />
              <span className="font-medium">Cheapest</span>
            </div>
            <span className="text-muted block text-[10px] leading-tight">
              From BDT 4,999
            </span>
          </button>

          {/* FASTEST */}
          <button
            onClick={() => setSelecttedFilter("fastest")}
            className={`text-primary cursor-pointer rounded-md border px-3 py-1 transition ${
              selectedFilter === "fastest"
                ? "border-primary bg-primary-soft"
                : "border-muted hover:border-primary"
            }`}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/icons/fastest.svg"
                alt="fastest"
                width={18}
                height={18}
                className="h-4 w-4"
              />
              <span className="font-medium">Fastest</span>
            </div>
            <span className="text-muted block text-[10px] leading-tight">
              From BDT 8,999
            </span>
          </button>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => {
              setFilterDrowerOpen(true);
            }}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md bg-white px-4 py-1.5 ${isScrolled ? "order-1" : "order-2"}`}
          >
            <Settings2 size={16} /> Filter
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-center lg:hidden">
        <RemainingTime />
      </div>
      {/* ---------- FLIGHT LIST ---------- */}

      {flights.map((flight) => (
        <section
          key={flight.id}
          className={`flight-card mb-3 overflow-hidden rounded-xl bg-white shadow-sm ${
            isScrolled ? " " : "lg:mt-7"
          }`}
        >
          {selectedType === "One Way" && (
            <OneWayResult
              flight={flight}
              openFlightDetails={openFlightDetails}
              setOpenFlightDetails={setOpenFlightDetails}
              filterDrowerOpen={filterDrowerOpen}
              handleSearch={handleSearch}
            />
          )}
          {selectedType === "Round Trip" && (
            <RoundTripResult
              flight={flight}
              openFlightDetails={openFlightDetails}
              setOpenFlightDetails={setOpenFlightDetails}
            />
          )}
          {selectedType === "Multi-City" && (
            <MultiCityResult
              flight={flight}
              openFlightDetails={openFlightDetails}
              setOpenFlightDetails={setOpenFlightDetails}
            />
          )}
        </section>
      ))}
    </section>
  );
};

export default SearchContent;
