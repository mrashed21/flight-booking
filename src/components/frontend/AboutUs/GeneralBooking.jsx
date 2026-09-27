"use client";

import useFadeUpOnView from "@/helpers/gsapAnimation/useFadeUpOnView";
import useFadeUpStagger from "@/helpers/gsapAnimation/useFadeUpStagger";
import { CheckCircle2, CreditCard, Plane, Search } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search Your Trip",
    desc: "Enter your origin, destination, and travel dates. Browse available flights, tour packages, or visa services instantly.",
  },
  {
    icon: Plane,
    step: "02",
    title: "Choose & Customize",
    desc: "Select the best option that fits your budget and preferences. Add extra services like hotel, transfers, or travel insurance.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Secure Payment",
    desc: "Pay securely using bKash, Nagad, card, or bank transfer. Your transaction is 100% encrypted and protected.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Get Confirmation",
    desc: "Receive your e-ticket, visa approval, or tour voucher instantly via email and SMS. Travel with peace of mind.",
  },
];

const GeneralBooking = () => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useFadeUpOnView(titleRef);
  useFadeUpStagger(cardRefs, { y: 30, duration: 0.6, stagger: 0.12 });

  return (
    <section className="bg-primary-soft rounded-xl px-4 py-16 sm:px-8 sm:py-20">
      <div>
        <h2
          ref={titleRef}
          className="mb-3 text-center text-3xl font-bold text-gray-800 lg:text-4xl"
        >
          How Booking Works
        </h2>
        <p className="text-muted mb-12 text-center text-sm">
          Book your dream trip in just 4 simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm"
            >
              {/* Step number */}
              <span className="text-primary/10 absolute top-3 right-4 text-5xl font-black">
                {item.step}
              </span>
              {/* Icon */}
              <div className="bg-primary/10 text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                <Icon size={26} />
              </div>
              <h4 className="mb-2 font-semibold text-gray-800">{item.title}</h4>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GeneralBooking;
