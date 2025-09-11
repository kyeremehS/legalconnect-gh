"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Book, Star, ArrowLeft, Edit, Save, X, Plus, Building, Briefcase, FileText } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useLawyerProfile } from "../../../hooks/useLawyerProfile";
import LawyerAuthWrapper from "../../components/auth/LawyerAuthWrapper";
import DocumentManager from "../../../components/lawyer/DocumentManager";

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
  const { user, isAuthenticated } = useAuth();
  const { profile: apiProfile, loading, error, createProfile, updateProfile } = useLawyerProfile();
  
  const [profile, setProfile] = useState<LawyerProfile>({
    name: "",
    email: "",
    phone: "",
    location: "",
    specialization: "",
    experience: 0,
    rating: 4.8,
    bio: "",
    education: [],
    expertise: [],
    languages: ["English"],
  });
  
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'documents'>('profile');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  // Ref for hidden file input
  const profilePicInputRef = useRef<HTMLInputElement>(null);

  // Update profile state when API data loads
  useEffect(() => {
    if (user) {
      const updatedProfile = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: apiProfile?.phone || "",
        location: apiProfile?.location || "",
        specialization: apiProfile?.practiceAreas?.[0] || "",
        experience: apiProfile?.experience || 0,
        rating: 4.8, // Static for now
        bio: apiProfile?.professionalSummary || "",
        education: apiProfile?.education ? [apiProfile.education] : [],
        expertise: apiProfile?.practiceAreas || [],
        languages: apiProfile?.languages || ["English"],
      };
      setProfile(updatedProfile);
      setEditProfile(updatedProfile);
    }
  }, [user, apiProfile]);

  // Show loading or auth required states
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a017] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Handle profile picture change
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePic(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  // Handle saving individual fields
  const handleFieldSave = async (fieldName: string) => {
    try {
      setIsSubmitting(true);
      
      // Convert frontend profile format to API format for the specific field
      const apiProfileData: Partial<any> = {};
      
      switch (fieldName) {
        case 'phone':
          apiProfileData.phone = editProfile.phone;
          break;
        case 'location':
          apiProfileData.location = editProfile.location;
          break;
        case 'bio':
          apiProfileData.professionalSummary = editProfile.bio;
          break;
        case 'experience':
          apiProfileData.experience = editProfile.experience;
          break;
        case 'expertise':
          apiProfileData.practiceAreas = editProfile.expertise;
          break;
        case 'education':
          apiProfileData.education = editProfile.education.join(', ');
          break;
        case 'languages':
          apiProfileData.languages = editProfile.languages;
          break;
        default:
          break;
      }

      if (apiProfile) {
        await updateProfile(apiProfileData);
      } else {
        await createProfile({
          firm: editProfile.location,
          location: editProfile.location,
          practiceAreas: editProfile.expertise,
          experience: editProfile.experience,
          professionalSummary: editProfile.bio,
          education: editProfile.education.join(', '),
          barAssociation: "Ghana Bar Association",
          phone: editProfile.phone,
          languages: editProfile.languages,
        });
      }

      // Update the main profile state
      setProfile(editProfile);
      setEditingField(null);
      setSuccessMessage(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} updated successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (err) {
      console.error('Error saving field:', err);
      setFieldError(`Failed to update ${fieldName}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      
      // Convert frontend profile format to API format
      const apiProfileData = {
        firm: editProfile.location, // You might want a separate firm field
        location: editProfile.location,
        practiceAreas: editProfile.expertise,
        experience: editProfile.experience,
        professionalSummary: editProfile.bio,
        education: editProfile.education.join(', '),
        barAssociation: "Ghana Bar Association", // Default
        phone: editProfile.phone,
        languages: editProfile.languages,
      };

      if (apiProfile) {
        await updateProfile(apiProfileData);
      } else {
        await createProfile(apiProfileData);
      }

      setProfile(editProfile);
      setEditMode(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      // Handle error - you might want to show a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setEditMode(false);
    setEditingField(null);
  };

  const handleFieldCancel = (fieldName: string) => {
    // Reset the specific field to original value
    setEditProfile(prev => ({
      ...prev,
      [fieldName]: profile[fieldName as keyof LawyerProfile]
    }));
    setEditingField(null);
  };

  return (
    <LawyerAuthWrapper>
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

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <Save className="w-3 h-3 text-white" />
              </div>
              <p className="text-green-800">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage(null)}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </motion.div>
          )}

          {/* Field Error Message */}
          {fieldError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2"
            >
              <X className="w-5 h-5 text-red-500" />
              <p className="text-red-800">{fieldError}</p>
              <button
                onClick={() => setFieldError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </motion.div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* No Profile State */}
          {!apiProfile && !editMode && (
            <div className="text-center py-12 bg-gray-50 rounded-lg mb-6">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Complete Your Lawyer Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Set up your professional profile to connect with clients.
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-[#d4a017] text-white px-6 py-3 rounded-lg hover:bg-[#b8941f] transition-colors flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Create Profile</span>
              </button>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'profile'
                  ? 'border-[#d4a017] text-[#d4a017]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile Information
              </div>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'documents'
                  ? 'border-[#d4a017] text-[#d4a017]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </div>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
          <div>
          {/* Profile Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Main Info */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Profile Picture */}
                  <div
                    className="w-24 h-24 rounded-full bg-[#fff8eb] flex items-center justify-center cursor-pointer group relative overflow-hidden"
                    title="Click to upload profile picture"
                    onClick={() => profilePicInputRef.current?.click()}
                  >
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-12 h-12 text-[#d4a017]" />
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white text-xs font-semibold">
                        Change Photo
                      </span>
                    </div>
                    {/* Hidden file input for profile picture */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={profilePicInputRef}
                      onChange={handleProfilePicChange}
                      className="hidden"
                      aria-label="Upload profile picture"
                    />
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
                        {/* <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4" />
                          {editingField === 'phone' ? (
                            <div className="flex items-center gap-2">
                              <input
                                name="phone"
                                value={editProfile.phone}
                                onChange={handleEditChange}
                                className="border border-[#F9A825]/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                                placeholder="Phone"
                              />
                              <button
                                onClick={() => handleFieldSave('phone')}
                                disabled={isSubmitting}
                                className="p-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                              >
                                <Save className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleFieldCancel('phone')}
                                className="p-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <span>{profile.phone}</span>
                              <button
                                onClick={() => setEditingField('phone')}
                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-[#d4a017] transition-all"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div> */}
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4" />
                          {editingField === 'location' ? (
                            <div className="flex items-center gap-2">
                              <input
                                name="location"
                                value={editProfile.location}
                                onChange={handleEditChange}
                                className="border border-[#F9A825]/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                                placeholder="Location"
                              />
                              <button
                                onClick={() => handleFieldSave('location')}
                                disabled={isSubmitting}
                                className="p-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                              >
                                <Save className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleFieldCancel('location')}
                                className="p-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <span>{profile.location}</span>
                              <button
                                onClick={() => setEditingField('location')}
                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-[#d4a017] transition-all"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            </div>
                          )}
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
                          {/* <div className="flex items-center gap-2 text-[#4a4a4a]">
                            <Phone className="w-4 h-4" />
                            <span>{profile.phone}</span>
                          </div> */}
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
                        className="px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b17d25] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                        onClick={handleSave}
                        disabled={isSubmitting}
                        type="button"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </>
                        )}
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-200 text-[#d4a017] rounded-lg hover:bg-gray-300 transition-colors"
                        onClick={handleCancel}
                        disabled={isSubmitting}
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#1a1a1a]">
                    About Me
                  </h3>
                  {!editingField && !editMode && (
                    <button
                      onClick={() => setEditingField('bio')}
                      className="p-2 text-gray-400 hover:text-[#d4a017] hover:bg-amber-50 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {editingField === 'bio' ? (
                  <div className="mb-6">
                    <textarea
                      name="bio"
                      value={editProfile.bio}
                      onChange={handleEditChange}
                      className="w-full border border-[#F9A825]/40 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                      placeholder="Tell clients about your legal background and experience..."
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleFieldSave('bio')}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => handleFieldCancel('bio')}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#4a4a4a] mb-6">{profile.bio || 'No bio added yet. Click edit to add your professional summary.'}</p>
                )}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#fff8eb] flex items-center justify-center">
                      <Book className="w-6 h-6 text-[#d4a017]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#4a4a4a]">Experience</p>
                      {editingField === 'experience' ? (
                        <div className="flex items-center gap-2">
                          <input
                            name="experience"
                            type="number"
                            value={editProfile.experience}
                            onChange={handleEditChange}
                            className="border border-[#F9A825]/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#F9A825] w-20 text-gray-700"
                            placeholder="Years"
                          />
                          <button
                            onClick={() => handleFieldSave('experience')}
                            disabled={isSubmitting}
                            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                          >
                            <Save className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleFieldCancel('experience')}
                            className="p-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group">
                          <p className="font-semibold text-[#1a1a1a]">
                            {profile.experience} Years
                          </p>
                          <button
                            onClick={() => setEditingField('experience')}
                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-[#d4a017] transition-all"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#1a1a1a]">
                    Education
                  </h3>
                  {!editingField && !editMode && (
                    <button
                      onClick={() => setEditingField('education')}
                      className="p-2 text-gray-400 hover:text-[#d4a017] hover:bg-amber-50 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {editingField === 'education' ? (
                  <div className="space-y-2 text-gray-700">
                    {editProfile.education.map((edu, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={edu}
                          onChange={(e) => {
                            const newEdu = [...editProfile.education];
                            newEdu[idx] = e.target.value;
                            setEditProfile({ ...editProfile, education: newEdu });
                          }}
                          className="flex-1 border border-[#F9A825]/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                          placeholder={`Education ${idx + 1}`}
                        />
                        <button
                          onClick={() => {
                            const newEdu = editProfile.education.filter((_, i) => i !== idx);
                            setEditProfile({ ...editProfile, education: newEdu });
                          }}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        className="px-3 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b17d25] transition-colors flex items-center gap-2"
                        onClick={() =>
                          setEditProfile({
                            ...editProfile,
                            education: [...editProfile.education, ""],
                          })
                        }
                      >
                        <Plus className="w-4 h-4" />
                        Add Education
                      </button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleFieldSave('education')}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => handleFieldCancel('education')}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {profile.education.length > 0 ? (
                      profile.education.map((edu, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#d4a017]" />
                          <span className="text-[#4a4a4a]">{edu}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 italic">No education added yet. Click edit to add your qualifications.</li>
                    )}
                  </ul>
                )}
              </div>

              {/* Areas of Expertise */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#1a1a1a]">
                    Areas of Expertise
                  </h3>
                  {!editingField && !editMode && (
                    <button
                      onClick={() => setEditingField('expertise')}
                      className="p-2 text-gray-400 hover:text-[#d4a017] hover:bg-amber-50 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {editingField === 'expertise' ? (
                  <div className="space-y-2 text-gray-700">
                    {editProfile.expertise.map((expert, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={expert}
                          onChange={(e) => {
                            const newExpert = [...editProfile.expertise];
                            newExpert[idx] = e.target.value;
                            setEditProfile({
                              ...editProfile,
                              expertise: newExpert,
                            });
                          }}
                          className="flex-1 border border-[#F9A825]/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                          placeholder={`Expertise ${idx + 1}`}
                        />
                        <button
                          onClick={() => {
                            const newExpert = editProfile.expertise.filter((_, i) => i !== idx);
                            setEditProfile({ ...editProfile, expertise: newExpert });
                          }}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        className="px-3 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b17d25] transition-colors flex items-center gap-2"
                        onClick={() =>
                          setEditProfile({
                            ...editProfile,
                            expertise: [...editProfile.expertise, ""],
                          })
                        }
                      >
                        <Plus className="w-4 h-4" />
                        Add Expertise
                      </button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleFieldSave('expertise')}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => handleFieldCancel('expertise')}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.expertise.length > 0 ? (
                      profile.expertise.map((expert, index) => (
                        <span
                          key={index}
                          className="bg-[#f9a825]/20 text-[#1a237e] px-3 py-1 rounded"
                        >
                          {expert}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">No expertise areas added yet. Click edit to add your specializations.</span>
                    )}
                  </div>
                )}
              </div>

              {/* Languages */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#1a1a1a]">
                    Languages
                  </h3>
                  {!editingField && !editMode && (
                    <button
                      onClick={() => setEditingField('languages')}
                      className="p-2 text-gray-400 hover:text-[#d4a017] hover:bg-amber-50 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {editingField === 'languages' ? (
                  <div className="space-y-2 text-gray-700">
                    {editProfile.languages.map((lang, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={lang}
                          onChange={(e) => {
                            const newLang = [...editProfile.languages];
                            newLang[idx] = e.target.value;
                            setEditProfile({
                              ...editProfile,
                              languages: newLang,
                            });
                          }}
                          className="flex-1 border border-[#F9A825]/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-gray-700"
                          placeholder={`Language ${idx + 1}`}
                        />
                        <button
                          onClick={() => {
                            const newLang = editProfile.languages.filter((_, i) => i !== idx);
                            setEditProfile({ ...editProfile, languages: newLang });
                          }}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        className="px-3 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b17d25] transition-colors flex items-center gap-2"
                        onClick={() =>
                          setEditProfile({
                            ...editProfile,
                            languages: [...editProfile.languages, ""],
                          })
                        }
                      >
                        <Plus className="w-4 h-4" />
                        Add Language
                      </button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleFieldSave('languages')}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => handleFieldCancel('languages')}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.length > 0 ? (
                      profile.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-[#f9a825]/20 text-[#1a237e] px-3 py-1 rounded"
                        >
                          {lang}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">No languages added yet. Click edit to add languages you speak.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && apiProfile?.id && (
            <div>
              <DocumentManager lawyerId={apiProfile.id} />
            </div>
          )}
        </motion.div>
      </main>
      </div>
    </LawyerAuthWrapper>
  );
}
