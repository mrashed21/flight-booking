import AirPortSelect from "@/components/UI/AirPortSelect";
import DepartureDateSelect from "@/components/UI/DepartureDateSelect";
import Select from "@/components/UI/Select";
import { ArrowRightLeft } from "lucide-react";

const OneWayModify = ({
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
      <section className="mt-8">
        {/* airport */}
        <section
          ref={containerRef}
          className="relative flex flex-col items-stretch"
        >
          <section ref={fromWrapRef} className="w-full">
            <AirPortSelect
              name="From"
              isDisabled={isDisabled}
              options={options}
              value={selectedFormAirPort}
              onChange={setSelectedFormAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </section>

          <button
            ref={swapBtnRef}
            disabled={isDisabled}
            type="button"
            onClick={handleSwapAirport}
            onMouseEnter={() => hoverAnim?.hoverIn()}
            onMouseLeave={() => hoverAnim?.hoverOut()}
            className={`my-2 flex shrink-0 -rotate-90 items-center justify-center self-center rounded-full p-2 text-xs text-white ${isDisabled ? "bg-primary/70 cursor-not-allowed" : "bg-primary cursor-pointer"}`}
          >
            <span ref={swapIconRef} className="inline-block">
              <ArrowRightLeft size={16} />
            </span>
          </button>

          <section ref={toWrapRef} className="-mt-6 w-full">
            <AirPortSelect
              name="To"
              isDisabled={isDisabled}
              options={options}
              value={selectedToAirPort}
              onChange={setSelectedToAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </section>

          <section className="mt-5 flex flex-col items-center justify-between gap-5 lg:flex-row">
            <section className="w-full">
              <DepartureDateSelect
                isDisabled={isDisabled}
                value={departureTime}
                setValue={setDepartureTime}
                className="left-0"
              />
            </section>
            <section className="w-full">
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
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default OneWayModify;
