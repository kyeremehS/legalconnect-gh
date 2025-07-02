"use client";
import React from "react";
import Sidebar from "../../components/lawyer/Sidebar";
import { BookOpen, FileText, Edit, Ban, FilePlus2 } from "lucide-react";

export default function AdminContent() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row lg:ml-64">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <section>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" /> Content Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Legal FAQs Editor */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#d4a017] mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Legal FAQs
                </h3>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 pr-4">Question</th>
                      <th className="py-2 pr-4">Answer</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-[#fff8eb]">
                      <td className="py-2 pr-4 text-gray-700">
                        How do I hire a lawyer?
                      </td>
                      <td className="py-2 pr-4 text-gray-700">
                        Register, then request a consultation...
                      </td>
                      <td className="py-2 flex gap-2">
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-[#d4a017]" />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          title="Delete"
                        >
                          <Ban className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </tr>
                    {/* More rows... */}
                  </tbody>
                </table>
                <button className="mt-3 px-3 py-1 bg-[#d4a017] text-white rounded hover:bg-[#b98a11] text-sm flex items-center gap-1">
                  <FilePlus2 className="w-4 h-4" /> Add FAQ
                </button>
              </div>
              {/* Terms & Policies */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#d4a017] mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Terms & Privacy Policies
                </h3>
                <div className="text-gray-700 text-sm mb-2">
                  <span className="italic">
                    Upload or edit markdown/rich text content. Version control
                    enabled.
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-[#d4a017] text-white rounded hover:bg-[#b98a11] text-sm">
                    Upload New
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                    Preview as User
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
