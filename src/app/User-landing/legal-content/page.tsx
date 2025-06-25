"use client";
import React, { useState, useRef } from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import { METHODS } from "node:http";

const categories = [
  {
    label: "Land Law",
    description: "Videos about land rights, disputes, and property law.",
    videos: [
      {
        title: "Understanding Land Ownership in Ghana",
        url: "https://www.youtube.com/embed/your_land_video_id",
        lawyer: "Ama Kwarteng, Esq.",
      },
      {
        title: "Resolving Land Disputes",
        url: "https://www.youtube.com/embed/your_land_dispute_video_id",
        lawyer: "Kwame Mensah, Esq.",
      },
    ],
  },
  {
    label: "Family Law",
    description:
      "Videos about marriage, divorce, child custody, and related issues.",
    videos: [
      {
        title: "Marriage and Divorce Laws",
        url: "https://www.youtube.com/embed/your_family_video_id",
        lawyer: "Abena Owusu, Esq.",
      },
      {
        title: "Child Custody Explained",
        url: "https://www.youtube.com/embed/your_custody_video_id",
        lawyer: "Kojo Asante, Esq.",
      },
    ],
  },
  {
    label: "Employment Law",
    description:
      "Videos about employee rights, contracts, and workplace issues.",
    videos: [
      {
        title: "Your Rights as an Employee",
        url: "https://www.youtube.com/embed/your_employment_video_id",
        lawyer: "Efua Boateng, Esq.",
      },
      {
        title: "Understanding Employment Contracts",
        url: "https://www.youtube.com/embed/your_contract_video_id",
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

function flattenVideos() {
  const videos: VideoItem[] = [];
  for (const cat of categories) {
    for (const vid of cat.videos) {
      videos.push({ ...vid, category: cat.label });
    }
  }
  return videos;
}

export default function LegalContentPage() {
  const videos = flattenVideos();
  const [current, setCurrent] = useState(0);
  const [likes, setLikes] = useState(Array(videos.length).fill(0));
  const [comments, setComments] = useState(Array(videos.length).fill(0));
  const [shares, setShares] = useState(Array(videos.length).fill(0));
  const touchStartY = useRef<number | null>(null);

  // Handle scroll/swipe (for desktop and mobile)
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && current < videos.length - 1) {
      setCurrent((c) => c + 1);
    } else if (e.deltaY < 0 && current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  // Touch swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    if (touchStartY.current - touchEndY > 50 && current < videos.length - 1) {
      setCurrent((c) => c + 1);
    } else if (touchEndY - touchStartY.current > 50 && current > 0) {
      setCurrent((c) => c - 1);
    }
    touchStartY.current = null;
  };

  // Optional: Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" && current < videos.length - 1) {
      setCurrent((c) => c + 1);
    } else if (e.key === "ArrowUp" && current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  // Action handlers
  const handleLike = () => {
    setLikes((prev) => {
      const arr = [...prev];
      arr[current]++;
      return arr;
    });
  };
  const handleComment = () => {
    setComments((prev) => {
      const arr = [...prev];
      arr[current]++;
      return arr;
    });
  };
  const handleShare = () => {
    setShares((prev) => {
      const arr = [...prev];
      arr[current]++;
      return arr;
    });
    alert("Link copied to clipboard!");
  };

  return (
    <main
      className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative w-full h-[80vh] max-w-md mx-auto overflow-hidden rounded-2xl shadow-lg bg-black"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ scrollSnapType: "y mandatory" }}
      >
        {videos.map((video, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-500 ${
              idx === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              scrollSnapAlign: "start",
              background: "#000",
              display: idx === current ? "block" : "none",
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[50vh] md:h-[60vh] rounded-xl bg-black"
                />
              </div>
              <div className="flex justify-between items-end px-4 pb-6 pt-2">
                {/* Video Info */}
                <div>
                  <div className="text-white font-bold text-lg mb-1">
                    {video.title}
                  </div>
                  <div className="text-[#d4a017] font-semibold text-sm mb-1">
                    {video.lawyer}
                  </div>
                  <div className="text-xs text-white/80 mb-2">
                    #{video.category}
                  </div>
                </div>
                {/* Actions */}
                <div className="flex flex-col items-center gap-4">
                  <button
                    className="flex flex-col items-center text-white hover:text-[#d4a017] transition"
                    onClick={handleLike}
                  >
                    <Heart className="w-7 h-7 mb-1" />
                    <span className="text-xs">{likes[idx]}</span>
                  </button>
                  <button
                    className="flex flex-col items-center text-white hover:text-[#d4a017] transition"
                    onClick={handleComment}
                  >
                    <MessageCircle className="w-7 h-7 mb-1" />
                    <span className="text-xs">{comments[idx]}</span>
                  </button>
                  <button
                    className="flex flex-col items-center text-white hover:text-[#d4a017] transition"
                    onClick={handleShare}
                  >
                    <Share className="w-7 h-7 mb-1" />
                    <span className="text-xs">{shares[idx]}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Progress Indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {videos.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === current ? "bg-[#d4a017]" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        Scroll, swipe, or use ↑/↓ keys for more videos
      </div>
    </main>
  );
}
