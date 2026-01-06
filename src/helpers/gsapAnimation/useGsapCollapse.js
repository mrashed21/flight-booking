"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const useGsapCollapse = (isOpen, options = {}) => {
  const ref = useRef(null);

  const {
    openDuration = 0.45,
    closeDuration = 0.35,
    easeOpen = "power2.out",
    easeClose = "power2.in",
    y = -12,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    gsap.killTweensOf(ref.current);

    if (isOpen) {
      gsap.fromTo(
        ref.current,
        {
          height: 0,
          opacity: 0,
          y,
        },
        {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: openDuration,
          ease: easeOpen,
          clearProps: "height",
        }
      );
    } else {
      gsap.to(ref.current, {
        height: 0,
        opacity: 0,
        y,
        duration: closeDuration,
        ease: easeClose,
      });
    }
  }, [isOpen]);

  return ref;
};

export default useGsapCollapse;
