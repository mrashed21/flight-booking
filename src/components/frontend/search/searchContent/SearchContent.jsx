"use client";

import { ChevronDown, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

const SearchContent = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="space-y-4">
      {/* ---------- RESULT HEADER ---------- */}
      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">{flights.length}</span>{" "}
          Available Flights
        </p>

        <div className="flex gap-2">
          <button className="border-primary text-primary bg-primary-soft rounded-md border px-3 py-1.5 text-xs">
            Cheapest
          </button>
          <button className="rounded-md border px-3 py-1.5 text-xs text-gray-500">
            Fastest
          </button>
        </div>
      </div>

      {/* ---------- FLIGHT LIST ---------- */}
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="overflow-hidden rounded-xl bg-white shadow-sm"
        >
          {/* MAIN ROW */}
          <div className="grid grid-cols-12 items-center gap-3 p-4">
            {/* Airline */}
            <div className="col-span-12 flex items-center gap-3 lg:col-span-3">
              <Image
                src={flight.logo}
                alt={flight.airline}
                className="h-8 w-auto"
                width={300}
                height={300}
              />
              <p className="text-sm font-medium text-gray-700">
                {flight.airline}
              </p>
            </div>

            {/* Time */}
            <div className="col-span-12 flex items-center justify-between lg:col-span-5">
              <div className="text-center">
                <p className="text-sm font-semibold">{flight.departure}</p>
                <p className="text-xs text-gray-500">{flight.from}</p>
              </div>

              <div className="flex flex-col items-center text-xs text-gray-500">
                <Clock size={14} />
                <span>{flight.duration}</span>
                <span>{flight.stop}</span>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold">{flight.arrival}</p>
                <p className="text-xs text-gray-500">{flight.to}</p>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-6 text-right lg:col-span-2">
              <p className="text-primary text-sm font-semibold">
                BDT {flight.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Starting from</p>
            </div>

            {/* Action */}
            <div className="col-span-6 text-right lg:col-span-2">
              <button className="bg-primary rounded-md px-4 py-1.5 text-sm text-white">
                Select
              </button>
            </div>
          </div>

          {/* EXPAND */}
          <div className="flex items-center justify-between border-t px-4 py-2">
            <p className="text-xs text-pink-500">
              Up to 9% discount with bKash during payment
            </p>

            <button
              onClick={() => setOpenId(openId === flight.id ? null : flight.id)}
              className="text-primary flex items-center gap-1 text-xs"
            >
              Flight Details
              <ChevronDown
                size={14}
                className={`transition ${
                  openId === flight.id ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* DETAILS */}
          {openId === flight.id && (
            <div className="grid grid-cols-2 gap-4 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              <div>
                <p>
                  <span className="font-medium">Baggage:</span> {flight.baggage}
                </p>
                <p>
                  <span className="font-medium">Refundable:</span>{" "}
                  {flight.refundable ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Route:</span> {flight.from} →{" "}
                  {flight.to}
                </p>
                <p>
                  <span className="font-medium">Stops:</span> {flight.stop}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
