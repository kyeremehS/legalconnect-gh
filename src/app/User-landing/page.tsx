"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/lawyer/Sidebar";
import { motion } from "framer-motion";
import ChatModal from "../components/ChatModal";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
const features = [
  {
    name: "Watch Legal Videos",
    description: "Browse and watch legal education videos.",
    href: "User-landing/legal-content",
    icon: "/video.png",
  },
  {
    name: "Book Appointment",
    description: "Schedule a meeting with a lawyer.",
    href: "/User-landing/appointments",
    icon: "/appointment-book.png",
  },
  {
    name: "Message & Call Lawyer",
    description: "Chat or call your lawyer directly.",
    href: "/User-landing/user-message-call",
    icon: "/phone.png",
  },
  {
    name: "Profile Settings",
    description: "Update your personal information.",
    href: "/User-landing/profile-settings",
    icon: "/user-setting.png",
  },
  {
    name: "Notifications",
    description: "View your latest notifications.",
    href: "/user/notifications",
    icon: "/bell.png",
  },
  {
    name: "Legal Education",
    description: "Access articles and resources.",
    href: "/User-landing/user-education",
    icon: "/law.png",
  },
];

const userStatistics = [
  { label: "Appointments", value: "5", change: "+1" },
  { label: "Messages", value: "12", change: "+3" },
  { label: "Videos Watched", value: "8", change: "+2" },
];

const userRecentActivities = [
  {
    id: 1,
    title: "Appointment booked with Ama Kwarteng",
    time: "2 hours ago",
    type: "appointment",
  },
  {
    id: 2,
    title: "Watched: Understanding Land Ownership",
    time: "Yesterday",
    type: "video",
  },
  { id: 3, title: "Profile updated", time: "2 days ago", type: "profile" },
];

export default function UserDashboard() {
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      <Sidebar role="user" />
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 lg:ml-64">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a1a]">
              Welcome, User!
            </h1>
            <p className="text-[#4a4a4a] mt-1">
              Your legal tools and resources in one place.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/user/settings"
              className="px-4 py-2 rounded-lg font-semibold border border-[#d4a017] text-[#d4a017] bg-white hover:bg-[#d4a017] hover:text-white transition"
            >
              Settings
            </Link>
            <button className="px-4 py-2 rounded-lg font-semibold border border-[#d4a017] text-[#d4a017] bg-white hover:bg-[#d4a017] hover:text-white transition">
              <UserButton />
            </button>
          </div>
        </motion.header>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {userStatistics.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#d4a017] transition-all hover:shadow-lg"
            >
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <div className="flex items-end gap-2 mt-2">
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
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
        <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {userRecentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#f9f9f9] transition-all"
              >
                <div className="flex-shrink-0">
                  {/* Icon based on activity type */}
                  {activity.type === "appointment" && (
                    <span className="w-6 h-6 rounded-full bg-[#d4a017]/20 flex items-center justify-center text-[#d4a017] font-bold">
                      A
                    </span>
                  )}
                  {activity.type === "video" && (
                    <span className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                      V
                    </span>
                  )}
                  {activity.type === "profile" && (
                    <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-600 font-bold">
                      P
                    </span>
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
        <button
          className="fixed bottom-6 right-6 z-50 bg-[#d4a017] hover:bg-[#b17d25] text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition"
          onClick={() => setShowChatModal(true)}
          aria-label="Open Legal Chat Bot"
        >
          <img src="/chat-bot.png" alt="Chat Bot" className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Chat Bot</span>
        </button>
      </main>
    </div>
  );
}
