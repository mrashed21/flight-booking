"use client";

import { useState, useId } from "react";
import {
  ArrowUpDown,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Plane,
  CreditCard,
  X,
  Send,
  Sparkles,
  PhoneCall,
  Calendar,
  User,
  Info,
  ChevronDown,
} from "lucide-react";
import { CURRENCIES, getCurrencyByCode, calculateExchange } from "./currencies-data";

export default function CurrencyConverterCard({
  fromCurrency = "USD",
  toCurrency = "BDT",
  onFromChange,
  onToChange,
}) {
  const [amount, setAmount] = useState(1000);
  const [fromCode, setFromCode] = useState(fromCurrency);
  const [toCode, setToCode] = useState(toCurrency);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    collectionMethod: "airport", // 'airport' | 'branch' | 'bank'
    pickupDate: "",
    branchLocation: "dhaka-motijheel",
    ticketPnr: "",
    notes: "",
  });

  const fromObj = getCurrencyByCode(fromCode);
  const toObj = getCurrencyByCode(toCode);

  const { convertedAmount, exchangeRate, inverseRate } = calculateExchange(
    amount,
    fromCode,
    toCode
  );

  const handleSwap = () => {
    const prevFrom = fromCode;
    const prevTo = toCode;
    setFromCode(prevTo);
    setToCode(prevFrom);
    if (onFromChange) onFromChange(prevTo);
    if (onToChange) onToChange(prevFrom);
  };

  const handleFromSelect = (code) => {
    setFromCode(code);
    if (onFromChange) onFromChange(code);
  };

  const handleToSelect = (code) => {
    setToCode(code);
    if (onToChange) onToChange(code);
  };

  const presetAmounts = [
    { label: "500", value: 500 },
    { label: "1,000", value: 1000 },
    { label: "2,500", value: 2500 },
    { label: "5,000", value: 5000 },
  ];

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        collectionMethod: "airport",
        pickupDate: "",
        branchLocation: "dhaka-motijheel",
        ticketPnr: "",
        notes: "",
      });
    }, 300);
  };

  return (
    <div className="relative -mt-6 z-20">
      <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-2xl border border-gray-100 transition-all">
        {/* Converter Card Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Live Currency Calculator
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">
              মুদ্রা রূপান্তর ও বুকিং রিকোয়েস্ট
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200/60 px-3 py-1.5 text-xs font-medium text-amber-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Guaranteed 24H Rate Lock</span>
          </div>
        </div>

        {/* Input Blocks Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Source Currency (You Send / Have) */}
          <div className="rounded-2xl border-2 border-gray-200 hover:border-primary/60 bg-gray-50/60 p-4 transition focus-within:border-primary focus-within:bg-white focus-within:shadow-md">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
              <span>You Have / আপনি দিচ্ছেন</span>
              <span className="text-gray-400">Balance Amount</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <input
                type="number"
                min="1"
                step="any"
                value={amount === "" ? "" : amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                placeholder="Enter amount"
                className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold text-gray-900 outline-none placeholder:text-gray-300"
              />

              {/* Currency Selector */}
              <div className="relative flex-shrink-0">
                <select
                  value={fromCode}
                  onChange={(e) => handleFromSelect(e.target.value)}
                  className="appearance-none cursor-pointer rounded-xl bg-white border border-gray-200 hover:border-primary/60 py-2.5 pl-3 pr-8 text-sm font-bold text-gray-800 shadow-sm transition outline-none"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Quick Amount Chips */}
            <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-gray-200/60">
              <span className="text-[11px] text-gray-400 font-medium">Quick:</span>
              {presetAmounts.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setAmount(p.value)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    amount === p.value
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border border-gray-200"
                  }`}
                >
                  {fromObj.symbol}
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 lg:my-0">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap currencies"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark hover:scale-105 active:scale-95"
            >
              <ArrowUpDown className="h-5 w-5" />
            </button>
          </div>

          {/* Target Currency (You Receive) */}
          <div className="rounded-2xl border-2 border-primary/30 bg-primary-soft/30 p-4 transition">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-primary">
              <span>You Receive / আপনি পাচ্ছেন</span>
              <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">
                0% Fee
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="w-full text-2xl sm:text-3xl font-extrabold text-primary truncate">
                {toObj.symbol} {convertedAmount ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
              </div>

              {/* Currency Selector */}
              <div className="relative flex-shrink-0">
                <select
                  value={toCode}
                  onChange={(e) => handleToSelect(e.target.value)}
                  className="appearance-none cursor-pointer rounded-xl bg-white border border-primary/30 py-2.5 pl-3 pr-8 text-sm font-bold text-gray-800 shadow-sm transition outline-none hover:border-primary"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Target Note / Subtitle */}
            <div className="mt-3 flex items-center justify-between text-xs text-muted pt-2 border-t border-primary/10">
              <span>{toObj.country} Official Currency</span>
              <span className="font-semibold text-primary">
                1 {fromCode} = {exchangeRate.toFixed(4)} {toCode}
              </span>
            </div>
          </div>
        </div>

        {/* Live Rate Summary & Action Bar */}
        <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl bg-gray-50 border border-gray-200/80 p-4 sm:p-5">
          <div className="space-y-1 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Indicative Rate:</span>
              <strong className="text-gray-900 font-bold">
                1 {fromCode} = {exchangeRate.toFixed(4)} {toCode}
              </strong>
              <span className="text-gray-400 text-xs">
                (Inverse: 1 {toCode} = {inverseRate.toFixed(4)} {fromCode})
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Service Charge: ৳০ (সম্পূর্ণ ফ্রি)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Pickup: বিমানবন্দর বা ব্রাঞ্চ থেকে সরাসরি
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-[#08426e] text-white px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-primary/25 transition hover:shadow-xl active:scale-98"
          >
            <span>বিনিময় রিকোয়েস্ট পাঠান</span>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Exchange Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={resetModal}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Modal Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Currency Exchange Request
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    মুদ্রা বুকিং ও ডেলিভারি তথ্য
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    অনলাইনে রিকোয়েস্ট পাঠালে আমাদের ফরেক্স অফিসার ১৫ মিনিটের মধ্যে কনফার্মেশনের জন্য কল করবেন।
                  </p>
                </div>

                {/* Conversion Summary Preview */}
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 p-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>বিনিময় পরিমাণ (Estimated Conversion)</span>
                    <span className="font-semibold text-primary">24h Rate Lock Guaranteed</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-lg font-black text-gray-900">
                        {fromObj.symbol} {amount ? Number(amount).toLocaleString() : 0} {fromCode}
                      </div>
                      <div className="text-xs text-gray-500">{fromObj.name}</div>
                    </div>
                    <div className="text-gray-400 font-bold">➔</div>
                    <div className="text-right">
                      <div className="text-lg font-black text-primary">
                        {toObj.symbol} {convertedAmount ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"} {toCode}
                      </div>
                      <div className="text-xs text-gray-500">{toObj.name}</div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      আপনার নাম (Full Name) *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                        className="w-full rounded-xl border border-gray-200 p-3 pl-10 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        মোবাইল / WhatsApp নম্বর *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="01XXXXXXXXX"
                          className="w-full rounded-xl border border-gray-200 p-3 pl-10 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                        />
                        <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        প্রত্যাশিত তারিখ (Pickup Date) *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={formData.pickupDate}
                          onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 p-3 pl-10 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Delivery / Collection Mode Selection */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      মুদ্রা সংগ্রহের মাধ্যম (Collection Method) *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, collectionMethod: "airport" })}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                          formData.collectionMethod === "airport"
                            ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                            : "border-gray-200 hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        <Plane className="h-5 w-5 mb-1" />
                        <span className="text-xs">Airport Booth</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, collectionMethod: "branch" })}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                          formData.collectionMethod === "branch"
                            ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                            : "border-gray-200 hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        <Building2 className="h-5 w-5 mb-1" />
                        <span className="text-xs">City Branch</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, collectionMethod: "bank" })}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                          formData.collectionMethod === "bank"
                            ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                            : "border-gray-200 hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        <CreditCard className="h-5 w-5 mb-1" />
                        <span className="text-xs">Bank Transfer</span>
                      </button>
                    </div>
                  </div>

                  {/* Conditional Location Note */}
                  {formData.collectionMethod === "airport" && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                      ✈️ <strong>শাহজালাল আন্তর্জাতিক বিমানবন্দর (Terminal 1 & 2):</strong> আপনার ফ্লাইট ছাড়ার ২ ঘণ্টা আগে আমাদের প্রতিনিধি আপনার হাতে ক্যাশ পৌঁছে দেবেন।
                    </div>
                  )}

                  {formData.collectionMethod === "branch" && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        ব্রাঞ্চ নির্বাচন করুন (Select Branch)
                      </label>
                      <select
                        value={formData.branchLocation}
                        onChange={(e) => setFormData({ ...formData, branchLocation: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-primary"
                      >
                        <option value="dhaka-motijheel">ঢাকা হেড অফিস (মতিঝিল বাণিজ্যিক এলাকা)</option>
                        <option value="dhaka-banani">বনানী ব্রাঞ্চ (রোড ১১, ব্লক ডি)</option>
                        <option value="chattogram-agrabad">চট্টগ্রাম ব্রাঞ্চ (আগ্রাবাদ সি/এ)</option>
                        <option value="sylhet-zindabazar">সিলেট ব্রাঞ্চ (জিন্দাবাজার)</option>
                      </select>
                    </div>
                  )}

                  {/* Flight PNR / Additional Notes */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      ফ্লাইট PNR / পাসপোর্ট নম্বর (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={formData.ticketPnr}
                      onChange={(e) => setFormData({ ...formData, ticketPnr: e.target.value })}
                      placeholder="যেমন: BK-8492 অথবা Passport No"
                      className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-primary"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white p-3.5 text-base font-bold shadow-lg shadow-primary/20 transition disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>অনুরোধ জমা দেওয়া হচ্ছে...</span>
                      ) : (
                        <>
                          <span>অনুরোধ নিশ্চিত করুন</span>
                          <CheckCircle2 className="h-5 w-5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-gray-400 mt-2">
                      🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। বাংলাদেশ ব্যাংক নির্দেশিকা অনুযায়ী ক্যাশ এনডোর্সমেন্ট সম্পন্ন করা হয়।
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* Success Confirmation */
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-in zoom-in">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 mb-2">
                  Booking Request Submitted
                </span>
                <h3 className="text-2xl font-black text-gray-900">
                  আপনার রিকোয়েস্ট সফলভাবে গ্রহণ করা হয়েছে!
                </h3>
                <div className="my-4 rounded-2xl bg-gray-50 border border-gray-200 p-4 text-left space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-500">বুকিং রেফারেন্স আইডি:</span>
                    <strong className="text-primary font-mono text-sm">#BX-84921</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">বিনিময় পরিমাণ:</span>
                    <strong className="text-gray-900 font-bold">
                      {fromObj.symbol}{amount ? Number(amount).toLocaleString() : 0} {fromCode} ➔ {toObj.symbol}{convertedAmount ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0} {toCode}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">সংগ্রহের মাধ্যম:</span>
                    <strong className="capitalize text-gray-900 font-medium">
                      {formData.collectionMethod === "airport" ? "Hazrat Shahjalal Airport" : formData.collectionMethod === "branch" ? "City Branch" : "Bank Transfer"}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">গ্রাহকের নাম ও ফোন:</span>
                    <span className="text-gray-800">{formData.fullName} ({formData.phone})</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  আমাদের বৈদেশিক মুদ্রা বিশেষজ্ঞ দল ১৫ মিনিটের মধ্যে আপনার নম্বরে যোগাযোগ করে পিকআপের সময় ও ভেরিফিকেশন কনফার্ম করবেন।
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetModal}
                    className="rounded-xl bg-primary text-white px-6 py-2.5 text-sm font-bold shadow hover:bg-primary-dark transition"
                  >
                    নতুন রিকোয়েস্ট করুন
                  </button>
                  <a
                    href="https://wa.me/8801700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-gray-200 bg-white text-gray-700 px-6 py-2.5 text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    WhatsApp-এ কথা বলুন
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
