"use client";
import React from "react";
import Sidebar from "../../components/lawyer/Sidebar";
import { Settings, Shield, Bell, Edit } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <section>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6" /> Platform Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* General */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#d4a017] mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5" /> General
                </h3>
                <table className="min-w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Platform Name</td>
                      <td className="py-2 pr-4">LegalConnect</td>
                      <td className="py-2">
                        <button className="p-1 rounded hover:bg-gray-100" title="Edit">
                          <Edit className="w-4 h-4 text-[#d4a017]" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Support Email</td>
                      <td className="py-2 pr-4">support@legalconnect.com</td>
                      <td className="py-2">
                        <button className="p-1 rounded hover:bg-gray-100" title="Edit">
                          <Edit className="w-4 h-4 text-[#d4a017]" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Security */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#d4a017] mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Security
                </h3>
                <ul className="text-gray-700 text-sm space-y-1 pl-2 list-disc">
                  <li>Change admin password</li>
                  <li>Toggle 2FA for lawyers/clients</li>
                  <li>API keys management</li>
                </ul>
              </div>
              {/* Notifications */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#d4a017] mb-2 flex items-center gap-2">
                  <Bell className="w-5 h-5" /> Notifications
                </h3>
                <ul className="text-gray-700 text-sm space-y-1 pl-2 list-disc">
                  <li>Email templates (welcome, case update, payment)</li>
                  <li>Toggle system-wide alerts</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}