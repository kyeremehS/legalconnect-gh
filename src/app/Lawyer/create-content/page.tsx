"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VideoCreate() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  // Handle video file selection from local computer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      alert("Please select a valid video file (MP4 or WebM).");
      return;
    }
    const file = files[0];
    if (file && (file.type === "video/mp4" || file.type === "video/webm")) {
      // Validate file size (<50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert("Video file must be under 50MB.");
        return;
      }
      setVideoFile(file);
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Validate duration (<60 seconds)
      const video = document.createElement("video");
      video.src = url;
      video.onloadedmetadata = () => {
        if (video.duration > 60) {
          alert("Video must be 60 seconds or shorter.");
          setVideoFile(null);
          setPreviewUrl("");
          setFileName("");
          URL.revokeObjectURL(url);
        }
      };
    } else {
      alert("Please select a valid video file (MP4 or WebM).");
    }
  };

  // Dummy publish handler (frontend only)
  const handlePublish = () => {
    alert("This is a frontend-only demo. No video will be uploaded.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Upload Legal Video</h1>
        <Link href="/Lawyer" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Upload Section */}
          <div>
            <h2 className="text-xl font-semibold  text-[#000814] mb-2">
              Choose Video from Your Computer
            </h2>
            <p className="text-sm text-[#000814] text-500 mb-2">
              Max 60 seconds, MP4 or WebM, under 50MB
            </p>
            <input
              type="file"
              accept="video/mp4,video/webm"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              aria-label="Choose video file from computer"
            />
            {fileName && (
              <p className="mt-2 text-sm text-gray-600">Selected: {fileName}</p>
            )}
            {previewUrl && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Preview</h3>
                <video
                  ref={videoRef}
                  src={previewUrl}
                  controls
                  className="w-full rounded"
                />
              </div>
            )}
          </div>
          {/* Editing Section */}
          <div>
            <h2 className="text-xl text-[#000814] font-semibold mb-2">
              Video Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Understanding Land Disputes in Ghana"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#000814] font-medium">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Briefly describe your video (e.g., key points or keywords)"
                  rows={4}
                />
              </div>
              <div>
                <label
                  htmlFor="category-select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="text-[#000814]">Select a category</option>
                  <option value="family-law text-[#000814]">Family Law</option>
                  <option value="corporate-law text-[#000814]">
                    Corporate Law
                  </option>
                  <option value="criminal-law text-[#000814]">
                    Criminal Law
                  </option>
                  <option value="land-law text-[#000814]">Land Law</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handlePublish}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Publish
          </button>
          <button
            onClick={() => router.push("/lawyer/videos")}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center">
        <Link href="/help" className="text-blue-500 hover:underline">
          Video Creation Guidelines
        </Link>
      </footer>
    </div>
  );
}
