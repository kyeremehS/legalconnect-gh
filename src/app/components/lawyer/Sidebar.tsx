"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/Lawyer", icon: Activity },
  { name: "Appointments", href: "/Lawyer/appointments", icon: Calendar },
  {
    name: "Messages & Calls",
    href: "/Lawyer/messages-calls",
    icon: MessageSquare,
  },
  { name: "Videos", href: "/Lawyer/create-content", icon: FileText },
  { name: "Clients", href: "#", icon: Users },
  { name: "Profile", href: "/Lawyer/profile", icon: Users },
  { name: "Settings", href: "#", icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:hidden z-50">
        <h1 className="text-xl font-bold text-[#d4a017]">LegalConnect</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
        transition-transform duration-300 ease-in-out
        z-40
      `}
      >
        <aside className="w-64 h-full bg-white border-r border-gray-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-100 hidden lg:block">
            <h1 className="text-2xl font-bold text-[#d4a017]">LegalConnect</h1>
          </div>

          {/* Add padding top for mobile to account for header */}
          <nav className="mt-16 lg:mt-6 px-3 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-[#fff8eb] hover:text-[#d4a017] transition-all group mb-1"
              >
                <item.icon className="w-5 h-5 group-hover:text-[#d4a017]" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
