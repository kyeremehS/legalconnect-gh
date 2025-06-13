"use client";

import { useState } from "react";
import Link from "next/link";
//import { useRouter } from "next/navigation";
import SidebarLayout from "@/components/SidebarLayout";

const navItems = [
  { name: "Dashboard", href: "/Lawyer" },
  { name: "Appointments", href: "/Lawyer/appointments" },
  { name: "Messages & Calls", href: "/Lawyer/messages-calls" },
  { name: "Videos", href: "/Lawyer/create-content" },
  { name: "Engagement", href: "/lawyer/engagement" },
  { name: "Profile", href: "/Lawyer/profile" },
  { name: "Settings", href: "/Lawyer/Seting" },
];

interface User {
  displayName: string;
  role: string;
}

const LawyerDashboard: React.FC = () => {
  const [user] = useState<User>({
    displayName: "Ama Kwarteng",
    role: "lawyer",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //const router = useRouter();

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
        <div className="flex-1 p-8 space-y-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-700">
              Welcome, Lawyer {user.displayName}
            </h1>
            <div className="space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Settings
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                //onClick={() => router.push("/")}
              >
                Logout
              </button>
            </div>
          </header>

          {/* Example Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded shadow space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Active Clients
              </h3>
              <p className="text-2xl text-gray-700">5</p>
            </div>
            <div className="bg-white p-6 rounded shadow space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Upcoming Meetings
              </h3>
              <p className="text-2xl text-gray-700">2</p>
            </div>
            <div className="bg-white p-6 rounded shadow space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Recent Messages
              </h3>
              <p className="text-2xl text-gray-700">3</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Quick Actions
            </h2>
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
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Notifications
            </h2>
            <ul className="bg-white p-6 rounded shadow space-y-2">
              <li className="text-gray-700">New client request (10 min ago)</li>
              <li className="text-gray-700">
                Schedule updated (Tomorrow, 2 PM)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default LawyerDashboard;
