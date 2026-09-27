import Link from "next/link";
import { LayoutDashboard, ShoppingBag, User, LogOut } from "lucide-react";

const navLinks = [
  { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/order", label: "My Bookings", icon: ShoppingBag },
  { href: "/user/profile", label: "Profile", icon: User },
];

const UserSidebar = () => {
  return (
    <aside className="bg-white border-r border-gray-100 flex flex-col min-h-screen w-60 px-4 py-6 shadow-sm">
      {/* Logo / Brand */}
      <div className="mb-8 px-2">
        <p className="text-primary text-lg font-bold">Borkot Travels</p>
        <p className="text-muted text-xs">My Account</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="text-muted hover:bg-primary-bg hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button className="text-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition">
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
};

const UserLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen bg-surface">
      <UserSidebar />
      <section className="flex-1 overflow-auto p-6">{children}</section>
    </main>
  );
};

export default UserLayout;
