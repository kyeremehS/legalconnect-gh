"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Example categories and videos
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

export default function LegalContentPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].label);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const activeCategory = categories.find(
    (cat) => cat.label === selectedCategory
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const fileName = "page.tsx";

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
                <video src={previewUrl} controls className="w-full rounded" />
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
                  // value={title}
                  // onChange={(e) => setTitle(e.target.value)}
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
                  // value={description}
                  // onChange={(e) => setDescription(e.target.value)}
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
                  // value={category}
                  // onChange={(e) => setCategory(e.target.value)}
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
            // onClick={handlePublish}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Publish
          </button>
          <button
            // onClick={() => router.push("/lawyer/videos")}
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

      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center mb-8 md:mb-12 px-2">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A237E] mb-4 drop-shadow-lg">
          Legal Video Library
        </h1>
        <p className="text-base md:text-xl text-gray-700 mb-6">
          Watch educational videos categorized by legal issue and lawyer
          expertise.
        </p>
      </section>

      {/* Category Tabs */}
      <nav className="w-full max-w-3xl flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-10">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setSelectedCategory(cat.label)}
            className={`px-4 md:px-6 py-2 rounded-full font-semibold shadow transition
              ${
                selectedCategory === cat.label
                  ? "bg-[#F9A825] text-[#1A237E]"
                  : "bg-white text-[#1A237E] border border-[#F9A825] hover:bg-[#f9a825]/10"
              }`}
            aria-current={selectedCategory === cat.label ? "page" : undefined}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Category Description */}
      <section className="w-full max-w-3xl text-center mb-6 md:mb-8 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-[#1A237E] mb-2">
          {activeCategory?.label}
        </h2>
        <p className="text-gray-700">{activeCategory?.description}</p>
      </section>

      {/* Centered Videos Grid */}
      <section className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full justify-items-center">
          {activeCategory?.videos.map((video, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-center hover:shadow-2xl transition w-full max-w-md"
            >
              <div className="w-full flex justify-center aspect-video mb-3 rounded overflow-hidden">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-48 md:h-56 rounded"
                />
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#1A237E] mb-1 text-center">
                {video.title}
              </h3>
              <span className="text-xs md:text-sm text-gray-500 mb-1 text-center block">
                By {video.lawyer}
              </span>
              <span className="inline-block bg-[#F9A825]/20 text-[#1A237E] px-3 py-1 rounded text-xs font-semibold">
                {activeCategory.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
