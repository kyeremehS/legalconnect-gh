"use client";

import { useState } from "react";
import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";

const navItems = [
  { name: "Dashboard", href: "/Lawyer" },
  { name: "Appointments", href: "/lawyer/appointments" },
  { name: "Messages & Calls", href: "/Lawyer/messages-calls" },
  { name: "Videos", href: "/Lawyer/create-content" },
  { name: "Engagement", href: "/lawyer/engagement" },
  { name: "Profile", href: "/lawyer/profile" },
  { name: "Settings", href: "/lawyer/settings" },
];

interface User {
  displayName: string;
  role: string;
}

const LawyerDashboard: React.FC = () => {
  const [user] = useState<User>({ displayName: "Ama Kwarteng", role: "lawyer" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return <div>Loading...</div>;

  return (
    <SidebarLayout navItems={navItems} active="Dashboard">
      <div className="min-h-screen bg-gray-100 flex">
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
    </SidebarLayout>
  );
};

export default LawyerDashboard;