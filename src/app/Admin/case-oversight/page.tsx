"use client";
import React from "react";
import Sidebar from "../../components/lawyer/Sidebar";
import { Briefcase, UserCheck, Eye } from "lucide-react";

export default function AdminCases() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row lg:ml-64">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <section>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6" /> Case Oversight
            </h2>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 pr-4">Case ID</th>
                    <th className="py-2 pr-4 ">Title</th>
                    <th className="py-2 pr-4 ">Client</th>
                    <th className="py-2 pr-4 ">Assigned Lawyer</th>
                    <th className="py-2 pr-4 ">Status</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-[#fff8eb] text-gray-700">
                    <td className="py-2 pr-4 font-medium">C001</td>
                    <td className="py-2 pr-4">Divorce</td>
                    <td className="py-2 pr-4">Jane Smith</td>
                    <td className="py-2 pr-4">John Doe</td>
                    <td className="py-2 pr-4">
                      <span className="text-yellow-600 font-semibold">
                        In Progress
                      </span>
                    </td>
                    <td className="py-2 flex gap-2">
                      <button
                        className="p-1 rounded hover:bg-gray-100"
                        title="Assign Lawyer"
                      >
                        <UserCheck className="w-4 h-4 text-[#d4a017]" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-gray-100"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  {/* More rows... */}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
