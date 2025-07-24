"use client";
import React, { useState } from "react";
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
  LogIn,
} from "lucide-react";

// Video categories and data
const categories = [
  {
    label: "Land Law",
    description: "Videos about land rights, disputes, and property law.",
    videos: [
      {
        title: "Understanding Land Ownership in Ghana",
        url: "/legal-videos/Building_without permit.mp4",
        lawyer: "Ama Kwarteng, Esq.",
      },
      {
        title: "Resolving Land Disputes",
        url: "/legal-videos/Building_without permit.mp4",
        lawyer: "Kwame Mensah, Esq.",
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
      },
      {
        title: "Child Custody Explained",
        url: "/legal-videos/Building_without permit.mp4",
        lawyer: "Kojo Asante, Esq.",
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
      },
      {
        title: "Understanding Employment Contracts",
        url: "/videos/employment2.mp4",
        lawyer: "Yaw Adu, Esq.",
      },
    ],
  },
];

type VideoItem = {
  title: string;
  url: string;
  lawyer: string;
  category: string;
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

// Sidebar navigation item
function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-[#222] transition ${
        active ? "bg-[#222] font-bold" : ""
      }`}
    >
      {icon}
      <span className="text-base">{label}</span>
    </div>
  );
}

// Action button for like, comment, share
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
    <button
      className="flex flex-col items-center text-white hover:text-[#d4a017] transition"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{count}</span>
    </button>
  );
}

export default function VideoSectionPage() {
  const videos = flattenVideos();
  const [likes, setLikes] = useState(Array(videos.length).fill(3292));
  const [comments, setComments] = useState(Array(videos.length).fill(84));
  const [shares, setShares] = useState(Array(videos.length).fill(68));
  const [activeIdx, setActiveIdx] = useState(0);

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

  // Scroll to video on navigation
  const scrollToVideo = (idx: number) => {
    document.getElementById(`video-${idx}`)?.scrollIntoView({ behavior: "smooth" });
    setActiveIdx(idx);
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-64 bg-[#181818] text-white flex-col justify-between py-6 px-4 min-h-screen border-r border-gray-800">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <img src="/bell.png" alt="bell" className="w-8 h-8" />
            <span className="font-bold text-2xl tracking-tight">Legal Content</span>
          </div>
          <nav className="space-y-2">
            <SidebarItem icon={<Home />} label="For You" active />
            <SidebarItem icon={<Compass />} label="Explore" />
            <SidebarItem icon={<User />} label="Following" />
            <SidebarItem icon={<PlusSquare />} label="Upload" />
            <SidebarItem icon={<Tv />} label="LIVE" />
            <SidebarItem icon={<User />} label="Profile" />
            <SidebarItem icon={<MoreHorizontal />} label="More" />
          </nav>
        </div>
        <div>
          <button className="w-full bg-[#fe2c55] hover:bg-[#e41e44] text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 mb-4">
            <LogIn className="w-5 h-5" /> Log in
          </button>
          <div className="text-xs text-gray-400 px-2">
            <div className="mb-1">Company</div>
            <div className="mb-1">Program</div>
            <div className="mb-1">Terms & Policies</div>
            <div className="mb-1">© 2025 TikTok</div>
          </div>
        </div>
      </aside>

      {/* Main Video Feed */}
      <main className="flex-1 flex justify-center items-center bg-black">
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          {videos.map((video, idx) => (
            <div
              key={idx}
              id={`video-${idx}`}
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-500 ${
                idx === activeIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{ transition: "opacity 0.5s" }}
            >
              <div className="relative w-full flex justify-center items-center">
                <video
                  src={video.url}
                  autoPlay={idx === activeIdx}
                  loop
                  muted
                  playsInline
                  className="w-full sm:w-[420px] h-[60vh] sm:h-[80vh] object-cover rounded-xl bg-black"
                  onClick={() => setActiveIdx(idx)}
                  style={{
                    maxHeight: "80vh",
                    maxWidth: "100vw",
                  }}
                />
                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-xl">
                  <div className="text-lg sm:text-xl font-bold text-white">{video.title}</div>
                  <div className="text-[#d4a017] text-xs sm:text-sm">{video.lawyer}</div>
                  <div className="text-white/60 text-xs mt-1">#{video.category}</div>
                  {/* Progress bar */}
                  <div className="w-full h-1 bg-white/20 rounded mt-3 sm:mt-4">
                    <div
                      className="h-1 bg-[#d4a017] rounded"
                      style={{ width: `${((idx + 1) / videos.length) * 100}%` }}
                    />
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 sm:gap-6">
                  <ActionButton
                    icon={<Heart className="w-6 h-6 sm:w-7 sm:h-7" />}
                    count={likes[idx]}
                    onClick={() => handleLike(idx)}
                  />
                  <ActionButton
                    icon={<MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />}
                    count={comments[idx]}
                    onClick={() => handleComment(idx)}
                  />
                  <ActionButton
                    icon={<Share className="w-6 h-6 sm:w-7 sm:h-7" />}
                    count={shares[idx]}
                    onClick={() => handleShare(idx)}
                  />
                  {/* Up/Down navigation */}
                  <button
                    className="mt-6 sm:mt-8 text-white/70 hover:text-[#d4a017] transition"
                    onClick={() => scrollToVideo(Math.max(0, idx - 1))}
                    disabled={idx === 0}
                    aria-label="Previous Video"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M12 8l-6 6h12l-6-6z" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    className="text-white/70 hover:text-[#d4a017] transition"
                    onClick={() => scrollToVideo(Math.min(videos.length - 1, idx + 1))}
                    disabled={idx === videos.length - 1}
                    aria-label="Next Video"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M12 16l6-6H6l6 6z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
