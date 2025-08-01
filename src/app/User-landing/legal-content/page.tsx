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
import QuizCard from "../../components/QuizCard";
import MobileSidebar from "../../components/mobilesidebar";
import ActionButton from "../../components/videoaction";
import {
  legalArticles,
  legalQuizzes,
  legalTemplates,
  videoCategories,
} from "../../components/mockdata";

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

  // Update your handlePlayPause function to be consistent
  const handlePlayPause = () => {
    const currentVideo = document.querySelector(
      `#video-${activeIdx} video`
    ) as HTMLVideoElement;

    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play();
        setIsPlaying(true);
      }
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
    // Pause ALL video elements, not just the current one
    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });

    setIsPlaying(false);

    let newIndex = activeIdx;

    if (direction === "up" && activeIdx > 0) {
      newIndex = activeIdx - 1;
      setActiveIdx(newIndex);
      setVideoProgress(0);
      setCurrentTime(0);
    } else if (direction === "down" && activeIdx < videos.length - 1) {
      newIndex = activeIdx + 1;
      setActiveIdx(newIndex);
      setVideoProgress(0);
      setCurrentTime(0);
    }

    // Only proceed if index actually changed
    if (newIndex !== activeIdx) {
      // Set playing state immediately
      setIsPlaying(true);
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

  // Update your existing keyboard event handler (around lines 212-240)
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
          `#video-${activeIdx} video`
        ) as HTMLVideoElement;

        if (currentVideo) {
          if (isPlaying) {
            currentVideo.pause();
            setIsPlaying(false);

            // Optional: Show pause icon briefly
            console.log("Video paused with spacebar");
          } else {
            currentVideo.play();
            setIsPlaying(true);

            // Optional: Show play icon briefly
            console.log("Video playing with spacebar");
          }
        }
        return;
      }

      // Arrow key navigation (existing code)
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        const allVideos = document.querySelectorAll("video");
        allVideos.forEach((video) => {
          video.pause();
          video.currentTime = 0;
        });

        setIsPlaying(false);

        if (event.key === "ArrowUp" && activeIdx > 0) {
          navigateVideo("up");
        } else if (event.key === "ArrowDown" && activeIdx < videos.length - 1) {
          navigateVideo("down");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeContent, activeIdx, videos.length, isPlaying]); // Added isPlaying to dependencies

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
          <main className="flex-1 bg-black p-6 relative overflow-hidden lg:m-5 lg:rounded-xl">
            <AnimatePresence
              mode="wait"
              onExitComplete={() => {
                // Ensure all videos are paused when animation completes
                const allVideos = document.querySelectorAll("video");
                allVideos.forEach((video) => {
                  video.pause();
                });
              }}
            >
              <motion.div
                key={activeIdx} // ✅ Use activeIdx as key for proper updates
                id={`video-${activeIdx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="relative w-full h-full flex justify-center items-center">
                  <video
                    src={videos[activeIdx].url}
                    autoPlay={isPlaying} // This ensures video plays based on state
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full max-w-md h-full object-cover lg:rounded-2xl shadow-2xl"
                    style={{
                      maxHeight: "90vh",
                      maxWidth: "420px",
                    }}
                    onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget)}
                    onLoadedMetadata={(e) =>
                      handleLoadedMetadata(e.currentTarget)
                    }
                    onCanPlay={(e) => {
                      // Auto-play when video is ready and isPlaying is true
                      if (isPlaying) {
                        e.currentTarget.play().catch(console.log);
                      }
                    }}
                    onEnded={() => {
                      if (activeIdx < videos.length - 1) {
                        setActiveIdx(activeIdx + 1);
                        setVideoProgress(0);
                      }
                    }}
                  />

                  {/* Video Info Overlay - NOW SHOWS CORRECT INFO */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent lg:rounded-b-2xl"
                  >
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-white mb-2">
                        {videos[activeIdx].title} {/* ✅ Correct title */}
                      </h2>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#d4a017] font-medium">
                          {videos[activeIdx].lawyer} {/* ✅ Correct lawyer */}
                        </span>
                        <span className="text-white/60">
                          {videos[activeIdx].views} views{" "}
                          {/* ✅ Correct views */}
                        </span>
                        <span className="text-white/60">
                          {videos[activeIdx].duration}{" "}
                          {/* ✅ Correct duration */}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="inline-block px-3 py-1 bg-[#d4a017]/20 text-[#d4a017] text-xs rounded-full">
                          #{videos[activeIdx].category}{" "}
                          {/* ✅ Correct category */}
                        </div>
                        <div className="inline-flex px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full items-center gap-1">
                          <Languages className="w-3 h-3" />
                          {videos[activeIdx].language}{" "}
                          {/* ✅ Correct language */}
                        </div>
                      </div>
                      <p className="text-white/80 text-sm mt-2 line-clamp-2">
                        {videos[activeIdx].description}{" "}
                        {/* ✅ Correct description */}
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
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const width = rect.width;
                          const percentage = (clickX / width) * 100;
                          const video = document.querySelector(
                            `#video-${activeIdx} video`
                          ) as HTMLVideoElement;
                          if (video && videoDuration) {
                            const newTime = (percentage / 100) * videoDuration;
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
                      count={likes[activeIdx]}
                      onClick={() => handleLike(activeIdx)}
                    />
                    <ActionButton
                      icon={<MessageCircle className="w-6 h-6" />}
                      count={comments[activeIdx]}
                      onClick={() => handleComment(activeIdx)}
                    />
                    <ActionButton
                      icon={<Share className="w-6 h-6" />}
                      count={shares[activeIdx]}
                      onClick={() => handleShare(activeIdx)}
                    />
                  </div>

                  {/* Navigation Controls - UPDATE THESE BUTTONS */}
                  <div className="absolute right-5 mt-10 bottom-18 flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all disabled:opacity-50"
                      onClick={() => {
                        // Pause current video before navigating
                        const currentVideo = document.querySelector(
                          `#video-${activeIdx} video`
                        ) as HTMLVideoElement;

                        if (currentVideo) {
                          currentVideo.pause();
                          setIsPlaying(false);
                        }

                        navigateVideo("up");
                      }}
                      disabled={activeIdx === 0}
                    >
                      <ChevronUp className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all disabled:opacity-50"
                      onClick={() => {
                        // Pause current video before navigating
                        const currentVideo = document.querySelector(
                          `#video-${activeIdx} video`
                        ) as HTMLVideoElement;

                        if (currentVideo) {
                          currentVideo.pause();
                          setIsPlaying(false);
                        }

                        navigateVideo("down");
                      }}
                      disabled={activeIdx === videos.length - 1}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        );

      case "articles":
        return (
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
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
                    <ArticleCard article={article} />{" "}
                    {/* ← Your component is used here */}
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

  // Add this ArticleModal component to your Legal Content page
  function ArticleModal({
    article,
    isOpen,
    onClose,
  }: {
    article: any;
    isOpen: boolean;
    onClose: () => void;
  }) {
    if (!isOpen) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {videos[activeIdx].title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm opacity-90">
                    <span>By {videos[activeIdx].lawyer}</span>
                    <span>{videos[activeIdx].views} views</span>
                    <span>{videos[activeIdx].duration}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] prose prose-gray max-w-none">
              {/* Article Image */}
              {videos[activeIdx].thumbnail && (
                <img
                  src={videos[activeIdx].thumbnail}
                  alt={videos[activeIdx].title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}

              {/* Article Content - Full scrollable text */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium text-gray-900 mb-4">
                  {videos[activeIdx].description}
                </p>

                {/* Full article content - you can replace this with actual content */}
                <div className="space-y-4">
                  <p>
                    Understanding your legal rights is fundamental to navigating
                    the complex world of law in Ghana. This comprehensive guide
                    will walk you through the essential aspects of Ghanaian law
                    that every citizen should be aware of.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    Constitutional Rights
                  </h3>
                  <p>
                    The 1992 Constitution of Ghana guarantees fundamental human
                    rights and freedoms to all citizens. These include the right
                    to life, liberty, dignity, equality before the law, and
                    freedom of speech, expression, and association.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    Legal Procedures
                  </h3>
                  <p>
                    When dealing with legal matters, it's important to
                    understand the proper procedures. This includes knowing when
                    to seek legal counsel, how to file complaints, and
                    understanding court processes.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    Property Rights
                  </h3>
                  <p>
                    Property law in Ghana covers both land and personal
                    property. Understanding these rights helps protect your
                    investments and ensures you can make informed decisions
                    about property transactions.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    Employment Law
                  </h3>
                  <p>
                    Workers in Ghana are protected by various labor laws. These
                    cover minimum wage requirements, working conditions,
                    termination procedures, and workplace safety standards.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    Family Law
                  </h3>
                  <p>
                    Family law encompasses marriage, divorce, child custody, and
                    inheritance matters. Understanding these laws helps families
                    navigate personal legal issues with confidence.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    Criminal Law Basics
                  </h3>
                  <p>
                    Every citizen should understand basic criminal law
                    principles, including their rights when arrested, the bail
                    process, and how the criminal justice system works in Ghana.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    Seeking Legal Help
                  </h3>
                  <p>
                    When you need legal assistance, it's important to choose
                    qualified legal practitioners who are members of the Ghana
                    Bar Association. This ensures you receive professional and
                    ethical legal services.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                    <h4 className="font-bold text-yellow-800 mb-2">
                      Important Note
                    </h4>
                    <p className="text-yellow-700">
                      This article provides general information and should not
                      be considered as legal advice. For specific legal matters,
                      always consult with a qualified legal practitioner.
                    </p>
                  </div>

                  <p>
                    Legal education empowers citizens to make informed decisions
                    and protect their rights. By understanding these fundamental
                    concepts, you can better navigate Ghana's legal system and
                    seek appropriate help when needed.
                  </p>
                </div>
              </div>

              {/* Article Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                {videos[activeIdx].tags &&
                  videos[activeIdx].tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#d4a017]/10 text-[#d4a017] rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

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
