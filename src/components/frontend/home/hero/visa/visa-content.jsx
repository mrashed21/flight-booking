"use client";

import CommonButton from "@/components/UI/CommonButton";
import CountrySelect from "@/components/UI/CountrySelect";
import DepartureDateSelect from "@/components/UI/DateSelect";
import PillButton from "@/components/UI/PillButton";
import Select from "@/components/UI/Select";
import { Country } from "country-state-city";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const visaTypes = ["Tourist", "Business", "Student", "Work"];

const visaOptions = {
  Tourist: [
    { label: "Single Entry", value: "single" },
    { label: "Multiple Entry", value: "multiple" },
  ],
  Business: [
    { label: "Short Stay (30 days)", value: "short" },
    { label: "Long Stay (90 days)", value: "long" },
  ],
  Student: [
    { label: "Semester Visa", value: "semester" },
    { label: "Full Program Visa", value: "full" },
  ],
  Work: [
    { label: "Employment Visa", value: "employment" },
    { label: "Freelance / Self-Employed", value: "freelance" },
  ],
};

const VisaContent = () => {
  const [selectedType, setSelectedType] = useState("Tourist");
  const [nationality, setNationality] = useState(null);
  const [destination, setDestination] = useState(null);
  const [travelDate, setTravelDate] = useState(null);
  const [selectedVisa, setSelectedVisa] = useState(visaOptions["Tourist"][0]);

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
      onComplete: () => {
        setSelectedType(type);
        setSelectedVisa(visaOptions[type][0]);
      },
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
      {/* Visa Type Pills */}
      <div className="flex flex-wrap gap-1.5">
        {visaTypes.map((type) => (
          <PillButton
            key={type}
            action={() => handleTypeClick(type)}
            type={selectedType === type}
            name={`${type} Visa`}
          />
        ))}
      </div>

      {/* Form */}
      <section ref={contentRef} className="mt-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">

          {/* Nationality */}
          <div className="w-full sm:flex-1">
            <CountrySelect
              label="Your Nationality"
              countries={countries}
              value={nationality}
              onChange={setNationality}
              placeholder="Select your country"
            />
          </div>

          {/* Destination */}
          <div className="w-full sm:flex-1">
            <CountrySelect
              label="Destination Country"
              countries={countries}
              value={destination}
              onChange={setDestination}
              placeholder="Where are you going?"
            />
          </div>

          {/* Visa Sub-type */}
          <div className="w-full sm:w-auto">
            <p className="form-label">Visa Category</p>
            <Select
              options={visaOptions[selectedType]}
              value={selectedVisa}
              onChange={setSelectedVisa}
              placeholder="Select category"
              getOptionLabel={(o) => o?.label}
              getOptionValue={(o) => o?.value}
              isSearchable={false}
            />
          </div>

          {/* Travel Date */}
          <div className="w-full sm:w-auto">
            <DepartureDateSelect
              value={travelDate}
              setValue={setTravelDate}
            />
          </div>
        </div>

        <Link href="/visa" className="mt-5 flex justify-end">
          <CommonButton>Check Visa</CommonButton>
        </Link>
      </section>
    </section>
  );
};

export default VisaContent;
