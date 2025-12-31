import AirPortSelect from "@/components/UI/AirPortSelect";
import DepartureDateSelect from "@/components/UI/DepartureDateSelect";
import Select from "@/components/UI/Select";
import gsap from "gsap";
import { ArrowRightLeft } from "lucide-react";
import { useRef, useState } from "react";

const SearchOneWay = ({ options, classOptions }) => {
  const fromWrapRef = useRef(null);
  const toWrapRef = useRef(null);
  const containerRef = useRef(null);
  const swapBtnRef = useRef(null);
  const swapIconRef = useRef(null);

  const [selectedFormAirPort, setSelectedFormAirPort] = useState(options[0]);
  const [selectedToAirPort, setSelectedToAirPort] = useState(options[3]);
  const [selectedClassOptions, setSeletedClassOptions] = useState("");
  const [departureTime, setDepartureTime] = useState();

  const createGhost = (text, rect) => {
    const ghost = document.createElement("div");
    ghost.innerText = text;
    ghost.className =
      "fixed z-50 px-3 py-2 bg-white rounded-md shadow text-sm pointer-events-none mt-[26px]";

    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    ghost.style.width = `${rect.width}px`;

    document.body.appendChild(ghost);
    return ghost;
  };

  const handleSwapAirport = () => {
    if (!fromWrapRef.current || !toWrapRef.current) return;

    const fromRect = fromWrapRef.current.getBoundingClientRect();
    const toRect = toWrapRef.current.getBoundingClientRect();

    const fromGhost = createGhost(
      `${selectedFormAirPort.city} ${selectedFormAirPort._id}`,
      fromRect,
    );

    const toGhost = createGhost(
      `${selectedToAirPort.city} ${selectedToAirPort._id}`,
      toRect,
    );

    const dx = toRect.left - fromRect.left;
    const dy = toRect.top - fromRect.top;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        fromGhost.remove();
        toGhost.remove();
      },
    });

    // hide real selects
    tl.to([fromWrapRef.current, toWrapRef.current], {
      opacity: 0,
      duration: 0.2,
    });

    // move ghosts
    tl.to(
      fromGhost,
      {
        x: dx,
        y: dy,
        duration: 0.6,
      },
      "<",
    );

    tl.to(
      toGhost,
      {
        x: -dx,
        y: -dy,
        duration: 0.6,
      },
      "<",
    );

    // swap state AFTER animation
    tl.call(() => {
      setSelectedFormAirPort(selectedToAirPort);
      setSelectedToAirPort(selectedFormAirPort);
    });

    // show real selects back
    tl.to([fromWrapRef.current, toWrapRef.current], {
      opacity: 1,
      duration: 0.25,
    });
  };

  const handleHoverIn = () => {
    gsap.to(swapBtnRef.current, {
      scale: 1.05,
      boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
      duration: 0.25,
      ease: "power3.out",
    });

    gsap.to(swapIconRef.current, {
      rotate: 180,
      scale: 1.15,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleHoverOut = () => {
    gsap.to(swapBtnRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.25,
      ease: "power3.inOut",
    });

    gsap.to(swapIconRef.current, {
      rotate: 0,
      scale: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  };

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
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
            className="bg-primary my-2 flex shrink-0 cursor-pointer items-center justify-center self-center rounded-full p-2 text-xs text-white sm:my-0 sm:mt-5 sm:self-auto"
          >
            <span ref={swapIconRef} className="inline-block">
              <ArrowRightLeft size={16} />
            </span>
          </button>

          <div ref={toWrapRef} className="-mt-6 w-full sm:flex-1 md:mt-0">
            <AirPortSelect
              name="To"
              options={options}
              value={selectedToAirPort}
              onChange={setSelectedToAirPort}
              getOptionLabel={(x) => x.airport_name}
              getOptionValue={(x) => x._id}
            />
          </div>

          <div className="mt-3 w-full sm:mt-auto sm:w-auto md:mt-0">
            <DepartureDateSelect
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
