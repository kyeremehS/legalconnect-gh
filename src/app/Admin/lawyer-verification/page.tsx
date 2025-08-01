"use client";
import React from "react";
import Sidebar from "../../components/lawyer/Sidebar";
import { UserCheck, UserX, Eye, Search } from "lucide-react";

const pendingLawyers = [
  {
    id: 1,
    name: "Kwame Mensah",
    email: "kwame@law.com",
    license: "GH123456",
    submitted: "2025-06-25",
    status: "Pending",
  },
  {
    id: 2,
    name: "Akosua Boateng",
    email: "akosua@law.com",
    license: "GH654321",
    submitted: "2025-06-24",
    status: "Pending",
  },
  // Add more mock data as needed
];

export default function LawyerVerification() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row lg:ml-64">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#d4a017] mb-6 flex items-center gap-2">
            <UserCheck className="w-6 h-6" /> Lawyer Verification
          </h2>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-[#d4a017] text-lg">
                Pending Lawyer Applications
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search lawyers..."
                  className="border border-gray-200 rounded px-2 py-1 text-sm text-gray-600"
                />
                <button
                  className="p-1 rounded hover:bg-gray-100"
                  title="Search"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">License No.</th>
                    <th className="py-2 pr-4">Submitted</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingLawyers.map((lawyer) => (
                    <tr key={lawyer.id} className="border-b hover:bg-[#fff8eb]">
                      <td className="py-2 pr-4 font-medium text-gray-600">
                        {lawyer.name}
                      </td>
                      <td className="py-2 pr-4 text-gray-600">
                        {lawyer.email}
                      </td>
                      <td className="py-2 pr-4 text-gray-600">
                        {lawyer.license}
                      </td>
                      <td className="py-2 pr-4 text-gray-600">
                        {lawyer.submitted}
                      </td>
                      <td className="py-2 pr-4 text-gray-600">
                        <span className="text-yellow-600 font-semibold">
                          {lawyer.status}
                        </span>
                      </td>
                      <td className="py-2 flex gap-2">
                        <button
                          className="p-1 rounded hover:bg-green-100"
                          title="Approve"
                        >
                          <UserCheck className="w-5 h-5 text-green-600" />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-red-100"
                          title="Reject"
                        >
                          <UserX className="w-5 h-5 text-red-500" />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5 text-blue-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pendingLawyers.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-4 text-center text-gray-400"
                      >
                        No pending lawyer applications.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
