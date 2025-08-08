"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/lawyer/Sidebar";
import { motion } from "framer-motion";
import ChatModal from "../components/ChatModal";
import { useState } from "react";
import {useUser} from "@clerk/nextjs";


import { Bot, Calendar, MessageCircle, Video, User, Bell, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [

  {
    name: "Book Appointment",
    description: "Schedule a meeting with a lawyer.",
    href: "/User-landing/appointments",
    icon: "/appointment-book.png",
    mobileIcon: Calendar,
  },
  {
    name: "Message & Call Lawyer",
    description: "Chat or call your lawyer directly.",
    href: "/User-landing/user-message-call",
    icon: "/phone.png",
    mobileIcon: MessageCircle,
  },
  {
    name: "Profile Settings",
    description: "Update your personal information.",
    href: "/User-landing/profile-settings",
    icon: "/setting.png",
    mobileIcon: User,
  },
  {
    name: "Legal Education",
    description: "Access articles and resources.",
    href: "/User-landing/legal-content",
    icon: "/law.png",
    mobileIcon: BookOpen,
  }
];

const userStatistics = [
  { label: "Appointments", value: "5", change: "+1"},
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
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      <Sidebar role="user" />
      
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 mt-20 md:mt-0">
        {/* Header - Enhanced for mobile visibility */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-4"
        >
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a1a1a] leading-tight">
              Welcome, {user?.firstName} 👋
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2">
              Your legal dashboard overview
            </p>
          </div>
        </motion.header>

        {/* Quick Actions Grid - Hidden on desktop (lg and above) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8 lg:hidden"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-100 hover:border-[#d4a017] transition-all hover:shadow-md cursor-pointer text-center">
                    <div className="flex items-center justify-center mb-2 sm:mb-3">
                      {/* Always use mobile icons since this is mobile/tablet only */}
                      <feature.mobileIcon className="w-6 h-6 text-[#d4a017]" />
                    </div>
                    <h3 className="font-medium text-gray-800 text-xs sm:text-sm leading-tight">
                      {feature.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {userStatistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 hover:border-[#d4a017] transition-all hover:shadow-lg cursor-pointer"
              onClick={() => {
                if (stat.label === "Appointments") {
                  router.push("/User-landing/appointments");
                }
                if (stat.label === "Messages") {
                  router.push("/User-landing/user-message-call");
                }
                if (stat.label === "Videos Watched") {
                  router.push("/User-landing/legal-content");
                }
              }}
            >
              <p className="text-gray-600 text-xs sm:text-sm">{stat.label}</p>
              <div className="flex items-end gap-2 mt-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {stat.value}
                </h3>
                <span
                  className={`text-xs sm:text-sm ${
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
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 mb-20 sm:mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Recent Activity
            </h2>
            <Link 
              href="/User-landing/activity-history" 
              className="text-[#d4a017] text-sm hover:text-[#b8941f] transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {userRecentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-[#f9f9f9] transition-all cursor-pointer"
              >
                <div className="flex-shrink-0">
                  {/* Activity type icons */}
                  {activity.type === "appointment" && (
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#d4a017]/20 flex items-center justify-center text-[#d4a017] font-bold text-sm">
                      A
                    </span>
                  )}
                  {activity.type === "video" && (
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                      V
                    </span>
                  )}
                  {activity.type === "profile" && (
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-200 flex items-center justify-center text-green-600 font-bold text-sm">
                      P
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold text-sm sm:text-base truncate">
                    {activity.title}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Chat Button - Responsive */}
        <button
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#d4a017] hover:bg-[#b17d25] text-white rounded-full shadow-lg p-3 sm:p-4 flex items-center gap-2 transition-all hover:scale-105"
          onClick={() => setShowChatModal(true)}
          aria-label="Open Legal Chat Bot"
        >
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden md:inline font-semibold text-sm">Chat Bot</span>
        </button>

        {/* Chat Modal */}
        <ChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
        />
      </main>
    </div>
  );
}
