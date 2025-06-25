"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/lawyer/Sidebar";
import { motion } from "framer-motion";

const features = [
  {
    name: "Watch Legal Videos",
    description: "Browse and watch legal education videos.",
    href: "/legal-content",
    icon: "/video.png",
  },
  {
    name: "Book Appointment",
    description: "Schedule a meeting with a lawyer.",
    href: "/user/appointments",
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
  {
    name: "Legal Chat Bot",
    description: "Ask legal questions and get instant answers.",
    href: "/legal-chatbot",
    icon: "/chat-bot.png",
  },
];

export default function UserDashboard() {
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
              Logout
            </button>
          </div>
        </motion.header>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link
                href={feature.href}
                className="rounded-2xl p-6 shadow bg-[#fff8eb] border-t-4 border-[#d4a017] hover:shadow-lg transition flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={feature.icon}
                    alt={feature.name}
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-bold text-[#d4a017]">
                    {feature.name}
                  </span>
                </div>
                <p className="text-[#4a4a4a] text-sm">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Notifications Example */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold mb-2 text-[#1a1a1a]">
            Recent Notifications
          </h2>
          <ul className="bg-[#fff8eb] rounded-2xl shadow p-4 space-y-2 border border-[#d4a017]">
            <li className="text-[#4a4a4a]">
              Your appointment with Lawyer Ama is confirmed for tomorrow at 2pm.
            </li>
            <li className="text-[#4a4a4a]">
              New legal video: "Understanding Your Rights in Ghana" is now
              available.
            </li>
            <li className="text-[#4a4a4a]">Profile updated successfully.</li>
          </ul>
        </motion.section>

        {/* Quick Chat Bot Interface Example */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold mb-2 text-[#1a1a1a]">
            Ask the Legal Chat Bot
          </h2>
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Type your legal question..."
              className="flex-1 border border-[#d4a017] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4a017] text-[#1a1a1a] bg-[#fff8eb]"
            />
            <button
              type="submit"
              className="bg-[#d4a017] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b17d25] transition"
            >
              Ask
            </button>
          </form>
        </motion.section>
      </main>
    </div>
  );
}
