"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Activity,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/Lawyer", icon: Activity },
  { name: "Appointments", href: "/Lawyer/appointments", icon: Calendar },
  { name: "Messages & Calls", href: "/Lawyer/messages-calls", icon: MessageSquare },
  { name: "Videos", href: "/Lawyer/create-content", icon: FileText },
  { name: "Clients", href: "/lawyer/engagement", icon: Users },
  { name: "Profile", href: "/Lawyer/profile", icon: Users },
  { name: "Settings", href: "/Lawyer/settings", icon: Settings },
];

const statistics = [
  { label: "Active Cases", value: "24", change: "+2" },
  { label: "Pending Reviews", value: "12", change: "-3" },
  { label: "Revenue", value: "$15,234", change: "+12%" }
];

const recentActivities = [
  { id: 1, title: "New case assigned", time: "2 hours ago", type: "case" },
  { id: 2, title: "Client meeting scheduled", time: "4 hours ago", type: "meeting" },
  { id: 3, title: "Document review completed", time: "Yesterday", type: "document" }
];

const LawyerDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useState({
    displayName: "Ama Kwarteng",
    role: "Senior Legal Counsel",
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 lg:hidden">
        <div className="flex items-center justify-between px-4 h-16">
          <h1 className="text-xl font-bold text-[#d4a017]">LegalConnect</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar - Fixed positioning for desktop, absolute for mobile */}
        <aside className={`
          fixed top-0 left-0 h-full w-64 bg-white
          border-r border-gray-100 shadow-sm
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:shadow-none
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          z-50
        `}>
          <div className="sticky top-0 p-6">
            <h1 className="text-2xl font-bold text-[#d4a017]">LegalConnect</h1>
          </div>
          <nav className="mt-6 px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-[#fff8eb] hover:text-[#d4a017] transition-all group mb-1"
              >
                <item.icon className="w-5 h-5 group-hover:text-[#d4a017]" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content - Adjusted margin for desktop */}
        <main className="flex-1 w-full p-4 lg:p-8 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {user.displayName}
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your practice today.
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statistics.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#d4a017] transition-all hover:shadow-lg"
                >
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <div className="flex items-end gap-2 mt-2">
                    <h3 className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </h3>
                    <span className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#f9f9f9] transition-all"
                  >
                    <div className="flex-shrink-0">
                      {/* Icon based on activity type */}
                      {activity.type === "case" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h18M3 12h18M3 21h18"
                          />
                        </svg>
                      )}
                      {activity.type === "meeting" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v8m4-4H8"
                          />
                        </svg>
                      )}
                      {activity.type === "document" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 8v8m4-4H8"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold">{activity.title}</p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LawyerDashboard;
