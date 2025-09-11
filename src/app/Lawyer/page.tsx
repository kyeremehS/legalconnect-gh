"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Activity,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  FileBadge2Icon,
  Shield,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/lawyer/Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import LawyerAuthWrapper from "../components/auth/LawyerAuthWrapper";
import { useAppointmentNotifications } from "../hooks/useAppointmentNotifications";
import AppointmentNotificationPopup from "../components/scheduling/AppointmentNotificationPopup";

const navItems = [
  { name: "Dashboard", href: "/Lawyer", icon: Activity },
  { name: "Appointments", href: "/Lawyer/appointment-dashboard", icon: Calendar },
  {
    name: "Messages & Calls",
    href: "/Lawyer/messages-calls",
    icon: MessageSquare,
  },
  { name: "Videos", href: "/Lawyer/create-content", icon: FileText },
  { name: "Clients", href: "/lawyer/engagement", icon: Users },
  { name: "Profile", href: "/Lawyer/profile", icon: Users },
  { name: "Settings", href: "/Lawyer/settings", icon: Settings },

];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Statistic {
  label: string;
  value: string;
  change: string;
}

interface RecentActivity {
  id: number;
  title: string;
  time: string;
  type: string;
}

const LawyerDashboard = () => {
  const { user } = useAuth();
  const [statistics, setStatistics] = useState<Statistic[]>([
    { label: "Total Appointments", value: "0", change: "+0" },
    { label: "Pending Appointments", value: "0", change: "+0" },
    { label: "Completed Appointments", value: "0", change: "+0" },
  ]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  
  const {
    notifications,
    confirmAppointment,
    rejectAppointment,
    dismissNotification
  } = useAppointmentNotifications();

  // Fetch dashboard statistics
  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/appointments/lawyer/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        const data = result.data;
        setStatistics([
          { label: "Total Appointments", value: data.total?.toString() || "0", change: data.totalChange || "+0" },
          { label: "Pending Appointments", value: data.pending?.toString() || "0", change: data.pendingChange || "+0" },
          { label: "Completed Appointments", value: data.completed?.toString() || "0", change: data.completedChange || "+0" },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  };

  // Fetch recent activities
  const fetchRecentActivities = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/appointments/lawyer/recent-activities`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Transform appointment data into recent activities
        const activities: RecentActivity[] = [];
        
        // Add recent appointments
        data.data.recentAppointments?.forEach((apt: any) => {
          const timeAgo = getTimeAgo(apt.createdAt);
          activities.push({
            id: activities.length + 1,
            title: `New appointment booked by ${apt.client?.firstName || 'Client'}`,
            time: timeAgo,
            type: "appointment"
          });
        });

        // Add completed appointments
        data.data.completedAppointments?.forEach((apt: any) => {
          const timeAgo = getTimeAgo(apt.updatedAt);
          activities.push({
            id: activities.length + 1,
            title: `Consultation with ${apt.client?.firstName || 'Client'} completed`,
            time: timeAgo,
            type: "completed"
          });
        });

        // Sort by most recent and limit to 5
        setRecentActivities(activities.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to fetch recent activities:', error);
      // Fallback to static data
      setRecentActivities([
        { id: 1, title: "New appointment booked", time: "2 hours ago", type: "appointment" },
        { id: 2, title: "Consultation completed", time: "4 hours ago", type: "completed" },
        { id: 3, title: "New client message", time: "2 days ago", type: "message" },
      ]);
    }
  };

  // Helper function to calculate time ago
  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      await Promise.all([fetchStatistics(), fetchRecentActivities()]);
      setLoading(false);
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  return (
    <LawyerAuthWrapper>
      <div className="min-h-screen bg-white lg:ml-64">
        <main className="p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {
                  user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user?.fullName 
                    ? user.fullName
                    : user?.firstName || 'Lawyer'
                }
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your practice today.
              </p>
            </div>
            <Sidebar role="lawyer" />
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statistics.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#d4a017] transition-all hover:shadow-lg"
              >
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <div className="flex items-end gap-2 mt-2">
                  <h3 className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </h3>
                  <span
                    className={`text-sm ${
                      stat.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4a017]"></div>
                <span className="ml-2 text-gray-600">Loading activities...</span>
              </div>
            ) : recentActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No recent activities</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#f9f9f9] transition-all"
                >
                  <div className="flex-shrink-0">
                    {/* Icon based on activity type */}
                    {activity.type === "appointment" && (
                      <Calendar className="w-6 h-6 text-blue-500" />
                    )}
                    {activity.type === "completed" && (
                      <Activity className="w-6 h-6 text-green-500" />
                    )}
                    {activity.type === "message" && (
                      <MessageSquare className="w-6 h-6 text-purple-500" />
                    )}
                    {activity.type === "case" && (
                      <FileText className="w-6 h-6 text-orange-500" />
                    )}
                    {activity.type === "meeting" && (
                      <Users className="w-6 h-6 text-indigo-500" />
                    )}
                    {activity.type === "document" && (
                      <FileText className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">
                      {activity.title}
                    </p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Appointment Notification Popup */}
      {notifications.length > 0 && (
        <AppointmentNotificationPopup
          notifications={notifications}
          onConfirm={confirmAppointment}
          onReject={rejectAppointment}
          onClose={dismissNotification}
        />
      )}
    </div>
    </LawyerAuthWrapper>
  );
};

export default LawyerDashboard;
