"use client";

import Container from "@/components/common/Container/Container";
import useFadeUpOnView from "@/helpers/useFadeUpOnView";
import useFadeUpStagger from "@/helpers/useFadeUpStagger";
import { CalendarDays, FileText, Plane } from "lucide-react";
import { useRef } from "react";

/* ---------- DEMO DATA ---------- */
const services = [
  {
    title: "Air Ticket",
    description:
      "Enjoy online-exclusive benefits when you book directly with us.",
    icon: Plane,
  },
  {
    title: "Tour Schedule",
    description:
      "Enjoy online-exclusive benefits when you book directly with us.",
    icon: CalendarDays,
  },
  {
    title: "Visa Information",
    description:
      "Enjoy online-exclusive benefits when you book directly with us.",
    icon: FileText,
  },
];

const OurSmartServices = () => {
  /* refs */
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  /* animations */
  useFadeUpOnView(titleRef, { y: 50 });
  useFadeUpOnView(subtitleRef, { y: 40, duration: 0.9 });
  useFadeUpStagger(cardsRef, { y: 60 });

  return (
    <section className="bg-[var(--color-surface)] py-24">
      <Container>
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="text-3xl font-bold text-gray-800 lg:text-4xl"
          >
            Our Smart Services
          </h2>

          <p
            ref={subtitleRef}
            className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]"
          >
            From breathtaking landscapes to hidden gems – explore curated tours
            designed to create memories that last a lifetime.
          </p>
        </div>

        {/* SERVICES */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                // ref={(el) => (cardsRef.current[i] = el)}
                className="group rounded-2xl bg-[var(--color-primary-dark)] px-8 py-10 text-center text-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* ICON */}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-warning)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mb-3 text-lg font-semibold">{service.title}</h3>

                <p className="text-sm leading-relaxed text-white/85">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default OurSmartServices;
