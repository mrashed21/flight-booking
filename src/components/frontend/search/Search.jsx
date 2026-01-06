"use client";

import PillButton from "@/components/UI/PillButton";
import { airPortsData } from "@/demo/data/AirPorts";
import { CLASS_OPTIONS } from "@/demo/data/ClassType";
import { swapGhostAnimation } from "@/helpers/gsapAnimation/swapGhostAnimation";
import { swapHoverAnimation } from "@/helpers/gsapAnimation/swapHoverAnimation";
import { setSearchData } from "@/store/slices/flightSearchSlice";
import gsap from "gsap";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SearchContent from "./searchContent/SearchContent";
import SearchSidebar from "./searchContent/SearchSidebar";
import SearchModal from "./searchModal/SearchModal";
import SearchMultiCity from "./searchType/SearchMultiCity";
import SearchOneWay from "./searchType/SearchOneWay";
import SearchRoundTrip from "./searchType/SearchRoundTrip";

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedType, setSelectedType] = useState("One Way");
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [filterDrowerOpen, setFilterDrowerOpen] = useState(false);
  const [selectedFilter, setSelecttedFilter] = useState("cheapest");
  // ! scroll cntroll
  const [isScrolled, setIsScrolled] = useState(false);

  //! one way trip
  const [selectedFormAirPort, setSelectedFormAirPort] = useState(
    airPortsData[0],
  );
  const [selectedToAirPort, setSelectedToAirPort] = useState(airPortsData[3]);
  const [selectedClassOptions, setSeletedClassOptions] = useState("");
  const [departureTime, setDepartureTime] = useState();

  // ! animation ref
  const contentRef = useRef(null);
  const fromWrapRef = useRef(null);
  const toWrapRef = useRef(null);
  const containerRef = useRef(null);
  const swapBtnRef = useRef(null);
  const swapIconRef = useRef(null);

  // animation for swap airpot
  const handleSwapAirport = () => {
    swapGhostAnimation({
      fromEl: fromWrapRef.current,
      toEl: toWrapRef.current,
      fromText: `${selectedFormAirPort.city} ${selectedFormAirPort._id}`,
      toText: `${selectedToAirPort.city} ${selectedToAirPort._id}`,
      onSwap: () => {
        setSelectedFormAirPort(selectedToAirPort);
        setSelectedToAirPort(selectedFormAirPort);
      },
    });
  };
  // animation for swap button
  const hoverAnim = swapHoverAnimation({
    buttonEl: swapBtnRef.current,
    iconEl: swapIconRef.current,
  });

  const handleTypeeClick = (type) => {
    if (type === selectedType) return;
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        setSelectedType(type);
      },
    });
  };

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      },
    );
  }, [selectedType]);

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*
    send props for details
    selectedType
    selectedFilter
    selectedFormAirPort
    selectedToAirPort
    selectedClassOptions
    departureTime
  */

  const handleSearch = () => {
    dispatch(
      setSearchData({
        selectedType,
        selectedFilter,
        selectedFormAirPort: selectedFormAirPort?._id,
        selectedToAirPort: selectedToAirPort?._id,
        selectedClassOptions: selectedClassOptions?._id,
        departureTime,
      }),
    );

    router.push("/passenger-details");
  };

  return (
    <section className="lg:py-10">
      <div className="flex justify-between">
        {/* pill button */}
        <div className="hidden space-x-1.5 lg:flex">
          <PillButton
            action={() => handleTypeeClick("One Way")}
            type={selectedType === "One Way"}
            name="One Way"
            className="h-8"
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

        {/* mobile view */}
        <div className="flex items-center justify-between gap-2.5 lg:hidden">
          <ChevronLeft size={25} className="text-muted" />{" "}
          <div className="">
            <h2 className="text-[14px] font-medium">
              Dhaka (DAC) - Cox's Bazar (COX),B
            </h2>
            <p className="text-muted text-xs">
              {" "}
              07 Dec 2025 | Adult(l) | Round Way{" "}
            </p>
          </div>
        </div>
        {/* search button */}
        <PillButton
          name="Modify"
          action={() => {
            setOpenModifyModal(true);
          }}
          className="bg-primary-dark/20 text-primary-dark flex h-8 max-h-12 shrink-0 items-center border-none"
        />
      </div>
      {/* select */}
      <div ref={contentRef}>
        {selectedType === "One Way" && (
          <SearchOneWay
            options={airPortsData}
            classOptions={CLASS_OPTIONS}
            isDisabled
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
        {selectedType === "Round Trip" && (
          <SearchRoundTrip
            options={airPortsData}
            classOptions={CLASS_OPTIONS}
          />
        )}
        {selectedType === "Multi-City" && (
          <SearchMultiCity
            options={airPortsData}
            classOptions={CLASS_OPTIONS}
          />
        )}

        {/* //todo search result */}
        <div className="mt-5 min-h-screen grid-cols-12 gap-5 lg:grid">
          {/* sidebar */}
          <div className="sticky top-0 col-span-2">
            <SearchSidebar
              filterDrowerOpen={filterDrowerOpen}
              setFilterDrowerOpen={setFilterDrowerOpen}
              setSelecttedFilter={setSelecttedFilter}
              selectedFilter={selectedFilter}
            />
          </div>

          {/* search content */}
          <div className="w-full lg:col-span-10">
            <SearchContent
              selectedType={selectedType}
              setFilterDrowerOpen={setFilterDrowerOpen}
              filterDrowerOpen={filterDrowerOpen}
              setSelecttedFilter={setSelecttedFilter}
              selectedFilter={selectedFilter}
              isScrolled={isScrolled}
              setOpenModifyModal={setOpenModifyModal}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      <SearchModal
        options={airPortsData}
        classOptions={CLASS_OPTIONS}
        openModifyModal={openModifyModal}
        setOpenModifyModal={setOpenModifyModal}
        handleTypeeClick={handleTypeeClick}
        selectedType={selectedType}
        contentRef={contentRef}
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
    </section>
  );
};

export default Search;
