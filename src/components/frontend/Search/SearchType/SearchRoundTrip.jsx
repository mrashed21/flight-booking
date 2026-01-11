import AirPortSelect from "@/components/UI/AirPortSelect";
import DepartureDateSelect from "@/components/UI/DateSelect";
import ReturnDateSelect from "@/components/UI/ReturnDateSelect";
import Select from "@/components/UI/Select";
import { swapGhostAnimation } from "@/helpers/gsapAnimation/swapGhostAnimation";
import { swapHoverAnimation } from "@/helpers/gsapAnimation/swapHoverAnimation";
import { ArrowRightLeft } from "lucide-react";
import { useRef, useState } from "react";

const SearchRoundTrip = ({ options, classOptions }) => {
  const fromWrapRef = useRef(null);
  const toWrapRef = useRef(null);
  const containerRef = useRef(null);
  const swapBtnRef = useRef(null);
  const swapIconRef = useRef(null);

  const [selectedFormAirPort, setSelectedFormAirPort] = useState(options[0]);
  const [selectedToAirPort, setSelectedToAirPort] = useState(options[3]);
  const [selectedClassOptions, setSeletedClassOptions] = useState("");
  const [departureTime, setDepartureTime] = useState();
  const [returnDate, setReturnDate] = useState(null);

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
      <div className="mt-8">
        {/* airport */}
        <div
          ref={containerRef}
          className="relative flex flex-col items-stretch sm:flex-row sm:items-center sm:gap-2.5"
        >
          <div ref={fromWrapRef} className="w-full sm:flex-1">
            <AirPortSelect
              name="From"
              options={options}
              value={selectedFormAirPort}
              onChange={setSelectedFormAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </div>

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

          <div ref={toWrapRef} className="-mt-6 w-full sm:flex-1 lg:mt-0">
            <AirPortSelect
              name="To"
              options={options}
              value={selectedToAirPort}
              onChange={setSelectedToAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </div>

          <div className="mt-3 flex w-full flex-col gap-2 sm:mt-auto sm:w-auto sm:flex-row sm:space-x-2 lg:mt-0">
            <div className="w-full sm:w-auto">
              <DepartureDateSelect
                value={departureTime}
                setValue={setDepartureTime}
              />
            </div>
            <div className="w-full sm:w-auto">
              <ReturnDateSelect
                value={returnDate}
                setValue={setReturnDate}
                departureDate={departureTime}
              />
            </div>
          </div>
          <div className="w-10 sm:flex-1">
            <Select
              name="Cabin Class"
              options={classOptions}
              value={selectedClassOptions}
              onChange={setSeletedClassOptions}
              placeholder="Select Cabin"
              isSearchable={true}
              getOptionLabel={(x) => x.name}
              getOptionValue={(x) => x._id}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchRoundTrip;
