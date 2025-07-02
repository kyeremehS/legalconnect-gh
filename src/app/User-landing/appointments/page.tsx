"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

// Example lawyer data
type Lawyer = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  image: string;
};

const availableLawyers: Lawyer[] = [
  {
    id: 1,
    name: "Ama Kwarteng",
    specialty: "Land Disputes",
    email: "ama.kwarteng@legalconnect.com",
    image: "/lawyer-icon.png",
  },
  {
    id: 2,
    name: "Kwesi Boateng",
    specialty: "Contract Law",
    email: "kwesi.boateng@legalconnect.com",
    image: "/lawyer-icon.png",
  },
  {
    id: 3,
    name: "Akosua Mensah",
    specialty: "Family Law",
    email: "akosua.mensah@legalconnect.com",
    image: "/lawyer-icon.png",
  },
];

// Appointment type
type Appointment = {
  id: number;
  lawyer: Lawyer;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: string;
  subject: string;
  status: "pending" | "confirmed";
};

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function getMonth() {
  const d = new Date();
  return d.toISOString().slice(0, 7);
}

function getYear() {
  const d = new Date();
  return d.getFullYear().toString();
}

function isWorkday(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDay();
  return day >= 1 && day <= 5; // Monday to Friday
}

function getNextFreeDay(appointments: Appointment[]) {
  // Find the next weekday (Mon-Fri) with no appointments between 9:00 and 17:00
  let d = new Date();
  for (let i = 0; i < 30; i++) {
    d.setDate(d.getDate() + (i === 0 ? 0 : 1));
    const day = d.getDay();
    if (day === 0 || day === 6) continue; // Skip weekends
    const dateStr = d.toISOString().slice(0, 10);
    const apptsForDay = appointments.filter((a) => a.date === dateStr);
    // There are 8 possible 1-hour slots from 9:00 to 16:00 (last slot starts at 16:00)
    if (apptsForDay.length < 8) {
      return dateStr;
    }
  }
  return null;
}

