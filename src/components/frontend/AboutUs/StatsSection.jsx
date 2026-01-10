"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 120, suffix: "+", label: "Active Businesses" },
  { value: 50000, suffix: "+", label: "Invoice Generated" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Customer Service" },
];

const StatsSection = () => {
  const numbersRef = useRef([]);

  useEffect(() => {
    numbersRef.current.forEach((el, index) => {
      if (!el) return;

      const endValue = stats[index].value;

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: endValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play reset play reset",
          },
          snap: { innerText: 1 },
          onUpdate: function () {
            el.innerText = Math.floor(Number(el.innerText)).toLocaleString();
          },
        },
      );
    });
  }, []);

  return (
    <section className="py-16">
      <div className="px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-white py-8 text-center shadow-sm"
            >
              <h3 className="text-primary text-3xl font-bold">
                <span
                  ref={(el) => {
                    if (el) numbersRef.current[index] = el;
                  }}
                >
                  0
                </span>
                {item.suffix}
              </h3>

              <div className="bg-primary mx-auto my-3 h-0.5 w-12" />

              <p className="text-muted text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
