import AirPortSelect from "@/components/UI/AirPortSelect";
import CommonButton from "@/components/UI/CommonButton";
import DepartureDateSelect from "@/components/UI/DateSelect";
import ReturnDateSelect from "@/components/UI/ReturnDateSelect";
import { swapGhostAnimation } from "@/helpers/gsapAnimation/swapGhostAnimation";
import { swapHoverAnimation } from "@/helpers/gsapAnimation/swapHoverAnimation";

import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const RoundTrip = ({ options }) => {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  console.log("departureDate :", departureDate);
  console.log("returnDate :", returnDate);

  const fromWrapRef = useRef(null);
  const toWrapRef = useRef(null);
  const containerRef = useRef(null);
  const swapBtnRef = useRef(null);
  const swapIconRef = useRef(null);

  const [selectedFormAirPort, setSelectedFormAirPort] = useState(options[0]);
  const [selectedToAirPort, setSelectedToAirPort] = useState(options[3]);

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

  return (
    <section className="w-full">
      <section className="mt-4">
        {/* airport */}
        <section
          ref={containerRef}
          className="relative flex flex-col items-stretch sm:flex-row sm:items-center sm:gap-2.5"
        >
          <section ref={fromWrapRef} className="w-full sm:min-w-0 sm:flex-1">
            <AirPortSelect
              name="From"
              options={options}
              value={selectedFormAirPort}
              onChange={setSelectedFormAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </section>

          <button
            ref={swapBtnRef}
            type="button"
            onClick={handleSwapAirport}
            onMouseEnter={() => hoverAnim?.hoverIn()}
            onMouseLeave={() => hoverAnim?.hoverOut()}
            className="bg-primary my-2 flex shrink-0 -rotate-90 cursor-pointer items-center justify-center self-center rounded-full p-2 text-xs text-white sm:my-0 sm:mt-5 sm:self-auto lg:rotate-0"
          >
            <span ref={swapIconRef} className="inline-block">
              <ArrowRightLeft size={16} />
            </span>
          </button>

          <section ref={toWrapRef} className="-mt-6 w-full sm:flex-1 lg:mt-0">
            <AirPortSelect
              name="To"
              options={options}
              value={selectedToAirPort}
              onChange={setSelectedToAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </section>

          <section className="mt-3 flex w-full flex-col gap-2 sm:mt-auto sm:w-auto sm:flex-row sm:space-x-2 lg:mt-0">
            <section className="w-full sm:w-auto">
              <DepartureDateSelect
                value={departureDate}
                setValue={setDepartureDate}
              />
            </section>
            <section className="w-full sm:w-auto">
              <ReturnDateSelect
                value={returnDate}
                setValue={setReturnDate}
                departureDate={departureDate}
              />
            </section>
          </section>
        </section>
        <Link href={"/search"} className="mt-5 flex justify-end">
          <CommonButton>Search</CommonButton>
        </Link>
      </section>
    </section>
  );
};

export default RoundTrip;
