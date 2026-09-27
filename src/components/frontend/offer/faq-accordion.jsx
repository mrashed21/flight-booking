"use client";

import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    question: "What is the offer?",
    answer:
      "If the airline loses your luggage and does not return it within 96 hours after landing, you will receive BDT 1,000.",
  },
  {
    question: "How long is the offer valid?",
    answer:
      "The offer is valid for a limited promotional period as defined by the campaign.",
  },
  {
    question: "What is the travel period for this offer?",
    answer:
      "The travel period depends on airline availability and campaign rules.",
  },
  {
    question: "Who is eligible for this campaign?",
    answer:
      "All eligible customers booking through the platform using applicable payment methods.",
  },
  {
    question: "For which routes are these discounts available?",
    answer: "Discounts are applicable on selected international routes only.",
  },
  {
    question: "Discount will be applied on which fare?",
    answer:
      "The discount will be applied on base fare only, excluding taxes and surcharges.",
  },
];

const FaqAccordion = ({ titleRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef([]);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;

      if (index === activeIndex) {
        gsap.to(el, {
          height: el.scrollHeight,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeIndex]);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16">
      <div className="px-4">
        <h2
          ref={titleRef}
          className="mb-10 text-center text-3xl font-bold text-gray-800 lg:text-4xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="rounded-lg bg-white shadow-sm">
              {/* Header */}
              <button
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-medium">
                  {index + 1}. {faq.question}
                </span>

                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Content */}
              <div
                ref={(el) => el && (contentRefs.current[index] = el)}
                className="overflow-hidden px-6"
                style={{
                  height: index === 0 ? "auto" : 0,
                }}
              >
                <p className="pb-5 text-sm leading-relaxed text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
