"use client";
import React from "react";
import Sidebar from "../../components/lawyer/Sidebar";
import { Users, UserCheck, Search, Eye, Edit, Ban, CheckCircle2 } from "lucide-react";

export default function AdminUsers() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" /> User Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lawyers Table */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#d4a017] flex items-center gap-2">
                    <UserCheck className="w-5 h-5" /> Lawyers
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search lawyers..."
                      className="border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                    <button className="p-1 rounded hover:bg-gray-100">
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
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Verification</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-[#fff8eb]">
                        <td className="py-2 pr-4 font-medium">John Doe</td>
                        <td className="py-2 pr-4">john@law.com</td>
                        <td className="py-2 pr-4">
                          <span className="text-green-600 font-semibold">Active</span>
                        </td>
                        <td className="py-2 pr-4 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-500" /> Verified
                        </td>
                        <td className="py-2 flex gap-2">
                          <button className="p-1 rounded hover:bg-gray-100" title="View">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-1 rounded hover:bg-gray-100" title="Suspend">
                            <Ban className="w-4 h-4 text-red-500" />
                          </button>
                          <button className="p-1 rounded hover:bg-gray-100" title="Edit">
                            <Edit className="w-4 h-4 text-[#d4a017]" />
                          </button>
                        </td>
                      </tr>
                      {/* More rows... */}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Clients Table */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#d4a017] flex items-center gap-2">
                    <Users className="w-5 h-5" /> Clients
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search clients..."
                      className="border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                    <button className="p-1 rounded hover:bg-gray-100">
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
                        <th className="py-2 pr-4">Phone</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-[#fff8eb]">
                        <td className="py-2 pr-4 font-medium">Jane Smith</td>
                        <td className="py-2 pr-4">jane@gmail.com</td>
                        <td className="py-2 pr-4">+233 123 456 789</td>
                        <td className="py-2 pr-4">
                          <span className="text-green-600 font-semibold">Active</span>
                        </td>
                        <td className="py-2 flex gap-2">
                          <button className="p-1 rounded hover:bg-gray-100" title="View">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-1 rounded hover:bg-gray-100" title="Suspend">
                            <Ban className="w-4 h-4 text-red-500" />
                          </button>
                        </td>
                      </tr>
                      {/* More rows... */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}