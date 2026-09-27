const flightData = {
  airline: "Biman Bangladesh Airlines",
  logo: "🛫",
  from: "Dhaka (DAC)",
  to: "Dubai (DXB)",
  departure: "10:30 AM",
  arrival: "01:45 PM",
  date: "15 Oct, 2025",
  duration: "7h 15m",
  class: "Economy",
  passengers: 1,
  baseFare: 28500,
  tax: 3200,
  serviceFee: 500,
};

const CheckoutSummary = () => {
  const total = flightData.baseFare + flightData.tax + flightData.serviceFee;

  return (
    <div className="rounded-xl bg-white shadow-sm">
      {/* Header */}
      <div className="bg-primary rounded-t-xl px-5 py-4">
        <h2 className="text-base font-semibold text-white">Booking Summary</h2>
      </div>

      <div className="space-y-4 p-5">
        {/* Flight Info */}
        <div className="bg-primary-bg rounded-lg p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">{flightData.logo}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {flightData.airline}
              </p>
              <p className="text-muted text-xs">{flightData.class}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-center">
              <p className="text-primary text-lg font-bold">
                {flightData.departure}
              </p>
              <p className="text-muted text-xs">{flightData.from}</p>
            </div>

            <div className="flex flex-1 flex-col items-center">
              <p className="text-muted text-xs">{flightData.duration}</p>
              <div className="border-muted my-1 w-full border-t border-dashed" />
              <p className="text-muted text-xs">Non-stop</p>
            </div>

            <div className="text-center">
              <p className="text-primary text-lg font-bold">
                {flightData.arrival}
              </p>
              <p className="text-muted text-xs">{flightData.to}</p>
            </div>
          </div>

          <div className="border-primary-bg mt-3 border-t pt-3">
            <p className="text-muted text-xs">
              📅 {flightData.date} &nbsp;|&nbsp; 👤 {flightData.passengers}{" "}
              Passenger
            </p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Base Fare</span>
            <span className="font-medium text-gray-700">
              BDT {flightData.baseFare.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Tax & Surcharge</span>
            <span className="font-medium text-gray-700">
              BDT {flightData.tax.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Service Fee</span>
            <span className="font-medium text-gray-700">
              BDT {flightData.serviceFee.toLocaleString()}
            </span>
          </div>

          <div className="border-primary-bg border-t pt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="text-primary text-base font-bold">
                BDT {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Cancellation Note */}
        <p className="bg-primary-bg text-muted rounded-lg px-3 py-2 text-xs leading-relaxed">
          ⚠️ Cancellation charge applies after 24 hours of booking. Please read
          the fare rules before confirming.
        </p>
      </div>
    </div>
  );
};

export default CheckoutSummary;
