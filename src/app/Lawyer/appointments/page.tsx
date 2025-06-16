"use client";
import React, { useState } from "react";

// Example data types
type Appointment = {
  id: string;
  userName: string;
  date: string;
  time: string;
  type: string;
  subject: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
};

const exampleAppointments: Appointment[] = [
  {
    id: "1",
    userName: "Ama Mensah",
    date: "2025-06-15",
    time: "10:00",
    type: "Video",
    subject: "Land Dispute Consultation",
    status: "confirmed",
  },
  {
    id: "2",
    userName: "Kwesi Boateng",
    date: "2025-06-16",
    time: "14:30",
    type: "In-person",
    subject: "Contract Review",
    status: "pending",
  },
];

export default function LawyerAppointments() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(exampleAppointments);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Handler for confirming/canceling appointments
  const updateStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
    setShowModal(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7F9FC] via-[#e3e8f7] to-[#cfd8fd] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-[#1A237E] mb-8 text-center">
          Appointments
        </h1>

        {/* Table Layout */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-[#F9A825]/20 text-[#1A237E]">
                <th className="py-3 px-4 text-left">Client</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr
                  key={appt.id}
                  className="border-b hover:bg-gray-50 text-gray-700"
                >
                  <td className="p-4">{appt.userName}</td>
                  <td className="p-4">{appt.date}</td>
                  <td className="p-4">{appt.time}</td>
                  <td className="p-4">{appt.type}</td>
                  <td className="p-4">{appt.subject}</td>
                  <td className="p-4 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        appt.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : appt.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : appt.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col space-y-2">
                      <button
                        className="text-[#1A237E] underline"
                        onClick={() => {
                          setSelectedAppointment(appt);
                          setShowModal(true);
                        }}
                        type="button"
                      >
                        View
                      </button>
                      {appt.status === "pending" && (
                        <>
                          <button
                            className="text-green-700 underline"
                            onClick={() => updateStatus(appt.id, "confirmed")}
                            type="button"
                          >
                            Confirm
                          </button>
                          <button
                            className="text-red-700 underline"
                            onClick={() => updateStatus(appt.id, "canceled")}
                            type="button"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for appointment details */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-[#1A237E]">
              Appointment Details
            </h2>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Client:</span>{" "}
              {selectedAppointment.userName}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(
                selectedAppointment.date + "T" + selectedAppointment.time
              ).toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Type:</span>{" "}
              {selectedAppointment.type}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Subject:</span>{" "}
              {selectedAppointment.subject}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Status:</span>{" "}
              <span className="capitalize">{selectedAppointment.status}</span>
            </div>
            <div className="flex gap-4 mt-6 justify-end">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-300 transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {selectedAppointment.status === "pending" && (
                <>
                  <button
                    type="button"
                    className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
                    onClick={() =>
                      updateStatus(selectedAppointment.id, "confirmed")
                    }
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
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
          </div>
        </div>
      )}
    </main>
  );
}
