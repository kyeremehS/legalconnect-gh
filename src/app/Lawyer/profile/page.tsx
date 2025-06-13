"use client";
import React, { useState } from "react";

export default function LawyerProfile() {
  // State for edit mode and profile fields
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ama Kwarteng, Esq.",
    specialization: "Land Law, Family Law, Corporate Law",
    location: "Accra, Ghana",
    about:
      "Ama Kwarteng is an experienced lawyer specializing in land and family law with over 10 years of practice. She is dedicated to providing clear, practical legal advice and passionate about helping clients resolve their legal issues efficiently.",
    credentials: [
      "LL.B, University of Ghana",
      "Member, Ghana Bar Association",
      "Certified Mediator",
    ],
    practiceAreas: ["Land Law", "Family Law", "Corporate Law"],
    avatar: "/lawyer-avatar.jpg",
  });

  // Handlers for editing
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAreaChange = (idx: number, value: string) => {
    setProfile((prev) => ({
      ...prev,
      practiceAreas: prev.practiceAreas.map((area, i) =>
        i === idx ? value : area
      ),
    }));
  };

  const handleCredentialChange = (idx: number, value: string) => {
    setProfile((prev) => ({
      ...prev,
      credentials: prev.credentials.map((cred, i) =>
        i === idx ? value : cred
      ),
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Here you would typically send the updated profile to your backend
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] py-8 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8 mt-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <img
            src={profile.avatar}
            alt="Lawyer profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#F9A825]"
          />
          <div className="flex-1">
            {editMode ? (
              <>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="text-2xl font-bold text-[#1A237E] mb-2 w-full border-b focus:outline-none"
                  placeholder="Name"
                />
                <label htmlFor="specialization" className="sr-only">
                  Specialization
                </label>
                <input
                  id="specialization"
                  type="text"
                  name="specialization"
                  value={profile.specialization}
                  onChange={handleChange}
                  className="text-gray-700 mb-2 w-full border-b focus:outline-none"
                  placeholder="Specialization"
                />
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="text-gray-500 mb-2 w-full border-b focus:outline-none"
                  placeholder="Location"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-[#1A237E]">
                  {profile.name}
                </h1>
                <p className="text-gray-700">{profile.specialization}</p>
                <p className="text-gray-500">{profile.location}</p>
              </>
            )}
            <div className="flex gap-2 mt-2">
              <button className="bg-[#F9A825] text-[#1A237E] px-4 py-2 rounded font-semibold">
                Message
              </button>
              <button
                className="bg-gray-200 text-[#1A237E] px-4 py-2 rounded font-semibold ml-2"
                onClick={() => setEditMode((prev) => !prev)}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
              {editMode && (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded font-semibold ml-2"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>

        {/* About/Bio */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A237E] mb-2">About</h2>
          {editMode ? (
            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
              className="text-gray-700 w-full border rounded p-2"
              rows={4}
              placeholder="About"
            />
          ) : (
            <p className="text-gray-700">{profile.about}</p>
          )}
        </section>

        {/* Credentials */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A237E] mb-2">
            Credentials
          </h2>
          {editMode ? (
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {profile.credentials.map((cred, idx) => (
                <li key={idx}>
                  <label
                    htmlFor={`cred-${idx}`}
                    className="sr-only"
                  >{`Credential ${idx + 1}`}</label>
                  <input
                    id={`cred-${idx}`}
                    type="text"
                    value={cred}
                    onChange={(e) =>
                      handleCredentialChange(idx, e.target.value)
                    }
                    className="w-full border-b focus:outline-none"
                    placeholder={`Credential ${idx + 1}`}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="list-disc list-inside text-gray-700">
              {profile.credentials.map((cred, idx) => (
                <li key={idx}>{cred}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Practice Areas */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A237E] mb-2">
            Practice Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {editMode
              ? profile.practiceAreas.map((area, idx) => (
                  <span key={idx}>
                    <label
                      htmlFor={`area-${idx}`}
                      className="sr-only"
                    >{`Practice Area ${idx + 1}`}</label>
                    <input
                      id={`area-${idx}`}
                      type="text"
                      value={area}
                      onChange={(e) => handleAreaChange(idx, e.target.value)}
                      className="bg-[#F9A825]/20 text-[#1A237E] px-3 py-1 rounded border focus:outline-none"
                      placeholder={`Practice Area ${idx + 1}`}
                    />
                  </span>
                ))
              : profile.practiceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F9A825]/20 text-[#1A237E] px-3 py-1 rounded"
                  >
                    {area}
                  </span>
                ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A237E] mb-2">
            Client Reviews
          </h2>
          <div className="bg-gray-50 p-4 rounded mb-2">
            <p className="text-gray-700 italic">
              "Very professional and helpful!"
            </p>
            <span className="text-xs text-gray-500">- Kofi A.</span>
          </div>
          <div className="bg-gray-50 p-4 rounded mb-2">
            <p className="text-gray-700 italic">
              "Quick to respond and gave clear advice."
            </p>
            <span className="text-xs text-gray-500">- Abena S.</span>
          </div>
        </section>
      </div>
    </main>
  );
}
