"use client";

import Link from "next/link";

const PaymentForm = () => {
  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">
          Contact Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="form-label">First Name *</label>
            <input
              type="text"
              placeholder="e.g. Muhammad"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              placeholder="e.g. Rashed"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              placeholder="+880 1X XX XXX XXX"
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">
          Payment Method
        </h2>

        {/* Method Tabs */}
        <div className="mb-5 flex gap-3">
          {["Credit / Debit Card", "Mobile Banking", "Net Banking"].map(
            (method, i) => (
              <button
                key={i}
                className={`rounded-lg border px-4 py-2 text-xs font-medium transition ${
                  i === 0
                    ? "border-primary bg-primary-bg text-primary"
                    : "border-gray-200 text-muted hover:border-primary"
                }`}
              >
                {method}
              </button>
            ),
          )}
        </div>

        {/* Card Fields */}
        <div className="space-y-4">
          <div>
            <label className="form-label">Card Number *</label>
            <input
              type="text"
              placeholder="XXXX  XXXX  XXXX  XXXX"
              maxLength={19}
              className="form-input tracking-widest"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="form-label">Expiry Month *</label>
              <select className="form-input">
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <label className="form-label">Expiry Year *</label>
              <select className="form-input">
                <option value="">Year</option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i} value={2025 + i}>
                    {2025 + i}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <label className="form-label">CVV *</label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                className="form-input"
              />
            </div>
          </div>
          <div>
            <label className="form-label">Name on Card *</label>
            <input
              type="text"
              placeholder="As printed on card"
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm">
        <input
          type="checkbox"
          id="terms"
          className="accent-primary mt-0.5 h-4 w-4 cursor-pointer"
        />
        <label htmlFor="terms" className="text-muted cursor-pointer text-xs leading-relaxed">
          I agree to the{" "}
          <span className="text-primary font-medium underline">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-primary font-medium underline">
            Cancellation Policy
          </span>
          . I confirm all passenger details are correct.
        </label>
      </div>

      {/* Submit Button */}
      <Link href="/user/order" className="block w-full">
        <button type="button" className="common-btn w-full text-center">
          <span>Confirm & Pay — BDT 32,200</span>
        </button>
      </Link>
    </div>
  );
};

export default PaymentForm;
