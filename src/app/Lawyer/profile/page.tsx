"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Book, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type LawyerProfile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string;
  experience: number;
  rating: number;
  bio: string;
  education: string[];
  expertise: string[];
  languages: string[];
};

export default function Profile() {
  const [profile] = useState<LawyerProfile>({
    name: "Ama Kwarteng",
    email: "ama.kwarteng@legalconnect.com",
    phone: "+233 123 456 789",
    location: "Accra, Ghana",
    specialization: "Corporate Law",
    experience: 8,
    rating: 4.8,
    bio: "Experienced corporate lawyer with expertise in business law and contracts.",
    education: [
      "LLB, University of Ghana",
      "Master of Laws (LLM), Harvard Law School",
    ],
    expertise: [
      "Corporate Law",
      "Business Contracts",
      "Mergers & Acquisitions",
      "Intellectual Property",
    ],
    languages: ["English", "Twi", "French"],
  });

  return (
    <div className="min-h-screen bg-white">
      <main className="p-4 lg:p-8 pt-20 lg:pt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with Back Button */}
          <div className="mb-8">
            <Link
              href="/Lawyer"
              className="inline-flex items-center gap-2 text-[#d4a017] hover:text-[#b17d25] mb-4 group transition-colors"
            >
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl font-bold text-[#1a1a1a]">My Profile</h1>
            <p className="text-[#4a4a4a] font-medium">
              Manage your professional information
            </p>
          </div>

          {/* Profile Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Main Info */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-24 h-24 rounded-full bg-[#fff8eb] flex items-center justify-center">
                    <User className="w-12 h-12 text-[#d4a017]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                      {profile.name}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[#4a4a4a]">
                        <Mail className="w-4 h-4" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#4a4a4a]">
                        <Phone className="w-4 h-4" />
                        <span>{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#4a4a4a]">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.location}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#fff8eb] text-[#d4a017] rounded-lg hover:bg-[#d4a017] hover:text-white transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Bio & Experience */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  About Me
                </h3>
                <p className="text-[#4a4a4a] mb-6">{profile.bio}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#fff8eb] flex items-center justify-center">
                      <Book className="w-6 h-6 text-[#d4a017]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#4a4a4a]">Experience</p>
                      <p className="font-semibold text-[#1a1a1a]">
                        {profile.experience} Years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#fff8eb] flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#d4a017]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#4a4a4a]">Rating</p>
                      <p className="font-semibold text-[#1a1a1a]">
                        {profile.rating}/5.0
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Education */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  Education
                </h3>
                <ul className="space-y-3">
                  {profile.education.map((edu, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#d4a017]" />
                      <span className="text-[#4a4a4a]">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas of Expertise */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((expert, index) => (
                    <span
                      key={index}
                      className="bg-[#f9a825]/20 text-[#1a237e] px-3 py-1 rounded"
                    >
                      {expert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-[#f9a825]/20 text-[#1a237e] px-3 py-1 rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
