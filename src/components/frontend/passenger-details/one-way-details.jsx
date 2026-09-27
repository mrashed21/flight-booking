"use client";
import LineWithDots from "@/components/UI/LineWithDots";
import { ChevronDown, Clock, MapPin, Plane } from "lucide-react";
import Image from "next/image";

const OneWayDetails = ({
  openFlightDetails,
  setOpenFlightDetails,
  flight,
  detailsRef,
}) => {
  return (
    <section>
      <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
        {/* timeline */}
        <div className="mt-3 flex items-center justify-between px-1 lg:px-5">
          <h2 className="text-sm font-medium lg:text-lg">
            Dhaka -Cox's Bazar,09 Dec
          </h2>
          <p className="bg-warning rounded-md px-3 py-1 text-sm text-white lg:px-6 lg:py-1.5 lg:text-base">
            {" "}
            One Way
          </p>
        </div>
        <div className="grid grid-cols-9 items-center p-1.5 py-2 lg:p-5">
          {/* Airline */}
          <div className="col-span-6 flex items-center gap-1.5 lg:col-span-5 lg:gap-3">
            <Image
              src={flight.logo}
              alt={flight.airline}
              className="h-8 w-12 lg:w-auto"
              width={300}
              height={300}
            />
            <p className="text-xs font-medium lg:text-sm">{flight.airline}</p>
          </div>

          {/* Time */}
          <div className="col-span-3 flex items-center justify-between lg:col-span-3">
            <div className="text-right lg:text-center">
              <p className="text-[9px] font-semibold lg:text-sm">
                {flight.departure}
              </p>
              <p className="text-muted text-[9px] lg:text-xs">{flight.from}</p>
            </div>
            {/* time for desktop */}
            <div className="text-muted hidden flex-col items-center text-xs lg:flex">
              <Clock size={14} />
              <span>{flight.duration}</span>
              <span>{flight.stop}</span>
            </div>
            {/* time for mobile */}
            <div className="text-muted flex flex-col items-center -space-y-2.5 lg:hidden">
              <p className="text-[9px]">{flight.duration}</p>
              <LineWithDots size={50} />

              <p className="text-[9px]">{flight.stop}</p>
            </div>

            <div className="lg:text-center">
              <p className="text-[9px] font-semibold lg:text-sm">
                {flight.arrival}
              </p>
              <p className="text-muted text-[9px] lg:text-xs">{flight.to}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-2 hidden flex-col lg:col-span-1 lg:mt-0 lg:flex lg:text-right">
            <p className="text-primary text-sm font-semibold">Business</p>
            <p className="text-muted text-[6px] lg:text-xs">Cabin Class</p>
          </div>
        </div>

        {/* //* EXPAND */}
        <div className="bg-primary-soft flex items-center justify-between px-2.5 py-2 lg:px-4">
          <p className="text-[9px] text-pink-500 lg:text-xs">
            Up to 9% discount with bKash during payment
          </p>

          <button
            onClick={() =>
              setOpenFlightDetails(
                openFlightDetails === flight.id ? null : flight.id,
              )
            }
            className="text-primary flex shrink-0 cursor-pointer items-center gap-1 text-sm font-medium"
          >
            Flight Details
            <ChevronDown
              size={14}
              className={`transition ${openFlightDetails === flight.id ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div
          ref={detailsRef}
          className="overflow-hidden"
          style={{
            height: openFlightDetails === flight.id ? "auto" : 0,
            opacity: openFlightDetails === flight.id ? 1 : 0,
          }}
        >
          {openFlightDetails === flight.id && (
            <>
              <div className="bg-primary-bg/50 w-full grid-cols-3 gap-4 space-y-3 px-2 py-1.5 lg:grid lg:px-4 lg:py-3">
                {/* //! flaight details */}
                <div className="col-span-2 h-full rounded-lg bg-white p-2.5 lg:p-5">
                  {/* //* header section */}
                  <div className="flex items-center justify-between gap-5">
                    <div className="border-primary bg-primary-soft text-primary lg: flex w-fit items-center justify-between rounded-sm border px-2 py-1.5 text-xs font-medium lg:min-w-xs">
                      <p>DAC- COX,B</p> <p>1h:15m</p>
                    </div>
                  </div>

                  {/* //* layout */}
                  <div className="mt-5 flex items-center overflow-hidden">
                    {/* main container */}
                    <div className="w-full">
                      {/* main layout */}
                      <div className="flex flex-col justify-between space-y-1.5">
                        {/* departure section */}
                        <div className="flex items-start gap-0.5 lg:gap-2">
                          {/* left icon */}
                          <p className="bg-primary-soft rounded-full p-1.5">
                            <MapPin
                              size={10}
                              className="text-primary lg:size-5"
                            />
                          </p>
                          {/* right side content */}

                          <div className="w-full">
                            {/* airport name */}
                            <div className="bg-primary-soft flex w-full items-center justify-between rounded-md px-1 py-1 lg:px-3">
                              <h2 className="text-[10px] font-medium lg:text-base">
                                Departure From Dhaka
                              </h2>
                              <p className="text-warning text-[6px] font-medium lg:text-[10px]">
                                Hazrat Shahjalal International Airport
                              </p>
                            </div>

                            {/* airlines and flight */}
                            <div className="mt-2 flex w-full items-center gap-1 lg:gap-5">
                              {/* airline icon */}
                              <div className="">
                                <Image
                                  src={flight.logo}
                                  alt={flight.airline}
                                  className="h-10 w-12 lg:h-12 lg:w-20"
                                  width={400}
                                  height={300}
                                />
                              </div>
                              <div className="flex w-full items-center justify-between">
                                <div className="">
                                  <h2 className="text-[10px] font-medium lg:text-base">
                                    Biman Bangladesh Airlines
                                  </h2>
                                  <p className="text-muted text-[6px] lg:text-[10px]">
                                    B787-8 S2-AJU
                                  </p>
                                </div>
                                <div className="">
                                  <h2 className="text-[10px] font-medium lg:text-base">
                                    {" "}
                                    Flight
                                  </h2>
                                  <p className="text-muted text-[6px] lg:text-[10px]">
                                    BG201{" "}
                                  </p>
                                </div>
                                <div className="">
                                  <h2 className="text-[10px] font-medium lg:text-base">
                                    {" "}
                                    Class
                                  </h2>
                                  <p className="text-muted text-[6px] lg:text-[10px]">
                                    Business{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* middle bar */}
                        <div className="relative flex items-center gap-1 lg:gap-2">
                          <p className="bg-primary-soft rounded-full p-1.5">
                            <Plane
                              size={10}
                              className="text-primary lg:size-5"
                            />
                          </p>
                          {/* horizontal */}
                          <div className="border-muted/50 w-full border-t border-dashed lg:border-t-2"></div>
                          {/* top */}
                          <div className="border-muted/50 absolute bottom-8 left-3 z-50 h-10 w-1 border-l border-dashed lg:bottom-10 lg:h-14 lg:border-l-2"></div>
                          {/* bottom */}
                          <div className="border-muted/50 absolute top-8 left-3 z-50 h-10 w-1 border-l border-dashed lg:top-10 lg:h-14 lg:border-l-2"></div>
                        </div>

                        <div className="flex items-start gap-2">
                          {/* right side content */}

                          <div className="w-full">
                            {/* airlines and flight */}
                            <div className="flex w-full items-center gap-2 lg:gap-5">
                              <div className="">
                                <div className="h-10 w-15 lg:h-15 lg:w-20"></div>
                              </div>

                              <div className="flex w-full flex-col justify-between">
                                <div className="flex w-full items-center justify-between">
                                  <div className="">
                                    <h2 className="text-xs font-medium lg:text-base">
                                      DAC - COX,B
                                    </h2>
                                    <p className="text-muted text-[6px] lg:text-[10px]">
                                      1h:15m{" "}
                                    </p>
                                  </div>
                                  <div className="">
                                    <h2 className="text-xs font-medium lg:text-base">
                                      {" "}
                                      08:30 Am
                                    </h2>
                                    <p className="text-muted text-[6px] lg:text-[10px]">
                                      7 Dec, Sunday{" "}
                                    </p>
                                  </div>
                                  <div className="">
                                    <h2 className="text-xs font-medium lg:text-base">
                                      {" "}
                                      09:45 AM
                                    </h2>
                                    <p className="text-muted text-[6px] lg:text-[10px]">
                                      7 Dec, Sunday
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-0.5 lg:gap-2">
                              <p className="bg-primary-soft rounded-full p-1.5">
                                <MapPin
                                  size={10}
                                  className="text-primary lg:size-5"
                                />
                              </p>

                              <div className="bg-primary-soft flex w-full items-center justify-between rounded-md px-1 py-1 lg:px-3">
                                <h2 className="text-[10px] font-medium lg:text-base">
                                  Destination At Cox's Bazar
                                </h2>
                                <p className="text-warning text-[6px] font-medium lg:text-[10px]">
                                  Cox's Bazar Airport
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* //! baggage, privacy */}
                <div className="col-span-1 h-full rounded-lg bg-white p-2.5 lg:p-5">
                  {/* button section */}
                  <div className="flex items-center gap-5 font-medium lg:justify-between">
                    <button className="border-primary text-primary cursor-pointer rounded-sm border px-3 py-1 text-start text-xs lg:w-full lg:py-1.5 lg:text-sm">
                      Baggage
                    </button>
                    <button className="border-primary text-primary cursor-pointer rounded-sm border px-3 py-1 text-start text-xs lg:w-full lg:py-1.5 lg:text-sm">
                      Policy
                    </button>
                  </div>

                  {/* content based on selected button */}
                  <div className="mt-2 lg:mt-5">
                    <div className="flex items-center justify-between">
                      <div className="">
                        <h2 className="text-xs font-medium lg:text-sm">
                          DAC - COX,B
                        </h2>
                        <p className="text-muted text-[10px] lg:text-xs">
                          Bussines Class
                        </p>
                      </div>

                      <div className="">
                        <h2 className="text-xs font-medium lg:text-sm">
                          30 KG
                        </h2>
                        <p className="text-muted text-[10px] lg:text-xs">
                          Per Person
                        </p>
                      </div>
                    </div>

                    <hr className="border-muted my-3 w-full border-t border-dashed" />

                    <div className="flex items-center justify-between">
                      <div className="">
                        <h2 className="text-xs font-medium lg:text-sm">
                          COX - DAC,B
                        </h2>
                        <p className="text-muted text-[10px] lg:text-xs">
                          Bussines Class
                        </p>
                      </div>

                      <div className="">
                        <h2 className="text-xs font-medium lg:text-sm">
                          30 KG
                        </h2>
                        <p className="text-muted text-[10px] lg:text-xs">
                          Per Person
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OneWayDetails;
