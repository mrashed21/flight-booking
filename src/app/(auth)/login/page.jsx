"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Plane } from "lucide-react";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);

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
            Your Next Adventure <br /> Starts Here ✈️
          </h2>
          <p className="max-w-sm leading-relaxed text-white/70">
            Book flights, tour packages, and visa services all in one place.
            Trusted by thousands of travelers across Bangladesh.
          </p>
          <div className="flex gap-8 pt-4">
            {[
              { value: "50K+", label: "Happy Travelers" },
              { value: "135+", label: "Destinations" },
              { value: "98%", label: "Approval Rate" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-white/40">
          © 2025 Borkot Travels. All rights reserved.
        </p>
      </div>

      {/* Right — Login Form */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-5 py-10 sm:px-8">
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
            Welcome back
          </h1>
          <p className="text-muted mb-8 text-sm">
            Sign in to manage your bookings and trips.
          </p>

          <form className="space-y-5">
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

            {/* Password */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="form-label !mb-0">Password</label>
                <Link
                  href="#"
                  className="text-primary text-xs font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="text-muted pointer-events-none absolute left-3 h-4 w-4 shrink-0" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
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

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-primary h-4 w-4 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-muted cursor-pointer text-xs"
              >
                Keep me signed in
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="common-btn w-full text-center">
              <span>Sign In</span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-muted text-xs">or continue with</span>
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

          {/* Register link */}
          <p className="text-muted mt-8 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
