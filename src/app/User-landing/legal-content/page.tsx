"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

// Video categories and data
const categories = [
  {
    label: "Land Law",
    description: "Videos about land rights, disputes, and property law.",
    videos: [
      {
        title: "Understanding Land Ownership in Ghana",
        url: "/GFA and footballer.mp4",
        lawyer: "Ama Kwarteng, Esq.",
        views: "12.5K",
        duration: "5:32",
      },
      {
        title: "Resolving Land Disputes",
        url: "/legal-videos/Building_without permit.mp4",
        lawyer: "Kwame Mensah, Esq.",
        views: "8.2K",
        duration: "7:15",
      },
    ],
  },
  {
    label: "Family Law",
    description: "Videos about marriage, divorce, child custody, and related issues.",
    videos: [
      {
        title: "Marriage and Divorce Laws",
        url: "/legal-videos/Building_without permit.mp4",
        lawyer: "Abena Owusu, Esq.",
        views: "15.1K",
        duration: "6:45",
      },
      {
        title: "Child Custody Explained",
        url: "/legal-videos/Building_without permit.mp4",
        lawyer: "Kojo Asante, Esq.",
        views: "9.8K",
        duration: "4:20",
      },
    ],
  },
  {
    label: "Employment Law",
    description: "Videos about employee rights, contracts, and workplace issues.",
    videos: [
      {
        title: "Your Rights as an Employee",
        url: "/legal-videos/Building_without permit.mp4",
        lawyer: "Efua Boateng, Esq.",
        views: "11.3K",
        duration: "8:12",
      },
      {
        title: "Understanding Employment Contracts",
        url: "/videos/employment2.mp4",
        lawyer: "Yaw Adu, Esq.",
        views: "6.7K",
        duration: "5:58",
      },
    ],
  },
];

type VideoItem = {
  title: string;
  url: string;
  lawyer: string;
  category: string;
  views: string;
  duration: string;
};

// Flatten all videos into a single array for feed
function flattenVideos() {
  const videos: VideoItem[] = [];
  for (const cat of categories) {
    for (const vid of cat.videos) {
      videos.push({ ...vid, category: cat.label });
    }
  }
  return videos;
}

// Sidebar navigation item with Lawyer Dashboard styling
function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active
          ? "bg-[#d4a017] text-white font-semibold shadow-lg"
          : "text-gray-700 hover:bg-gray-100 hover:text-[#d4a017]"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
}

// Action button with refined styling
function ActionButton({
  icon,
  count,
  onClick,
}: {
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-[#d4a017]/20 transition-all border border-white/20"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{count}</span>
    </motion.button>
  );
}

// Video controls component
function VideoControls({
  isPlaying,
  isMuted,
  onPlayPause,
  onMuteToggle,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
}) {
  return (
    <div className="absolute bottom-20 left-4 flex gap-2 -mb-10">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
        onClick={onMuteToggle}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>
    </div>
  );
}

// Mobile Sidebar Component
function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col justify-between h-full py-6 px-4">
              <div>
                {/* Header with close button */}
                <div className="flex items-center justify-between mb-8 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
                      <Tv className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="font-bold text-xl text-gray-800">Legal Content</h1>
                      <p className="text-sm text-gray-500">Educational Videos</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  <SidebarItem
                    icon={<Home className="w-5 h-5" />}
                    label="For You"
                    active
                    onClick={onClose}
                  />
                  <SidebarItem
                    icon={<Compass className="w-5 h-5" />}
                    label="Explore"
                    onClick={onClose}
                  />
                  <SidebarItem
                    icon={<User className="w-5 h-5" />}
                    label="Profile"
                    onClick={onClose}
                  />
                </nav>

                {/* Categories */}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 px-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 5 }}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-[#d4a017] cursor-pointer transition-all"
                        onClick={onClose}
                      >
                        {category.label}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-xs text-gray-400 space-y-1">
                  <div>© 2025 LegalConnect</div>
                  <div>Terms & Policies</div>
                  <div>Educational Content</div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function VideoSectionPage() {
  const videos = flattenVideos();
  const [likes, setLikes] = useState(Array(videos.length).fill(3292));
  const [comments, setComments] = useState(Array(videos.length).fill(84));
  const [shares, setShares] = useState(Array(videos.length).fill(68));
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    const video = document.querySelector(`#video-${activeIdx} video`) as HTMLVideoElement;
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
    const video = document.querySelector(`#video-${activeIdx} video`) as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Navigation functions
  const navigateVideo = (direction: "up" | "down") => {
    if (direction === "up" && activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    } else if (direction === "down" && activeIdx < videos.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mb-20 lg:mb-0">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-30">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </motion.button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#d4a017] rounded-lg flex items-center justify-center">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg text-gray-800">Legal Content</h1>
          </div>

          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex h-screen pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col justify-between py-6 px-4 shadow-sm m-5 rounded-xl">
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8 px-2"
            >
              <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">Legal Content</h1>
                <p className="text-sm text-gray-500">Educational Videos</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="space-y-2">
              <SidebarItem icon={<Home className="w-5 h-5" />} label="For You" active />
              <SidebarItem icon={<Compass className="w-5 h-5" />} label="Explore" />
              <SidebarItem icon={<User className="w-5 h-5" />} label="Profile" />
            </nav>

            {/* Categories */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 px-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-[#d4a017] cursor-pointer transition-all"
                  >
                    {category.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4">
            <div className="text-xs text-gray-400 space-y-1">
              <div>© 2025 LegalConnect</div>
              <div>Terms & Policies</div>
              <div>Educational Content</div>
            </div>
          </div>
        </aside>

        {/* Main Video Feed */}
        <main className="flex-1 bg-black relative overflow-hidden lg:m-5 lg:rounded-xl">
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
                  />

                  {/* Video Info Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent lg:rounded-b-2xl"
                  >
                    <div className="mb-15">
                      <h2 className="text-xl font-bold text-white mb-2">{video.title}</h2>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#d4a017] font-medium">{video.lawyer}</span>
                        <span className="text-white/60">{video.views} views</span>
                        <span className="text-white/60">{video.duration}</span>
                      </div>
                      <div className="inline-block px-3 py-1 bg-[#d4a017]/20 text-[#d4a017] text-xs rounded-full mt-2">
                        #{video.category}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((idx + 1) / videos.length) * 100}%` }}
                        className="h-full bg-[#d4a017] rounded-full"
                        transition={{ duration: 0.5 }}
                      />
                    </div>
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
                  <div className="absolute right-4 bottom-24 flex flex-col gap-2">
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
      </div>
    </div>
  );
}
