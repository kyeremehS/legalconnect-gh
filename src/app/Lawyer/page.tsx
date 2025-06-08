"use client";

import { useState } from "react";
import Link from "next/link";

interface User {
  displayName: string;
  role: string;
}

const LawyerDashboard: React.FC = () => {
  const [user] = useState<User>({ displayName: "Ama Kwarteng", role: "lawyer" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`bg-blue-800 text-blue w-64 p-4 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <h2 className="text-xl font-bold mb-4">Ghana Legal AI</h2>
        <nav className="space-y-2">
          <Link
            href="/Lawyerdashboard"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Dashboard
          </Link>
          <Link
            href="/lawyer/appointments"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Appointments
          </Link>
          <Link
            href="/lawyer/messages"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Messages & Calls
          </Link>
          <Link
            href="/lawyer/videos"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Videos
          </Link>
          <Link
            href="/lawyer/engagement"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Engagement
          </Link>
          <Link
            href="/lawyer/profile"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Profile
          </Link>
          <Link
            href="/lawyer/settings"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Settings
          </Link>
        </nav>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden bg-blue-500 text-white p-2 fixed top-4 left-4"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#000814]">
            {/* Updated color */}
            Welcome, Lawyer {user.displayName}
          </h1>
          <div className="space-x-4">
            <button className="bg-blue-500 text-blue px-4 py-2 rounded">
              Settings
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </header>

        {/* Example Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-[#000814]">Active Clients</h3> {/* Updated color */}
            <p className="text-2xl text-[#000814]">5</p> {/* Updated color */}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-[#000814]">Upcoming Meetings</h3> {/* Updated color */}
            <p className="text-2xl text-[#000814]">2</p> {/* Updated color */}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-[#000814]">Recent Messages</h3> {/* Updated color */}
            <p className="text-2xl text-[#000814]">3</p> {/* Updated color */}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-[#000814]">Quick Actions</h2>
          <div className="space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Go Online
            </button>
            <Link
              href="/lawyer/profile"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Profile
            </Link>
            <Link
              href="/lawyer/videos"
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Upload New Tip
            </Link>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-[#000814]">Notifications</h2>
          <ul className="bg-white p-4 rounded shadow space-y-2">
            <li className="text-[#000814]">New client request (10 min ago)</li>
            <li className="text-[#000814]">Schedule updated (Tomorrow, 2 PM)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;