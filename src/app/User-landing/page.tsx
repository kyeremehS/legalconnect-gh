"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/lawyer/Sidebar";
import { motion } from "framer-motion";
import ChatModal from "../components/ChatModal";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";


import { Bot, Calendar, MessageCircle, Video, User, Bell, BookOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiClient } from "../../lib/api";

const features = [
  {
    name: "Find Lawyers",
    description: "Discover and connect with legal experts.",
    href: "/User-landing/network",
    icon: "/lawyer.png",
    mobileIcon: Users,
  },
  {
    name: "Book Appointment",
    description: "Schedule a meeting with a lawyer.",
    href: "/User-landing/appointments",
    icon: "/appointment-book.png",
    mobileIcon: Calendar,
  },
  {
    name: "Message & Call Lawyer",
    description: "Chat or call your lawyer directly.",
    href: "/User-landing/messages",
    icon: "/phone.png",
    mobileIcon: MessageCircle,
  },
  {
    name: "Profile Settings",
    description: "Update your personal information.",
    href: "/User-landing/profile-settings",
    icon: "/setting.png",
    mobileIcon: User,
  },
  {
    name: "Legal Education",
    description: "Access articles and resources.",
    href: "/User-landing/legal-content",
    icon: "/law.png",
    mobileIcon: BookOpen,
  }
];

export default function UserDashboard() {
  const [showChatModal, setShowChatModal] = useState(false);
  const [userStats, setUserStats] = useState([
    // { label: "Loading...", value: "...", change: "..." },
    // { label: "Loading...", value: "...", change: "..." },
    { label: "Loading...", value: "...", change: "..." },
  ]);
  const [recentActivities, setRecentActivities] = useState([
    {
      id: "loading",
      title: "Loading your activities...",
      time: "Please wait",
      type: "welcome",
    },
  ]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentVideos, setRecentVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const { user } = useAuth();

  // Fetch dashboard data from API
  React.useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        console.log('No user ID available, using default data');
        // Set default welcome data for users not logged in
        setUserStats([
          { label: "Active Consultations", value: "0", change: "Get started" },
          { label: "Legal Resources", value: "50+", change: "Available" },
          { label: "Verified Lawyers", value: "120+", change: "Online" },
        ]);
        setRecentActivities([
          {
            id: "1",
            title: "🇬🇭 Welcome to Ghana's Premier Legal Platform",
            time: "Just now",
            type: "welcome",
          },
          {
            id: "2",
            title: "📚 Explore 50+ legal articles and educational videos",
            time: "Getting started",
            type: "tip",
          },
          { 
            id: "3", 
            title: "👤 Complete your profile to find the best lawyer matches", 
            time: "Recommended", 
            type: "profile" 
          },
        ]);
        setLoading(false);
        return;
      }

      try {
        console.log('🎯 Fetching dashboard data for user:', user.id);
        const response = await apiClient.getUserDashboard(user.id);
        
        if (response.success && response.data) {
          const { statistics, upcomingAppointments, recentMessages, recentVideos, recentActivities } = response.data;
          
          setUserStats(statistics || []);
          setUpcomingAppointments(upcomingAppointments || []);
          setRecentMessages(recentMessages || []);
          setRecentVideos(recentVideos || []);
          setRecentActivities(recentActivities || []);
          
          console.log('✅ Dashboard data loaded successfully:', response.data);
        } else {
          console.log('⚠️ No dashboard data available, using defaults');
          // Use default data if API fails
          setUserStats([
            { label: "Active Consultations", value: "0", change: "Get started" },
            { label: "Messages", value: "0", change: "Start chatting" },
            { label: "Videos Watched", value: "0", change: "Start learning" },
          ]);
        }
      } catch (error) {
        console.error('❌ Error fetching dashboard data:', error);
        // Use default data on error
        setUserStats([
          { label: "Active Consultations", value: "0", change: "Get started" },
          { label: "Messages", value: "0", change: "Start chatting" },
          { label: "Videos Watched", value: "0", change: "Start learning" },
        ]);
        setRecentActivities([
          {
            id: "1",
            title: "🇬🇭 Welcome to Ghana's Premier Legal Platform",
            time: "Just now",
            type: "welcome",
          },
          {
            id: "2",
            title: "📚 Explore legal resources and connect with lawyers",
            time: "Getting started",
            type: "tip",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <main className="p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.firstName || 'User'} 👋
            </h1>
            <p className="text-gray-600">
              Your legal dashboard overview
            </p>
          </div>
          <Sidebar role="user" />

          {/* Quick Actions Grid - Mobile Only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 lg:hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={`feature-${feature.name}-${index}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#d4a017] transition-all hover:shadow-md"
                >
                  <Link href={feature.href} className="block">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-10 h-10 rounded-lg bg-[#d4a017]/20 flex items-center justify-center">
                        <feature.mobileIcon className="w-5 h-5 text-[#d4a017]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {feature.name}
                        </h3>
                        <p className="text-gray-600 text-xs mt-1 hidden sm:block">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {userStats.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#d4a017] transition-all hover:shadow-lg"
              >
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <div className="flex items-end gap-2 mt-2">
                  <h3 className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </h3>
                  <span className="text-sm text-green-500">
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-2xl border border-gray-100"
          >    
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4a017]"></div>
                <span className="ml-2 text-gray-600">Loading activities...</span>
              </div>
            ) : recentActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No recent activities</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={`activity-${activity.id || index}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#f9f9f9] transition-all cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      {/* Activity type icons */}
                      {activity.type === "appointment" && (
                        <div className="w-10 h-10 rounded-full bg-[#d4a017]/20 flex items-center justify-center">
                          <span className="text-[#d4a017] font-bold text-sm">A</span>
                        </div>
                      )}
                      {activity.type === "video" && (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">V</span>
                        </div>
                      )}
                      {activity.type === "profile" && (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">P</span>
                        </div>
                      )}
                      {activity.type === "welcome" && (
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">W</span>
                        </div>
                      )}
                      {activity.type === "tip" && (
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <span className="text-yellow-600 font-bold text-sm">💡</span>
                        </div>
                      )}
                      {activity.type === "feature" && (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-bold text-sm">⭐</span>
                        </div>
                      )}
                      {activity.type === "message" && (
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">M</span>
                        </div>
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
          </motion.div>

          {/* Floating Chat Button - Responsive */}
          <button
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#d4a017] hover:bg-[#b17d25] text-white rounded-full shadow-lg p-3 sm:p-4 flex items-center gap-2 transition-all hover:scale-105"
            onClick={() => setShowChatModal(true)}
            aria-label="Open Legal Chat Bot"
          >
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden md:inline font-semibold text-sm">Chat Bot</span>
          </button>

          {/* Chat Modal */}
          <ChatModal
            isOpen={showChatModal}
            onClose={() => setShowChatModal(false)}
          />
        </div>
      </main>
    </div>
  );
}
