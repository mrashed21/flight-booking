"use client";
import Container from "@/components/common/Container/Container";
import LiveClock from "@/helpers/LiveClock";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BatteryMedium,
  Plane,
  SignalHigh,
  Smartphone,
  Wifi,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const AppDownloadSection = () => {
  const sectionRef = useRef(null);
  const phonesRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const [counts, setCounts] = useState({ downloads: 0, rating: 0, reviews: 0 });
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        phonesRef.current,
        { opacity: 0, x: -80, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            // end: "top 0%",
            toggleActions: "play reset play reset",
          },
        },
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            // end: "top 0%",
            toggleActions: "play reset play reset",
          },
        },
      );

      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            // end: "top 0%",
            toggleActions: "play reset play reset",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateCounter = (target, key, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      setCounts((prev) => ({
        ...prev,
        [key]: key === "rating" ? current.toFixed(1) : Math.floor(current),
      }));
    }, 16);
  };

  // useEffect এ counter trigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ... existing phone and text animations ...

      // Stats counter animation
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            // end: "top 0%",
            toggleActions: "play reset play reset",
            onEnter: () => {
              // Counter animation trigger
              animateCounter(500, "downloads", 2000);
              animateCounter(4.8, "rating", 2000);
              animateCounter(50, "reviews", 2000);
            },
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="from-primary via-primary-mid to-primary-dark relative overflow-hidden bg-linear-to-br py-12 sm:py-14 md:py-16"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-white blur-3xl"></div>
          <div className="bg-primary-soft absolute right-20 bottom-20 h-96 w-96 rounded-full blur-3xl"></div>
          <div className="bg-warning absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"></div>
        </div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full border-4 border-white"></div>
        <div className="absolute top-1/4 right-0 h-80 w-80 rotate-45 transform bg-white"></div>
        <div className="absolute -right-20 -bottom-40 h-150 w-150 rounded-full border-8 border-white"></div>
        <div className="absolute bottom-1/4 left-10 h-60 w-60 -rotate-12 skew-y-6 transform bg-white"></div>
      </div>

      {/* Floating Plane Icons */}
      <div className="pointer-events-none absolute inset-0">
        <Plane
          className="absolute top-20 right-1/4 h-12 w-12 animate-bounce text-white opacity-10"
          style={{ animationDuration: "3s" }}
        />
        <Plane className="absolute bottom-32 left-1/3 h-16 w-16 rotate-45 text-white opacity-10" />
        <Smartphone className="absolute top-1/3 left-20 h-10 w-10 text-white opacity-10" />
      </div>

      <Container>
        <div className="relative">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
            {/* Left Side - Phone Mockups */}
            <div
              ref={phonesRef}
              className="order-2 flex flex-1 justify-center lg:order-1 lg:justify-start"
            >
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Phone 1 - Main */}
                <div className="relative z-20 mx-auto w-44 transform transition-transform duration-300 hover:scale-105 sm:w-52 md:w-56 lg:mx-0">
                  <div className="relative rounded-3xl bg-gray-900 p-2 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 z-30 h-4 w-18 -translate-x-1/2 rounded-b-3xl bg-gray-900"></div>

                    {/* Screen */}
                    <div className="relative aspect-9/19 overflow-hidden rounded-[20px] bg-white shadow-inner">
                      {/* Status Bar */}
                      <div className="bg-primary absolute top-0 right-0 left-0 z-10 flex h-6 items-center justify-between px-4 text-[10px] text-white">
                        <LiveClock />

                        <div className="-mt-2 flex gap-1">
                          <SignalHigh size={12} />
                          <BatteryMedium size={12} />
                          <Wifi size={12} />
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="flex h-full flex-col p-4 pt-8 text-center">
                        {/* Logo/Icon */}
                        <div className="mb-3 flex justify-center">
                          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
                            <Plane className="h-5 w-5 text-white" />
                          </div>
                        </div>

                        {/* World Map Illustration */}
                        <div className="relative mb-3 flex justify-center">
                          <div className="from-primary-soft to-primary-bg relative flex h-20 w-full max-w-xs items-center justify-center rounded-xl bg-linear-to-br shadow-md">
                            <Plane
                              size={32}
                              className="text-primary animate-pulse"
                            />
                            <div className="bg-primary absolute top-2 left-3 h-2 w-2 rounded-full shadow-md"></div>
                            <div className="bg-warning absolute top-4 right-4 h-2 w-2 rounded-full shadow-md"></div>
                            <div className="bg-primary absolute bottom-2 left-6 h-2 w-2 rounded-full shadow-md"></div>
                            <div className="bg-info absolute right-1/4 bottom-4 h-1.5 w-1.5 rounded-full"></div>
                          </div>
                        </div>

                        {/* Greeting */}
                        <div className="flex flex-1 flex-col justify-center">
                          <h3 className="text-primary mb-1 text-lg font-bold">
                            Hi Alex,
                          </h3>
                          <p className="text-muted text-xs leading-relaxed">
                            Let your next destination
                          </p>
                          <p className="text-muted text-xs leading-relaxed">
                            take you away...
                          </p>
                        </div>

                        {/* CTA Button */}
                        <button className="bg-primary hover:bg-primary-dark mt-auto w-full rounded-lg py-2 text-sm font-semibold text-white shadow-lg transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone 2 - Overlay */}
                <div className="absolute top-8 -right-4 z-10 w-44 transform transition-transform duration-300 hover:scale-105 sm:-right-8 sm:w-52 md:-right-12 md:w-56">
                  <div className="relative rounded-3xl bg-gray-900 p-2 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 z-30 h-4 w-16 -translate-x-1/2 rounded-b-3xl bg-gray-900"></div>

                    {/* Screen */}
                    <div className="relative aspect-9/19 overflow-hidden rounded-[20px] bg-white shadow-inner">
                      {/* Status Bar */}
                      <div className="bg-primary absolute top-0 right-0 left-0 z-10 flex h-6 items-center justify-between px-4 text-[10px] text-white">
                        <LiveClock />

                        <div className="-mt-2 flex gap-1">
                          <SignalHigh size={12} />
                          <BatteryMedium size={12} />
                          <Wifi size={12} />
                        </div>
                      </div>

                      {/* Booking Form */}
                      <div className="flex h-full flex-col p-3 pt-8">
                        {/* Route Info */}
                        <div className="bg-primary-bg mb-3 rounded-xl p-3 shadow-sm">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
                                <Plane size={10} className="text-white" />
                              </div>
                              <div>
                                <span className="text-primary-dark block text-[10px] font-bold">
                                  Florence, Italy
                                </span>
                                <span className="text-muted text-[9px]">
                                  FLR
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="my-1.5 flex items-center justify-center">
                            <div className="bg-primary h-px flex-1"></div>
                            <Plane
                              size={12}
                              className="text-primary mx-2 rotate-90"
                            />
                            <div className="bg-primary h-px flex-1"></div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-warning flex h-6 w-6 items-center justify-center rounded-full">
                                <Plane size={10} className="text-white" />
                              </div>
                              <div>
                                <span className="text-primary-dark block text-[10px] font-bold">
                                  New York, USA
                                </span>
                                <span className="text-muted text-[9px]">
                                  JFK
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-3">
                          <div>
                            <label className="text-primary-dark mb-1 block text-[10px] font-semibold">
                              Select Seat
                            </label>
                            <div className="bg-surface border-primary-soft text-muted hover:border-primary cursor-pointer rounded-lg border p-2 text-xs transition-colors">
                              Choose your seat...
                            </div>
                          </div>

                          <div>
                            <label className="text-primary-dark mb-1 block text-[10px] font-semibold">
                              Passengers
                            </label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4].map((num) => (
                                <div
                                  key={num}
                                  className="border-primary-soft hover:border-primary hover:bg-primary-soft flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-all"
                                >
                                  <span className="text-primary text-xs font-bold">
                                    {num}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button className="bg-primary hover:bg-primary-dark mt-auto w-full rounded-lg py-2 text-xs font-semibold text-white shadow-lg transition-colors">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Text & Download Buttons */}
            <div className="order-1 flex-1 px-4 text-center lg:order-2 lg:px-0 lg:text-left">
              <div ref={textRef} className="mb-6 lg:mb-8">
                {/* <div className="mb-3 inline-block">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                    <Download className="text-warning h-4 w-4" />
                    <span className="text-xs font-semibold text-white">
                      New Mobile App
                    </span>
                  </div>
                </div> */}

                <h2 className="text-warning mb-3 text-4xl leading-tight font-extrabold drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
                  DOWNLOAD
                </h2>
                <p className="mb-3 text-xl font-bold text-white drop-shadow-md sm:text-2xl md:text-3xl lg:text-4xl">
                  Our New App!
                </p>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-white/90 sm:text-base lg:mx-0">
                  Experience seamless flight booking with our intuitive mobile
                  app. Book flights, manage trips, and explore destinations on
                  the go.
                </p>
              </div>

              {/* Download Buttons */}
              <div
                ref={buttonsRef}
                className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
              >
                {/* Google Play Button */}
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-900 hover:shadow-2xl"
                >
                  <svg
                    className="h-8 w-8 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-300">GET IT ON</div>
                    <div className="text-base font-bold">Google Play</div>
                  </div>
                </a>

                {/* App Store Button */}
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-900 hover:shadow-2xl"
                >
                  <svg
                    className="h-8 w-8 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-300">
                      Download on the
                    </div>
                    <div className="text-base font-bold">App Store</div>
                  </div>
                </a>
              </div>

              {/* Stats or Features */}
              <div
                ref={statsRef}
                className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start"
              >
                <div className="text-center lg:text-left">
                  <div className="text-warning text-2xl font-bold">
                    {counts.downloads}K+
                  </div>
                  <div className="text-xs text-white/80">Downloads</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-warning text-2xl font-bold">
                    {counts.rating}★
                  </div>
                  <div className="text-xs text-white/80">Rating</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-warning text-2xl font-bold">
                    {counts.reviews}K+
                  </div>
                  <div className="text-xs text-white/80">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AppDownloadSection;
