"use client";
import { useState, useMemo } from "react";

// List your video filenames here
const VIDEO_FILES = [
  "Already-used-underpants.mp4",
  "tenant-and-landlord.mp4",
  "AMA-vs-traders.mp4",
  "Child-labour.mp4",
  "Water-closet-Hall.mp4",
  "teacher-and-student.mp4",
  "GFA-and-footballer.mp4",
  // Add more as needed
];

// Helper to get N random videos
function getRandomVideos(arr: string[], n: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function LegalContent() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Pick 2 random videos on each render (change 2 to any number you want)
  const randomVideos = useMemo(() => getRandomVideos(VIDEO_FILES, 3), []);

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
            : "grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center"
        }`}
      >
        <div
          className={`${
            isFullScreen
              ? "w-full h-full flex flex-col items-center justify-center"
              : "contents"
          }`}
        >
          {randomVideos.map((file) => (
            <video
              key={file}
              src={`/legal-videos/${file}`}
              controls
              className={
                isFullScreen
                  ? "rounded-lg mb-4 max-w-[266px] h-[202px] object-cover mx-auto"
                  : "rounded-lg mb-4 w-full max-w-[266px] h-[202px] object-cover mx-auto"
              }
              style={isFullScreen ? { background: "black" } : {}}
            />
          ))}
          <div className="flex justify-center mt-4"></div>
          {!isFullScreen && (
            <p className="mt-2 text-lg font-semibold text-[#200000] text-center">
              Click on a video to watch
            </p>
          )}
        </div>
      </div>
    </div>
  );
}