export const ROUND_TRIP_FLIGHTS = Array.from({ length: 15 }).map((_, i) => ({
  id: `RT${i + 1}`,
  airline: i % 2 === 0 ? "Emirates" : "Qatar Airways",
  class: i % 3 === 0 ? "Business" : "Economy",
  baggage: i % 2 === 0 ? "40 KG" : "30 KG",
  refundable: i % 2 === 1,
  outbound: {
    from: "DAC",
    to: i % 2 === 0 ? "DXB" : "DEL",
    departure: "09:00 AM",
    arrival: "01:30 PM",
    duration: "4h 30m",
    stops: 0,
  },
  inbound: {
    from: i % 2 === 0 ? "DXB" : "DEL",
    to: "DAC",
    departure: "08:00 PM",
    arrival: "02:30 AM",
    duration: "4h 30m",
    stops: 0,
  },
  totalPrice: 22000 + i * 3500,
}));
