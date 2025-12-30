"use client";

import Container from "@/components/common/Container/Container";
import useFadeUpOnView from "@/helpers/useFadeUpOnView";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";

/* ---------- DEMO DATA ---------- */
const airlines = [
  {
    name: "Biman Bangladesh Airlines",
    logo: "https://1000logos.net/wp-content/uploads/2023/05/Biman-Bangladesh-Airlines-Logo.png",
  },
  {
    name: "US Bangla Airlines",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKd2YeYhGOTZRMAbJrJTAHemciUv9RM6BNDQ&s",
  },
  {
    name: "Singapore Airlines",
    logo: "https://cdn.worldvectorlogo.com/logos/singapore-airlines.svg",
  },
  {
    name: "China Southern Airlines",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgzWGqiQQpTAqiwhcu0PO4s5lrecJZ4Jd5IQ&s",
  },

  {
    name: "Biman Bangladesh Airlines",
    logo: "https://1000logos.net/wp-content/uploads/2023/05/Biman-Bangladesh-Airlines-Logo.png",
  },
  {
    name: "US Bangla Airlines",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKd2YeYhGOTZRMAbJrJTAHemciUv9RM6BNDQ&s",
  },
  {
    name: "Singapore Airlines",
    logo: "https://cdn.worldvectorlogo.com/logos/singapore-airlines.svg",
  },
  {
    name: "China Southern Airlines",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgzWGqiQQpTAqiwhcu0PO4s5lrecJZ4Jd5IQ&s",
  },
  {
    name: "Biman Bangladesh Airlines",
    logo: "https://1000logos.net/wp-content/uploads/2023/05/Biman-Bangladesh-Airlines-Logo.png",
  },
  {
    name: "US Bangla Airlines",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKd2YeYhGOTZRMAbJrJTAHemciUv9RM6BNDQ&s",
  },
  {
    name: "Singapore Airlines",
    logo: "https://cdn.worldvectorlogo.com/logos/singapore-airlines.svg",
  },
  {
    name: "China Southern Airlines",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgzWGqiQQpTAqiwhcu0PO4s5lrecJZ4Jd5IQ&s",
  },
];

const PopularAirlines = () => {
  const titleRef = useRef(null);

  useFadeUpOnView(titleRef);

  return (
    <section className="bg-warning/8 py-20">
      <Container>
        {/* HEADER */}
        <div className="mb-14 text-center">
          <h2
            ref={titleRef}
            className="text-3xl font-bold text-gray-800 lg:text-4xl"
          >
            Popular Airlines
          </h2>
          <p className="text-color-muted mx-auto mt-3 max-w-xl">
            From breathtaking landscapes to hidden gems – explore curated tours
            designed to create memories that last a lifetime.
          </p>
        </div>
        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {airlines.map((airline, i) => (
            <div
              key={i}
              className={`border-primary-soft bg-warning/14 flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-5 py-4 transition hover:shadow-md ${i >= 5 ? "hidden md:flex" : "flex"} `}
            >
              <div className="flex items-center gap-3">
                {/* LOGO */}
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
                  <img
                    src={airline.logo}
                    alt={airline.name}
                    className="h-7 w-7 object-contain"
                  />
                </div>

                {/* NAME */}
                <p className="text-sm leading-tight font-medium text-gray-800">
                  {airline.name}
                </p>
              </div>

              {/* ICON */}
              <ChevronRight className="text-muted" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularAirlines;
