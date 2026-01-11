import AirPortSelect from "@/components/UI/AirPortSelect";
import DepartureDateSelect from "@/components/UI/DateSelect";
import Select from "@/components/UI/Select";
import { ArrowRightLeft } from "lucide-react";

const SearchOneWay = ({
  options,
  classOptions,
  isDisabled = false,
  selectedFormAirPort,
  setSelectedFormAirPort,
  selectedToAirPort,
  setSelectedToAirPort,
  selectedClassOptions,
  setSeletedClassOptions,
  departureTime,
  setDepartureTime,
  handleSwapAirport,
  hoverAnim,
  fromWrapRef,
  toWrapRef,
  containerRef,
  swapBtnRef,
  swapIconRef,
}) => {
  return (
    <section className="w-full">
      <div className="mt-8">
        {/* airport */}
        <div
          ref={containerRef}
          className="relative hidden flex-col items-stretch sm:flex-row sm:items-center sm:gap-2.5 lg:flex"
        >
          <div ref={fromWrapRef} className="w-full sm:flex-1">
            <AirPortSelect
              name="From"
              isDisabled={isDisabled}
              options={options}
              value={selectedFormAirPort}
              onChange={setSelectedFormAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </div>

          <button
            ref={swapBtnRef}
            disabled={isDisabled}
            type="button"
            onClick={handleSwapAirport}
            onMouseEnter={() => hoverAnim?.hoverIn()}
            onMouseLeave={() => hoverAnim?.hoverOut()}
            className={`my-2 flex shrink-0 -rotate-90 items-center justify-center self-center rounded-full p-2 text-xs text-white sm:my-0 sm:mt-5 sm:self-auto lg:rotate-0 ${isDisabled ? "bg-primary/70 cursor-not-allowed" : "bg-primary cursor-pointer"}`}
          >
            <span ref={swapIconRef} className="inline-block">
              <ArrowRightLeft size={16} />
            </span>
          </button>

          <div ref={toWrapRef} className="-mt-6 w-full sm:flex-1 lg:mt-0">
            <AirPortSelect
              name="To"
              isDisabled={isDisabled}
              options={options}
              value={selectedToAirPort}
              onChange={setSelectedToAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </div>
          <div className="mt-3 w-full sm:mt-auto sm:w-auto lg:mt-0">
            <DepartureDateSelect
              isDisabled={isDisabled}
              value={departureTime}
              setValue={setDepartureTime}
            />
          </div>
          <div className="w-10 sm:flex-1">
            <Select
              name="Cabin Class"
              options={classOptions}
              value={selectedClassOptions}
              onChange={setSeletedClassOptions}
              placeholder="Select Cabin"
              isSearchable={true}
              isDisabled={isDisabled}
              getOptionLabel={(x) => x.name}
              getOptionValue={(x) => x._id}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchOneWay;
