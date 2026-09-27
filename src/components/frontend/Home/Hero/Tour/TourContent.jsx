"use client";

import CommonButton from "@/components/UI/CommonButton";
import CountrySelect from "@/components/UI/CountrySelect";
import DepartureDateSelect from "@/components/UI/DateSelect";
import ReturnDateSelect from "@/components/UI/ReturnDateSelect";
import PillButton from "@/components/UI/PillButton";
import Select from "@/components/UI/Select";
import { Country } from "country-state-city";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const tourTypes = ["Group Tour", "Private Tour", "Honeymoon"];

const tourPackages = [
  { label: "Cox's Bazar Beach Escape", value: "coxs-bazar" },
  { label: "Sundarbans Adventure", value: "sundarbans" },
  { label: "Dubai Desert & City Tour", value: "dubai" },
  { label: "Bangkok Explorer", value: "bangkok" },
  { label: "Singapore in Style", value: "singapore" },
  { label: "Maldives Honeymoon Special", value: "maldives" },
  { label: "Kuala Lumpur City Break", value: "kl" },
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
  label: `${n} ${n === 1 ? "Guest" : "Guests"}`,
  value: n,
}));

const TourContent = () => {
  const [selectedType, setSelectedType] = useState("Group Tour");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(tourPackages[0]);
  const [guests, setGuests] = useState(guestOptions[1]);
  const [destination, setDestination] = useState(null);

  const contentRef = useRef(null);

  const countries = useMemo(
    () =>
      Country.getAllCountries().map((c) => ({
        name: c.name,
        isoCode: c.isoCode,
      })),
    [],
  );

  const handleTypeClick = (type) => {
    if (type === selectedType) return;
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => setSelectedType(type),
    });
  };

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
    );
  }, [selectedType]);

  return (
    <section className="-mt-1 w-full rounded-xl bg-white p-4 shadow-md lg:w-220 lg:rounded-tl-none lg:p-8">
      {/* Tour Type Pills */}
      <div className="flex flex-wrap gap-1.5">
        {tourTypes.map((type) => (
          <PillButton
            key={type}
            action={() => handleTypeClick(type)}
            type={selectedType === type}
            name={type}
          />
        ))}
      </div>

      {/* Form */}
      <section ref={contentRef} className="mt-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">

          {/* Destination Country */}
          <div className="w-full sm:flex-1">
            <CountrySelect
              label="Destination"
              countries={countries}
              value={destination}
              onChange={setDestination}
              placeholder="Where do you want to go?"
            />
          </div>

          {/* Tour Package */}
          <div className="w-full sm:flex-1">
            <p className="form-label">Tour Package</p>
            <Select
              options={tourPackages}
              value={selectedPackage}
              onChange={setSelectedPackage}
              placeholder="Select a package"
              getOptionLabel={(o) => o?.label}
              getOptionValue={(o) => o?.value}
            />
          </div>

          {/* Start Date */}
          <div className="w-full sm:w-auto">
            <DepartureDateSelect value={startDate} setValue={setStartDate} />
          </div>

          {/* End Date */}
          <div className="w-full sm:w-auto">
            <ReturnDateSelect
              value={endDate}
              setValue={setEndDate}
              departureDate={startDate}
            />
          </div>

          {/* Guests */}
          <div className="w-full sm:w-auto">
            <p className="form-label">Guests</p>
            <Select
              options={guestOptions}
              value={guests}
              onChange={setGuests}
              placeholder="Guests"
              getOptionLabel={(o) => o?.label}
              getOptionValue={(o) => o?.value}
              isSearchable={false}
            />
          </div>
        </div>

        <Link href="/tour-package" className="mt-5 flex justify-end">
          <CommonButton>Search Tour</CommonButton>
        </Link>
      </section>
    </section>
  );
};

export default TourContent;
