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
        }
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
        }
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
        }
      );
    }
  };

  if (!render) return null;

  return (
    <div
      ref={containerRef}
      style={{ top: offsetTop }}
      className="absolute right-6 mt-2 w-56 rounded-xl bg-white/80 backdrop-blur-lg shadow-lg p-3 z-50"
    >
      <div ref={contentRef}>
        <Link
          href="/user/profile"
          className="block py-2 hover:bg-muted/20 rounded px-2"
        >
          My Profile
        </Link>

        {/* Collapsible Bookings Section */}
        <div>
          <button
            onClick={toggleBookings}
            className="flex items-center justify-between w-full py-2 hover:bg-muted/20 rounded px-2 cursor-pointer"
          >
            <span>My Bookings</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                expandedBookings ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            ref={bookingsContentRef}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="pl-4 flex flex-col">
              <Link
                href="/user/bookings/flights"
                className="block py-2 text-sm hover:hover:bg-muted/20 rounded px-2"
              >
                Flight Bookings
              </Link>
              <Link
                href="/user/bookings/tours"
                className="block py-2 text-sm hover:hover:bg-muted/20 rounded px-2"
              >
                Tour Bookings
              </Link>
              <Link
                href="/user/bookings/visa"
                className="block py-2 text-sm hover:hover:bg-muted/20 rounded px-2"
              >
                Visa Applications
              </Link>
            </div>
          </div>
        </div>

        <Link
          href="/user/settings"
          className="block py-2 hover:hover:bg-muted/20 rounded px-2"
        >
          Settings
        </Link>
        <button className="block w-full text-left py-2 text-red-500 hover:bg-red-100 rounded px-2 cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
