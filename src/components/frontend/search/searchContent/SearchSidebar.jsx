// import React from 'react'

// const SearchSidebar = () => {
//   return (
//     <div>SearchSidebar</div>
//   )
// }

// export default SearchSidebar

"use client";

import { useState } from "react";

const airlines = [
  "US Bangla Airlines",
  "Biman Bangladesh Airlines",
  "Air Astra",
  "NOVOAIR",
];

const SearchSidebar = () => {
  const [price, setPrice] = useState(9999);

  return (
    <div className="space-y-6 rounded-xl bg-white p-4 shadow-sm">
      {/* ---------- HEADER ---------- */}
      <h3 className="text-base font-semibold text-gray-800">Filter</h3>

      {/* ---------- PRICE RANGE ---------- */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Price Range</p>

        <input
          type="range"
          min={4999}
          max={19500}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="accent-primary w-full"
        />

        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>BDT 4,999</span>
          <span>BDT {price}</span>
        </div>
      </div>

      {/* ---------- AIRLINES ---------- */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Airlines</p>

        <div className="space-y-2">
          {airlines.map((airline) => (
            <label
              key={airline}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                className="text-primary focus:ring-primary rounded border-gray-300"
              />
              {airline}
            </label>
          ))}
        </div>
      </div>

      {/* ---------- FLIGHT SCHEDULE ---------- */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">
          Flight Schedules
        </p>

        <div className="flex gap-2">
          <button className="border-primary text-primary bg-primary-soft flex-1 rounded-md border py-1.5 text-xs">
            Departure
          </button>
          <button className="flex-1 rounded-md border py-1.5 text-xs text-gray-500">
            Arrival
          </button>
        </div>

        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            12 AM – 06 AM
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            06 AM – 12 PM
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            12 PM – 06 PM
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            06 PM – 12 AM
          </label>
        </div>
      </div>

      {/* ---------- STOPS ---------- */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Stops</p>

        <div className="space-y-2 text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Non-stop
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />1 Stop
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            2+ Stops
          </label>
        </div>
      </div>

      {/* ---------- BAGGAGE ---------- */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Baggage Policy</p>

        <div className="space-y-2 text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            20 KG
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            30 KG
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
