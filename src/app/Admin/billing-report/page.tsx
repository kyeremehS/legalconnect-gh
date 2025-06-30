"use client";
import React from "react";
import Sidebar from "../../components/lawyer/Sidebar";
import { DollarSign, BarChart2 } from "lucide-react";

export default function AdminBilling() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row lg:ml-64">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <section>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6" /> Billing & Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Financial Summary */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#d4a017] mb-2 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" /> Financial Summary
                </h3>
                <table className="min-w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Total Revenue</td>
                      <td className="py-2 text-green-700 font-bold">$12,000</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Commission Earned</td>
                      <td className="py-2 text-[#d4a017] font-bold">$1,200</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Pending Payments</td>
                      <td className="py-2 text-yellow-600 font-bold">$2,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Platform Usage Analytics */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#d4a017] mb-2 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5" /> Platform Usage Analytics
                </h3>
                <div className="h-32 flex items-center justify-center text-gray-400">
                  {/* Placeholder for chart */}
                  <span className="italic">[Chart.js or Recharts chart here]</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="px-2 py-1 rounded bg-gray-100 text-xs">This Month</button>
                  <button className="px-2 py-1 rounded bg-gray-100 text-xs">Last Month</button>
                  <button className="px-2 py-1 rounded bg-gray-100 text-xs">Custom Range</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}