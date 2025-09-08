"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Share,
  Home,
  Compass,
  User,
  PlusSquare,
  Tv,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Search,
  Filter,
  BookOpen,
  Download,
  MessageSquare,
  Award,
  Calendar,
  FileText,
  Brain,
  HelpCircle,
  Languages,
  Clock,
  Eye,
  Star,
  Bookmark,
  Share2,
  Check,
  ChevronRight,
  ArrowLeft,
  House,
} from "lucide-react";

import InteractiveQuiz from "../../components/InteractiveQuiz";
import UserProgressModal from "../../components/UserProgressModal";
import TemplateDownloader from "../../components/TemplateDownloader";
import ArticleCard from "../../components/ArticleCard";
import VideoControls from "../../components/videocontrol";
import SidebarItem from "../../components/content-sidebar";
import QuizCard from "../../components/QuizCard";
import MobileSidebar from "../../components/mobilesidebar";
import ActionButton from "../../components/videoaction";
import VerticalVideoInteractions from "../../../components/VerticalVideoInteractions";


import {
  legalArticles,
  legalQuizzes,
  legalTemplates,
  videoCategories,
} from "../../components/mockdata";
import { VideoService, VideoItem as VideoItemType } from "../../../services/videoService";
import { apiClient } from "../../../lib/api";

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

declare global {
  interface Window {
    scrollTimeout: NodeJS.Timeout;
  }
}

type VideoItem = VideoItemType;

// Content Types
type ContentType = "videos" | "articles" | "quizzes" | "templates";

// Flatten all videos into a single array for feed
function flattenVideos() {
  const videos: VideoItem[] = [];
  for (const cat of videoCategories) {
    for (const vid of cat.videos) {
      videos.push({ ...vid, category: cat.label, lawyerId: `mock_${vid.id}` });
    }
  }
  return videos;
}

// Template Card Component
function TemplateCard({ template }: { template: (typeof legalTemplates)[0] }) {
  return <TemplateDownloader template={template} />;
}

