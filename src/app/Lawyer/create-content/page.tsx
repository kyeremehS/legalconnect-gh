"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  Upload,
  ArrowLeft,
  Plus,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { useState } from "react";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
import Link from "next/link";
import styles from "./page.module.css";
import LawyerAuthWrapper from "../../components/auth/LawyerAuthWrapper";
import { UploadService } from "../../../services/uploadService";
import { useAuth } from "../../../contexts/AuthContext";

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

// Add upload state type
type UploadState = {
  isUploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
};

const categories = [
  "Business Law",
  "Criminal Law",
  "Family Law",
  "Property Law",
];

export default function CreateContent() {
  const { user } = useAuth();
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

  // Add upload state
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
  });

  // Add a ref for the hidden file input
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handler for the Select Video button
  const handleSelectVideo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Enhanced file change handler with real upload
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      setUploadState({
        ...uploadState,
        error: "Please select a valid video file",
      });
      return;
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setUploadState({
        ...uploadState,
        error: "Video file must be less than 50MB",
      });
      return;
    }

    if (!user) {
      setUploadState({
        ...uploadState,
        error: "You must be logged in to upload videos",
      });
      return;
    }

    console.log('🔍 Upload Debug Info:');
    console.log('User object:', user);
    console.log('User ID:', user.id);
    console.log('User role:', user.role);

    try {
      // Reset state and start upload
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
        success: false,
      });

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 200);

      // Upload the video - first get lawyer profile to get lawyer ID
      const token = localStorage.getItem('authToken');
      const lawyerResponse = await fetch(`${API_BASE_URL}/api/lawyers/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!lawyerResponse.ok) {
        const errorText = await lawyerResponse.text();
        console.error('Lawyer profile error:', errorText);
        throw new Error('Could not find lawyer profile');
      }
      
      const lawyerData = await lawyerResponse.json();
      console.log('Lawyer response:', lawyerData);
      
      if (!lawyerData.data || !lawyerData.data.id) {
        console.error('Invalid lawyer data structure:', lawyerData);
        throw new Error('Invalid lawyer profile data');
      }
      
      const lawyerId = lawyerData.data.id;
      console.log('Lawyer ID:', lawyerId);

      const result = await UploadService.uploadVideo(lawyerId, file);

      // Clear progress interval
      clearInterval(progressInterval);

      if (result.success) {
        setUploadState({
          isUploading: false,
          progress: 100,
          error: null,
          success: true,
        });

        // Reset form after 3 seconds
        setTimeout(() => {
          setUploadState({
            isUploading: false,
            progress: 0,
            error: null,
            success: false,
          });
          // Clear the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }, 3000);
      } else {
        setUploadState({
          isUploading: false,
          progress: 0,
          error: result.error || "Upload failed",
          success: false,
        });
      }
    } catch (error) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : "Upload failed",
        success: false,
      });
    }
  };

  return (
    <LawyerAuthWrapper>
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
                        {uploadState.isUploading ? (
                          <Loader className="w-8 h-8 text-[#d4a017] animate-spin" />
                        ) : uploadState.success ? (
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        ) : uploadState.error ? (
                          <AlertCircle className="w-8 h-8 text-red-500" />
                        ) : (
                          <Upload className="w-8 h-8 text-[#d4a017]" />
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                        {uploadState.isUploading
                          ? "Uploading..."
                          : uploadState.success
                            ? "Upload Successful!"
                            : uploadState.error
                              ? "Upload Failed"
                              : "Quick Upload"}
                      </h3>

                      <p className="text-[#4a4a4a] mb-4">
                        {uploadState.isUploading
                          ? `${uploadState.progress}% complete`
                          : uploadState.success
                            ? "Your video has been uploaded successfully"
                            : uploadState.error
                              ? uploadState.error
                              : "Drag and drop or browse files"}
                      </p>

                      {/* Progress Bar */}
                      {uploadState.isUploading && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div
                            className="bg-[#d4a017] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadState.progress}%` }}
                          ></div>
                        </div>
                      )}

                      <button
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          uploadState.isUploading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : uploadState.success
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : uploadState.error
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-[#d4a017] text-white hover:bg-[#b17d25]"
                        }`}
                        type="button"
                        onClick={handleSelectVideo}
                        disabled={uploadState.isUploading}
                      >
                        {uploadState.isUploading
                          ? "Uploading..."
                          : uploadState.success
                            ? "Upload Another"
                            : uploadState.error
                              ? "Try Again"
                              : "Select Video"}
                      </button>

                      <label htmlFor="video-upload" className="sr-only">
                        Upload Video
                      </label>
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden-input"
                        title="Upload Video"
                        placeholder="Select a video file"
                        disabled={uploadState.isUploading}
                      />

                      {/* File Requirements */}
                      <div className="mt-4 text-xs text-[#4a4a4a] space-y-1">
                        <p>• Supported formats: MP4, AVI, MOV, WebM</p>
                        <p>• Maximum file size: 50MB</p>
                        <p>• Recommended duration: 5-15 minutes</p>
                      </div>
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
    </LawyerAuthWrapper>
  );
}
