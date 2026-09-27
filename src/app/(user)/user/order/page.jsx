const orders = [
  {
    id: "BT-20251",
    airline: "Biman Bangladesh Airlines",
    route: "Dhaka (DAC) → Dubai (DXB)",
    date: "15 Oct, 2025",
    departure: "10:30 AM",
    arrival: "01:45 PM",
    class: "Economy",
    passengers: 1,
    amount: "BDT 32,200",
    status: "Confirmed",
  },
  {
    id: "BT-20244",
    airline: "Emirates",
    route: "Dhaka (DAC) → London (LHR)",
    date: "22 Nov, 2025",
    departure: "02:15 AM",
    arrival: "07:30 AM",
    class: "Business",
    passengers: 2,
    amount: "BDT 1,57,000",
    status: "Pending",
  },
  {
    id: "BT-20238",
    airline: "IndiGo",
    route: "Dhaka (DAC) → Kolkata (CCU)",
    date: "03 Sep, 2025",
    departure: "08:00 AM",
    arrival: "09:20 AM",
    class: "Economy",
    passengers: 1,
    amount: "BDT 8,900",
    status: "Completed",
  },
  {
    id: "BT-20215",
    airline: "Air Arabia",
    route: "Dhaka (DAC) → Sharjah (SHJ)",
    date: "10 Jul, 2025",
    departure: "11:55 PM",
    arrival: "03:10 AM",
    class: "Economy",
    passengers: 1,
    amount: "BDT 24,600",
    status: "Cancelled",
  },
];

const statusColors = {
  Confirmed: "bg-primary-bg text-primary",
  Pending: "bg-yellow-50 text-yellow-600",
  Completed: "bg-green-50 text-green-600",
  Cancelled: "bg-red-50 text-red-500",
};

const UserOrderPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
          My Bookings
        </h1>
        <p className="text-muted mt-1 text-sm">
          View and manage all your flight bookings.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map(
          (tab, i) => (
            <button
              key={tab}
              className={`whitespace-nowrap rounded-lg border px-4 py-1.5 text-xs font-medium transition ${
                i === 0
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      {/* Order Cards */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              {/* Left */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-primary text-sm font-semibold">
                    {order.id}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  ✈️ {order.airline}
                </p>
                <p className="text-primary text-base font-bold">{order.route}</p>
                <p className="text-muted text-xs">
                  📅 {order.date} &nbsp;|&nbsp; 🛫 {order.departure} →{" "}
                  {order.arrival} &nbsp;|&nbsp; {order.class} &nbsp;|&nbsp; 👤{" "}
                  {order.passengers} Pax
                </p>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-primary text-lg font-bold">{order.amount}</p>
                <button className="border-primary text-primary mt-2 rounded-lg border px-4 py-1.5 text-xs font-medium transition hover:bg-primary-bg">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrderPage;
