"use client";

import React from "react";
import { motion } from "framer-motion";
import { Video, Upload, ArrowLeft, Plus, PlayCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type VideoContent = {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail?: string;
  status: "draft" | "published";
  views?: number;
  createdAt: string;
  category: string;
};

const categories = [
  "Business Law",
  "Criminal Law",
  "Family Law",
  "Property Law",
];

export default function CreateContent() {
  const [videos] = useState<VideoContent[]>([
    {
      id: "1",
      title: "Understanding Business Contracts",
      description: "A comprehensive guide to business contract basics",
      duration: "15:30",
      status: "published",
      views: 245,
      createdAt: "2024-02-15",
      category: "Business Law",
    },
    // Add more mock data as needed
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <React.Fragment>
      <div className="min-h-screen bg-white">
        <main className="p-4 lg:p-8 pt-20 lg:pt-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link
                  href="/Lawyer"
                  className="inline-flex items-center gap-2 text-[#d4a017] hover:text-[#b17d25] mb-2 group transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Back to Dashboard</span>
                </Link>
                <h1 className="text-3xl font-bold text-[#1a1a1a]">
                  Content Studio
                </h1>
                <p className="text-[#4a4a4a] font-medium">
                  Create and manage your legal content
                </p>
              </div>
              <button className="flex items-center gap-2 bg-[#d4a017] text-white px-6 py-3 rounded-xl hover:bg-[#b17d25] transition-colors font-medium">
                <Plus className="w-5 h-5" />
                New Video
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Upload & Guidelines */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                {/* Quick Upload Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-white p-6 rounded-2xl border-2 border-dashed border-[#d4a017] hover:border-[#b17d25]"
                >
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-[#fff8eb] flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-[#d4a017]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                      Quick Upload
                    </h3>
                    <p className="text-[#4a4a4a] mb-4">
                      Drag and drop or browse files
                    </p>
                    <button className="bg-[#d4a017] text-white px-6 py-2 rounded-lg hover:bg-[#b17d25] transition-colors font-medium">
                      Select Video
                    </button>
                  </div>
                </motion.div>

                {/* Guidelines Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-[#d4a017]" />
                    Content Guidelines
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Keep videos between 5-15 minutes",
                      "Use clear and concise titles",
                      "Add relevant thumbnails",
                      "Include detailed descriptions",
                      "Tag with appropriate categories",
                    ].map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-[#4a4a4a]"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#d4a017]" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Videos Grid */}
              <div className="col-span-12 lg:col-span-8">
                {/* Category Filters */}
                <div className="mb-6 border-b border-gray-200">
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    <button
                      onClick={() => setActiveFilter("all")}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                        ${
                          activeFilter === "all"
                            ? "bg-[#fff8eb] text-[#d4a017] font-medium"
                            : "text-[#4a4a4a] hover:bg-gray-50"
                        }`}
                    >
                      All Videos
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                          ${
                            activeFilter === category
                              ? "bg-[#fff8eb] text-[#d4a017] font-medium"
                              : "text-[#4a4a4a] hover:bg-gray-50"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.map((video) => (
                    <motion.div
                      key={video.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#d4a017] transition-colors"
                    >
                      <div className="aspect-video bg-[#fff8eb] flex items-center justify-center relative group">
                        <Video className="w-12 h-12 text-[#d4a017] group-hover:opacity-0 transition-opacity" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="bg-[#d4a017] text-white px-4 py-2 rounded-lg hover:bg-[#b17d25] transition-colors">
                            Edit Video
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-[#1a1a1a] line-clamp-2">
                            {video.title}
                          </h3>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap
                            ${
                              video.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {video.status}
                          </span>
                        </div>
                        <p className="text-sm text-[#4a4a4a] mb-3 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[#4a4a4a]">
                          <span>{video.duration}</span>
                          <span>{video.views} views</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </React.Fragment>
  );
}
