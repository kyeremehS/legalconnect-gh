"use client";
import React, { useState } from "react";

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

  const activeCategory = categories.find(
    (cat) => cat.label === selectedCategory
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7F9FC] via-[#e3e8f7] to-[#cfd8fd] py-8 px-2 md:px-6 flex flex-col items-center">
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

      {/* Videos Grid */}
      <section className="w-full max-w-6xl flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
          {activeCategory?.videos.map((video, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-center hover:shadow-2xl transition"
            >
              <div className="w-full aspect-video mb-3 rounded overflow-hidden flex justify-center items-center">
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
    </main>
  );
}
