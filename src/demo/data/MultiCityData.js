export const MULTI_CITY_FLIGHTS = Array.from({ length: 15 }).map((_, i) => ({
  id: `MC${i + 1}`,
  airline: "Qatar Airways",
  class: i % 3 === 0 ? "First Class" : "Economy",
  baggage: "30 KG",
  refundable: true,
  segments: [
    {
      from: "DAC",
      to: "DOH",
      departure: "03:00 AM",
      arrival: "06:00 AM",
      duration: "6h",
    },
    {
      from: "DOH",
      to: i % 2 === 0 ? "LHR" : "JFK",
      departure: "08:30 AM",
      arrival: "02:00 PM",
      duration: "7h 30m",
    },
    {
      from: i % 2 === 0 ? "LHR" : "JFK",
      to: "SIN",
      departure: "05:00 PM",
      arrival: "07:30 AM",
      duration: "12h",
    },
  ],
  totalPrice: 95000 + i * 4200,
}));
