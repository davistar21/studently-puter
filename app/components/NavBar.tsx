// src/components/Layout.tsx
import { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Calendar,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router";

export default function Layout() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/" },
    { name: "GPA Tracker", icon: GraduationCap, to: "/gpa" },
    { name: "Study Assistant", icon: BookOpen, to: "/assistant" },
    { name: "Planner", icon: Calendar, to: "/planner" },
    { name: "Analytics", icon: BarChart3, to: "/analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg">
        <div className="px-6 py-4 text-2xl font-bold text-blue-600">
          Studently
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md flex justify-between items-center px-4 py-3 z-20">
        <span className="text-xl font-bold text-blue-600">Studently</span>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-10"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-3 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={() => setOpen(false)}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
