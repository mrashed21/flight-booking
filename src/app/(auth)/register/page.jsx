"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, Plane } from "lucide-react";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-surface flex min-h-screen">
      {/* Left — Decorative Panel */}
      <div className="bg-primary-dark relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-1/2">
        {/* Background circles */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border-primary-mid absolute rounded-full border"
              style={{
                width: `${(i + 1) * 160}px`,
                height: `${(i + 1) * 160}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Borkot Travels</span>
        </div>

        {/* Center content */}
        <div className="relative space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-white">
            Join Thousands of <br /> Smart Travelers 🌍
          </h2>
          <p className="max-w-sm leading-relaxed text-white/70">
            Create your free account and start booking flights, tour packages,
            and visa services at the best prices — all in one place.
          </p>
          <ul className="space-y-3 pt-2">
            {[
              "✅ Instant booking confirmation",
              "✅ Exclusive member-only deals",
              "✅ 24/7 customer support",
              "✅ Track all your trips in one dashboard",
            ].map((b) => (
              <li key={b} className="text-sm text-white/80">
                {b}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/40">
          © 2025 Borkot Travels. All rights reserved.
        </p>
      </div>

      {/* Right — Register Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-primary text-lg font-bold">
              Borkot Travels
            </span>
          </div>

          <h1 className="mb-1 text-2xl font-bold text-gray-800 sm:text-3xl">
            Create your account
          </h1>
          <p className="text-muted mb-8 text-sm">
            It&apos;s free and takes less than a minute.
          </p>

          <form className="space-y-4">
            {/* Name Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="form-label">First Name</label>
                <div className="relative flex items-center">
                  <User className="text-muted pointer-events-none absolute left-3 h-4 w-4 shrink-0" />
                  <input
                    type="text"
                    placeholder="Muhammad"
                    className="form-input form-input-icon-left"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <div className="relative flex items-center">
                  <User className="text-muted pointer-events-none absolute left-3 h-4 w-4 shrink-0" />
                  <input
                    type="text"
                    placeholder="Rashed"
                    className="form-input form-input-icon-left"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="text-muted pointer-events-none absolute left-3 h-4 w-4 shrink-0" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="form-input form-input-icon-left"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="form-label">Phone Number</label>
              <div className="relative flex items-center">
                <Phone className="text-muted pointer-events-none absolute left-3 h-4 w-4 shrink-0" />
                <input
                  type="tel"
                  placeholder="+880 1X XX XXX XXX"
                  className="form-input form-input-icon-left"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div className="relative flex items-center">
                <Lock className="text-muted pointer-events-none absolute left-3 h-4 w-4 shrink-0" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="form-input form-input-icon-left form-input-icon-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="text-muted absolute right-3 flex items-center"
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">Confirm Password</label>
              <div className="relative flex items-center">
                <Lock className="text-muted pointer-events-none absolute left-3 h-4 w-4 shrink-0" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="form-input form-input-icon-left form-input-icon-right"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="text-muted absolute right-3 flex items-center"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="accent-primary mt-0.5 h-4 w-4 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-muted cursor-pointer text-xs leading-relaxed"
              >
                I agree to the{" "}
                <span className="text-primary cursor-pointer font-medium hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-primary cursor-pointer font-medium hover:underline">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="common-btn w-full text-center">
              <span>Create Free Account</span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-muted text-xs">or sign up with</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {["Google", "Facebook"].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                {provider === "Google" ? "🌐" : "📘"} {provider}
              </button>
            ))}
          </div>

          {/* Login link */}
          <p className="text-muted mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
