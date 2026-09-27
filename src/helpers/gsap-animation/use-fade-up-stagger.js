"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const useFadeUpStagger = (
  refs,
  {
    y = 60,
    duration = 0.7,
    ease = "power3.out",
    start = "top 85%",
    stagger = 0.15,
  } = {},
) => {
  useEffect(() => {
    if (!refs.current?.length) return;

    const elements = refs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: elements[0],
            start,
            toggleActions: "play reset play reset",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [refs, y, duration, ease, start, stagger]);
};

export default useFadeUpStagger;
