"use client";

import Container from "@/components/common/Container/Container";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(Draggable, InertiaPlugin);

/* ---------------- DATA ---------------- */
const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400",
  },
];

/* ---------------- CONFIG ---------------- */
const GAP_PERCENT = 3;
const AUTOPLAY_DELAY = 3500;
const WHEEL_SPEED = 0.9; // tuning knob

const TravelSection = () => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const draggableRef = useRef(null);
  const autoplayRef = useRef(null);
  const wheelRAF = useRef(null);

  const [cardWidthPercent, setCardWidthPercent] = useState(30);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const data = [...banners, ...banners, ...banners];
  const total = banners.length;

  /* ---------------- RESPONSIVE ---------------- */
  useEffect(() => {
    const update = () => setCardWidthPercent(window.innerWidth < 640 ? 48 : 30);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ---------------- STEP WIDTH ---------------- */
  const getStep = () => {
    if (!wrapperRef.current) return 0;
    const w = wrapperRef.current.offsetWidth;
    return (w * (cardWidthPercent + GAP_PERCENT)) / 100;
  };

  /* ---------------- 3D EFFECT ---------------- */
  const apply3DEffect = () => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const centerX =
      wrapper.getBoundingClientRect().left +
      wrapper.getBoundingClientRect().width / 2;

    let closest = 0;
    let minDist = Infinity;

    [...track.children].forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = cardCenter - centerX;
      const abs = Math.abs(dist);

      if (abs < minDist) {
        minDist = abs;
        closest = i % total;
      }

      const norm = Math.min(abs / (wrapper.offsetWidth / 2), 1);

      gsap.to(card, {
        scale: gsap.utils.interpolate(1, 0.86, norm),
        opacity: gsap.utils.interpolate(1, 0.3, norm),
        rotateY: gsap.utils.interpolate(0, dist > 0 ? -22 : 22, norm),
        zIndex: 100 - norm * 60,
        duration: 0.4,
        ease: "power3.out",
      });
    });

    setActiveIndex(closest);
  };

  /* ---------------- NORMALIZE ---------------- */
  const normalize = () => {
    const step = getStep();
    const x = gsap.getProperty(trackRef.current, "x");

    const minX = -(total * 2) * step;
    const maxX = -total * step;

    let newX = x;

    if (x > maxX) newX -= total * step;
    else if (x < minX) newX += total * step;

    if (newX !== x) {
      gsap.set(trackRef.current, { x: newX });
      draggableRef.current?.update();
    }

    apply3DEffect();
  };

  /* ---------------- SLIDE ---------------- */
  const slideBy = (delta) => {
    gsap.to(trackRef.current, {
      x: `+=${delta}`,
      duration: 0.35,
      ease: "power2.out",
      onUpdate: normalize,
      onComplete: normalize,
    });
  };

  const slideToIndex = (index) => {
    const step = getStep();
    const base = -total * step;

    gsap.to(trackRef.current, {
      x: base - index * step,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: normalize,
      onComplete: normalize,
    });
  };

  /* ---------------- AUTOPLAY ---------------- */
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      slideToIndex((activeIndex + 1) % total);
    }, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  /* ---------------- MOUSE WHEEL ---------------- */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      stopAutoplay();
      setIsInteracting(true);

      const delta = -e.deltaY * WHEEL_SPEED;

      if (!wheelRAF.current) {
        wheelRAF.current = requestAnimationFrame(() => {
          slideBy(delta);
          wheelRAF.current = null;
        });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(wheelRAF.current);
    };
  }, []);

  /* ---------------- DRAG ---------------- */
  useEffect(() => {
    const step = getStep();

    gsap.set(trackRef.current, { x: -total * step });

    draggableRef.current = Draggable.create(trackRef.current, {
      type: "x",
      inertia: true,
      edgeResistance: 0.9,
      throwResistance: 1600,
      snap: { x: (v) => Math.round(v / step) * step },
      onPress: () => {
        stopAutoplay();
        setIsInteracting(true);
      },
      onRelease: () => {
        setIsInteracting(false);
        startAutoplay();
      },
      onDrag: normalize,
      onThrowUpdate: normalize,
    })[0];

    apply3DEffect();
    startAutoplay();

    return () => {
      stopAutoplay();
      draggableRef.current?.kill();
    };
  }, [cardWidthPercent]);

  /* ---------------- JSX ---------------- */
  return (
    <section className="bg-[#f8fafc] py-20 overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Still Interested in Traveling to Sydney?
          </h2>
          <p className="text-gray-500 mt-2">
            There is a limited number of seats available. Complete your booking
            to secure yours.
          </p>
        </div>

        {/* SLIDER */}
        <div
          ref={wrapperRef}
          className="relative mx-auto overflow-hidden"
          style={{ perspective: "1400px" }}
        >
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center"
              style={{
                gap: `${GAP_PERCENT}%`,
                width: "fit-content",
                transformStyle: "preserve-3d",
              }}
            >
              {data.map((item, i) => (
                <div
                  key={i}
                  className="shrink-0 bg-white rounded-2xl shadow-xl"
                  style={{
                    width: `${cardWidthPercent}%`,
                    height: 240,
                    opacity: 0.3,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={item.image}
                    alt="travel"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-8">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => slideToIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-8 bg-primary" : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TravelSection;
