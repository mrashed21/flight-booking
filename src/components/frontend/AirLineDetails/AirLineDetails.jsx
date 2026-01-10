"use client";
import Container from "@/components/common/Container/Container";
import useFadeUpOnView from "@/helpers/gsapAnimation/useFadeUpOnView";
import { BadgeDollarSign, BarChart3, MapPin, Plane } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import PopularAirlines from "../Home/PopularAirlines/PopularAirlines";
import FaqAccordion from "../Offer/FaqAccordion";

const stats = [
  {
    title: "Popular Airport",
    desc: "Bangladesh Airlines are most popular Airports. Select destination, journey date & number of travelers.",
    icon: Plane,
  },
  {
    title: "All Destination",
    desc: "135 Destination are available for this airlines. Select preferred flight. Click Select.",
    icon: MapPin,
  },
  {
    title: "Average Flights",
    desc: "1000 Flight are available per week. Log in to your profile.",
    icon: BarChart3,
  },
  {
    title: "Best Deal to BD",
    desc: "BDT 10,000 Price is best deal to Bangladesh. Provide BIN number of your card (first 6 digits of your card).",
    icon: BadgeDollarSign,
  },
];

const AirLineDetails = () => {
  const titleRef = useRef(null);

  useFadeUpOnView(titleRef);
  return (
    <>
      {/* air line image */}

      <div className="relative">
        <Image
          src={
            "https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg"
          }
          width={2000}
          height={400}
          className="h-85 w-full object-cover opacity-25"
          alt="air-line"
        />
        <p className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-bold">
          Biman Bangladesh AirLines
        </p>
      </div>

      <Container>
        {/* air line card */}

        <div className="px-4 py-16">
          {/* Title */}

          <h2
            ref={titleRef}
            className="my-10 text-center text-3xl font-bold text-gray-800 lg:text-4xl"
          >
            Airlines Popularity
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative mt-10 rounded-xl bg-white px-6 pt-12 pb-8 text-center shadow-sm transition hover:shadow-md"
                >
                  {/* Icon badge */}
                  <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white">
                    <Icon className="text-primary h-6 w-6" />
                  </div>

                  <h3 className="text-primary mb-3 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* replace with dengeras html */}
          <div className="">
            <h2
              ref={titleRef}
              className="my-10 text-center text-3xl font-bold text-gray-800 lg:text-4xl"
            >
              About Biman Bangladesh Airlines
            </h2>

            <p className="text-muted text-justify">
              Biman Bangladesh Airlines, [nb 1] commonly known as Biman
              (/ˈbiːmɑːn /BEE - mahn; Bengali: [ˈbiman]), [nb 2] is the national
              flag carrierofBangladesh. [6]With its main hub at Hazrat Shahjalal
              International AirportinDhaka, the airline also operates flights
              from its secondary hubs at Shah Amanat International Airport in
              Chittagong and Osmani International AirportinSylhet. The airline
              provides international passenger and cargo services to multiple
              destinations and hasair service agreementsin 42 countries.[7]The
              headquarters of the airline,Balaka Bhaban, is located inKurmitola,
              in the northern part ofDhaka. AnnualHajjflights, transporting
              tourists, migrants, and non-resident Bangladeshi workers and the
              activities of its subsidiaries form an integral part of the
              corporate business of the airline. Created in February 1972, Biman
              enjoyed an internal monopoly in the aviatio n industry of
              Bangladesh for 24 years, until 1996.[8]In the decades following
              its founding, the airline expanded its fleet and destinations but
              it was adversely affected by corruption and mismanagement. At its
              peak, Biman operated flights to 29 international destinations,
              extending from New York City in the west to Tokyo in the east. The
              airline was wholly owned and managed by the government of
              Bangladeshuntil 23 July 2007, when it was transformed into the
              country's largestpublic limited companyby theCaretaker
              Governmentof Bangladesh. Since becoming a public limited company
              in 2007, the airline has reduced staff and begun to modernize its
              fleet. The airline had signed a deal with Boeingto buy ten new
              aircraft and options for ten more in 2008. [9] After taking
              delivery of the new planes, Biman expanded its destinations and
              added in-flight amenities such as onboard internet, WiFi, mobile
              telephony and live TV streams.[10][11] During his visit to Dhaka
              in September 2023, French President Emmanuel Macron and then
              Bangladesh Prime Minister Sheikh Hasina announced the order of ten
              Airbus A350 aircraft for Biman. The Airbus order consists of the
              purchase by Biman Bangladesh Airlines of two A350F cargo aircraft
              and eight A350 passenger aircraft. The aircraft will be delivered
              in stages with two passenger A350 aircraft joining the Biman fleet
              first.[12][13] Biman Bangladesh Airlines is certified as safe to
              fly in Europe by theEuropean Union Aviation Safety Agency. [14]
              [15] In addition, Biman has also successfully passed the IATA
              Operational Safety Audit and since then, the airline has resumed
              flights to some of its previous destinations in Asia and
              Europe.[16][17]In recent times, Biman Bangladesh Airlines has seen
              a marked improvement in punctuality, as well as in on-time flight
              performance, under its new management team.[18]
            </p>
          </div>
          {/* popular routes */}
          <PopularAirlines className="bg-surface!" />
          {/* faq */}
          <FaqAccordion titleRef={titleRef} />
        </div>
      </Container>
    </>
  );
};

export default AirLineDetails;
