"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const useFadeUpOnView = (
  ref,
  {
    y = 40,
    duration = 0.8,
    ease = "power3.out",
    start = "top 80%",
    end = "top 0%",
  } = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            toggleActions: "play reset play reset",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, y, duration, ease, start, end]);
};

export default useFadeUpOnView;
