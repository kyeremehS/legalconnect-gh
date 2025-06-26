"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function UserSettings() {
  // Account info state
  const [account, setAccount] = useState({
    email: "user@email.com",
    phone: "+233 123 456 789",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  // Privacy state
  const [profileVisible, setProfileVisible] = useState(true);

  // Handlers
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved!");
  };

  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg border border-[#d4a017]/30 p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold text-[#d4a017] mb-4">Settings</h1>
        <p className="text-gray-700 text-lg mb-6">
          Manage your account and preferences
        </p>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Account Settings */}
          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#d4a017]">
              Account
            </h2>
            <div className="mb-4">
              <label
                className="block mb-1 font-medium text-[#d4a017]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={account.email}
                onChange={handleAccountChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#F7F9FC] placeholder-gray-600"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 font-medium text-[#d4a017]"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={account.phone}
                onChange={handleAccountChange}
                placeholder="Enter your phone number"
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#F7F9FC] placeholder-gray-600"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 font-medium text-[#d4a017]"
                htmlFor="password"
              >
                Change Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={account.password}
                onChange={handleAccountChange}
                placeholder="Current password"
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a017] mb-2 bg-[#F7F9FC] placeholder-gray-600"
              />
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={account.newPassword}
                onChange={handleAccountChange}
                placeholder="New password"
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a017] mb-2 bg-[#F7F9FC] placeholder-gray-600"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={account.confirmPassword}
                onChange={handleAccountChange}
                placeholder="Confirm new password"
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#F7F9FC] placeholder-gray-600"
              />
            </div>
          </section>

          {/* Notification Preferences */}
          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#d4a017]">
              Notification Preferences
            </h2>
            <label className="flex items-center gap-2 mb-2 text-gray-800">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() =>
                  setNotifications((n) => ({ ...n, email: !n.email }))
                }
                className="accent-[#d4a017]"
              />
              Email Notifications
            </label>
            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() =>
                  setNotifications((n) => ({ ...n, sms: !n.sms }))
                }
                className="accent-[#d4a017]"
              />
              SMS Notifications
            </label>
          </section>

          {/* Privacy Settings */}
          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#d4a017]">
              Privacy
            </h2>
            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                checked={profileVisible}
                onChange={() => setProfileVisible((v) => !v)}
                className="accent-[#d4a017]"
              />
              Profile visible to others
            </label>
          </section>

          {/* Danger Zone */}
          <section>
            <h2 className="text-lg font-semibold mb-2 text-red-700">
              Danger Zone
            </h2>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              onClick={() =>
                alert("Account deletion not implemented in this demo.")
              }
            >
              Delete Account
            </button>
          </section>

          <div className="flex gap-4 justify-end pt-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#d4a017] to-[#ffd700] text-white px-6 py-2 rounded-full font-semibold shadow hover:from-[#ffd700] hover:to-[#d4a017] hover:scale-105 transition"
            >
              Save Changes
            </button>
            <button
              type="reset"
              className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded hover:bg-gray-300 transition"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
