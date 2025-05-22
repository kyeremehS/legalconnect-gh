"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface SidebarLayoutProps {
  children: ReactNode;
  navItems: { name: string; href: string; available?: boolean }[];
  active?: string; // Optionally highlight the current page
  logoSrc?: string;
  brand?: string;
}

export default function SidebarLayout({
  children,
  navItems,
  active,
  logoSrc = "/legalb.jpg",
  brand = "LegalConnect",
}: SidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`
          bg-[#1A237E] text-white w-64 p-6 fixed top-0 left-0 h-screen z-40 transform transition-transform duration-200
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex flex-col gap-6
        `}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden mb-4 text-white"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ✕
        </button>
        <div className="flex items-center gap-3 mb-8">
          <Image src={logoSrc} alt="Logo" width={40} height={40} className="rounded-full" />
          <span className="text-xl font-bold">{brand}</span>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.available === false ? "#" : item.href}
              className={`block px-4 py-2 rounded transition ${
                active === item.name
                  ? "bg-blue-700"
                  : item.available === false
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#283593]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Hamburger Button (visible on mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1A237E] text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Open sidebar"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <main className="flex-1 p-8 md:ml-64">{children}</main>
    </div>
  );
}