"use client";
import { useState } from "react";
import Image from "next/image";

export default function LegalContent() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      className={`min-h-screen bg-white p-8 ${
        isFullScreen ? "flex flex-col items-center justify-center" : ""
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 text-[#1A237E] text-center ${
          isFullScreen ? "hidden" : ""
        }`}
      >
        Watch Legal Content
      </h1>
      <div
        className={`${
          isFullScreen
            ? "w-full h-screen flex items-center justify-center bg-black fixed top-0 left-0 z-50"
            : "grid gap-8 md:grid-cols-2 justify-center"
        }`}
      >
        <div
          className={`${
            isFullScreen
              ? "w-full h-full flex flex-col items-center justify-center"
              : ""
          }`}
        >
          <iframe
            width={isFullScreen ? "100%" : "100%"}
            height={isFullScreen ? "100%" : "315"}
            src="https://www.tiktok.com/@thelaw_gh/video/7470121358928727302"
            title="Legal Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`rounded-lg shadow ${
              isFullScreen ? "h-full" : ""
            }`}
            style={isFullScreen ? { minHeight: "80vh" } : {}}
          ></iframe>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="bg-[#1A237E] text-white px-4 py-2 rounded hover:bg-[#283593] transition"
            >
              {isFullScreen ? "Exit Full Screen" : "Full Screen"}
            </button>
          </div>
          {!isFullScreen && (
            <p className="mt-2 text-lg font-semibold text-[#200000]">
              Understanding Your Rights in Ghana
            </p>
          )}
        </div>
        <a
          href="https://www.tiktok.com/@thelaw_gh/video/7470121358928727302"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1A237E] text-white px-4 py-2 rounded hover:bg-[#283593] transition"
        >
          Watch on TikTok
        </a>
      </div>
    </div>
  );
}