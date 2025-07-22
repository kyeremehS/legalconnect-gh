"use client";
import { useState } from "react";

const videos = [
  { src: "/videos/video1.mp4", title: "Know Your Rights: Ghana" },
  { src: "/videos/video2.mp4", title: "How to Book a Lawyer" },
  { src: "/videos/video3.mp4", title: "Family Law Basics" },
  // Add more video objects as needed
];

export default function VideoFeed() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto py-10 h-[80vh] overflow-y-scroll scrollbar-hide">
      {videos.map((video, idx) => (
        <div
          key={video.src}
          className={`mb-10 w-full flex flex-col items-center ${
            activeIndex === idx ? "scale-105 shadow-2xl" : "opacity-80"
          }`}
          onMouseEnter={() => setActiveIndex(idx)}
        >
          <video
            src={video.src}
            controls
            autoPlay={activeIndex === idx}
            loop
            className="rounded-2xl w-full max-h-[500px] object-cover bg-black"
            style={{ outline: activeIndex === idx ? "2px solid #d4a017" : "none" }}
          />
          <div className="mt-4 text-lg font-semibold text-gray-800 text-center">
            {video.title}
          </div>
        </div>
      ))}
    </div>
  );
}