"use client";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    name: "Watch Legal Videos",
    description: "Browse and watch legal education videos.",
    href: "/user/videos",
    icon: "/video.png",
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Book Appointment",
    description: "Schedule a meeting with a lawyer.",
    href: "/user/appointments",
    icon: "/appointment-book.png",
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Message & Call Lawyer",
    description: "Chat or call your lawyer directly.",
    href: "/user/messages",
    icon: "/phone.png",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    name: "Profile Settings",
    description: "Update your personal information.",
    href: "/user/profile",
    icon: "/user-setting.png",
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Notifications",
    description: "View your latest notifications.",
    href: "/user/notifications",
    icon: "/bell.png",
    color: "bg-pink-100 text-pink-800",
  },
  {
    name: "Legal Education",
    description: "Access articles and resources.",
    href: "/user/education",
    icon: "/law.png",
    color: "bg-orange-100 text-orange-800",
  },
  {
    name: "Legal Chat Bot",
    description: "Ask legal questions and get instant answers.",
    href: "/legal-chatbot",
    icon: "/chat-bot.png",
    color: "bg-indigo-100 text-indigo-800",
  },
];

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-[#1A237E] text-white w-64 p-6 hidden md:flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/legalb.jpg"
            alt="LegalConnect Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold">LegalConnect</span>
        </div>
        <nav className="flex flex-col gap-3">
          <Link
            href="/User-landing"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Dashboard
          </Link>
          <Link
            href="/user/videos"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Legal Videos
          </Link>
          <Link
            href="/user/appointments"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Appointments
          </Link>
          <Link
            href="/user/messages"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Messages & Calls
          </Link>
          <Link
            href="/user/notifications"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Notifications
          </Link>
          <Link
            href="/user/education"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Education
          </Link>
          <Link
            href="/user/profile"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Profile
          </Link>
          <Link
            href="/user/settings"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Settings
          </Link>
          <Link
            href="/legal-chatbot"
            className="hover:bg-[#283593] px-4 py-2 rounded transition"
          >
            Legal Chat Bot
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1A237E]">
              Welcome, User!
            </h1>
            <p className="text-gray-600 mt-1">
              Your legal tools and resources in one place.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/user/settings"
              className="bg-[#F9A825] text-[#1A237E] px-4 py-2 rounded font-semibold hover:bg-[#fbc02d] transition"
            >
              Settings
            </Link>
            <button className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </header>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className={`rounded-xl p-6 shadow bg-white hover:shadow-lg transition flex flex-col gap-3 border-t-4 ${feature.color}`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={feature.icon}
                  alt={feature.name}
                  width={32}
                  height={32}
                />
                <span className="text-lg font-bold">{feature.name}</span>
              </div>
              <p className="text-gray-700 text-sm">{feature.description}</p>
            </Link>
          ))}
        </section>

        {/* Notifications Example */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2 text-[#1A237E]">
            Recent Notifications
          </h2>
          <ul className="bg-white rounded-lg shadow p-4 space-y-2">
            <li className="text-gray-700">
              Your appointment with Lawyer Ama is confirmed for tomorrow at 2pm.
            </li>
            <li className="text-gray-700">
              New legal video: "Understanding Your Rights in Ghana" is now
              available.
            </li>
            <li className="text-gray-700">Profile updated successfully.</li>
          </ul>
        </section>

        {/* Quick Chat Bot Interface Example */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2 text-[#1A237E]">
            Ask the Legal Chat Bot
          </h2>
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Type your legal question..."
              className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#1A237E] text-[#0d1b2a]"
            />
            <button
              type="submit"
              className="bg-[#1A237E] text-white px-6 py-2 rounded font-semibold hover:bg-[#283593] transition"
            >
              Ask
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}