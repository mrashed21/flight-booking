"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MobileDrawer = ({ open, navItems, offsetTop, user, onClose }) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [render, setRender] = useState(open);

  useEffect(() => {
    if (open) {
      setRender(true);
      gsap.fromTo(
        containerRef.current,
        { x: "100%" },
        {
          x: 0,
          duration: 0.5,
          ease: "power3.out",
        }
      );
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length) {
        gsap.fromTo(
          validItems,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            stagger: 0.06,
            delay: 0.15,
            ease: "power2.out",
          }
        );
      }
    } else if (render) {
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length) {
        gsap.to(validItems, {
          opacity: 0,
          x: 30,
          duration: 0.25,
          stagger: 0.04,
          ease: "power2.in",
        });
      }
      gsap.to(containerRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        delay: 0.15,
        onComplete: () => setRender(false),
      });
    }
  }, [open, render]);

  if (!render) return null;

  return (
    <aside
      ref={containerRef}
      style={{
        top: offsetTop,
        height: `calc(100vh - ${offsetTop}px)`,
      }}
      className="fixed right-0 z-50 w-72 bg-white/90 backdrop-blur-xl shadow-xl p-6 overflow-hidden"
    >
      <nav className="flex flex-col gap-4">
        {navItems.map((item, index) => (
          <a
            key={item.link}
            href={item.link}
            onClick={onClose}
            ref={(el) => (itemsRef.current[index] = el)}
            className="hover:text-blue-600 transition-colors"
          >
            {item.name}
          </a>
        ))}

        {!user && (
          <div
            className="pt-6 flex flex-col gap-3 border-t"
            ref={(el) => (itemsRef.current[navItems.length] = el)}
          >
            <Link
              href="/login"
              onClick={onClose}
              className="border px-4 py-2 rounded-md text-center"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-center"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default MobileDrawer;
