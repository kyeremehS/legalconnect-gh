"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone,
  Lock,
  Globe,
  Calendar,
  Clock,
  FileText,
  CreditCard,
  Settings as SettingsIcon,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import LawyerAuthWrapper from "../../components/auth/LawyerAuthWrapper";

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  appointmentReminders: boolean;
  clientMessages: boolean;
  marketingEmails: boolean;
}

interface AccountSettings {
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'clients-only' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  allowDirectBooking: boolean;
  showReviews: boolean;
}

interface PreferenceSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
}

export default function LawyerSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'preferences' | 'billing'>('account');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Account state
  const [account, setAccount] = useState<AccountSettings>({
    email: user?.email || "lawyer@example.com",
    phone: "+233 123 456 789",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    clientMessages: true,
    marketingEmails: false,
  });

  // Privacy state
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    allowDirectBooking: true,
    showReviews: true,
  });

  // Preference state
  const [preferences, setPreferences] = useState<PreferenceSettings>({
    language: 'English',
    timezone: 'GMT+0',
    dateFormat: 'DD/MM/YYYY',
    currency: 'GHS',
    workingHours: {
      start: '09:00',
      end: '17:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
  });

  // Handlers
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkingDayToggle = (day: string) => {
    setPreferences(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        days: prev.workingHours.days.includes(day)
          ? prev.workingHours.days.filter(d => d !== day)
          : [...prev.workingHours.days, day]
      }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage("Settings saved successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion functionality would be implemented here.");
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ] as const;

  return (
    <LawyerAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link 
                  href="/Lawyer"
                  className="p-2 text-gray-400 hover:text-[#d4a017] hover:bg-amber-50 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-[#1a1a1a]">Settings</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-3">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#d4a017] text-white'
                          : 'text-gray-700 hover:text-[#d4a017] hover:bg-amber-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="mt-8 lg:mt-0 lg:col-span-9">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                {/* Success Message */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="text-green-800 text-sm font-medium">{successMessage}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSave}>
                  {/* Account Tab */}
                  {activeTab === 'account' && (
                    <div>
                      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">Account Information</h2>
                      
                      <div className="space-y-6">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={account.email}
                              onChange={handleAccountChange}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={account.phone}
                              onChange={handleAccountChange}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>

                        {/* Password Change */}
                        <div className="border-t pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Security</h3>
                            {!showPasswordSection && (
                              <button
                                type="button"
                                onClick={() => setShowPasswordSection(true)}
                                className="px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b17d25] transition-colors flex items-center gap-2"
                              >
                                <Lock className="w-4 h-4" />
                                Change Password
                              </button>
                            )}
                          </div>
                          
                          {showPasswordSection ? (
                            <div className="space-y-4">
                              <div className="flex justify-end mb-4">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowPasswordSection(false);
                                    setAccount(prev => ({
                                      ...prev,
                                      currentPassword: "",
                                      newPassword: "",
                                      confirmPassword: ""
                                    }));
                                  }}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Current Password
                                </label>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    name="currentPassword"
                                    value={account.currentPassword}
                                    onChange={handleAccountChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                                    placeholder="Enter current password"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  New Password
                                </label>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={account.newPassword}
                                    onChange={handleAccountChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                                    placeholder="Enter new password"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Confirm New Password
                                </label>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={account.confirmPassword}
                                    onChange={handleAccountChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                                    placeholder="Confirm new password"
                                  />
                                </div>
                              </div>
                              
                              <div className="flex gap-3 pt-4">
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Handle password change logic here
                                    console.log("Password change submitted");
                                    setShowPasswordSection(false);
                                    setSuccessMessage("Password updated successfully!");
                                    setTimeout(() => setSuccessMessage(null), 3000);
                                  }}
                                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                  Update Password
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowPasswordSection(false);
                                    setAccount(prev => ({
                                      ...prev,
                                      currentPassword: "",
                                      newPassword: "",
                                      confirmPassword: ""
                                    }));
                                  }}
                                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-600">Your password is secure. Click "Change Password" above to update it.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div>
                      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">Notification Preferences</h2>
                      
                      <div className="space-y-6">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-3">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {getNotificationDescription(key as keyof NotificationSettings)}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#d4a017]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4a017]"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Privacy Tab */}
                  {activeTab === 'privacy' && (
                    <div>
                      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">Privacy Settings</h2>
                      
                      <div className="space-y-6">
                        {/* Profile Visibility */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Profile Visibility
                          </label>
                          <div className="space-y-2">
                            {['public', 'clients-only', 'private'].map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="radio"
                                  name="profileVisibility"
                                  value={option}
                                  checked={privacy.profileVisibility === option}
                                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                  className="w-4 h-4 text-[#d4a017] border-gray-300 focus:ring-[#d4a017]"
                                />
                                <span className="ml-2 text-sm text-gray-700 capitalize">
                                  {option.replace('-', ' ')}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Contact Information Visibility */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Show email address</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={privacy.showEmail}
                                onChange={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#d4a017]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4a017]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Show phone number</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={privacy.showPhone}
                                onChange={() => handlePrivacyChange('showPhone', !privacy.showPhone)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#d4a017]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4a017]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Allow direct booking</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={privacy.allowDirectBooking}
                                onChange={() => handlePrivacyChange('allowDirectBooking', !privacy.allowDirectBooking)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#d4a017]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4a017]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Show reviews and ratings</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={privacy.showReviews}
                                onChange={() => handlePrivacyChange('showReviews', !privacy.showReviews)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#d4a017]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4a017]"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preferences Tab */}
                  {activeTab === 'preferences' && (
                    <div>
                      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">Preferences</h2>
                      
                      <div className="space-y-6">
                        {/* Language & Region */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Language
                            </label>
                            <select
                              name="language"
                              value={preferences.language}
                              onChange={handlePreferenceChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                            >
                              <option value="English">English</option>
                              <option value="Twi">Twi</option>
                              <option value="French">French</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Timezone
                            </label>
                            <select
                              name="timezone"
                              value={preferences.timezone}
                              onChange={handlePreferenceChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                            >
                              <option value="GMT+0">GMT+0 (Ghana)</option>
                              <option value="GMT+1">GMT+1</option>
                              <option value="GMT-5">GMT-5 (EST)</option>
                            </select>
                          </div>
                        </div>

                        {/* Date & Currency */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date Format
                            </label>
                            <select
                              name="dateFormat"
                              value={preferences.dateFormat}
                              onChange={handlePreferenceChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                            >
                              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Currency
                            </label>
                            <select
                              name="currency"
                              value={preferences.currency}
                              onChange={handlePreferenceChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                            >
                              <option value="GHS">GHS (Ghanaian Cedi)</option>
                              <option value="USD">USD (US Dollar)</option>
                              <option value="EUR">EUR (Euro)</option>
                            </select>
                          </div>
                        </div>

                        {/* Working Hours */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Working Hours</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time
                              </label>
                              <input
                                type="time"
                                value={preferences.workingHours.start}
                                onChange={(e) => setPreferences(prev => ({
                                  ...prev,
                                  workingHours: { ...prev.workingHours, start: e.target.value }
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Time
                              </label>
                              <input
                                type="time"
                                value={preferences.workingHours.end}
                                onChange={(e) => setPreferences(prev => ({
                                  ...prev,
                                  workingHours: { ...prev.workingHours, end: e.target.value }
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Working Days
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => handleWorkingDayToggle(day)}
                                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                    preferences.workingHours.days.includes(day)
                                      ? 'bg-[#d4a017] text-white'
                                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  }`}
                                >
                                  {day.substring(0, 3)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing Tab */}
                  {activeTab === 'billing' && (
                    <div>
                      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">Billing & Subscription</h2>
                      
                      <div className="space-y-6">
                        {/* Current Plan */}
                        <div className="bg-gradient-to-r from-[#d4a017] to-[#f9a825] p-6 rounded-lg text-white">
                          <h3 className="text-lg font-semibold mb-2">Current Plan: Professional</h3>
                          <p className="text-sm opacity-90 mb-4">
                            Unlimited client appointments, document management, and priority support.
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">GHS 200/month</span>
                            <button className="bg-white text-[#d4a017] px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                              Manage Plan
                            </button>
                          </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                          <div className="border border-gray-300 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-8 h-8 text-gray-400" />
                                <div>
                                  <p className="font-medium text-gray-900">**** **** **** 1234</p>
                                  <p className="text-sm text-gray-500">Expires 12/25</p>
                                </div>
                              </div>
                              <button className="text-[#d4a017] hover:text-[#b17d25] font-medium">
                                Update
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Billing History */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Invoices</h3>
                          <div className="space-y-3">
                            {[
                              { date: '2024-01-01', amount: 'GHS 200', status: 'Paid' },
                              { date: '2023-12-01', amount: 'GHS 200', status: 'Paid' },
                              { date: '2023-11-01', amount: 'GHS 200', status: 'Paid' },
                            ].map((invoice, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium text-gray-900">{invoice.date}</p>
                                    <p className="text-sm text-gray-500">{invoice.amount}</p>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  invoice.status === 'Paid' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {invoice.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      {activeTab === 'account' && (
                        <button
                          type="button"
                          onClick={handleDeleteAccount}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b17d25] disabled:opacity-50 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </LawyerAuthWrapper>
  );

  function getNotificationDescription(key: keyof NotificationSettings): string {
    const descriptions = {
      emailNotifications: 'Receive general updates via email',
      smsNotifications: 'Get SMS alerts for important updates',
      pushNotifications: 'Browser push notifications',
      appointmentReminders: 'Reminders for upcoming appointments',
      clientMessages: 'Notifications when clients send messages',
      marketingEmails: 'Promotional emails and product updates',
    };
    return descriptions[key];
  }
}
