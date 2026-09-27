"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function ExchangeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "মুদ্রা বিনিময়ের জন্য পাসপোর্টে কি এনডোর্সমেন্ট বাধ্যতামূলক?",
      a: "হ্যাঁ, বাংলাদেশ ব্যাংক এবং কাস্টমস বিধি অনুযায়ী বিদেশে যাত্রার সময় ক্যাশ বৈদেশিক মুদ্রা বহনের জন্য পাসপোর্টে অফিসিয়াল এনডোর্সমেন্ট থাকা প্রয়োজন। আমরা অনুমোদিত সিল ও রসিদ প্রদান করে থাকি যা বিমানবন্দরে সম্পূর্ণ বৈধ।",
    },
    {
      q: "হযরত শাহজালাল বিমানবন্দরে কীভাবে ক্যাশ সংগ্রহ করব?",
      a: "অনলাইনে বুকিং রিকোয়েস্ট দেওয়ার সময় 'Airport Booth' সিলেক্ট করুন এবং আপনার ফ্লাইটের তারিখ ও সময় উল্লেখ করুন। আপনার ফ্লাইট ছাড়ার ২ থেকে ৩ ঘণ্টা পূর্বে আমাদের দায়িত্বপ্রাপ্ত অফিসার টার্মিনালের নির্ধারিত গেটে উপস্থিত হয়ে আপনার সাথে দেখা করবেন।",
    },
    {
      q: "অনলাইনে রিকোয়েস্ট পাঠানোর পর রেট পরিবর্তনের কোনো ঝুঁকি আছে কি?",
      a: "না, কোনো ঝুঁকি নেই। আপনি যে রেটে বুকিং সাবমিট করবেন, বাজারে রেট বৃদ্ধি পেলেও পরবর্তী ২৪ ঘণ্টার জন্য আপনার কোটেড রেট সম্পূর্ণ লক ও সুরক্ষিত থাকবে।",
    },
    {
      q: "একজন যাত্রী একবারে সর্বোচ্চ কত পরিমাণ বৈদেশিক মুদ্রা নিতে পারেন?",
      a: "বাংলাদেশ ব্যাংকের বর্তমান ভ্রমণ কোটা অনুযায়ী একজন প্রাপ্তবয়স্ক বাংলাদেশি নাগরিক এক ক্যালেন্ডার বছরে সর্বোচ্চ ১২,০০০ মার্কিন ডলার (বা সমমানের যেকোনো অনুমোদিত বৈদেশিক মুদ্রা) পাসপোর্টে এনডোর্স করাতে পারেন।",
    },
    {
      q: "মুদ্রা ক্রয়ের ক্ষেত্রে কী কী ডকুমেন্ট প্রয়োজন?",
      a: "মূল পাসপোর্ট, বৈধ এয়ার টিকিট এবং জাতীয় পরিচয়পত্র (NID)-এর কপি প্রয়োজন হয়। ওমরাহ যাত্রীদের ক্ষেত্রে ভিসা কপি সাথে রাখতে হবে।",
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
          সাধারণ জিজ্ঞাসা ও উত্তর
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          মানি এক্সচেঞ্জ ও কারেন্সি বুকিং সম্পর্কে প্রয়োজনীয় তথ্যসমূহ।
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
