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
  User,
  Bell,
  Video,
  Phone,
  BookOpen,
  Bot,
  BarChart2,
  BookOpenText
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UserMenu } from "../customusermenu";

const lawyerNavItems = [
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
  { name: "Settings", href: "/Lawyer/profile-settings", icon: Settings },

];

const userNavItems = [
  { name: "Dashboard", href: "/User-landing", icon: Activity },
  { name: "Legal Directory", href: "/User-landing/network", icon: BookOpenText },
  { name: "Legal Resources", href: "User-landing/legal-content", icon: BookOpen },
  {
    name: "Message & Call",
    href: "/User-landing/user-message-call",
    icon: Phone,
  },
  {
    name: "Profile Settings",
    href: "/User-landing/profile-settings",
    icon: User,
  },
  { name: "Booking Appointments", href: "/User-landing/appointment-booking", icon: Calendar },
  { name: "Notifications", href: "/User-landing/notifications", icon: Bell },
  { name: "Settings", href: "/User-landing/profile-settings", icon: Settings },

   
];

const adminNavItems = [
  { name: "Dashboard", href: "/Admin", icon: Activity },
  { name: "User Management", href: "/Admin/user-management", icon: Users },
  { name: "Lawyers", href: "/Admin/lawyer-verification", icon: User },
  { name: "Case Oversight", href: "/Admin/case-oversight", icon: FileText },
  { name: "Billing & Reports", href: "/Admin/billing-report", icon: FileText },
  { name: "Platform Usage Analytics", href: "/Admin/platform-analytics", icon: BarChart2 },
  { name: "Content Management", href: "/Admin/content-manage", icon: BookOpen },
  { name: "Platform Settings", href: "/Admin/platform-settings", icon: Settings },
];

type SidebarProps = {
  role: "lawyer" | "user" | "admin";
};

export default function Sidebar({ role } : SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Choose nav items based on role
  const navItems =
    role === "lawyer"
      ? lawyerNavItems
      : role === "admin"
      ? adminNavItems
      : userNavItems;

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:hidden z-50">
        <h1 className="text-xl font-bold text-[#d4a017]">LegalConnect</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <div className="px-2 pt-2 items-center justify-center rounded-full font-semibold border border-[#d4a017] text-[#d4a017] bg-white hover:bg-[#d4a017] hover:text-white transition">
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          z-40
        `}
      >
        <div className="h-16 items-center px-6 border-b border-gray-100 lg:flex hidden">
          <h1 className="text-2xl font-bold text-[#d4a017]">LegalConnect</h1>
        </div>

        <nav className="mt-16 lg:mt-0 px-3">
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