export default function UserBookAppointment() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  // Form state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [apptType, setApptType] = useState("Video");
  const [subject, setSubject] = useState("");
  const [viewMode, setViewMode] = useState<"day" | "month" | "year">("day");

  // Suggest next free day
  const nextFreeDay = getNextFreeDay(appointments);

  const openModal = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setShowModal(true);
    setDate("");
    setTime("");
    setApptType("Video");
    setSubject("");
  };

  const handleBook = () => {
    if (!selectedLawyer || !date || !time || !subject) return;
    setAppointments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        lawyer: selectedLawyer,
        date,
        time,
        type: apptType,
        subject,
        status: "pending",
      },
    ]);
    setShowModal(false);
  };

  // Filter appointments by view mode
  let filteredAppointments = appointments;
  if (viewMode === "day") {
    filteredAppointments = appointments.filter((a) => a.date === getToday());
  } else if (viewMode === "month") {
    filteredAppointments = appointments.filter((a) =>
      a.date.startsWith(getMonth())
    );
  } else if (viewMode === "year") {
    filteredAppointments = appointments.filter((a) =>
      a.date.startsWith(getYear())
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="p-4 lg:p-8 pt-20 lg:pt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#fff8eb] flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#d4a017]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Book an Appointment
                </h1>
                <p className="text-gray-600">
                  Choose a lawyer and schedule your consultation
                </p>
              </div>
            </div>
          </div>

          {/* Available Lawyers */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-[#d4a017] mb-4">
              Available Lawyers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availableLawyers.map((lawyer) => (
                <motion.div
                  key={lawyer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: lawyer.id * 0.07 }}
                  className="bg-[#fff8eb] border border-[#d4a017] rounded-2xl p-6 flex flex-col items-center shadow"
                >
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-16 h-16 rounded-full mb-3 object-cover"
                  />
                  <div className="font-bold text-[#1a1a1a] text-lg mb-1">
                    {lawyer.name}
                  </div>
                  <div className="text-[#d4a017] font-medium mb-1">
                    {lawyer.specialty}
                  </div>
                  <div className="text-gray-500 text-sm mb-4">
                    {lawyer.email}
                  </div>
                  <button
                    className="bg-[#d4a017] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b17d25] transition"
                    onClick={() => openModal(lawyer)}
                  >
                    Book Appointment
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* User's Booked Appointments */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-[#d4a017]">
                Your Appointments
              </h2>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-lg font-medium border ${
                    viewMode === "day"
                      ? "bg-[#d4a017] text-white border-[#d4a017]"
                      : "bg-white text-[#d4a017] border-[#d4a017]/40"
                  }`}
                  onClick={() => setViewMode("day")}
                >
                  Today
                </button>
                <button
                  className={`px-3 py-1 rounded-lg font-medium border ${
                    viewMode === "month"
                      ? "bg-[#d4a017] text-white border-[#d4a017]"
                      : "bg-white text-[#d4a017] border-[#d4a017]/40"
                  }`}
                  onClick={() => setViewMode("month")}
                >
                  This Month
                </button>
                <button
                  className={`px-3 py-1 rounded-lg font-medium border ${
                    viewMode === "year"
                      ? "bg-[#d4a017] text-white border-[#d4a017]"
                      : "bg-white text-[#d4a017] border-[#d4a017]/40"
                  }`}
                  onClick={() => setViewMode("year")}
                >
                  This Year
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
              {filteredAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No appointments found for this period.
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Lawyer
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Date
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Time
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Type
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Subject
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appt) => (
                      <tr key={appt.id} className="border-b border-gray-100">
                        <td className="px-6 py-4 text-gray-700 font-medium">
                          {appt.lawyer.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{appt.date}</td>
                        <td className="px-6 py-4 text-gray-600">{appt.time}</td>
                        <td className="px-6 py-4 text-gray-600">{appt.type}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {appt.subject}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              appt.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-[#fff8eb] text-[#d4a017]"
                            }`}
                          >
                            {appt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Booking Modal */}
          {showModal && selectedLawyer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
              >
                <h2 className="text-xl font-bold mb-4 text-[#d4a017]">
                  Book Appointment with {selectedLawyer.name}
                </h2>
                <div className="mb-3">
                  <label className="block text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d4a017] text-gray-600"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getToday()}
                    max={(() => {
                      // Only allow booking within the next 30 days
                      const d = new Date();
                      d.setDate(d.getDate() + 30);
                      return d.toISOString().slice(0, 10);
                    })()}
                    placeholder="Select date"
                  />
                  {date && !isWorkday(date) && (
                    <div className="text-xs text-red-500 mt-1">
                      Please select a weekday (Monday to Friday).
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d4a017] text-gray-600"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    min="09:00"
                    max="17:00"
                    step="3600"
                    placeholder="Select time"
                    title="Select time"
                  />
                  {time && (time < "09:00" || time > "17:00") && (
                    <div className="text-xs text-red-500 mt-1">
                      Please select a time between 09:00 and 17:00.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="appointment-type"
                    className="block text-gray-700 mb-1"
                  >
                    Type
                  </label>
                  <select
                    id="appointment-type"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d4a017] text-gray-600"
                    value={apptType}
                    onChange={(e) => setApptType(e.target.value)}
                  >
                    <option value="Video">Video</option>
                    <option value="In-person">In-person</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d4a017] text-gray-600"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Contract Review"
                  />
                </div>
                {/* Show appointments for selected day/month/year */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#d4a017] mb-2">
                    Appointments for {date || "selected day"}
                  </h3>
                  <ul className="space-y-1 max-h-32 overflow-y-auto">
                    {appointments.filter((a) => a.date === date).length ===
                    0 ? (
                      <li className="text-xs text-gray-500">
                        No appointments for this day.
                      </li>
                    ) : (
                      appointments
                        .filter((a) => a.date === date)
                        .map((a) => (
                          <li key={a.id} className="text-xs text-gray-700">
                            {a.time} - {a.subject} ({a.lawyer.name})
                          </li>
                        ))
                    )}
                  </ul>
                </div>
                {/* Suggest next free day */}
                {nextFreeDay && (
                  <div className="mb-4 text-xs text-green-700 bg-green-50 rounded px-3 py-2">
                    <span className="font-semibold">Tip:</span> Next available
                    free day is <span className="font-bold">{nextFreeDay}</span>{" "}
                    (Mon-Fri, 9am-5pm)
                  </div>
                )}
                <div className="flex gap-4 mt-6 justify-end">
                  <button
                    className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-300 transition"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#d4a017] text-white font-semibold px-4 py-2 rounded hover:bg-[#b17d25] transition"
                    onClick={handleBook}
                    disabled={
                      !date ||
                      !time ||
                      !subject ||
                      !isWorkday(date) ||
                      time < "09:00" ||
                      time > "17:00"
                    }
                  >
                    Book
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
