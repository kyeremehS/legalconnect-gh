"use client";
import React, { useState, useEffect } from "react";

export default function LawyerSettings() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Apply theme to <body>
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  // Notification state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  // Account info state
  const [account, setAccount] = useState({
    email: "lawyer@email.com",
    phone: "+233 123 456 789",
    password: "",
    newPassword: "",
    confirmPassword: "",
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
    <main className="min-h-screen bg-gradient-to-br from-[#F7F9FC] via-[#e3e8f7] to-[#cfd8fd] py-8 px-4 flex justify-center">
      <div
        className={`w-full max-w-2xl ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-700"
        } rounded-lg shadow p-8`}
      >
        <h1 className="text-3xl font-bold text-[#1A237E] mb-4">
          Page Title
        </h1>
        <p className="text-gray-700 text-lg">
          Welcome to your stylish page!
        </p>

        {/* Theme Toggle */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Appearance</h2>
          <div className="flex items-center gap-4">
            <span>Mode:</span>
            <button
              className={`px-4 py-2 rounded font-semibold border ${
                theme === "light"
                  ? "bg-[#F9A825] text-[#1A237E]"
                  : "bg-gray-700 text-white"
              }`}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle dark/light mode"
            >
              {theme === "light"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"}
            </button>
          </div>
        </section>

        {/* Account Settings */}
        <form onSubmit={handleSave} className="mb-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-2">Account</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={account.email}
                onChange={handleAccountChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={account.phone}
                onChange={handleAccountChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="password">
                Change Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={account.password}
                onChange={handleAccountChange}
                placeholder="Current password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F9A825] mb-2"
              />
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={account.newPassword}
                onChange={handleAccountChange}
                placeholder="New password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F9A825] mb-2"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={account.confirmPassword}
                onChange={handleAccountChange}
                placeholder="Confirm new password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
              />
            </div>
          </section>

          {/* Notification Preferences */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Notification Preferences
            </h2>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() =>
                  setNotifications((n) => ({ ...n, email: !n.email }))
                }
                className="accent-[#F9A825]"
              />
              Email Notifications
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() =>
                  setNotifications((n) => ({ ...n, sms: !n.sms }))
                }
                className="accent-[#F9A825]"
              />
              SMS Notifications
            </label>
          </section>

          {/* Privacy Settings */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Privacy</h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profileVisible}
                onChange={() => setProfileVisible((v) => !v)}
                className="accent-[#F9A825]"
              />
              Profile visible to clients
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

          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#F9A825] to-[#FFD600] text-[#1A237E] px-6 py-2 rounded-full font-semibold shadow hover:from-[#FFD600] hover:to-[#F9A825] hover:scale-105 transition"
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
      </div>
    </main>
  );
}
