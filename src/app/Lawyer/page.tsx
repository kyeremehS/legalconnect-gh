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
  FileBadge2Icon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../components/lawyer/Sidebar";

const navItems = [
  { name: "Dashboard", href: "/Lawyer", icon: Activity },
  { name: "Appointments", href: "/Lawyer/appointments", icon: Calendar },
  {
    name: "Messages & Calls",
    href: "/Lawyer/messages-calls",
    icon: MessageSquare,
  },
  { name: "Videos", href: "/Lawyer/create-content", icon: FileText },
  { name: "Clients", href: "/lawyer/engagement", icon: Users },
  { name: "Profile", href: "/Lawyer/profile", icon: Users },
  { name: "Settings", href: "/Lawyer/settings", icon: Settings },

];

const statistics = [
  { label: "Active Cases", value: "24", change: "+2" },
  { label: "Pending Reviews", value: "12", change: "-3" },
  { label: "Revenue", value: "$15,234", change: "+12%" },
];

const recentActivities = [
  { id: 1, title: "New case assigned", time: "2 hours ago", type: "case" },
  {
    id: 2,
    title: "Client meeting scheduled",
    time: "4 hours ago",
    type: "meeting",
  },
  {
    id: 3,
    title: "Document review completed",
    time: "Yesterday",
    type: "document",
  },
];

const LawyerDashboard = () => {
  const [user] = useState({
    displayName: "Ama Kwarteng",
    role: "Senior Legal Counsel",
  });

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <main className="p-4 lg:p-8 pt-20 lg:pt-8">
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
          <Sidebar role="lawyer" />
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
                  <span
                    className={`text-sm ${
                      stat.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
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
                    <p className="text-gray-800 font-semibold">
                      {activity.title}
                    </p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawyerDashboard;
