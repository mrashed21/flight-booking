"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowUpDown,
  CheckCircle2,
  Building2,
  Plane,
  X,
  Send,
  Sparkles,
  User,
  ChevronDown,
  Search,
  Check,
  ShieldCheck,
  FileText,
} from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "@/components/ui/date-picker";
import FlagSvg from "@/components/ui/flag-svg";
import { CURRENCIES, getCurrencyByCode, calculateExchange } from "./currencies-data";


// Custom Accessible Currency Selector Dropdown with SVG flags
function CurrencySelector({ value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const selectedObj = getCurrencyByCode(value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch("");
        }}
        className="flex items-center gap-2 rounded-xl bg-white border border-gray-200 hover:border-primary/60 px-3 py-2 text-sm font-bold text-gray-800 shadow-sm transition outline-none active:scale-98"
      >
        <FlagSvg countryCode={selectedObj.countryCode} title={selectedObj.country} />
        <span>{selectedObj.code}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-72 rounded-2xl bg-white p-2 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
          {/* Search bar inside dropdown */}
          <div className="relative mb-2 px-1">
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search currency or country..."
              className="w-full rounded-lg bg-gray-50 border border-gray-200 py-1.5 pl-8 pr-3 text-xs text-gray-800 outline-none focus:border-primary focus:bg-white transition"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          </div>

          {/* Currency list */}
          <div className="max-h-60 overflow-y-auto space-y-0.5 scrollbar-thin">
            {filtered.map((c) => {
              const isSelected = c.code === value;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs transition ${
                    isSelected
                      ? "bg-primary text-white font-bold"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FlagSvg countryCode={c.countryCode} title={c.country} />
                    <span className="font-extrabold">{c.code}</span>
                    <span className={`text-[11px] truncate ${isSelected ? "text-blue-100" : "text-gray-400"}`}>
                      {c.name}
                    </span>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

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

  // Sync external changes
  useEffect(() => {
    if (fromCurrency) setFromCode(fromCurrency);
  }, [fromCurrency]);

  useEffect(() => {
    if (toCurrency) setToCode(toCurrency);
  }, [toCurrency]);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    collectionMethod: "airport", // 'airport' | 'branch'
    pickupDate: "",
    branchLocation: "dhaka-motijheel",
    idType: "passport",
    idNumber: "",
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
        idType: "passport",
        idNumber: "",
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
              Currency Converter & Exchange Booking
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200/60 px-3 py-1.5 text-xs font-medium text-amber-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Guaranteed 24-Hour Rate Lock</span>
          </div>
        </div>

        {/* Input Blocks Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Source Currency (You Send / Initial Balance) */}
          <div className="rounded-2xl border-2 border-gray-200 hover:border-primary/60 bg-gray-50/60 p-4 transition focus-within:border-primary focus-within:bg-white focus-within:shadow-md">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
              <span>You Send (Initial Amount)</span>
              <span className="text-gray-400">Source Balance</span>
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

              {/* Currency Selector with SVG Flag */}
              <CurrencySelector
                value={fromCode}
                onChange={handleFromSelect}
                label="From"
              />
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

          {/* Target Currency (You Receive / Guaranteed Payout) */}
          <div className="rounded-2xl border-2 border-primary/30 bg-primary-soft/30 p-4 transition">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-primary">
              <span>You Receive (Guaranteed Payout)</span>
              <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">
                0% Fee
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="w-full text-2xl sm:text-3xl font-extrabold text-primary truncate">
                {toObj.symbol} {convertedAmount ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
              </div>

              {/* Currency Selector with SVG Flag */}
              <CurrencySelector
                value={toCode}
                onChange={handleToSelect}
                label="To"
              />
            </div>

            {/* Target Note / Subtitle */}
            <div className="mt-3 flex items-center justify-between text-xs text-muted pt-2 border-t border-primary/10">
              <span>{toObj.country} Currency</span>
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
                Service Charge: 0.00 (Zero Hidden Markup)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Collection: Airport Booth or Branch Pickup
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-[#08426e] text-white px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-primary/25 transition hover:shadow-xl active:scale-98"
          >
            <span>Request Currency Exchange</span>
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
                    Booking & Collection Details
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Submit your request online. Our forex officer will contact you within 15 minutes to confirm your rate lock.
                  </p>
                </div>

                {/* Conversion Summary Preview with SVG Flags */}
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 p-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Estimated Conversion Summary</span>
                    <span className="font-semibold text-primary">24h Rate Lock Guaranteed</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <FlagSvg countryCode={fromObj.countryCode} title={fromObj.country} style={{ width: "2.2rem", height: "1.6rem" }} />
                      <div>
                        <div className="text-base sm:text-lg font-black text-gray-900">
                          {fromObj.symbol} {amount ? Number(amount).toLocaleString() : 0} {fromCode}
                        </div>
                        <div className="text-xs text-gray-500">{fromObj.name}</div>
                      </div>
                    </div>
                    <div className="text-gray-400 font-bold">➔</div>
                    <div className="flex items-center gap-2.5 text-right">
                      <div>
                        <div className="text-base sm:text-lg font-black text-primary">
                          {toObj.symbol} {convertedAmount ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"} {toCode}
                        </div>
                        <div className="text-xs text-gray-500">{toObj.name}</div>
                      </div>
                      <FlagSvg countryCode={toObj.countryCode} title={toObj.country} style={{ width: "2.2rem", height: "1.6rem" }} />
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Full Name (as per Passport) *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full rounded-xl border border-gray-200 p-3 pl-10 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Phone / WhatsApp with react-phone-number-input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="BD"
                        value={formData.phone}
                        onChange={(val) => setFormData({ ...formData, phone: val || "" })}
                        placeholder="Enter phone number"
                        className="phone-input-custom"
                      />
                    </div>

                    {/* Pickup Date with shadcn-style DatePicker */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Preferred Pickup Date *
                      </label>
                      <DatePicker
                        value={formData.pickupDate}
                        onChange={(date) => setFormData({ ...formData, pickupDate: date })}
                        placeholder="Select pickup date"
                        minDate={new Date()}
                      />
                    </div>
                  </div>

                  {/* Passport or NID Identification */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Identification Document *
                      </label>
                      <select
                        value={formData.idType}
                        onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition font-medium"
                      >
                        <option value="passport">Passport Number</option>
                        <option value="nid">National ID (NID) Card</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {formData.idType === "passport" ? "Passport Number *" : "National ID (NID) Number *"}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.idNumber}
                          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                          placeholder={formData.idType === "passport" ? "e.g. A01234567" : "e.g. 1990123456789"}
                          className="w-full rounded-xl border border-gray-200 p-3 pl-10 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition uppercase font-medium placeholder:normal-case"
                        />
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Collection Mode Selection - ONLY Airport and Branch */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Collection Method *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, collectionMethod: "airport" })}
                        className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border transition ${
                          formData.collectionMethod === "airport"
                            ? "border-primary bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary/30"
                            : "border-gray-200 hover:bg-gray-50 text-gray-600 font-medium"
                        }`}
                      >
                        <Plane className="h-5 w-5" />
                        <span className="text-xs sm:text-sm">Airport Booth</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, collectionMethod: "branch" })}
                        className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border transition ${
                          formData.collectionMethod === "branch"
                            ? "border-primary bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary/30"
                            : "border-gray-200 hover:bg-gray-50 text-gray-600 font-medium"
                        }`}
                      >
                        <Building2 className="h-5 w-5" />
                        <span className="text-xs sm:text-sm">City Branch</span>
                      </button>
                    </div>
                  </div>


                  {/* Conditional Location Note */}
                  {formData.collectionMethod === "airport" && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                      ✈️ <strong>Hazrat Shahjalal Int&apos;l Airport (Terminal 1 & 2):</strong> Our authorized airport representative will hand over your foreign currency 2 hours prior to flight check-in.
                    </div>
                  )}

                  {formData.collectionMethod === "branch" && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Select Branch Location
                      </label>
                      <select
                        value={formData.branchLocation}
                        onChange={(e) => setFormData({ ...formData, branchLocation: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-primary"
                      >
                        <option value="dhaka-motijheel">Dhaka Head Office (Motijheel Commercial Area)</option>
                        <option value="dhaka-banani">Banani Branch (Road 11, Block D)</option>
                        <option value="chattogram-agrabad">Chattogram Branch (Agrabad C/A)</option>
                        <option value="sylhet-zindabazar">Sylhet Branch (Zindabazar)</option>
                      </select>
                    </div>
                  )}

                  {/* Flight PNR / Additional Notes */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Flight PNR / Passport No (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.ticketPnr}
                      onChange={(e) => setFormData({ ...formData, ticketPnr: e.target.value })}
                      placeholder="e.g. BK-8492 or Passport Number"
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
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Confirm Exchange Request</span>
                          <CheckCircle2 className="h-5 w-5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-gray-400 mt-2">
                      🔒 100% Secure & Compliant with Bangladesh Bank foreign exchange guidelines.
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
                  Your Exchange Request Has Been Received!
                </h3>
                <div className="my-4 rounded-2xl bg-gray-50 border border-gray-200 p-4 text-left space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Booking Reference ID:</span>
                    <strong className="text-primary font-mono text-sm">#BX-84921</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Conversion Amount:</span>
                    <strong className="text-gray-900 font-bold">
                      {fromObj.symbol}{amount ? Number(amount).toLocaleString() : 0} {fromCode} ➔ {toObj.symbol}{convertedAmount ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0} {toCode}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Collection Method:</span>
                    <strong className="capitalize text-gray-900 font-medium">
                      {formData.collectionMethod === "airport" ? "Hazrat Shahjalal Airport Booth" : "City Branch Pickup"}
                    </strong>
                  </div>
                  {formData.pickupDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pickup Date:</span>
                      <strong className="text-gray-900 font-medium">{formData.pickupDate}</strong>
                    </div>
                  )}
                  {formData.idNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Identity Document:</span>
                      <strong className="text-gray-900 font-bold uppercase">
                        {formData.idType === "passport" ? "Passport" : "NID"}: {formData.idNumber}
                      </strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer Name & Contact:</span>
                    <span className="text-gray-800">{formData.fullName} ({formData.phone})</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Our foreign exchange team will contact you within 15 minutes to confirm the exact delivery schedule and lock in your exchange rate.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetModal}
                    className="rounded-xl bg-primary text-white px-6 py-2.5 text-sm font-bold shadow hover:bg-primary-dark transition"
                  >
                    Make Another Request
                  </button>
                  <a
                    href="https://wa.me/8801700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-gray-200 bg-white text-gray-700 px-6 py-2.5 text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    Chat on WhatsApp
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
