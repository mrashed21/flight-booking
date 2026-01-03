"use client";
import CommonButton from "@/components/UI/CommonButton";
import useGsapCollapse from "@/helpers/useGsapCollapse";
import { ArrowRight, ChevronDown, Clock, MapPin, Plane } from "lucide-react";
import Image from "next/image";

const RoundTripResult = ({
  flight,
  openFlightDetails,
  setOpenFlightDetails,
}) => {
  const isOpen = openFlightDetails === flight.id;
  const detailsRef = useGsapCollapse(isOpen);
  return (
    <>
      <div className="grid grid-cols-12 items-center gap-3 p-5">
        {/* Airline */}
        <div className="col-span-12 flex items-center gap-3 lg:col-span-3">
          <Image
            src={flight.logo}
            alt={flight.airline}
            className="h-8 w-auto"
            width={300}
            height={300}
          />
          <p className="text-sm font-medium">{flight.airline}</p>
        </div>

        {/* Time */}
        <div className="col-span-12 flex items-center justify-between lg:col-span-5">
          <div className="text-center">
            <p className="text-sm font-semibold">{flight.departure}</p>
            <p className="text-muted text-xs">{flight.from}</p>
          </div>

          <div className="text-muted flex flex-col items-center text-xs">
            <Clock size={14} />
            <span>{flight.duration}</span>
            <span>{flight.stop}</span>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold">{flight.arrival}</p>
            <p className="text-muted text-xs">{flight.to}</p>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-6 text-right lg:col-span-2">
          <p className="text-primary text-sm font-semibold">
            BDT {flight.price.toLocaleString()}
          </p>
          <p className="text-muted text-xs">Starting from</p>
        </div>

        {/* Action */}
        <div className="col-span-6 text-right lg:col-span-2">
          <CommonButton className="py-1.5!">Select</CommonButton>
        </div>
      </div>

      {/* //* EXPAND */}
      <div className="border-muted flex items-center justify-between border-t px-4 py-2">
        <p className="text-xs text-pink-500">
          Up to 9% discount with bKash during payment
        </p>

        <button
          onClick={() =>
            setOpenFlightDetails(
              openFlightDetails === flight.id ? null : flight.id,
            )
          }
          className="text-primary flex cursor-pointer items-center gap-1 text-sm font-medium"
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
            <div className="bg-primary-bg/50 grid w-full grid-cols-3 gap-4 px-4 py-3 text-sm">
              <div className="col-span-2 rounded-lg bg-white p-5">
                {/* //* header section */}
                <div className="flex items-center gap-5">
                  <div className="border-primary bg-primary-soft text-primary flex min-w-xs items-center justify-between rounded-sm border px-3 py-1.5 font-medium">
                    <p>DAC- COX,B</p> <p>1h:15m</p>
                  </div>
                  <p className="bg-primary-soft rounded-full p-2">
                    <ArrowRight size={18} className="text-primary" />
                  </p>
                  <div className="border-muted text-primary flex min-w-xs items-center justify-between rounded-sm border bg-white px-3 py-1.5 font-medium">
                    <p>COX- DAC,B</p> <p>1h:15m</p>
                  </div>
                </div>

                {/* //* layout */}
                <div className="mt-5 flex items-center overflow-hidden">
                  {/* main container */}
                  <div className="w-full">
                    {/* main layout */}
                    <div className="flex flex-col justify-between space-y-1.5">
                      {/* departure section */}
                      <div className="flex items-start gap-2">
                        {/* left icon */}
                        <p className="bg-primary-soft rounded-full p-1.5">
                          <MapPin size={18} className="text-primary" />
                        </p>
                        {/* right side content */}

                        <div className="w-full">
                          {/* airport name */}
                          <div className="bg-primary-soft flex items-center justify-between rounded-md px-3 py-1">
                            <h2 className="text-lg font-medium">
                              Departure From Dhaka
                            </h2>
                            <p className="text-warning font-medium">
                              Hazrat Shahjalal International Airport
                            </p>
                          </div>

                          {/* airlines and flight */}
                          <div className="flex w-full items-center gap-5">
                            {/* airline icon */}
                            <div className="">
                              <Image
                                src={flight.logo}
                                alt={flight.airline}
                                className="h-15 w-20"
                                width={400}
                                height={300}
                              />
                            </div>
                            <div className="flex w-full items-center justify-between">
                              <div className="">
                                <h2 className="text-lg font-medium">
                                  Biman Bangladesh Airlines
                                </h2>
                                <p className="text-muted text-xs">
                                  B787-8 S2-AJU
                                </p>
                              </div>
                              <div className="">
                                <h2 className="text-lg font-medium">
                                  {" "}
                                  Flight Number
                                </h2>
                                <p className="text-muted text-xs">BG201 </p>
                              </div>
                              <div className="">
                                <h2 className="text-lg font-medium"> Class</h2>
                                <p className="text-muted text-xs">Bussiness </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* middle bar */}
                      <div className="relative flex items-center gap-2">
                        <p className="bg-primary-soft rounded-full p-1.5">
                          <Plane size={18} className="text-primary" />
                        </p>
                        {/* horizontal */}
                        <div className="border-muted w-full border-t-2 border-dashed"></div>
                        {/* top */}
                        <div className="border-muted absolute bottom-10 left-3 z-50 h-14 w-1 border-l-2 border-dashed"></div>
                        {/* bottom */}
                        <div className="border-muted absolute top-10 left-3 z-50 h-14 w-1 border-l-2 border-dashed"></div>
                      </div>

                      <div className="flex items-start gap-2">
                        {/* right side content */}

                        <div className="w-full">
                          {/* airlines and flight */}
                          <div className="flex w-full items-center gap-5">
                            <div>
                              <div className="h-15 w-20"></div>
                            </div>

                            <div className="flex w-full flex-col justify-between">
                              <div className="flex w-full items-center justify-between">
                                <div className="">
                                  <h2 className="text-lg font-medium">
                                    DAC - COX,B
                                  </h2>
                                  <p className="text-muted text-xs">1h:15m </p>
                                </div>
                                <div className="">
                                  <h2 className="text-lg font-medium">
                                    {" "}
                                    08:30 Am
                                  </h2>
                                  <p className="text-muted text-xs">
                                    7 Dec, Sunday{" "}
                                  </p>
                                </div>
                                <div className="">
                                  <h2 className="text-lg font-medium">
                                    {" "}
                                    09:45 AM
                                  </h2>
                                  <p className="text-muted text-xs">
                                    7 Dec, Sunday
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-2 flex w-full items-center gap-2">
                            <p className="bg-primary-soft rounded-full p-1.5">
                              <MapPin size={18} className="text-primary" />
                            </p>

                            <div className="bg-primary-soft flex w-full items-center justify-between rounded-md px-3 py-1">
                              <h2 className="text-lg font-medium">
                                Destination At Cox's Bazar
                              </h2>
                              <p className="text-warning font-medium">
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

              <div className="col-span-1 rounded-lg bg-white p-5">
                {/* button section */}
                <div className="flex items-center justify-between gap-5 font-medium">
                  <button className="border-primary text-primary w-full cursor-pointer rounded-sm border px-3 py-1.5 text-start">
                    Baggage
                  </button>
                  <button className="border-muted text-muted w-full cursor-pointer rounded-sm border px-3 py-1.5 text-start">
                    Plicicy
                  </button>
                </div>

                {/* content based on selected button */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <div className="">
                      <h2 className="font-medium">DAC - COX,B</h2>
                      <p className="text-muted text-sm">Bussines Class</p>
                    </div>

                    <div className="">
                      <h2 className="font-medium">30 KG</h2>
                      <p className="text-muted text-sm">Per Person</p>
                    </div>
                  </div>

                  <hr className="border-muted my-3 w-full border-t border-dashed" />

                  <div className="flex items-center justify-between">
                    <div className="">
                      <h2 className="font-medium">COX - DAC,B</h2>
                      <p className="text-muted text-sm">Bussines Class</p>
                    </div>

                    <div className="">
                      <h2 className="font-medium">30 KG</h2>
                      <p className="text-muted text-sm">Per Person</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RoundTripResult;
