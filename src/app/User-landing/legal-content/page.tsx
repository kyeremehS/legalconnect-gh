"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";
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
} from "lucide-react";

import InteractiveQuiz from "../../components/InteractiveQuiz";
import UserProgressModal from "../../components/UserProgressModal";
import TemplateDownloader from "../../components/TemplateDownloader";
import ArticleCard from "../../components/ArticleCard";
import VideoControls from "../../components/videocontrol";
import SidebarItem from "../../components/content-sidebar";
import QuizCard from "../../components/QuizCard"
import MobileSidebar from "../../components/mobilesidebar";
import ActionButton from "../../components/videoaction";
import { legalArticles, legalQuizzes, legalTemplates, videoCategories } from "../../components/mockdata"

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});




type VideoItem = {
  id: string;
  title: string;
  url: string;
  lawyer: string;
  category: string;
  views: string;
  duration: string;
  language: string;
  thumbnail: string;
  description: string;
};

// Content Types
type ContentType = "videos" | "articles" | "quizzes" | "templates" | "chatbot";

// Flatten all videos into a single array for feed
function flattenVideos() {
  const videos: VideoItem[] = [];
  for (const cat of videoCategories) {
    for (const vid of cat.videos) {
      videos.push({ ...vid, category: cat.label });
    }
  }
  return videos;
}

// Template Card Component
function TemplateCard({ template }: { template: (typeof legalTemplates)[0] }) {
  return <TemplateDownloader template={template} />;
}


export default function LegalContentHub() {
  const videos = flattenVideos();
  const [likes, setLikes] = useState(Array(videos.length).fill(3292));
  const [comments, setComments] = useState(Array(videos.length).fill(84));
  const [shares, setShares] = useState(Array(videos.length).fill(68));
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

  const handlePlayPause = () => {
    const video = document.querySelector(
      `#video-${activeIdx} video`
    ) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    const video = document.querySelector(
      `#video-${activeIdx} video`
    ) as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
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
    if (direction === "up" && activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
      setVideoProgress(0); // Reset progress
      setCurrentTime(0);
    } else if (direction === "down" && activeIdx < videos.length - 1) {
      setActiveIdx(activeIdx + 1);
      setVideoProgress(0); // Reset progress
      setCurrentTime(0);
    }
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

  // Render content based on active section
  const renderContent = () => {
    switch (activeContent) {
      case "videos":
        return (
          <main className="flex-1 bg-black p-6 relative overflow-hidden lg:m-5 lg:rounded-xl">
            <AnimatePresence mode="wait">
              {videos.map((video, idx) => (
                <motion.div
                  key={idx}
                  id={`video-${idx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: idx === activeIdx ? 1 : 0,
                    scale: idx === activeIdx ? 1 : 0.9,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 flex items-center justify-center ${
                    idx === activeIdx ? "z-10" : "z-0 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-full flex justify-center items-center">
                    <video
                      src={video.url}
                      autoPlay={idx === activeIdx && isPlaying}
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full max-w-md h-full object-cover lg:rounded-2xl shadow-2xl"
                      style={{
                        maxHeight: "90vh",
                        maxWidth: "420px",
                      }}
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
                      onEnded={() => {
                        if (activeIdx < videos.length - 1) {
                          setActiveIdx(activeIdx + 1);
                          setVideoProgress(0);
                        }
                      }}
                    />

                    {/* Video Info Overlay with Enhanced Progress */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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

                      {/* Enhanced Progress bar with real-time updates */}
                      <div className="space-y-2 mb-8">
                        <div className="flex justify-between text-xs text-white/70">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(videoDuration)}</span>
                        </div>

                        <div
                          className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                          onClick={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const width = rect.width;
                            const percentage = (clickX / width) * 100;
                            const video = document.querySelector(
                              `#video-${activeIdx} video`
                            ) as HTMLVideoElement;
                            if (video && videoDuration) {
                              const newTime =
                                (percentage / 100) * videoDuration;
                              video.currentTime = newTime;
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

                        {/* <div className="flex justify-between text-xs text-white/50">
                          <span>Video {activeIdx + 1} of {videos.length}</span>
                          <span>{Math.round(videoProgress)}% complete</span>
                        </div> */}
                      </div>

                      {/* Call to Action */}
                      {/* <div className="flex gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-[#d4a017] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Book Lawyer
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white/20 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Ask AI
                        </motion.button>
                      </div> */}
                    </motion.div>

                    {/* Video Controls */}
                    <VideoControls
                      isPlaying={isPlaying}
                      isMuted={isMuted}
                      onPlayPause={handlePlayPause}
                      onMuteToggle={handleMuteToggle}
                    />

                    {/* Action Buttons */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                      <ActionButton
                        icon={<Heart className="w-6 h-6" />}
                        count={likes[idx]}
                        onClick={() => handleLike(idx)}
                      />
                      <ActionButton
                        icon={<MessageCircle className="w-6 h-6" />}
                        count={comments[idx]}
                        onClick={() => handleComment(idx)}
                      />
                      <ActionButton
                        icon={<Share className="w-6 h-6" />}
                        count={shares[idx]}
                        onClick={() => handleShare(idx)}
                      />
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute right-5 mt-10 bottom-18 flex flex-col gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all disabled:opacity-50"
                        onClick={() => navigateVideo("up")}
                        disabled={activeIdx === 0}
                      >
                        <ChevronUp className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all disabled:opacity-50"
                        onClick={() => navigateVideo("down")}
                        disabled={activeIdx === videos.length - 1}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </main>
        );

      case "articles":
        return (
          <main className="flex-1 bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {legalArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </main>
        );

      case "quizzes":
        return (
          <main className="flex-1 bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
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
          <main className="flex-1 bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
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
          <h1 className="font-bold text-lg text-gray-800">Legal Hub</h1>
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
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 px-2">
              <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">Legal Hub</h1>
                <p className="text-sm text-gray-500">Learn & Explore</p>
              </div>
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

          {/* Footer */}
          {/* <div className="border-t border-gray-200 pt-4">
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>© 2025 LegalConnect</div>
                      <div>Educational Content</div>
                      <div>Made in Ghana 🇬🇭</div>
                    </div>
                  </div> */}
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
