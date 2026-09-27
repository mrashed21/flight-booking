import {
  ShieldCheck,
  Plane,
  Clock,
  Banknote,
  FileCheck,
  Headphones,
} from "lucide-react";

export default function ExchangeBenefits() {
  const steps = [
    {
      step: "01",
      title: "Select Currency & Amount",
      desc: "Use our live converter to choose your source and target currencies, and enter your desired exchange amount.",
    },
    {
      step: "02",
      title: "Submit Online Request",
      desc: "Provide your contact details and select whether you prefer airport booth delivery or city branch collection.",
    },
    {
      step: "03",
      title: "15-Minute Confirmation",
      desc: "Our forex officer contacts you to confirm your schedule and immediately lock in your rate for 24 hours.",
    },
    {
      step: "04",
      title: "Collect Your Cash",
      desc: "Pick up verified crisp banknotes with official passport endorsement seals right before your flight or at our branch.",
    },
  ];

  const features = [
    {
      icon: Banknote,
      title: "100% Genuine Banknotes",
      desc: "Every note is electronically authenticated with multi-spectrum UV and magnetic sensors to ensure pristine condition.",
    },
    {
      icon: Plane,
      title: "Airport Fast-Track Delivery",
      desc: "Convenient cash collection at Hazrat Shahjalal International Airport (DAC Terminal 1 & 2) prior to flight check-in.",
    },
    {
      icon: Clock,
      title: "24-Hour Rate Lock Guarantee",
      desc: "Once your request is submitted, your exchange rate is protected against market volatility for a full 24 hours.",
    },
    {
      icon: FileCheck,
      title: "Official Passport Endorsement",
      desc: "Full legal compliance with Bangladesh Bank regulations, complete with authorized endorsement seals and tax receipts.",
    },
  ];

  return (
    <div className="mt-14">
      {/* How it Works */}
      <div className="mb-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Easy 4-Step Process
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            How It Works
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Secure, hassle-free foreign currency exchange tailored for international travelers and pilgrims.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition text-center"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-black text-lg">
                {s.step}
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">
                {s.title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Features */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-primary-dark to-[#083e68] p-6 sm:p-10 text-white shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-amber-300">
            <ShieldCheck className="h-4 w-4 text-amber-300" />
            Security & Reliability
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Why Choose Borkot Travels Money Exchange?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-2">
            Transparent pricing, zero hidden markups, and guaranteed airport delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-gray-900 shadow">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">
                  {f.title}
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white/10 border border-white/10 p-4 sm:p-5">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400 text-gray-950 font-bold">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Need urgent foreign currency or bulk travel orders?
              </div>
              <div className="text-xs text-blue-200">
                24/7 Dedicated Forex Helpline: +880 1712-345678
              </div>
            </div>
          </div>
          <a
            href="tel:+8801712345678"
            className="flex-shrink-0 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-900 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md transition active:scale-95"
          >
            Call Helpline Now
          </a>
        </div>
      </div>
    </div>
  );
}
