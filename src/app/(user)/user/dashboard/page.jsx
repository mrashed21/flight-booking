const stats = [
  { label: "Total Bookings", value: "12", icon: "🎫" },
  { label: "Upcoming Flights", value: "2", icon: "✈️" },
  { label: "Completed Trips", value: "9", icon: "✅" },
  { label: "Cancelled", value: "1", icon: "❌" },
];

const recentBookings = [
  {
    id: "BT-20251",
    route: "Dhaka → Dubai",
    date: "15 Oct, 2025",
    status: "Confirmed",
    amount: "BDT 32,200",
  },
  {
    id: "BT-20244",
    route: "Dhaka → London",
    date: "22 Nov, 2025",
    status: "Pending",
    amount: "BDT 78,500",
  },
  {
    id: "BT-20238",
    route: "Dhaka → Kolkata",
    date: "03 Sep, 2025",
    status: "Completed",
    amount: "BDT 8,900",
  },
];

const statusColors = {
  Confirmed: "bg-primary-bg text-primary",
  Pending: "bg-yellow-50 text-yellow-600",
  Completed: "bg-green-50 text-green-600",
  Cancelled: "bg-red-50 text-red-500",
};

const UserDashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Welcome back, Muhammad! 👋
        </h1>
        <p className="text-muted mt-1 text-sm">
          Here&apos;s a summary of your travel activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-white p-4 text-center shadow-sm"
          >
            <p className="mb-1 text-2xl">{s.icon}</p>
            <p className="text-primary text-2xl font-bold">{s.value}</p>
            <p className="text-muted text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-800">
            Recent Bookings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-muted text-xs uppercase">
                <th className="px-5 py-3 text-left font-medium">Booking ID</th>
                <th className="px-5 py-3 text-left font-medium">Route</th>
                <th className="px-5 py-3 text-left font-medium">Date</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-surface transition">
                  <td className="text-primary px-5 py-3 font-medium">{b.id}</td>
                  <td className="px-5 py-3 text-gray-700">{b.route}</td>
                  <td className="text-muted px-5 py-3">{b.date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-700">
                    {b.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
