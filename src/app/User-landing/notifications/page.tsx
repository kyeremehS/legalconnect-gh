"use client";
import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Trash2,
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
  },
  {
    id: 2,
    type: "info",
    title: "New Legal Video Available",
    message: "A new video on Land Law has been added to your library.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Appointment Pending",
    message:
      "Your appointment request with Kojo Asante, Esq. is pending approval.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "reminder",
    title: "Upcoming Appointment",
    message:
      "Reminder: You have an appointment with Efua Boateng, Esq. in 2 days.",
    time: "3 days ago",
    read: true,
  },
];

function getIcon(type: string) {
  switch (type) {
    case "success":
      return <CheckCircle className="text-green-600 w-6 h-6" />;
    case "warning":
      return <AlertTriangle className="text-amber-500 w-6 h-6" />;
    case "reminder":
      return <Calendar className="text-[#d4a017] w-6 h-6" />;
    default:
      return <Bell className="text-[#1A237E] w-6 h-6" />;
  }
}

function getBg(type: string, read: boolean) {
  if (read) return "bg-[#F7F9FC]";
  switch (type) {
    case "success":
      return "bg-green-50";
    case "warning":
      return "bg-amber-50";
    case "reminder":
      return "bg-[#fff8eb]";
    default:
      return "bg-[#F7F9FC]";
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7F9FC] via-[#e3e8f7] to-[#cfd8fd] py-8 px-2 md:px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#1A237E] flex items-center gap-2">
            <Bell className="w-7 h-7 text-[#d4a017]" />
            Notifications
          </h1>
          <div className="flex gap-2">
            <button
              className="bg-[#d4a017] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b17d25] transition"
              onClick={markAllAsRead}
              disabled={notifications.every((n) => n.read)}
              type="button"
            >
              Mark all as read
            </button>
            <button
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition flex items-center gap-1"
              onClick={clearAll}
              type="button"
              disabled={notifications.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Bell className="w-16 h-16 text-[#d4a017] mb-4" />
            <p className="text-lg text-gray-500 font-medium">
              You have no notifications yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`flex items-start gap-4 rounded-xl p-4 shadow-sm border border-gray-100 ${getBg(
                  n.type,
                  n.read
                )} transition`}
              >
                <div className="pt-1">{getIcon(n.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        n.read ? "text-gray-700" : "text-[#1A237E]"
                      }`}
                    >
                      {n.title}
                    </span>
                    {!n.read && (
                      <span className="ml-2 bg-[#F9A825] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mt-1">{n.message}</p>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
                <button
                  className="ml-2 mt-1 p-1 rounded-full hover:bg-red-100 text-red-600 transition"
                  title="Delete notification"
                  aria-label="Delete notification"
                  onClick={() => deleteNotification(n.id)}
                  type="button"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
