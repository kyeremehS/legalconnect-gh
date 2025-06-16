"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

// Example data types
type Appointment = {
  id: number;
  date: string;
  client: string;
  time: string;
  type: string;
  subject: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  notes: string; // Add this line
};

const exampleAppointments: Appointment[] = [
  {
    id: 1,
    client: "Ama Mensah",
    date: "2025-06-15",
    time: "10:00",
    type: "Video",
    subject: "Land Dispute Consultation",
    status: "confirmed",
    notes: "Bring all relevant documents",
  },
  {
    id: 2,
    client: "Kwesi Boateng",
    date: "2025-06-16",
    time: "14:30",
    type: "In-person",
    subject: "Contract Review",
    status: "pending",
    notes: "Discuss contract details and fees",
  },
];

export default function LawyerAppointments() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(exampleAppointments);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Handler for confirming/canceling appointments
  const updateStatus = (id: number, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="p-4 lg:p-8 pt-20 lg:pt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
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
                  Appointments
                </h1>
                <p className="text-gray-600">
                  Manage your upcoming consultations
                </p>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Client
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
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <motion.tr
                      key={appt.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-600">{appt.client}</td>
                      <td className="px-6 py-4 text-gray-600">{appt.date}</td>
                      <td className="px-6 py-4 text-gray-600">{appt.time}</td>
                      <td className="px-6 py-4 text-gray-600">{appt.type}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {appt.subject}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <span
                          className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${
                            appt.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                          ${
                            appt.status === "pending"
                              ? "bg-[#fff8eb] text-[#d4a017]"
                              : ""
                          }
                          ${
                            appt.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : ""
                          }
                          ${
                            appt.status === "canceled"
                              ? "bg-red-100 text-red-700"
                              : ""
                          }
                        `}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedAppointment(appt);
                              setShowModal(true);
                            }}
                            className="text-[#d4a017] hover:text-[#b17d25] transition-colors"
                          >
                            View
                          </button>
                          {appt.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(appt.id, "confirmed")
                                }
                                className="text-green-600 hover:text-green-700 transition-colors ml-2"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(appt.id, "canceled")
                                }
                                className="text-red-600 hover:text-red-700 transition-colors ml-2"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Modal - Updated styling */}
      {showModal && selectedAppointment && (
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
            <h2 className="text-xl font-bold mb-4 text-[#1A237E]">
              Appointment Details
            </h2>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Client:</span>{" "}
              {selectedAppointment.client}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Date:</span>{" "}
              {selectedAppointment.date}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Time:</span>{" "}
              {selectedAppointment.time}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Type:</span>{" "}
              {selectedAppointment.type}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Subject:</span>{" "}
              {selectedAppointment.subject}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Status:</span>{" "}
              <span className="capitalize">{selectedAppointment.status}</span>
            </div>
            {selectedAppointment.notes && (
              <div className="mb-2 text-[#003049]">
                <span className="font-semibold">Notes:</span>{" "}
                {selectedAppointment.notes}
              </div>
            )}
            <div className="flex gap-4 mt-6 justify-end">
              <button
                className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-300 transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {selectedAppointment.status === "pending" && (
                <>
                  <button
                    className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
                    onClick={() =>
                      updateStatus(selectedAppointment.id, "confirmed")
                    }
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition"
                    onClick={() =>
                      updateStatus(selectedAppointment.id, "canceled")
                    }
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
