"use client";

import { motion } from "framer-motion";
import { Settings, User, Lock, Bell } from "lucide-react";
import { useState } from "react";

const settingsSections = [
  {
    title: "Account",
    icon: User,
    items: [
      { label: "Name", value: "Ama Kwarteng" },
      { label: "Email", value: "ama.kwarteng@legalconnect.com" },
      { label: "Role", value: "Senior Legal Counsel" },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { label: "Password", value: "********" },
      { label: "Two-Factor Authentication", value: "Enabled" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Email Notifications", value: "On" },
      { label: "SMS Notifications", value: "Off" },
    ],
  },
];

export default function SettingsPage() {
  const [editSection, setEditSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <main className="p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#d4a017]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600">Manage your account preferences</p>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {settingsSections.map((section) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <section.icon className="w-6 h-6 text-[#d4a017]" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {section.title}
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-4"
                    >
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-500">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <button
                    className="px-4 py-2 bg-[#fff8eb] text-[#d4a017] rounded-lg hover:bg-[#d4a017] hover:text-white transition-colors font-medium"
                    onClick={() => setEditSection(section.title)}
                  >
                    Edit {section.title}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
