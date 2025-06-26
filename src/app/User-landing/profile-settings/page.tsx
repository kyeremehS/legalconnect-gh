"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+233 123 456 789",
    dob: "",
    gender: "",
    avatar: "",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: false,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setProfile((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password changed!");
  };

  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-[#d4a017]/30 p-8"
      >
        <h1 className="text-3xl font-bold text-[#d4a017] mb-8 text-center">
          Profile Settings
        </h1>
        {/* Profile Info */}
        <form onSubmit={handleSave} className="space-y-8">
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="avatar" className="cursor-pointer">
              <img
                src={profile.avatar || "/lawyer-icon.png"}
                alt="Profile avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#d4a017] mb-2 shadow"
              />
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
                aria-label="Upload profile picture"
              />
            </label>
            <span className="text-sm text-gray-600">Click to change photo</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-[#d4a017] mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-[#d4a017] mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block font-medium text-[#d4a017] mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-medium text-[#d4a017] mb-1"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={profile.dob}
                onChange={handleProfileChange}
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-medium text-[#d4a017] mb-1"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleProfileChange}
                className="w-full p-3 border border-[#d4a017]/30 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          {/* Notification Preferences */}
          <div>
            <h2 className="text-lg font-semibold text-[#d4a017] mb-2">
              Notification Preferences
            </h2>
            <div className="flex flex-col gap-2">
              <label className="inline-flex text-gray-700 items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={profile.emailNotifications}
                  onChange={handleProfileChange}
                  className="accent-[#d4a017] mr-2"
                />
                Email Notifications
              </label>
              <label className="inline-flex text-gray-700 items-center">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={profile.smsNotifications}
                  onChange={handleProfileChange}
                  className="accent-[#d4a017] mr-2"
                />
                SMS Notifications
              </label>
              <label className="inline-flex text-gray-700 items-center">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={profile.pushNotifications}
                  onChange={handleProfileChange}
                  className="accent-[#d4a017] mr-2"
                />
                Push Notifications
              </label>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="bg-[#d4a017] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#b17d25] transition"
            >
              Save Changes
            </button>
            <button
              type="reset"
              className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
          </div>
        </form>
        {/* Password Change */}
        <form
          onSubmit={handlePasswordSave}
          className="mt-10 space-y-4 border-t pt-8"
        >
          <h2 className="text-lg font-semibold text-[#d4a017] mb-2">
            Change Password
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Current Password */}
            <div>
              <label
                htmlFor="current"
                className="block font-medium text-[#d4a017] mb-1"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="current"
                  name="current"
                  type={showPassword.current ? "text" : "password"}
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-[#d4a017]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a017] text-[#03071e]"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#d4a017] focus:outline-none"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                  tabIndex={0}
                  aria-label={
                    showPassword.current ? "Hide password" : "Show password"
                  }
                >
                  {showPassword.current ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* New Password */}
            <div>
              <label
                htmlFor="new"
                className="block font-medium text-[#d4a017] mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="new"
                  name="new"
                  type={showPassword.new ? "text" : "password"}
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-[#d4a017]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#d4a017] focus:outline-none"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      new: !prev.new,
                    }))
                  }
                  tabIndex={0}
                  aria-label={
                    showPassword.new ? "Hide password" : "Show password"
                  }
                >
                  {showPassword.new ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirm"
                className="block font-medium text-[#d4a017] mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  name="confirm"
                  type={showPassword.confirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-[#d4a017]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#d4a017] focus:outline-none"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  tabIndex={0}
                  aria-label={
                    showPassword.confirm ? "Hide password" : "Show password"
                  }
                >
                  {showPassword.confirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="bg-[#d4a017] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#b17d25] transition"
            >
              Change Password
            </button>
          </div>
        </form>
        {/* Danger Zone */}
        <div className="mt-10 border-t pt-8">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Danger Zone
          </h2>
          <button
            className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={() =>
              alert("Account deletion not implemented in this demo.")
            }
          >
            Delete Account
          </button>
        </div>
      </motion.div>
    </main>
  );
}
