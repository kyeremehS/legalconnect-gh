"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Trash2,
  X,
  Eye,
  EyeOff,
  Settings,
  Filter,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "success",
    title: "Appointment Confirmed",
    message:
      "Your appointment with Ama Kwarteng, Esq. is confirmed for tomorrow at 10:00 AM.",
    time: "2 hours ago",
    read: false,
    category: "appointment",
  },
  {
    id: 2,
    type: "info",
    title: "New Legal Video Available",
    message: "A new video on Land Law has been added to your library.",
    time: "5 hours ago",
    read: false,
    category: "content",
  },
  {
    id: 3,
    type: "warning",
    title: "Appointment Pending",
    message:
      "Your appointment request with Kojo Asante, Esq. is pending approval.",
    time: "1 day ago",
    read: true,
    category: "appointment",
  },
  {
    id: 4,
    type: "reminder",
    title: "Upcoming Appointment",
    message:
      "Reminder: You have an appointment with Efua Boateng, Esq. in 2 days.",
    time: "3 days ago",
    read: true,
    category: "reminder",
  },
  {
    id: 5,
    type: "info",
    title: "Quiz Score Achievement",
    message: "Congratulations! You scored 95% on the Family Law quiz.",
    time: "1 week ago",
    read: false,
    category: "achievement",
  },
  {
    id: 6,
    type: "success",
    title: "Document Downloaded",
    message: "Your Marriage Certificate template has been downloaded successfully.",
    time: "2 weeks ago",
    read: true,
    category: "document",
  },
];

function getIcon(type: string) {
  switch (type) {
    case "success":
      return <CheckCircle className="text-green-500 w-5 h-5" />;
    case "warning":
      return <AlertTriangle className="text-orange-500 w-5 h-5" />;
    case "reminder":
      return <Calendar className="text-[#d4a017] w-5 h-5" />;
    default:
      return <Bell className="text-blue-500 w-5 h-5" />;
  }
}

function getBorderColor(type: string) {
  switch (type) {
    case "success":
      return "border-l-green-500";
    case "warning":
      return "border-l-orange-500";
    case "reminder":
      return "border-l-[#d4a017]";
    default:
      return "border-l-blue-500";
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter = filter === "all" || notification.category === filter;
    const matchesReadFilter = !showOnlyUnread || !notification.read;
    return matchesFilter && matchesReadFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#d4a017] to-[#b8941f] rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 text-sm">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowOnlyUnread(!showOnlyUnread)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                  showOnlyUnread
                    ? "bg-[#d4a017] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {showOnlyUnread ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showOnlyUnread ? "Show All" : "Unread Only"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="bg-[#d4a017] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#b8941f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark All Read
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearAll}
                disabled={notifications.length === 0}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </motion.button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto">
            {[
              { key: "all", label: "All", count: notifications.length },
              { key: "appointment", label: "Appointments", count: notifications.filter(n => n.category === "appointment").length },
              { key: "content", label: "Content", count: notifications.filter(n => n.category === "content").length },
              { key: "reminder", label: "Reminders", count: notifications.filter(n => n.category === "reminder").length },
              { key: "achievement", label: "Achievements", count: notifications.filter(n => n.category === "achievement").length },
              { key: "document", label: "Documents", count: notifications.filter(n => n.category === "document").length },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ y: -2 }}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filter === tab.key
                    ? "bg-[#d4a017] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:text-[#d4a017] hover:bg-[#d4a017]/5"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    filter === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {showOnlyUnread ? "No unread notifications" : "No notifications found"}
              </h3>
              <p className="text-gray-600 text-center max-w-sm">
                {showOnlyUnread 
                  ? "You're all caught up! Check back later for new updates."
                  : "When you receive notifications, they'll appear here."
                }
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-2xl shadow-sm border-l-4 ${getBorderColor(notification.type)} p-6 hover:shadow-md transition-all group relative ${
                      !notification.read ? "ring-2 ring-[#d4a017]/10" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className={`font-semibold ${
                                !notification.read ? "text-gray-900" : "text-gray-700"
                              }`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <span className="bg-[#d4a017] text-white text-xs font-medium px-2 py-1 rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{notification.time}</span>
                              <span className="capitalize">{notification.category}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => markAsRead(notification.id)}
                                className="p-2 bg-[#d4a017]/10 text-[#d4a017] rounded-lg hover:bg-[#d4a017]/20 transition-colors"
                                title="Mark as read"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteNotification(notification.id)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                              title="Delete notification"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}