"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Sparkles,
  FileText,
  Lock,
  FileCheck,
  Star,
  ChevronRight,
  Scroll,
  BrainCircuit,
  Award,
  BarChart,
  Users2,
  Clock,
  ArrowRight,
  MessageSquare,
  Video,
  Briefcase,
  BookOpen,
  Calendar,
  Mail,
  PlayCircle,
  Eye,
  MessageCircle,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatButton from "./components/ChatButton";
import NavBar from "./components/NavBar";
import { useAuth } from "../contexts/AuthContext";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Interfaces for dynamic content
interface UpcomingAppointment {
  id: string;
  startTime: string;
  practiceArea: string;
  status: string;
  lawyer: {
    practiceAreas: string[];
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

interface LawyerMessage {
  id: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  sender: {
    firstName: string;
    lastName: string;
  };
}

interface NewVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  practiceArea: string;
  duration: string;
  views: number;
}

interface PlatformStats {
  totalLawyers: number;
  totalClients: number;
  totalAppointments: number;
  averageRating: number;
}


export default function Home() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic content state
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([]);
  const [recentMessages, setRecentMessages] = useState<LawyerMessage[]>([]);
  const [newVideos, setNewVideos] = useState<NewVideo[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats>({
    totalLawyers: 0,
    totalClients: 0,
    totalAppointments: 0,
    averageRating: 0
  });
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('');

  // Fetch user-specific data when user is logged in
  useEffect(() => {
    console.log('useEffect triggered, user:', user);
    if (user) {
      fetchUserDashboardData();
    }
    fetchPublicData();
  }, [user]);

  // Function to fetch user-specific dashboard data
  const fetchUserDashboardData = async () => {
    try {
      setIsLoadingUserData(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) return;

      // Fetch upcoming appointments
      const appointmentsResponse = await fetch(`${API_BASE_URL}/api/appointments/client/upcoming`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json();
        setUpcomingAppointments(appointmentsData.data?.slice(0, 3) || []);
      }

      // Fetch recent messages
      const messagesResponse = await fetch(`${API_BASE_URL}/api/messages/recent`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setRecentMessages(messagesData.data?.slice(0, 3) || []);
      }

    } catch (error) {
      console.error('Error fetching user dashboard data:', error);
    } finally {
      setIsLoadingUserData(false);
    }
  };

  // Function to fetch public data
  const fetchPublicData = async () => {
    try {
      // Fetch platform statistics with cache busting
      const timestamp = Date.now();
      const statsResponse = await fetch(`${API_BASE_URL}/api/public/platform-stats?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        console.log('✅ Platform stats received:', statsData);
        console.log('✅ About to set platformStats to:', statsData.data);
        setPlatformStats(statsData.data);
        console.log('✅ setPlatformStats called');
      } else {
        console.error('❌ Stats fetch failed:', statsResponse.status);
      }

      // Fetch new videos with cache busting
      const videosResponse = await fetch(`${API_BASE_URL}/api/public/videos/latest?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (videosResponse.ok) {
        const videosData = await videosResponse.json();
        setNewVideos(videosData.data?.slice(0, 3) || []);
      }

    } catch (error) {
      console.error('Error fetching public data:', error);
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };


  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic audience data based on platform stats
  console.log('🔍 Creating audience with platformStats:', platformStats);
  console.log('🔍 Individual values:', {
    totalLawyers: platformStats.totalLawyers,
    totalClients: platformStats.totalClients,
    totalAppointments: platformStats.totalAppointments,
    averageRating: platformStats.averageRating
  });
  
  const audience = [
    {
      number: platformStats.totalLawyers > 0 ? platformStats.totalLawyers.toString() : "Loading...",
      label: "Verified Lawyers",
      icon: <Users2 className="w-6 h-6 text-[#050401] mb-4" />,
    },
    {
      number: platformStats.totalAppointments > 0 ? platformStats.totalAppointments.toString() : "Loading...",
      label: "Consultations Completed",
      icon: <Briefcase className="w-6 h-6 text-[#050401] mb-4" />,
    },
    {
      number: platformStats.totalClients > 0 ? platformStats.totalClients.toString() : "Loading...",
      label: "Happy Clients",
      icon: <BookOpen className="w-6 h-6 text-[#050401] mb-4" />,
    },
    {
      number: platformStats.averageRating > 0 ? `${platformStats.averageRating}★` : "Loading...",
      label: "Client Satisfaction",
      icon: <Users className="w-6 h-6 text-[#050401] mb-4" />,
    },
  ];
  
  console.log('📋 Final audience array:', audience.map(item => ({ label: item.label, number: item.number })));

  return (
    <div className="min-h-screen bg-white">
      <NavBar /> {/* Keep navbar only on landing page */}
      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-600 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Legal Help Made Simple
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight mb-6">
              Legal Help for{" "}
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Everyone
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get instant legal guidance, connect with trusted lawyers, and
              learn your rights through short, engaging videos. All in one
              secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* <Link
                href="/demo"
                className="bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-200 flex items-center justify-center gap-2"
              >
                Watch Demo <BrainCircuit className="w-5 h-5" />
              </Link> */}
            </div>

            {/* Hero Image */}
            <motion.div
              className="mt-16 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/hero-image.webp"
                  alt="LegalConnect Platform Interface"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-900/10 to-transparent" />

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <MessageSquare className="w-6 h-6 text-gray-600" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <Video className="w-6 h-6 text-gray-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background blobs */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-20"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-20"
          />
        </div>
      </motion.section>

      {/* User Dashboard Section - Only show if user is logged in */}
      {user && (
        <motion.section
          className="py-16 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {user.firstName}!
              </h2>
              <p className="text-gray-600">Here's what's happening with your legal matters</p>
              
              {/* Debug refresh button */}
              <button
                onClick={() => {
                  console.log('Manually refreshing data...');
                  fetchUserDashboardData();
                  fetchPublicData();
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Refresh Data (Debug)
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Upcoming Appointments */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#d4a017]" />
                    Upcoming Appointments
                  </h3>
                  <Link 
                    href="/client/appointments" 
                    className="text-[#d4a017] text-sm hover:text-[#b8941f]"
                  >
                    View All
                  </Link>
                </div>
                {isLoadingUserData ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="border-l-4 border-[#d4a017] pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">
                              {appointment.lawyer.user.firstName} {appointment.lawyer.user.lastName}
                            </p>
                            <p className="text-sm text-gray-600">{appointment.practiceArea}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {new Date(appointment.startTime).toLocaleDateString()} at{' '}
                              {new Date(appointment.startTime).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'CONFIRMED' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No upcoming appointments</p>
                    <Link 
                      href="/lawyers" 
                      className="text-[#d4a017] text-sm hover:text-[#b8941f] mt-2 inline-block"
                    >
                      Book a consultation
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Recent Messages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[#d4a017]" />
                    Recent Messages
                  </h3>
                  <Link 
                    href="/client/messages" 
                    className="text-[#d4a017] text-sm hover:text-[#b8941f]"
                  >
                    View All
                  </Link>
                </div>
                {isLoadingUserData ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : recentMessages.length > 0 ? (
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-800 text-sm">
                                {message.sender.firstName} {message.sender.lastName}
                              </p>
                              {!message.isRead && (
                                <div className="w-2 h-2 bg-[#d4a017] rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {message.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No recent messages</p>
                  </div>
                )}
              </motion.div>

              {/* Platform Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#d4a017]" />
                    Quick Stats
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Lawyers</span>
                    <span className="font-semibold text-[#d4a017]">
                      {platformStats.totalLawyers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Clients</span>
                    <span className="font-semibold text-[#d4a017]">
                      {platformStats.totalClients}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Consultations</span>
                    <span className="font-semibold text-[#d4a017]">
                      {platformStats.totalAppointments}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-[#d4a017]">
                        {platformStats.averageRating || 4.8}
                      </span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* New Videos Section - Always visible */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Latest Legal Education Videos
            </h2>
            <p className="text-gray-600">Stay informed with our newest legal guidance content</p>
          </div>
          
          {newVideos.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {newVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="relative aspect-video bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-[#d4a017] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-[#fff2d4] text-[#d4a017] px-2 py-1 rounded-full font-medium">
                        {video.practiceArea}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(video.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-[#d4a017] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views} views
                      </span>
                      <Link 
                        href={`/videos/${video.id}`}
                        className="text-[#d4a017] hover:text-[#b8941f] font-medium"
                      >
                        Watch Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <PlayCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">New videos coming soon!</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link 
              href="/videos"
              className="inline-flex items-center gap-2 bg-[#d4a017] text-white px-6 py-3 rounded-xl hover:bg-[#b8941f] transition-colors"
            >
              View All Videos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        id="features"
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Your Legal Journey, Simplified
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to understand and navigate legal matters, all
              in one place
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#f5c05a] transition-all hover:shadow-lg hover:shadow-[#f5c05a]/10 group"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#fff2d4] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Target Audience Section */}
      <motion.section
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Who We Serve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              LegalConnect is designed for everyone who needs legal guidance
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {audience.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#f5c05a] transition-all hover:shadow-lg hover:shadow-[#f5c05a]/10 group"
              >
                {item.icon}
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#d4a017] to-[#ffd700] bg-clip-text text-transparent">
                  {item.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* CTA Section */}
      <motion.section
        // className="py-20 bg-[#d4a017] text-white relative overflow-hidden"
        className="py-20 bg-gray-700 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Ready to Take Control of Your Legal Matters?
            </h2>
            <p className="text-amber-200 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of users who trust LegalConnect for their legal
              needs. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-white text-[#d4a017] px-8 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group font-medium"
              >
                Start Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/schedule-demo"
                className="bg-[#FFFFFF] text-amber-600 px-8 py-4 rounded-xl hover:bg-[#8b6514] transition-all border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Testimonials Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from people who found legal help through LegalConnect
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg relative"
              >
                <div className="absolute -top-4 left-8">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-amber-600 text-white p-2 rounded-full"
                  >
                    <Star className="w-4 h-4" />
                  </motion.div>
                </div>
                <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Users2 className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Chat Modal */}
      <ChatButton />
    </div>
  );
}

const features = [
  {
    title: "AI Legal Assistant",
    description:
      "Get instant answers to your legal questions and understand complex legal concepts in simple terms.",
    icon: <BrainCircuit className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Connect with Lawyers",
    description:
      "Chat, call, or video conference with verified lawyers who specialize in your specific legal needs.",
    icon: <Users className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Legal Education",
    description:
      "Learn about your rights and legal processes through engaging short-form videos and interactive guides.",
    icon: <Video className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Secure Communication",
    description:
      "All your conversations and documents are protected with end-to-end encryption.",
    icon: <Lock className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Document Management",
    description:
      "Store and organize your legal documents securely in one place.",
    icon: <FileText className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Affordable Access",
    description:
      "Get quality legal help at transparent, affordable rates with flexible payment options.",
    icon: <Award className="w-6 h-6 text-[#d4a017]" />,
  },
];

const testimonials = [
  {
    quote:
      "The AI assistant helped me understand my rental agreement in minutes. When I needed more help, I was connected with a lawyer right away.",
    name: "Sarah Johnson",
    role: "Renter, New York",
  },
  {
    quote:
      "As a small business owner, LegalConnect has been invaluable. The short legal videos helped me understand contracts and business regulations.",
    name: "Michael Chen",
    role: "Small Business Owner",
  },
  {
    quote:
      "The platform made it easy to find a family lawyer and understand our options. The video consultations saved us so much time.",
    name: "Emily Rodriguez",
    role: "Parent, California",
  },
];
