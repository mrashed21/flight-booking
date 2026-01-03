"use client";

import Image from "next/image";
import { useState } from "react";
import MultiCityResult from "../SearchResult/MultiCity/MultiCityResult";
import OneWayResult from "../SearchResult/OneWay/OneWayResult";
import RoundTripResult from "../SearchResult/RoundTrip/RoundTripResult";

/* ---------- DEMO DATA ---------- */
const flights = [
  {
    id: 1,
    airline: "Biman Bangladesh Airlines",
    logo: "https://1000logos.net/wp-content/uploads/2023/05/Biman-Bangladesh-Airlines-Logo.png",
    from: "DAC",
    to: "CXB",
    departure: "08:30 AM",
    arrival: "09:30 AM",
    duration: "1h 15m",
    stop: "Non Stop",
    price: 9999,
    baggage: "30 KG",
    refundable: true,
  },
  {
    id: 2,
    airline: "Biman Bangladesh Airlines",
    logo: "https://1000logos.net/wp-content/uploads/2023/05/Biman-Bangladesh-Airlines-Logo.png",
    from: "DAC",
    to: "CXB",
    departure: "11:00 AM",
    arrival: "12:10 PM",
    duration: "1h 10m",
    stop: "Non Stop",
    price: 10500,
    baggage: "30 KG",
    refundable: false,
  },
  {
    id: 3,
    airline: "US Bangla Airlines",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmbTS0Ke1BYPm9zPFhzQ6fCAb3DjkDMqZ3uw&s",
    from: "DAC",
    to: "CXB",
    departure: "06:45 PM",
    arrival: "07:55 PM",
    duration: "1h 10m",
    stop: "Non Stop",
    price: 11200,
    baggage: "20 KG",
    refundable: true,
  },
];

const SearchContent = ({ selectedType }) => {
  const [openFlightDetails, setOpenFlightDetails] = useState(null);
  const [selectedFilter, setSelecttedFilter] = useState("cheapest");

  return (
    <div className="space-y-4">
      {/* ---------- RESULT HEADER ---------- */}
      <div className="flex items-center justify-between p-3">
        <p className="text-3xl">
          <span className="font-semibold">{flights.length}</span> Available
          Flights
        </p>

        <div className="flex gap-2">
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
      </div>

      {/* ---------- FLIGHT LIST ---------- */}
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="-mt-3 overflow-hidden rounded-xl bg-white shadow-sm mb-7"
        >
          {selectedType === "One Way" && (
            <OneWayResult
              flight={flight}
              openFlightDetails={openFlightDetails}
              setOpenFlightDetails={setOpenFlightDetails}
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
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
