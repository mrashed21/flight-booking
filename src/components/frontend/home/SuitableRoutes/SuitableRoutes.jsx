"use client";

import Container from "@/components/common/Container/Container";
import useFadeUpOnView from "@/helpers/useFadeUpOnView";
import { gsap } from "gsap";
import { Plane } from "lucide-react";
import { useRef, useState } from "react";

const ROUTES = {
  International: [
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: {
        city: "Dubai",
        code: "DXB",
        airport: "Dubai International Airport",
      },
    },
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: { city: "London", code: "LHR", airport: "Heathrow Airport" },
    },
    {
      from: {
        city: "Chattogram",
        code: "CGP",
        airport: "Shah Amanat Intl Airport",
      },
      to: {
        city: "Jeddah",
        code: "JED",
        airport: "King Abdulaziz Intl Airport",
      },
    },
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: {
        city: "Kuala Lumpur",
        code: "KUL",
        airport: "Kuala Lumpur Intl Airport",
      },
    },
    {
      from: { city: "Sylhet", code: "ZYL", airport: "Osmani Intl Airport" },
      to: { city: "Singapore", code: "SIN", airport: "Changi Airport" },
    },
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: {
        city: "New York",
        code: "JFK",
        airport: "John F. Kennedy Intl Airport",
      },
    },
  ],

  Domestic: [
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: { city: "Cox's Bazar", code: "CXB", airport: "Cox's Bazar Airport" },
    },
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: {
        city: "Chattogram",
        code: "CGP",
        airport: "Shah Amanat Intl Airport",
      },
    },
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: { city: "Sylhet", code: "ZYL", airport: "Osmani Intl Airport" },
    },
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: { city: "Barishal", code: "BZL", airport: "Barishal Airport" },
    },
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: { city: "Rajshahi", code: "RJH", airport: "Shah Makhdum Airport" },
    },
    {
      from: {
        city: "Dhaka",
        code: "DAC",
        airport: "Hazrat Shahjalal Intl Airport",
      },
      to: { city: "Saidpur", code: "SPD", airport: "Saidpur Airport" },
    },
  ],
};

const SuitableRoutes = () => {
  const [activeTab, setActiveTab] = useState("International");
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const tabRefs = useRef({});

  useFadeUpOnView(titleRef, { y: 50 });

  const handleTabToggle = (tab) => {
    if (tab === activeTab) {
      gsap.fromTo(
        tabRefs.current[tab],
        { scale: 1 },
        {
          scale: 0.92,
          duration: 0.12,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        },
      );

      gsap.fromTo(
        gridRef.current,
        { opacity: 1 },
        {
          opacity: 0.85,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
        },
      );
      return;
    }

    const direction = tab === "International" ? 1 : -1;

    gsap.to(gridRef.current, {
      opacity: 0,
      x: -40 * direction,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveTab(tab);

        gsap.fromTo(
          gridRef.current,
          { opacity: 0, x: 40 * direction },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power3.out",
          },
        );
      },
    });
  };

  return (
    <section className="bg-surface py-8 sm:py-12 md:py-16">
      <Container>
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8 md:mb-10">
          <h2
            ref={titleRef}
            className="px-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl"
          >
            Choose Your Suitable Routes
          </h2>
          <p className="text-muted mx-auto mt-2 max-w-xl px-4 text-sm sm:mt-3 sm:text-base">
            From breathtaking landscapes to hidden gems – explore curated routes
            designed to create memories that last a lifetime.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-2 px-4 sm:mb-10 sm:gap-3 md:mb-12">
          {["International", "Domestic"].map((tab) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[tab] = el)}
              onClick={() => handleTabToggle(tab)}
              className={`cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition sm:px-6 sm:text-base ${
                activeTab === tab
                  ? "border-primary bg-primary text-white"
                  : "border-muted text-muted hover:bg-primary-soft"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Routes Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3"
        >
          {ROUTES[activeTab].map((route, index) => (
            <div
              key={index}
              className="bg-warning/14 flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 sm:px-4 sm:py-4 md:px-5"
            >
              {/* From */}
              <div className="min-w-0 flex-1 pr-2">
                <p className="truncate text-sm font-semibold sm:text-base">
                  {route.from.city}, {route.from.code}
                </p>
                <p className="text-muted truncate text-xs">
                  {route.from.airport}
                </p>
              </div>

              {/* Plane */}
              <div className="mx-2 shrink-0 sm:mx-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm sm:h-8 sm:w-8">
                  <Plane size={14} className="text-warning rotate-45" />
                </div>
              </div>

              {/* To */}
              <div className="min-w-0 flex-1 pl-2 text-right">
                <p className="truncate text-sm font-semibold sm:text-base">
                  {route.to.city}, {route.to.code}
                </p>
                <p className="text-muted truncate text-xs">
                  {route.to.airport}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SuitableRoutes;
