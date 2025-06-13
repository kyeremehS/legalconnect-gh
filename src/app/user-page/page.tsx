"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import {
  Calendar,
  MessageSquare,
  Video,
  Search,
  Bell,
  BookOpen,
  FileText,
  Clock,
  Star,
  ChevronRight,
  TrendingUp,
  Users,
  Shield,
  Briefcase,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const user = {
    name: "Samuel",
    role: "Client",
    unreadMessages: 5,
    appointments: 2,
    aiQueries: 3,
    recentActivity: [
      {
        type: "appointment",
        title: "Consultation with Lawyer Kwame",
        time: "2 hours ago",
        status: "upcoming",
      },
      {
        type: "message",
        title: "New message from Legal Assistant",
        time: "3 hours ago",
        status: "unread",
      },
      {
        type: "document",
        title: "Contract Review Completed",
        time: "1 day ago",
        status: "completed",
      },
    ],
    upcomingAppointments: [
      {
        id: 1,
        lawyer: "Kwame Mensah",
        specialty: "Corporate Law",
        date: "2024-03-20",
        time: "14:00",
        status: "confirmed",
      },
      {
        id: 2,
        lawyer: "Ama Osei",
        specialty: "Family Law",
        date: "2024-03-22",
        time: "10:30",
        status: "pending",
      },
    ],
    recommendedLawyers: [
      {
        id: 1,
        name: "Kwame Mensah",
        specialty: "Corporate Law",
        rating: 4.9,
        reviews: 128,
        experience: "15 years",
        image: "/lawyer1.jpg",
        availability: "Next available: Tomorrow",
      },
      {
        id: 2,
        name: "Ama Osei",
        specialty: "Family Law",
        rating: 4.8,
        reviews: 95,
        experience: "12 years",
        image: "/lawyer2.jpg",
        availability: "Next available: Today",
      },
      {
        id: 3,
        name: "Kofi Addo",
        specialty: "Criminal Law",
        rating: 4.7,
        reviews: 156,
        experience: "18 years",
        image: "/lawyer3.jpg",
        availability: "Next available: Next Week",
      },
    ],
    legalResources: [
      {
        title: "Understanding Ghana's Legal System",
        category: "Guide",
        readTime: "10 min",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        title: "Common Legal Terms Explained",
        category: "Reference",
        readTime: "5 min",
        icon: <FileText className="w-5 h-5" />,
      },
      {
        title: "Your Rights as a Citizen",
        category: "Rights",
        readTime: "8 min",
        icon: <Shield className="w-5 h-5" />,
      },
    ],
  };

  return (
    <div className="min-h-screen pt-20 bg-white text-black">

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-white/90">
                Here's what's happening with your legal matters
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/find-lawyer"
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition"
              >
                Find a Lawyer
              </Link>
              <Link
                href="/chat"
                className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition"
              >
                Chat with AI Assistant
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              title: "Upcoming Appointments",
              value: user.appointments,
              icon: <Calendar className="w-6 h-6" />,
              color: "primary",
            },
            {
              title: "Unread Messages",
              value: user.unreadMessages,
              icon: <MessageSquare className="w-6 h-6" />,
              color: "primary",
            },
            {
              title: "AI Queries",
              value: user.aiQueries,
              icon: <TrendingUp className="w-6 h-6" />,
              color: "primary",
            },
            {
              title: "Active Cases",
              value: "2",
              icon: <Briefcase className="w-6 h-6" />,
              color: "primary",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 text-black">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activity & Upcoming Appointments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-black">Recent Activity</h2>
              <div className="space-y-4">
                {user.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="p-2 rounded-lg bg-primary-100 text-primary-600">
                      {activity.type === "appointment" ? (
                        <Calendar className="w-5 h-5" />
                      ) : activity.type === "message" ? (
                        <MessageSquare className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-black">{activity.title}</p>
                      <p className="text-sm text-black">{activity.time}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-600">
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">Upcoming Appointments</h2>
                <Link
                  href="/appointments"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {user.upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <Calendar className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-black">{appointment.lawyer}</p>
                        <p className="text-sm text-black">{appointment.specialty}</p>
                        <p className="text-sm text-black">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-primary-100 text-primary-600">
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recommended Lawyers & Resources */}
          <div className="space-y-6">
            {/* Recommended Lawyers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-black">Recommended Lawyers</h2>
              <div className="space-y-4">
                {user.recommendedLawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={lawyer.image}
                          alt={lawyer.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-black">{lawyer.name}</p>
                        <p className="text-sm text-black">{lawyer.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-primary-500 fill-current" />
                          <span className="text-sm text-black">
                            {lawyer.rating} ({lawyer.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-black">{lawyer.experience} experience</span>
                      <span className="text-primary-600">{lawyer.availability}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Resources */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-black">Legal Resources</h2>
              <div className="space-y-4">
                {user.legalResources.map((resource, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-black">{resource.title}</p>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <span>{resource.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {resource.readTime}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-black" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