export default function LegalContentHub() {
  const router = useRouter();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [likes, setLikes] = useState<number[]>([]);
  const [comments, setComments] = useState<number[]>([]);
  const [shares, setShares] = useState<number[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<ContentType>("videos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  // New state variables
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoadingVideos(true);
      try {
        console.log('Fetching videos from VideoService...');
        const fetchedVideos = await VideoService.getCombinedVideoFeed();
        console.log('Fetched videos:', fetchedVideos);
        
        setVideos(fetchedVideos);
        // Extract real like and comment counts from the API data
        const realLikes = fetchedVideos.map(video => video.likes || 0);
        const realComments = fetchedVideos.map(video => video.comments || 0);
        setLikes(realLikes);
        setComments(realComments);
        setShares(Array(fetchedVideos.length).fill(68)); // Keep shares as mock for now
      } catch (error) {
        console.error('Error fetching videos:', error);
        // No fallback to mock data - show empty state instead
        console.log('No videos available.');
        setVideos([]);
        setLikes([]);
        setComments([]);
        setShares([]);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchVideos();
  }, []);

  // Handlers for actions
  const handleLike = (idx: number) => {
    setLikes((prev) => {
      const arr = [...prev];
      arr[idx]++;
      return arr;
    });
  };

  const handleComment = (idx: number) => {
    setComments((prev) => {
      const arr = [...prev];
      arr[idx]++;
      return arr;
    });
  };

  const handleShare = (idx: number) => {
    setShares((prev) => {
      const arr = [...prev];
      arr[idx]++;
      return arr;
    });
  };

  // Function to record video view
  const recordVideoView = async (video: VideoItem) => {
    try {
      // Only record views for real videos (not mock videos)
      if (video.lawyerId && !video.lawyerId.startsWith('mock_')) {
        console.log('Recording view for video:', video.title);
        await apiClient.recordVideoView(video.lawyerId, video.url);
      } else {
        console.log('Skipping view recording for mock video:', video.title);
      }
    } catch (error) {
      console.error('Failed to record video view:', error);
      // Don't show error to user - view recording is not critical
    }
  };

  // Update your handlePlayPause function (around line 130)
  const handlePlayPause = () => {
    const currentVideo = document.querySelector(
      `#video-${activeIdx}`
    ) as HTMLVideoElement;

    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        // Record view when video starts playing
        if (videos[activeIdx]) {
          recordVideoView(videos[activeIdx]);
        }
        currentVideo.play().catch((error) => {
          console.log("Play failed:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleMuteToggle = () => {
    const currentVideo = document.querySelector(
      `#video-${activeIdx}`
    ) as HTMLVideoElement;
    
    if (currentVideo) {
      currentVideo.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // New handler functions
  const handleTimeUpdate = (video: HTMLVideoElement) => {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = (video: HTMLVideoElement) => {
    setVideoDuration(video.duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Navigation functions
  const navigateVideo = (direction: "up" | "down") => {
    // Pause current video
    const currentVideo = document.querySelector(
      `#video-${activeIdx}`
    ) as HTMLVideoElement;

    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }

    setIsPlaying(false);

    let newIndex = activeIdx;

    if (direction === "up" && activeIdx > 0) {
      newIndex = activeIdx - 1;
    } else if (direction === "down" && activeIdx < videos.length - 1) {
      newIndex = activeIdx + 1;
    }

    if (newIndex !== activeIdx) {
      setActiveIdx(newIndex);
      setVideoProgress(0);
      setCurrentTime(0);

      // Auto-play new video after transition
      setTimeout(() => {
        setIsPlaying(true);
        const newVideo = document.querySelector(
          `#video-${newIndex}`
        ) as HTMLVideoElement;

        if (newVideo) {
          // Record view when auto-playing new video
          if (videos[newIndex]) {
            recordVideoView(videos[newIndex]);
          }
          newVideo.play().catch(console.log);
        }
      }, 300); // Match transition duration
    }
  };

  // Back to dashboard function
  const handleBackToDashboard = () => {
    router.push("/User-landing");
  };

  // Reset progress when changing content type
  useEffect(() => {
    if (activeContent !== "videos") {
      setVideoProgress(0);
      setCurrentTime(0);
      setVideoDuration(0);
    }
  }, [activeContent]);

  // Reset progress when changing videos
  useEffect(() => {
    setVideoProgress(0);
    setCurrentTime(0);
  }, [activeIdx]);

  // Update the useEffect for keyboard handling:
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeContent !== "videos") return;

      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.code === "Space"
      ) {
        event.preventDefault();
      }

      // Spacebar for play/pause
      if (event.code === "Space") {
        const currentVideo = document.querySelector(
          `#video-${activeIdx}`
        ) as HTMLVideoElement;

        if (currentVideo) {
          if (isPlaying) {
            currentVideo.pause();
            setIsPlaying(false);
          } else {
            currentVideo.play().catch((error) => {
              console.log("Play failed:", error);
            });
            setIsPlaying(true);
          }
        }
        return;
      }

      // Arrow key navigation
      if (event.key === "ArrowUp") {
        navigateVideo("up");
      } else if (event.key === "ArrowDown") {
        navigateVideo("down");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeContent, activeIdx, videos.length, isPlaying]);

  // Add mouse wheel handler after the keyboard handler useEffect:
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (activeContent !== "videos") return;
      
      event.preventDefault();
      
      // Debounce wheel events
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0) {
          // Scroll down
          navigateVideo("down");
        } else {
          // Scroll up
          navigateVideo("up");
        }
      }, 50);
    };

    if (activeContent === "videos") {
      window.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        window.removeEventListener("wheel", handleWheel);
        clearTimeout(window.scrollTimeout);
      };
    }
  }, [activeContent, activeIdx, videos.length]);

  // Add this useEffect to cleanup videos when switching content
  useEffect(() => {
    return () => {
      // Cleanup function - pause all videos when component unmounts
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });
    };
  }, []);

  // Also cleanup when switching away from videos
  useEffect(() => {
    if (activeContent !== "videos") {
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });
      setIsPlaying(false);
    }
  }, [activeContent]);

  // Add this NEW useEffect for auto-playing videos after navigation
  useEffect(() => {
    // Only auto-play when viewing videos and playing state is true
    if (activeContent === "videos" && isPlaying) {
      const timer = setTimeout(() => {
        const currentVideo = document.querySelector(
          `#video-${activeIdx} video`
        ) as HTMLVideoElement;

        if (currentVideo) {
          // Record view when auto-playing
          if (videos[activeIdx]) {
            recordVideoView(videos[activeIdx]);
          }
          currentVideo.play().catch((error) => {
            console.log("Auto-play failed:", error);
            // If auto-play fails, update the state to reflect reality
            setIsPlaying(false);
          });
        }
      }, 100); // Small delay to ensure DOM is updated

      return () => clearTimeout(timer);
    }
  }, [activeIdx, activeContent, isPlaying]); // Triggers when video index changes

  // Render content based on active section
  const renderContent = () => {
    switch (activeContent) {
      case "videos":
        return (
          <main className="flex-1 bg-black relative overflow-hidden lg:m-5 lg:rounded-xl">
            {/* Back Button for Videos - Mobile
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToDashboard}
              className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all border border-white/20 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button> */}

            {/* Video Container with smooth vertical transitions */}
            <div
              className="relative h-full transition-transform duration-500 ease-out"
              style={{
                transform: `translateY(-${activeIdx * 100}vh)`,
              }}
            >
              {isLoadingVideos ? (
                <div className="absolute inset-0 w-full h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading videos...</p>
                  </div>
                </div>
              ) : videos.length === 0 ? (
                <div className="absolute inset-0 w-full h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📹</div>
                    <p className="text-white text-lg">No videos available yet</p>
                    <p className="text-gray-300 text-sm mt-2">Check back later for new content!</p>
                  </div>
                </div>
              ) : (
                videos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  className="absolute inset-0 w-full h-screen flex items-center justify-center"
                  style={{
                    top: `${idx * 100}vh`,
                    zIndex: idx === activeIdx ? 10 : 1,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: Math.abs(idx - activeIdx) <= 1 ? 1 : 0,
                    scale: idx === activeIdx ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full h-full flex justify-center items-center">
                    <video
                      id={`video-${idx}`}
                      src={video.url}
                      autoPlay={idx === activeIdx && isPlaying}
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full max-w-md h-full object-cover lg:rounded-2xl shadow-2xl cursor-pointer max-h-screen lg:max-h-[97vh]"
                      style={{
                        maxWidth: "420px",
                      }}
                      onClick={handlePlayPause}
                      onTimeUpdate={(e) => {
                        if (idx === activeIdx) {
                          handleTimeUpdate(e.currentTarget);
                        }
                      }}
                      onLoadedMetadata={(e) => {
                        if (idx === activeIdx) {
                          handleLoadedMetadata(e.currentTarget);
                        }
                      }}
                      onCanPlay={(e) => {
                        if (idx === activeIdx && isPlaying) {
                          e.currentTarget.play().catch(console.log);
                        }
                      }}
                      onEnded={() => {
                        if (idx === activeIdx && activeIdx < videos.length - 1) {
                          setActiveIdx(activeIdx + 1);
                          setVideoProgress(0);
                        }
                      }}
                    />

                    {/* Video Info Overlay - Only show for active video */}
                    {idx === activeIdx && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent lg:rounded-b-2xl"
                      >
                        <div className="mb-4">
                          <h2 className="text-xl font-bold text-white mb-2">
                            {video.title}
                          </h2>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-[#d4a017] font-medium">
                              {video.lawyer}
                            </span>
                            <span className="text-white/60">
                              {video.views} views
                            </span>
                            <span className="text-white/60">
                              {video.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="inline-block px-3 py-1 bg-[#d4a017]/20 text-[#d4a017] text-xs rounded-full">
                              #{video.category}
                            </div>
                            <div className="inline-flex px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full items-center gap-1">
                              <Languages className="w-3 h-3" />
                              {video.language}
                            </div>
                          </div>
                          <p className="text-white/80 text-sm mt-2 line-clamp-2">
                            {video.description}
                          </p>
                        </div>

                        {/* Progress bar - Update margin to avoid overlap with controls */}
                        <div className="space-y-2 mb-8">
                          <div className="flex justify-between text-xs text-white/70">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(videoDuration)}</span>
                          </div>

                          <div
                            className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const clickX = e.clientX - rect.left;
                              const width = rect.width;
                              const percentage = (clickX / width) * 100;
                              const videoElement = document.querySelector(
                                `#video-${activeIdx}`
                              ) as HTMLVideoElement;
                              if (videoElement && videoDuration) {
                                const newTime = (percentage / 100) * videoDuration;
                                videoElement.currentTime = newTime;
                                setVideoProgress(percentage);
                              }
                            }}
                          >
                            <motion.div
                              animate={{ width: `${videoProgress}%` }}
                              className="h-full bg-[#d4a017] rounded-full relative"
                              transition={{ duration: 0.1 }}
                            >
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#d4a017] rounded-full shadow-lg transform translate-x-1/2" />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Optional: Play/Pause indicator overlay */}
                    {idx === activeIdx && !isPlaying && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                      >
                        <div className="p-6 bg-black/40 backdrop-blur-sm rounded-full">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </motion.div>
                    )}

                    {/* Video Controls - Only volume control */}
                    {idx === activeIdx && (
                      <VideoControls
                        isMuted={isMuted}
                        onMuteToggle={handleMuteToggle}
                      />
                    )}

                    {/* Navigation Controls - Moved to top of right side */}
                    {idx === activeIdx && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-50">
                        {/* Up/Down Navigation at the top */}
                        <div className="flex flex-col gap-2 -mb-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all disabled:opacity-50 border border-white/20 shadow-lg"
                            onClick={() => navigateVideo("up")}
                            disabled={activeIdx === 0}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all disabled:opacity-50 border border-white/20 shadow-lg"
                            onClick={() => navigateVideo("down")}
                            disabled={activeIdx === videos.length - 1}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Action Buttons - Replace with VideoInteractions */}
                        <VerticalVideoInteractions
                          lawyerId={video.lawyerId}
                          videoUrl={video.url}
                          className=""
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
              )}
            </div>
          </main>
        );

      case "articles":
        return (
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {/* Back Button for Articles - Mobile */}
              <div className="lg:hidden mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-2 text-[#d4a017] hover:text-[#b8941f] transition-colors font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Back to Dashboard</span>
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Legal Articles
                </h1>
                <p className="text-gray-600">
                  Educational articles to help you understand Ghanaian law
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legalArticles.map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        );

      case "quizzes":
        return (
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {/* Back Button for Quizzes - Mobile */}
              <div className="lg:hidden mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-2 text-[#d4a017] hover:text-[#b8941f] transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Dashboard</span>
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Legal Quizzes
                </h1>
                <p className="text-gray-600">
                  Test your legal knowledge with interactive quizzes
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {legalQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </div>
          </main>
        );

      case "templates":
        return (
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {/* Back Button for Templates - Mobile */}
              <div className="lg:hidden mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-2 text-[#d4a017] hover:text-[#b8941f] transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Dashboard</span>
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Legal Templates
                </h1>
                <p className="text-gray-600">
                  Download professional legal document templates
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {legalTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          </main>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex ${inter.className}`}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </motion.button>
          {/* <h1 className="font-bold text-lg text-gray-800">Legal Hub</h1> */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setShowProgress(true)}
          >
            <User className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeContent={activeContent}
        setActiveContent={(content) => setActiveContent(content)}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="flex flex-col justify-between h-full py-6 px-4">
          <div>
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-800">Legal Hub</h1>
                  <p className="text-sm text-gray-500">Learn & Explore</p>
                </div>
              </div>
              
              {/* Back to Dashboard Button - Desktop */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToDashboard}
                className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                title="Back to Dashboard"
              >
                <Home className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <SidebarItem
                icon={<Tv className="w-5 h-5" />}
                label="LawTok Videos"
                active={activeContent === "videos"}
                onClick={() => setActiveContent("videos")}
                badge="New"
              />
              <SidebarItem
                icon={<BookOpen className="w-5 h-5" />}
                label="Legal Articles"
                active={activeContent === "articles"}
                onClick={() => setActiveContent("articles")}
              />
              <SidebarItem
                icon={<Brain className="w-5 h-5" />}
                label="Legal Quizzes"
                active={activeContent === "quizzes"}
                onClick={() => setActiveContent("quizzes")}
              />
              <SidebarItem
                icon={<FileText className="w-5 h-5" />}
                label="Templates"
                active={activeContent === "templates"}
                onClick={() => setActiveContent("templates")}
              />
              <SidebarItem
                icon={<House className="w-5 h-5" />}
                label="Dashboard"
                onClick={handleBackToDashboard}
              />
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 bg-gradient-to-r from-[#d4a017]/10 to-[#b8941f]/10 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                Learning Stats
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Videos Watched</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Articles Read</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quizzes Completed</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-16 lg:pt-0">
        {renderContent()}
      </div>

      {/* User Progress Modal */}
      {showProgress && (
        <UserProgressModal
          isOpen={showProgress}
          onClose={() => setShowProgress(false)}
        />
      )}
    </div>
  );
}
