"use client";

import RemainingTime from "@/components/UI/RemainingTime";
import gsap from "gsap";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const airlines = [
  "US Bangla Airlines",
  "Biman Bangladesh Airlines",
  "Air Astra",
  "NOVOAIR",
];

const SearchSidebar = ({
  filterDrowerOpen,
  setFilterDrowerOpen,
  setSelecttedFilter,
  selectedFilter,
}) => {
  const [price, setPrice] = useState(9999);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  // GSAP Animation & Body Scroll Lock
  useEffect(() => {
    if (filterDrowerOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      // Unlock body scroll
      document.body.style.overflow = "";
      document.body.style.height = "";

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(drawerRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [filterDrowerOpen]);

  const handleClose = () => {
    setFilterDrowerOpen(false);
  };

  const handleOptionClick = () => {
    handleClose();
  };

  return (
    <>
      <div className="sticky top-20">
        {/* Desktop Version - unchanged */}
        <div className="hidden lg:flex">
          <RemainingTime />
        </div>

        <div className="hidden space-y-6 rounded-xl bg-white p-4 shadow-sm lg:flex lg:flex-col">
          <h3 className="text-base font-semibold">Filter</h3>

          <div>
            <p className="mb-2 text-sm font-medium">Price Range</p>
            <input
              type="range"
              min={4999}
              max={19500}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="accent-primary w-full"
            />
            <div className="text-muted mt-1 flex justify-between text-xs">
              <span>BDT 4,999</span>
              <span>BDT {price}</span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Airlines</p>
            <div className="space-y-2">
              {airlines.map((airline) => (
                <label
                  key={airline}
                  className="text-muted/98 flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    className="text-primary focus:ring-primary border-muted rounded"
                  />
                  {airline}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Flight Schedules</p>
            <div className="flex gap-2">
              <button className="border-primary text-primary bg-primary-soft flex-1 rounded-md border py-1.5 text-xs">
                Departure
              </button>
              <button className="text-muted flex-1 rounded-md border py-1.5 text-xs">
                Arrival
              </button>
            </div>
            <div className="text-muted/98 mt-3 space-y-2 text-sm">
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

          <div>
            <p className="mb-2 text-sm font-medium">Stops</p>
            <div className="text-muted/98 space-y-2 text-sm">
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

          <div>
            <p className="mb-2 text-sm font-medium">Baggage Policy</p>
            <div className="text-muted/98 space-y-2 text-sm">
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
      </div>

      {/* Mobile Drawer - New */}
      <div className="lg:hidden">
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="pointer-events-none fixed inset-0 -top-[95px] z-40 bg-white/20 backdrop-blur-xs"
          style={{ pointerEvents: filterDrowerOpen ? "auto" : "none" }}
          onClick={handleClose}
        />

        {/* Drawer -top-[100px] */}
        <div
          ref={drawerRef}
          className="scrollbar-hide cz-max fixed -top-[2.7%] -left-3 h-screen w-80 overflow-y-auto bg-white pb-30 shadow-2xl"
          style={{ transform: "translateX(-100%)" }}
        >
          {/* Header */}
          <div className="cz-max sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button
              onClick={handleClose}
              className="bg-warning -mr-2 cursor-pointer rounded-full p-1 text-white transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 p-4">
            {/* CHEAPEST & FASTEST button */}
            <div className="flex gap-2">
              {/* CHEAPEST */}
              <button
                onClick={() => {
                  setSelecttedFilter("cheapest");
                  handleOptionClick();
                }}
                className={`text-primary w-full cursor-pointer rounded-md border px-3 py-1 transition ${
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
                onClick={() => {
                  setSelecttedFilter("fastest");
                  handleOptionClick();
                }}
                className={`text-primary w-full cursor-pointer rounded-md border px-3 py-1 transition ${
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
            {/* Price Range */}
            <div>
              <p className="mb-2 text-sm font-medium">Price Range</p>
              <input
                type="range"
                min={4999}
                max={19500}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  // handleOptionClick();
                }}
                className="accent-primary w-full"
              />
              <div className="text-muted mt-1 flex justify-between text-xs">
                <span>BDT 4,999</span>
                <span>BDT {price}</span>
              </div>
            </div>

            {/* Airlines */}
            <div>
              <p className="mb-2 text-sm font-medium">Airlines</p>
              <div className="space-y-2">
                {airlines.map((airline) => (
                  <label
                    key={airline}
                    className="text-muted/98 flex cursor-pointer items-center gap-2 text-sm"
                    onClick={handleOptionClick}
                  >
                    <input
                      type="checkbox"
                      className="text-primary focus:ring-primary border-muted rounded"
                    />
                    {airline}
                  </label>
                ))}
              </div>
            </div>

            {/* Flight Schedules */}
            <div>
              <p className="mb-2 text-sm font-medium">Flight Schedules</p>
              <div className="flex gap-2">
                <button
                  className="border-primary text-primary bg-primary-soft flex-1 rounded-md border py-1.5 text-xs"
                  onClick={handleOptionClick}
                >
                  Departure
                </button>
                <button
                  className="text-muted flex-1 rounded-md border py-1.5 text-xs"
                  onClick={handleOptionClick}
                >
                  Arrival
                </button>
              </div>
              <div className="text-muted/98 mt-3 space-y-2 text-sm">
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />
                  12 AM – 06 AM
                </label>
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />
                  06 AM – 12 PM
                </label>
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />
                  12 PM – 06 PM
                </label>
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />
                  06 PM – 12 AM
                </label>
              </div>
            </div>

            {/* Stops */}
            <div>
              <p className="mb-2 text-sm font-medium">Stops</p>
              <div className="text-muted/98 space-y-2 text-sm">
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />
                  Non-stop
                </label>
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />1 Stop
                </label>
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />
                  2+ Stops
                </label>
              </div>
            </div>

            {/* Baggage */}
            <div>
              <p className="mb-2 text-sm font-medium">Baggage Policy</p>
              <div className="text-muted/98 space-y-2 text-sm">
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />
                  20 KG
                </label>
                <label
                  className="flex items-center gap-2"
                  onClick={handleOptionClick}
                >
                  <input type="checkbox" />
                  30 KG
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
