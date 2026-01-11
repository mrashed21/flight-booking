"use client";

import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CommonButton from "@/components/UI/CommonButton";
import { PlaneTakeoff } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
const TERMS_SLIDES = [
  {
    title: "Terms & Conditions",
    terms: [
      "BDT 5000 discount on international flight booking.",
      "Minimum purchase value BDT 35,000.",
      "Visa credit cards only.",
      "Applicable for one-way & round-trip flights.",
      "BDT 5000 discount on international flight booking.",
      "Minimum purchase value BDT 35,000.",
      "Visa credit cards only.",
      "Applicable for one-way & round-trip flights.",
      "BDT 5000 discount on international flight booking.",
      "Minimum purchase value BDT 35,000.",
      "Visa credit cards only.",
      "Applicable for one-way & round-trip flights.",
      "BDT 5000 discount on international flight booking.",
      "Minimum purchase value BDT 35,000.",
      "Visa credit cards only.",
      "Applicable for one-way & round-trip flights.",
    ],
    buttonText: "Book Now",
    image: "https://i.ibb.co.com/VYz81wGq/Rectangle-41400.png",
  },
  {
    title: "Offer Details",
    terms: [
      "Offer valid for a limited time.",
      "Discount subject to availability.",
      "Cannot be combined with other offers.",
      "Offer valid for a limited time.",
      "Discount subject to availability.",
      "Cannot be combined with other offers.",
      "Offer valid for a limited time.",
      "Discount subject to availability.",
      "Cannot be combined with other offers.",
      "Offer valid for a limited time.",
      "Discount subject to availability.",
      "Cannot be combined with other offers.",
      "Offer valid for a limited time.",
      "Discount subject to availability.",
      "Cannot be combined with other offers.",
      "Offer valid for a limited time.",
      "Discount subject to availability.",
      "Cannot be combined with other offers.",
    ],
    buttonText: "View Offer",
    image: "https://i.ibb.co.com/VYz81wGq/Rectangle-41400.png",
  },
  {
    title: "Important Notes",
    terms: [
      "Cancellation policy applies.",
      "Charges may be deducted.",
      "Final decision rests with GoZayaan.",
      "Cancellation policy applies.",
      "Charges may be deducted.",
      "Final decision rests with GoZayaan.",
      "Cancellation policy applies.",
      "Charges may be deducted.",
      "Final decision rests with GoZayaan.",
      "Cancellation policy applies.",
      "Charges may be deducted.",
      "Final decision rests with GoZayaan.",
      "Cancellation policy applies.",
      "Charges may be deducted.",
      "Final decision rests with GoZayaan.",
      "Cancellation policy applies.",
      "Charges may be deducted.",
      "Final decision rests with GoZayaan.",
    ],
    buttonText: "Explore Flights",
    image: "https://i.ibb.co.com/VYz81wGq/Rectangle-41400.png",
  },
];

const TermsSwiper = () => {
  return (
    <section className="py-16">
      <div className="">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="rounded-xl bg-white p-4 lg:p-8"
        >
          {TERMS_SLIDES.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 items-center gap-8 p-5 lg:grid-cols-2 lg:px-16">
                {/* Left Content */}
                <div className="order-2 lg:order-1">
                  <h2 className="mb-6 text-3xl font-semibold">{slide.title}</h2>

                  <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-600">
                    {slide.terms.map((term, i) => (
                      <li key={i}>{term}</li>
                    ))}
                  </ol>
                  <div className="bg-warning/15 border-warning mt-5 flex w-full items-center gap-5 rounded-md border p-2.5 lg:w-fit lg:p-5">
                    <div className="">
                      <h2 className="font-medium">Dhaka,Dac</h2>
                      <p className="text-muted line-clamp-1 text-sm">
                        Hazrat Shahjalal Intl Airport{" "}
                      </p>
                    </div>
                    <p className="bg-muted rounded-full p-2">
                      <PlaneTakeoff className="size-3.5 lg:size-5 text-white" />
                    </p>
                    <div className="">
                      <h2 className="font-medium">Dubai,DXB</h2>
                      <p className="text-muted line-clamp-1 text-sm">
                        Dubai International Airport
                      </p>
                    </div>
                  </div>

                  <div className="my-5 lg:hidden">
                    <CommonButton>{slide.buttonText}</CommonButton>
                  </div>
                </div>

                {/* Right Image */}
                <div className="order-1 flex flex-col items-end justify-end overflow-hidden rounded-lg lg:order-2">
                  <Image
                    src={slide.image}
                    width={500}
                    height={500}
                    alt={slide.title}
                    className="h-auto w-full object-cover"
                  />

                  <div className="hidden lg:flex">
                    <CommonButton>{slide.buttonText}</CommonButton>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TermsSwiper;
