"use client";
import React, { useState } from "react";
import ChatButton from "../../components/ChatButton";
import ChatModal from "../../components/ChatModal";

// Define a type for legal topics
type Topic = {
  title: string;
  description: string;
  link: string;
};

// Example topics for legal education
const topics: Topic[] = [
  {
    title: "Land Rights",
    description:
      "Understand your rights and responsibilities regarding land ownership and tenancy.",
    link: "/legal-content/land-rights",
  },
  {
    title: "Family Law",
    description:
      "Learn about marriage, divorce, child custody, and related legal matters.",
    link: "/legal-content/family-law",
  },
  {
    title: "Employment Law",
    description: "Know your rights as an employee or employer in Ghana.",
    link: "/legal-content/employment-law",
  },
];

export default function UserEducation() {
  // State to control chat modal visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sidebar links (can be expanded as needed)
  const sidebarLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Land Rights", href: "/legal-content/land-rights" },
    { label: "Family Law", href: "/legal-content/family-law" },
    { label: "Employment Law", href: "/legal-content/employment-law" },
    { label: "Contact a Lawyer", href: "#contact" },
    // Add this link to return to the user's main page
    { label: "Back to User Home", href: "/User-landing" },
  ];

  return (
    <main className="min-h-screen bg-[#F7F9FC] py-8 px-4 relative">
      {/* Overlay for mobile when chat is open */}
      {isChatOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      <div
        className={`flex transition-all duration-300 ${
          isChatOpen ? "md:mr-[420px]" : ""
        }`}
      >
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 mr-8 bg-white rounded-lg shadow h-fit sticky top-8 self-start p-6">
          <nav aria-label="Sidebar navigation">
            <ul className="space-y-4">
              {sidebarLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block text-[#1A237E] font-medium hover:text-[#F9A825] focus:outline-none focus:ring-2 focus:ring-[#F9A825] rounded transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#1A237E]">
              Legal Education Center
            </h1>
            <p className="text-lg text-gray-700 mt-2">
              Empowering you with knowledge about the law in Ghana
            </p>
          </header>

          {/* Search Bar for Accessibility */}
          <section className="mb-8" aria-label="Search legal topics">
            <label htmlFor="search" className="sr-only">
              Search legal topics
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search legal topics..."
              className="w-full p-3 border text-gray-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
              aria-label="Search legal topics"
            />
          </section>

          {/* Topics Section */}
          <section
            className="mb-12 grid md:grid-cols-3 gap-6"
            aria-label="Legal topics"
          >
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow"
                tabIndex={0}
                aria-label={topic.title}
              >
                <h2 className="font-semibold text-lg mb-2 text-[#1A237E]">
                  {topic.title}
                </h2>
                <p className="text-gray-700">{topic.description}</p>
                <a
                  href={topic.link}
                  className="text-[#F9A825] hover:underline mt-2 inline-block font-medium focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
                  tabIndex={0}
                >
                  Learn more
                </a>
              </div>
            ))}
          </section>

          {/* Accessibility and Legal Disclaimer */}
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>
              This page provides general information, not legal advice. For
              specific advice, please consult a qualified lawyer.
            </p>
          </footer>
        </div>
      </div>

      {/* ChatButton (fixed at bottom right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatButton onClick={() => setIsChatOpen(true)} />
      </div>

      {/* ChatModal (responsive) */}
      {isChatOpen && (
        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </main>
  );
}
