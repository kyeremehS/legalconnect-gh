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
  const [profile, setProfile] = useState<LawyerProfile>({
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

  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(editProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setEditMode(false);
  };

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
                    {editMode ? (
                      <div className="space-y-2 text-gray-700">
                        <input
                          name="name"
                          value={editProfile.name}
                          onChange={handleEditChange}
                          className="w-full border border-[#F9A825]/40 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                          placeholder="Full Name"
                        />
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4" />
                          <input
                            name="email"
                            value={editProfile.email}
                            onChange={handleEditChange}
                            className="border border-[#F9A825]/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                            placeholder="Email"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4" />
                          <input
                            name="phone"
                            value={editProfile.phone}
                            onChange={handleEditChange}
                            className="border border-[#F9A825]/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                            placeholder="Phone"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4" />
                          <input
                            name="location"
                            value={editProfile.location}
                            onChange={handleEditChange}
                            className="border border-[#F9A825]/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                            placeholder="Location"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                  {editMode ? (
                    <div className="flex flex-col gap-2">
                      <button
                        className="px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b17d25] transition-colors"
                        onClick={handleSave}
                        type="button"
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-200 text-[#d4a017] rounded-lg hover:bg-gray-300 transition-colors"
                        onClick={handleCancel}
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="px-4 py-2 bg-[#fff8eb] text-[#d4a017] rounded-lg hover:bg-[#d4a017] hover:text-white transition-colors"
                      onClick={() => setEditMode(true)}
                      type="button"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Bio & Experience */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  About Me
                </h3>
                {editMode ? (
                  <textarea
                    name="bio"
                    value={editProfile.bio}
                    onChange={handleEditChange}
                    className="w-full border border-[#F9A825]/40 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                    placeholder="Short bio"
                    rows={3}
                  />
                ) : (
                  <p className="text-[#4a4a4a] mb-6">{profile.bio}</p>
                )}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#fff8eb] flex items-center justify-center">
                      <Book className="w-6 h-6 text-[#d4a017]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#4a4a4a]">Experience</p>
                      {editMode ? (
                        <input
                          name="experience"
                          type="number"
                          value={editProfile.experience}
                          onChange={handleEditChange}
                          className="border border-[#F9A825]/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] w-20 text-gray-700"
                          placeholder="Years"
                        />
                      ) : (
                        <p className="font-semibold text-[#1a1a1a]">
                          {profile.experience} Years
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#fff8eb] flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#d4a017]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#4a4a4a]">Rating</p>
                      {editMode ? (
                        <input
                          name="rating"
                          type="number"
                          step="0.1"
                          value={editProfile.rating}
                          onChange={handleEditChange}
                          className="border border-[#F9A825]/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] w-20 text-gray-700"
                          placeholder="Rating"
                        />
                      ) : (
                        <p className="font-semibold text-[#1a1a1a]">
                          {profile.rating}/5.0
                        </p>
                      )}
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
                {editMode ? (
                  <div className="space-y-2 text-gray-700">
                    {editProfile.education.map((edu, idx) => (
                      <input
                        key={idx}
                        value={edu}
                        onChange={(e) => {
                          const newEdu = [...editProfile.education];
                          newEdu[idx] = e.target.value;
                          setEditProfile({ ...editProfile, education: newEdu });
                        }}
                        className="w-full border border-[#F9A825]/40 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                        placeholder={`Education ${idx + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      className="px-3 py-1 bg-[#d4a017] text-white rounded hover:bg-[#b17d25] transition-colors"
                      onClick={() =>
                        setEditProfile({
                          ...editProfile,
                          education: [...editProfile.education, ""],
                        })
                      }
                    >
                      + Add Education
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {profile.education.map((edu, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#d4a017]" />
                        <span className="text-[#4a4a4a]">{edu}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Areas of Expertise */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  Areas of Expertise
                </h3>
                {editMode ? (
                  <div className="flex flex-wrap gap-2 text-gray-700">
                    {editProfile.expertise.map((expert, idx) => (
                      <input
                        key={idx}
                        value={expert}
                        onChange={(e) => {
                          const newExpert = [...editProfile.expertise];
                          newExpert[idx] = e.target.value;
                          setEditProfile({
                            ...editProfile,
                            expertise: newExpert,
                          });
                        }}
                        className="border border-[#F9A825]/40 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                        placeholder={`Expertise ${idx + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      className="px-3 py-1 bg-[#d4a017] text-white rounded hover:bg-[#b17d25] transition-colors"
                      onClick={() =>
                        setEditProfile({
                          ...editProfile,
                          expertise: [...editProfile.expertise, ""],
                        })
                      }
                    >
                      + Add Expertise
                    </button>
                  </div>
                ) : (
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
                )}
              </div>

              {/* Languages */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  Languages
                </h3>
                {editMode ? (
                  <div className="flex flex-wrap gap-2 text-gray-700">
                    {editProfile.languages.map((lang, idx) => (
                      <input
                        key={idx}
                        value={lang}
                        onChange={(e) => {
                          const newLang = [...editProfile.languages];
                          newLang[idx] = e.target.value;
                          setEditProfile({
                            ...editProfile,
                            languages: newLang,
                          });
                        }}
                        className="border border-[#F9A825]/40 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                        placeholder={`Language ${idx + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      className="px-3 py-1 bg-[#d4a017] text-white rounded hover:bg-[#b17d25] transition-colors"
                      onClick={() =>
                        setEditProfile({
                          ...editProfile,
                          languages: [...editProfile.languages, ""],
                        })
                      }
                    >
                      + Add Language
                    </button>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
