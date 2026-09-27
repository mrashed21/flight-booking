import Container from "@/components/common/Container/Container";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

const flights = [
  {
    id: 1,
    airline: "Biman Bangladesh Airlines",
    isoCode: "BD",
    from: "Dhaka (DAC)",
    to: "Dubai (DXB)",
    departure: "10:30",
    arrival: "13:45",
    duration: "7h 15m",
    stops: "Non-stop",
    class: "Economy",
    price: 28500,
    seats: 12,
  },
  {
    id: 2,
    airline: "Emirates",
    isoCode: "AE",
    from: "Dhaka (DAC)",
    to: "London (LHR)",
    departure: "02:15",
    arrival: "07:30",
    duration: "10h 15m",
    stops: "1 Stop (Dubai)",
    class: "Business",
    price: 78500,
    seats: 4,
  },
  {
    id: 3,
    airline: "IndiGo",
    isoCode: "IN",
    from: "Dhaka (DAC)",
    to: "Kolkata (CCU)",
    departure: "08:00",
    arrival: "09:20",
    duration: "1h 20m",
    stops: "Non-stop",
    class: "Economy",
    price: 8900,
    seats: 22,
  },
  {
    id: 4,
    airline: "Air Arabia",
    isoCode: "AE",
    from: "Dhaka (DAC)",
    to: "Sharjah (SHJ)",
    departure: "23:55",
    arrival: "03:10",
    duration: "6h 15m",
    stops: "Non-stop",
    class: "Economy",
    price: 24600,
    seats: 8,
  },
  {
    id: 5,
    airline: "Qatar Airways",
    isoCode: "QA",
    from: "Dhaka (DAC)",
    to: "Doha (DOH)",
    departure: "16:40",
    arrival: "19:55",
    duration: "5h 15m",
    stops: "Non-stop",
    class: "Economy",
    price: 21200,
    seats: 15,
  },
  {
    id: 6,
    airline: "Singapore Airlines",
    isoCode: "SG",
    from: "Dhaka (DAC)",
    to: "Singapore (SIN)",
    departure: "00:30",
    arrival: "07:50",
    duration: "4h 20m",
    stops: "Non-stop",
    class: "Economy",
    price: 32000,
    seats: 9,
  },
];

const FlightPage = () => {
  return (
    <section className="bg-surface min-h-screen">
      {/* Hero Banner */}
      <div className="relative">
        <Image
          src="https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg"
          width={2000}
          height={400}
          className="h-52 w-full object-cover opacity-20 sm:h-64"
          alt="flights"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
          <h1 className="text-primary text-center text-3xl font-bold sm:text-5xl">
            Available Flights
          </h1>
          <p className="text-muted text-center text-sm">
            Find and book the best flights at great prices
          </p>
        </div>
      </div>

      <Container>
        <div className="px-4 py-8 sm:py-10">
          {/* Filter Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-muted text-sm font-medium">Filter:</span>
            {["All", "Non-stop", "Economy", "Business", "Under BDT 30K"].map(
              (f, i) => (
                <button
                  key={f}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition sm:px-4 ${
                    i === 0
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {f}
                </button>
              ),
            )}
            <span className="text-muted ml-auto text-xs">
              {flights.length} flights found
            </span>
          </div>

          {/* Flight Cards */}
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                {/* Mobile: stack top row (airline) + middle row (route) + bottom row (price/book) */}
                {/* Desktop: single flex row */}

                {/* Row 1 — Airline info (always visible) */}
                <div className="flex items-center justify-between sm:hidden">
                  <div className="flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={flight.isoCode}
                      svg
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "6px",
                        objectFit: "cover",
                      }}
                      title={flight.airline}
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {flight.airline}
                      </p>
                      <span className="bg-primary-bg text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                        {flight.class}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary text-base font-bold">
                      BDT {flight.price.toLocaleString()}
                    </p>
                    <p className="text-muted text-xs">{flight.seats} seats left</p>
                  </div>
                </div>

                {/* Row 2 — Route (mobile) */}
                <div className="mt-3 flex items-center justify-between sm:hidden">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">
                      {flight.departure}
                    </p>
                    <p className="text-muted text-xs">{flight.from}</p>
                  </div>
                  <div className="flex flex-1 flex-col items-center px-2">
                    <p className="text-muted text-xs">{flight.duration}</p>
                    <div className="border-muted relative my-1 w-full border-t border-dashed">
                      <span className="text-primary absolute -top-2 left-1/2 -translate-x-1/2 text-xs">
                        ✈
                      </span>
                    </div>
                    <p className="text-muted text-xs">{flight.stops}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">
                      {flight.arrival}
                    </p>
                    <p className="text-muted text-xs">{flight.to}</p>
                  </div>
                </div>

                {/* Row 3 — Book button (mobile) */}
                <Link
                  href="/checkout"
                  className="common-btn mt-3 flex w-full justify-center !py-2 !text-sm sm:hidden"
                >
                  <span>Book Now</span>
                </Link>

                {/* Desktop — single row layout */}
                <div className="hidden items-center justify-between gap-4 sm:flex">
                  {/* Airline */}
                  <div className="flex min-w-[160px] items-center gap-3">
                    <ReactCountryFlag
                      countryCode={flight.isoCode}
                      svg
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "6px",
                        objectFit: "cover",
                      }}
                      title={flight.airline}
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {flight.airline}
                      </p>
                      <span className="bg-primary-bg text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                        {flight.class}
                      </span>
                    </div>
                  </div>

                  {/* Route & Time */}
                  <div className="flex flex-1 items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-800">
                        {flight.departure}
                      </p>
                      <p className="text-muted text-xs">{flight.from}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-muted text-xs">{flight.duration}</p>
                      <div className="border-muted relative my-1 w-24 border-t border-dashed lg:w-36">
                        <span className="text-primary absolute -top-2 left-1/2 -translate-x-1/2 text-sm">
                          ✈
                        </span>
                      </div>
                      <p className="text-muted text-xs">{flight.stops}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-800">
                        {flight.arrival}
                      </p>
                      <p className="text-muted text-xs">{flight.to}</p>
                    </div>
                  </div>

                  {/* Price & Book */}
                  <div className="text-right">
                    <p className="text-primary text-xl font-bold">
                      BDT {flight.price.toLocaleString()}
                    </p>
                    <p className="text-muted mb-2 text-xs">
                      {flight.seats} seats left
                    </p>
                    <Link
                      href="/checkout"
                      className="common-btn !px-5 !py-2 !text-sm inline-block"
                    >
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FlightPage;
