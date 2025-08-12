"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import LawyerAuthWrapper from "../../components/auth/LawyerAuthWrapper";
import { useAppointmentNotifications } from "../../hooks/useAppointmentNotifications";
import AppointmentNotificationPopup from "../../components/scheduling/AppointmentNotificationPopup";

// Updated appointment type to match API response
type Appointment = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "SCHEDULED" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
  practiceArea: string;
  meetingType: string;
  duration: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  notes?: string;
};

export default function LawyerAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Notification system
  const {
    notifications,
    confirmAppointment,
    rejectAppointment,
    dismissNotification
  } = useAppointmentNotifications();

  // Fetch appointments from API
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch('http://localhost:4000/api/appointments/lawyer/my-appointments', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch appointments');
      }

      setAppointments(result.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  // Handler for updating appointment status (accept/reject)
  const updateAppointmentStatus = async (appointmentId: string, status: Appointment["status"], notes?: string) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('No authentication token found');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update appointment');
      }

      // Update local state
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === appointmentId ? { ...appt, status, notes } : appt))
      );
      
      setShowModal(false);
      alert(`Appointment ${status.toLowerCase()} successfully!`);
      
      // Refresh appointments to get latest data
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert(error instanceof Error ? error.message : 'Failed to update appointment');
    }
  };

  // Handle notification actions
  const handleConfirmFromNotification = async (appointmentId: string, notes?: string) => {
    await updateAppointmentStatus(appointmentId, "CONFIRMED", notes);
  };

  const handleRejectFromNotification = async (appointmentId: string, notes?: string) => {
    await updateAppointmentStatus(appointmentId, "CANCELLED", notes || "Declined by lawyer");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-700';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-700';
      case 'CANCELLED':
      case 'NO_SHOW':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <LawyerAuthWrapper>
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
            <div className="flex items-center justify-between">
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
              <div className="flex items-center gap-4">
                {/* Statistics */}
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {appointments.filter(a => a.status === 'PENDING').length}
                    </div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {appointments.filter(a => a.status === 'CONFIRMED').length}
                    </div>
                    <div className="text-sm text-gray-500">Confirmed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {appointments.length}
                    </div>
                    <div className="text-sm text-gray-500">Total</div>
                  </div>
                </div>
                {/* Refresh Button */}
                <button
                  onClick={fetchAppointments}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <svg
                    className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="text-gray-500">Loading appointments...</div>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <div className="text-red-500">Error: {error}</div>
                <button 
                  onClick={fetchAppointments}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : appointments.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-500">No appointments found</div>
              </div>
            ) : (
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
                        <td className="px-6 py-4 text-gray-600">
                          {appt.client.firstName} {appt.client.lastName}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {formatDate(appt.startTime)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {formatTime(appt.startTime)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {appt.meetingType}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {appt.title}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
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
                            {appt.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateAppointmentStatus(appt.id, "CONFIRMED")
                                  }
                                  className="text-green-600 hover:text-green-700 transition-colors ml-2"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    updateAppointmentStatus(appt.id, "CANCELLED", "Declined by lawyer")
                                  }
                                  className="text-red-600 hover:text-red-700 transition-colors ml-2"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {appt.status === "CONFIRMED" && (
                              <button
                                onClick={() =>
                                  updateAppointmentStatus(appt.id, "COMPLETED")
                                }
                                className="text-blue-600 hover:text-blue-700 transition-colors ml-2"
                              >
                                Mark Complete
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
              {selectedAppointment.client.firstName} {selectedAppointment.client.lastName}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Email:</span>{" "}
              {selectedAppointment.client.email}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Date:</span>{" "}
              {formatDate(selectedAppointment.startTime)}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Time:</span>{" "}
              {formatTime(selectedAppointment.startTime)} - {formatTime(selectedAppointment.endTime)}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Type:</span>{" "}
              {selectedAppointment.meetingType}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Duration:</span>{" "}
              {selectedAppointment.duration}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Subject:</span>{" "}
              {selectedAppointment.title}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Practice Area:</span>{" "}
              {selectedAppointment.practiceArea}
            </div>
            <div className="mb-2 text-[#003049]">
              <span className="font-semibold">Status:</span>{" "}
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedAppointment.status)}`}>
                {selectedAppointment.status}
              </span>
            </div>
            {selectedAppointment.description && (
              <div className="mb-2 text-[#003049]">
                <span className="font-semibold">Description:</span>{" "}
                {selectedAppointment.description}
              </div>
            )}
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
              {selectedAppointment.status === "PENDING" && (
                <>
                  <button
                    className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
                    onClick={() =>
                      updateAppointmentStatus(selectedAppointment.id, "CONFIRMED")
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition"
                    onClick={() =>
                      updateAppointmentStatus(selectedAppointment.id, "CANCELLED", "Declined by lawyer")
                    }
                  >
                    Reject
                  </button>
                </>
              )}
              {selectedAppointment.status === "CONFIRMED" && (
                <button
                  className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() =>
                    updateAppointmentStatus(selectedAppointment.id, "COMPLETED")
                  }
                >
                  Mark Complete
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Appointment Notification Popup */}
      {notifications.length > 0 && (
        <AppointmentNotificationPopup
          notifications={notifications}
          onConfirm={handleConfirmFromNotification}
          onReject={handleRejectFromNotification}
          onClose={dismissNotification}
        />
      )}
      </div>
    </LawyerAuthWrapper>
  );
}
