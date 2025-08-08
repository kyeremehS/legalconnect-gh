"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BookAppointment from "../../components/BookAppointment";
import { Calendar, Plus, Eye, Check, X, Clock, User, MapPin, ArrowLeft, Home } from "lucide-react";

// Example data types
type Appointment = {
  id: number;
  date: string;
  client: string;
  time: string;
  type: string;
  subject: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  notes: string;
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
  {
    id: 3,
    client: "Akosua Asante",
    date: "2025-06-17",
    time: "09:00",
    type: "Phone",
    subject: "Employment Law Query",
    status: "completed",
    notes: "Follow-up required",
  },
];

// Replace this with real data from DB or API
const lawyer = {
  name: "Samuel Kyeremeh",
  calendlyLink: "https://calendly.com/affum3331/30min",
};

export default function LawyerAppointments() {
  const router = useRouter();
  const [appointments, setAppointments] =
    useState<Appointment[]>(exampleAppointments);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Handler for confirming/canceling appointments
  const updateStatus = (id: number, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
    setShowModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-3 sm:p-6 lg:p-8 pt-16 sm:pt-20 lg:pt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Back to Dashboard Button - Mobile Only */}
          <div className="mb-4 sm:mb-6 lg:hidden">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/User-landing")}
              className="flex items-center gap-2 text-[#d4a017] hover:text-[#b8941f] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dashboard</span>
            </motion.button>
          </div>

          {/* Header */}
          <div className="mb-6 sm:mb-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#fff8eb] flex items-center justify-center">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4a017]" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                    Appointments
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Manage your upcoming consultations
                  </p>
                </div>
              </div>

              {/* Button Group */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3">
                {/* Back to Dashboard Button - Desktop */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/User-landing")}
                  className="hidden lg:flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Dashboard</span>
                </motion.button>

                {/* Book New Appointment Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBookingModal(true)}
                  className="bg-[#d4a017] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Book New Appointment</span>
                  <span className="sm:hidden">Book New</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {appointments.map((appt) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4a017]/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#d4a017]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {appt.client}
                      </h3>
                      <p className="text-xs text-gray-600">{appt.subject}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      appt.status
                    )}`}
                  >
                    {appt.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{appt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{appt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{appt.type}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedAppointment(appt);
                      setShowModal(true);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  {appt.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(appt.id, "confirmed")}
                        className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(appt.id, "canceled")}
                        className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
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
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            appt.status
                          )}`}
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

      {/* Appointment Details Modal */}
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
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
              Appointment Details
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="font-semibold text-sm text-gray-600">Client:</span>
                  <p className="text-gray-800">{selectedAppointment.client}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="font-semibold text-sm text-gray-600">Date:</span>
                  <p className="text-gray-800">{selectedAppointment.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="font-semibold text-sm text-gray-600">Time:</span>
                  <p className="text-gray-800">{selectedAppointment.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="font-semibold text-sm text-gray-600">Type:</span>
                  <p className="text-gray-800">{selectedAppointment.type}</p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <span className="font-semibold text-sm text-gray-600">Subject:</span>
                <p className="text-gray-800 mt-1">{selectedAppointment.subject}</p>
              </div>
              
              <div>
                <span className="font-semibold text-sm text-gray-600">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status}
                </span>
              </div>
              
              {selectedAppointment.notes && (
                <div>
                  <span className="font-semibold text-sm text-gray-600">Notes:</span>
                  <p className="text-gray-800 mt-1">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {selectedAppointment.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                    onClick={() =>
                      updateStatus(selectedAppointment.id, "confirmed")
                    }
                  >
                    Confirm
                  </button>
                  <button
                    className="flex-1 bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                    onClick={() =>
                      updateStatus(selectedAppointment.id, "canceled")
                    }
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Book Appointment Modal */}
      {showBookingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowBookingModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden mx-4"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                  Book New Appointment
                </h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <BookAppointment
                name={lawyer.name}
                calendlyLink={lawyer.calendlyLink}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
