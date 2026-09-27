"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function ExchangeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is passport endorsement mandatory for foreign currency exchange?",
      a: "Yes. Under Bangladesh Bank and Customs regulations, any foreign currency taken overseas must be endorsed on your valid passport. We provide authorized endorsement seals and compliant transaction receipts recognized at all international border checkpoints.",
    },
    {
      q: "How do I collect foreign currency at Hazrat Shahjalal International Airport (DAC)?",
      a: "Simply choose 'Airport Booth' as your collection method when submitting your request and provide your flight date and time. Our dedicated airport representative will meet you at Terminal 1 or Terminal 2 departure area 2 to 3 hours before your scheduled flight check-in.",
    },
    {
      q: "Is my exchange rate protected against market fluctuations?",
      a: "Yes. The indicative rate quoted at the time of your booking is locked in for 24 hours. Even if global or local market rates increase before you collect your currency, your approved rate remains fully honored.",
    },
    {
      q: "What is the maximum foreign currency quota per traveler?",
      a: "Under current Bangladesh Bank travel quota guidelines, adult Bangladeshi citizens are entitled to an annual travel quota of up to USD 12,000 (or its equivalent in any convertible foreign currency) per calendar year.",
    },
    {
      q: "What documents are required for currency purchase?",
      a: "You will need to present your original Passport, confirmed Flight Ticket / E-ticket, and a copy of your National ID (NID). For Umrah or Hajj travelers, a valid visa copy is also recommended.",
    },
  ];

  return (
    <div className="mt-14 mb-16 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <HelpCircle className="h-3.5 w-3.5" />
          Frequently Asked Questions
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
          Common Questions & Answers
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Everything you need to know about our travel currency exchange and airport delivery services.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-gray-800 hover:text-primary transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
