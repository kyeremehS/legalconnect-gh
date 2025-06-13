"use client"; // pages/dashboard.js

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  UserCircle,
  Calendar,
  MessageSquare,
  Video,
  Search,
} from "lucide-react";

export default function Dashboard() {
  const user = {
    name: "Samuel",
    unreadMessages: 5,
    appointments: 2,
    aiQueries: 3,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-blue-700">
          Ghana Legal AI
        </h1>
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link href="/dashboard">Home</Link>
          <Link href="/lawyers">Lawyers</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/appointments">Appointments</Link>
          <Link href="/resources">Resources</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="relative">
            <span role="img" aria-label="Notifications">
              🔔
            </span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {user.unreadMessages}
            </span>
          </button>
          <div className="flex items-center bg-blue-600 text-white px-4 py-1 rounded-full">
            <UserCircle className="mr-2" size={20} /> {user.name}
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <section className="p-10 text-center bg-blue-100 rounded-b-3xl shadow-inner">
        <h2 className="text-4xl font-bold text-blue-900 mb-2">
          Welcome back, {user.name}!
        </h2>
        <p className="text-gray-700 text-lg">How can we help you today?</p>
        <div className="mt-6 flex justify-center gap-6">
          <Link
            href="/lawyers"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
          >
            Find a Lawyer
          </Link>
          <Link
            href="/chatbot"
            className="bg-white border-2 border-blue-600 hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-xl transition"
          >
            Ask AI Legal Assistant
          </Link>
        </div>
      </section>

      {/* Search Bar */}
      <section className="p-6 flex justify-center">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a lawyer, legal issue, or resource..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {[
          {
            label: "Book a Consultation",
            href: "/appointments",
            icon: <Calendar />,
          },
          {
            label: "View Appointments",
            href: "/appointments",
            icon: <Calendar />,
          },
          { label: "Continue Chat", href: "/chat", icon: <MessageSquare /> },
          { label: "Watch Legal Tips", href: "/videos", icon: <Video /> },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="bg-white shadow-md p-5 rounded-2xl flex flex-col items-center justify-center hover:bg-blue-50 transition text-center"
          >
            <div className="text-blue-600 mb-2">{action.icon}</div>
            <span className="font-medium text-gray-800">{action.label}</span>
          </Link>
        ))}
      </section>

      {/* Featured Lawyers */}
      <section className="p-6 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Featured Lawyers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="h-20 w-20 bg-gray-200 rounded-full mb-4" />
              <h4 className="font-bold text-lg text-gray-800">Lawyer {i}</h4>
              <p className="text-sm text-gray-500">Specialty: Family Law</p>
              <p className="text-yellow-500 mt-1">⭐ 4.9</p>
              <Link
                href="/lawyers/1"
                className="mt-3 text-blue-600 hover:underline"
              >
                Book
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Summary */}
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-md text-center">
          <h5 className="text-xl font-bold">Appointments</h5>
          <p className="text-3xl mt-2">{user.appointments}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-md text-center">
          <h5 className="text-xl font-bold">Unread Messages</h5>
          <p className="text-3xl mt-2">{user.unreadMessages}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-2xl shadow-md text-center">
          <h5 className="text-xl font-bold">AI Queries</h5>
          <p className="text-3xl mt-2">{user.aiQueries}</p>
        </div>
      </section>

      {/* Legal Resources */}
      <section className="p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Legal Resources
        </h3>
        <ul className="space-y-2 list-disc list-inside text-gray-700">
          <li>
            <Link
              href="/resources/know-your-rights"
              className="hover:text-blue-600"
            >
              Know Your Rights
            </Link>
          </li>
          <li>
            <Link href="/resources/popular" className="hover:text-blue-600">
              Popular Articles
            </Link>
          </li>
          <li>
            <Link
              href="/resources/everyday-law"
              className="hover:text-blue-600"
            >
              Law for Everyday People
            </Link>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-blue-800 text-white text-center text-sm mt-10 rounded-t-3xl">
        © 2025 Ghana Legal AI — All rights reserved.
      </footer>
    </div>
  );
}
