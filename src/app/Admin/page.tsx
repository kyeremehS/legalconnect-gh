"use client";
import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/lawyer/Sidebar";
import { BarChart2, Users, FileText, MessageCircle, UserCheck, Shield } from "lucide-react";

const analytics = [
  {
    label: "Total Users",
    value: "2,340",
    icon: <Users className="w-7 h-7 text-[#d4a017]" />,
    change: "+120",
  },
  {
    label: "Active Lawyers",
    value: "120",
    icon: <UserCheck className="w-7 h-7 text-[#d4a017]" />,
    change: "+5",
  },
  {
    label: "Cases Managed",
    value: "1,540",
    icon: <FileText className="w-7 h-7 text-[#d4a017]" />,
    change: "+40",
  },
  {
    label: "Messages Sent",
    value: "8,900",
    icon: <MessageCircle className="w-7 h-7 text-[#d4a017]" />,
    change: "+300",
  },
  {
    label: "Site Visits",
    value: "45,000",
    icon: <BarChart2 className="w-7 h-7 text-[#d4a017]" />,
    change: "+2,000",
  },
  {
    label: "Security Alerts",
    value: "2",
    icon: <Shield className="w-7 h-7 text-[#d4a017]" />,
    change: "0",
  },
];

const recentAdminActivities = [
  {
    id: 1,
    title: "User John Doe account verified",
    time: "10 min ago",
    type: "user",
  },
  {
    id: 2,
    title: "Lawyer Ama Kwarteng approved",
    time: "1 hour ago",
    type: "lawyer",
  },
  {
    id: 3,
    title: "Case #1234 flagged for review",
    time: "2 hours ago",
    type: "case",
  },
  {
    id: 4,
    title: "System security scan completed",
    time: "Today",
    type: "security",
  },
  {
    id: 5,
    title: "New feedback received",
    time: "Yesterday",
    type: "feedback",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex lg:ml-64">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#d4a017] mb-1">
                Welcome, Admin!
              </h1>
              <p className="text-[#4a4a4a]">
                Website analytics and admin controls at a glance.
              </p>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {analytics.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#d4a017] transition-all hover:shadow-lg flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  {stat.icon}
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
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

          {/* Recent Admin Activity */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Admin Activity
            </h2>
            <div className="space-y-4">
              {recentAdminActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#f9f9f9] transition-all"
                >
                  <div className="flex-shrink-0">
                    {/* Icon based on activity type */}
                    {activity.type === "user" && (
                      <span className="w-6 h-6  rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">U</span>
                    )}
                    {activity.type === "lawyer" && (
                      <span className="w-6 h-6 rounded-full bg-[#d4a017]/20 flex items-center justify-center text-[#d4a017] font-bold">L</span>
                    )}
                    {activity.type === "case" && (
                      <span className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-red-600 font-bold">C</span>
                    )}
                    {activity.type === "security" && (
                      <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-600 font-bold">S</span>
                    )}
                    {activity.type === "feedback" && (
                      <span className="w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 font-bold">F</span>
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
    </div>
    );
  }