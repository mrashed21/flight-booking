"use client";
import Container from "@/components/common/Container/Container";
import RemainingTime from "@/components/UI/RemainingTime";
import useGsapCollapse from "@/helpers/gsapAnimation/useGsapCollapse";
import { Country } from "country-state-city";
import { ChevronRight, CircleCheck } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { flights } from "../Search/SearchContent/flightdata";
import OneWayDetails from "./OneWayDetails";
import PassengerInfo from "./PassengerInfo";

const PassengerDetails = () => {
  const [openFlightDetails, setOpenFlightDetails] = useState(null);

  const [flight, setFlight] = useState(flights[0]);
  const isOpen = openFlightDetails === flight.id;
  const detailsRef = useGsapCollapse(isOpen);

  // passenger details form
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "male",
      country: "",
      passportNumber: "",
      expireDate: "",
    },
  });

  // country select
  const countries = useMemo(() => {
    return Country.getAllCountries().map((c) => ({
      name: c.name,
      isoCode: c.isoCode,
    }));
  }, []);

  const [selected, setSelected] = useState({
    name: "Bangladesh",
    isoCode: "BD",
  });
  console.log(selected);
  return (
    <>
      {/* header section */}
      <section className="border-muted/40 border-t bg-white">
        <div className="mx-auto flex w-[98%] max-w-400 flex-col items-center justify-between py-3 lg:w-[95%] lg:flex-row">
          <p className="flex flex-wrap items-center px-3 lg:gap-10 lg:px-0">
            <span className="flex items-center gap-1 text-sm lg:gap-1.5 lg:text-base">
              <CircleCheck className="size-3 text-green-500 lg:size-4" /> Search
              Result
            </span>
            <span className="flex items-center gap-1 text-sm lg:gap-1.5 lg:text-base">
              <ChevronRight className="size-3 lg:size-4" /> Passenger Details
            </span>
            <span className="flex items-center gap-1 text-sm lg:gap-1.5 lg:text-base">
              <ChevronRight className="size-3 lg:size-4" /> Payment
              <ChevronRight className="size-3 lg:size-4" />
            </span>
          </p>
          <div className="mt-5 w-full lg:mt-0 lg:w-fit">
            <RemainingTime className="lg:mb-0" />
          </div>
        </div>
      </section>
      <Container>
        {/* details section */}
        <section className="mb-3 grid-cols-12 gap-5 py-5 lg:grid lg:pt-10">
          {/* left section  */}
          <aside className="col-span-9">
            <section className="">
              <OneWayDetails
                openFlightDetails={openFlightDetails}
                setOpenFlightDetails={setOpenFlightDetails}
                flight={flight}
                isOpen={isOpen}
                detailsRef={detailsRef}
              />
            </section>
            {/* passenger info */}
            <PassengerInfo
              countries={countries}
              label="Nationality"
              placeholder="Select country"
              value={selected}
              onChange={setSelected}
              form={form}
            />
          </aside>
          {/* right section  */}
          <aside className="col-span-3">
            <div className="h-fit w-full rounded-xl bg-white p-3 shadow">
              {/* header section */}
              <div className="flex items-center gap-3">
                <Image
                  src={
                    "https://1000logos.net/wp-content/uploads/2023/05/Biman-Bangladesh-Airlines-Logo.png"
                  }
                  alt="air line"
                  width={300}
                  height={300}
                  className="h-8 w-12 lg:h-15 lg:w-20"
                />{" "}
                <p className="text-xs font-medium lg:text-sm">
                  Biman Bangladesh Airlines
                </p>
              </div>

              {/* details */}
              <div className="">
                <div className="">
                  <p className="text-xs font-medium lg:text-sm">
                    Dhaka (Dac) - Cox's Bazar (CXB)
                  </p>
                  <p className="ttext-muted text-[10px] lg:text-xs">
                    07 Dec 2025 | 08:30AM - 09:30AM
                  </p>
                </div>

                <hr className="border-muted my-3 border-t border-dashed" />

                <div className="">
                  <p className="text-xs font-medium lg:text-sm">
                    Dhaka (Dac) - Cox's Bazar (CXB)
                  </p>
                  <p className="text-muted text-[10px] lg:text-xs">
                    07 Dec 2025 | 08:30AM - 09:30AM
                  </p>
                </div>
              </div>

              <hr className="border-muted my-3 border-t" />

              {/* fare sunnary */}
              <div className="">
                <div className="grid grid-cols-2">
                  <p className="text-[13px] font-medium lg:text-sm">
                    Fare Summary
                  </p>
                  <p className="text-muted text-right text-[11px] font-medium lg:text-xs">
                    Adult(l)
                  </p>
                  <p className="text-muted text-xs font-medium lg:text-sm">
                    Base Fare
                  </p>
                  <p className="text-muted text-right text-[11px] font-medium lg:text-xs">
                    BDT 9,999
                  </p>
                  <p className="text-muted text-xs font-medium lg:text-sm">
                    Tax
                  </p>
                  <p className="text-muted text-right text-[11px] font-medium lg:text-xs">
                    BDT 1,000
                  </p>
                </div>
                <hr className="border-muted my-3 border-t border-dashed" />
                <div className="grid grid-cols-2">
                  <p className="text-muted text-xs font-medium lg:text-sm">
                    Sub Total
                  </p>
                  <p className="text-muted text-right text-[11px] font-medium lg:text-xs">
                    BDT 10,999
                  </p>
                  <p className="text-muted text-xs font-medium lg:text-sm">
                    Discount{" "}
                  </p>
                  <p className="text-muted text-right text-[11px] font-medium lg:text-xs">
                    BDT 999
                  </p>
                </div>
                <hr className="border-muted my-3 border-t border-dashed" />

                <div className="text-primary grid grid-cols-2 text-sm font-semibold lg:text-base">
                  <p>Total Pay</p>
                  <p className="text-right">BDT 10,000</p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </Container>
    </>
  );
};

export default PassengerDetails;
