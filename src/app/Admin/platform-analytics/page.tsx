"use client";
import React from "react";
import Sidebar from "../../components/lawyer/Sidebar";
import { BarChart2 } from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <section>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-4 flex items-center gap-2">
              <BarChart2 className="w-6 h-6" /> Platform Usage Analytics
            </h2>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="h-64 flex items-center justify-center text-gray-400">
                {/* Placeholder for analytics chart */}
                <span className="italic">[Analytics charts go here]</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}