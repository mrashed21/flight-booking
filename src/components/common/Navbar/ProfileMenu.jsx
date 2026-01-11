"use client";

import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ProfileMenu = ({ open, offsetTop }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [render, setRender] = useState(open);
  const [expandedBookings, setExpandedBookings] = useState(false);
  const bookingsContentRef = useRef(null);

  useEffect(() => {
    if (open) {
      setRender(true);

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: -20,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
      );
    } else if (render) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(containerRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.9,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => setRender(false),
      });
    }
  }, [open, render]);

  const toggleBookings = () => {
    const content = bookingsContentRef.current;
    if (!content) return;

    if (expandedBookings) {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setExpandedBookings(false),
      });
    } else {
      setExpandedBookings(true);
      gsap.fromTo(
        content,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        },
      );
    }
  };

  if (!render) return null;

  return (
    <div
      ref={containerRef}
      style={{ top: offsetTop }}
      className="absolute right-6 z-50 mt-2 w-56 rounded-xl bg-white/80 p-3 shadow-lg backdrop-blur-lg"
    >
      <div ref={contentRef}>
        <Link
          href="/user/profile"
          className="hover:bg-muted/20 block rounded px-2 py-2"
        >
          My Profile
        </Link>

        {/* Collapsible Bookings Section */}
        <div>
          <button
            onClick={toggleBookings}
            className="hover:bg-muted/20 flex w-full cursor-pointer items-center justify-between rounded px-2 py-2"
          >
            <span>My Bookings</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                expandedBookings ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            ref={bookingsContentRef}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col pl-4">
              <Link
                href="/user/bookings/flights"
                className="hover:hover:bg-muted/20 block rounded px-2 py-2 text-sm"
              >
                Flight Bookings
              </Link>
              <Link
                href="/user/bookings/tours"
                className="hover:hover:bg-muted/20 block rounded px-2 py-2 text-sm"
              >
                Tour Bookings
              </Link>
              <Link
                href="/user/bookings/visa"
                className="hover:hover:bg-muted/20 block rounded px-2 py-2 text-sm"
              >
                Visa Applications
              </Link>
            </div>
          </div>
        </div>

        <Link
          href="/user/settings"
          className="hover:hover:bg-muted/20 block rounded px-2 py-2"
        >
          Settings
        </Link>
        <button className="block w-full cursor-pointer rounded px-2 py-2 text-left text-red-500 hover:bg-red-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
