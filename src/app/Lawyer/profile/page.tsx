"use client";
import React from "react";

export default function LawyerProfile() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] py-8 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8 mt-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <img
            src="/lawyer-avatar.jpg"
            alt="Lawyer profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#F9A825]"
          />
          <div>
            <h1 className="text-2xl font-bold text-[#1A237E]">
              Ama Kwarteng, Esq.
            </h1>
            <p className="text-gray-700">Land Law, Family Law, Corporate Law</p>
            <p className="text-gray-500">Accra, Ghana</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-[#F9A825] text-[#1A237E] px-4 py-2 rounded font-semibold">
                Message
              </button>
              <button className="bg-[#1A237E] text-white px-4 py-2 rounded font-semibold">
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* About/Bio */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A237E] mb-2">About</h2>
          <p className="text-gray-700">
            Ama Kwarteng is an experienced lawyer specializing in land and
            family law with over 10 years of practice. She is dedicated to
            providing clear, practical legal advice and passionate about helping
            clients resolve their legal issues efficiently.
          </p>
        </section>

        {/* Credentials */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A237E] mb-2">
            Credentials
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>LL.B, University of Ghana</li>
            <li>Member, Ghana Bar Association</li>
            <li>Certified Mediator</li>
          </ul>
        </section>

        {/* Practice Areas */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A237E] mb-2">
            Practice Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#F9A825]/20 text-[#1A237E] px-3 py-1 rounded">
              Land Law
            </span>
            <span className="bg-[#F9A825]/20 text-[#1A237E] px-3 py-1 rounded">
              Family Law
            </span>
            <span className="bg-[#F9A825]/20 text-[#1A237E] px-3 py-1 rounded">
              Corporate Law
            </span>
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A237E] mb-2">
            Client Reviews
          </h2>
          <div className="bg-gray-50 p-4 rounded mb-2">
            <p className="text-gray-700 italic">
              "Very professional and helpful!"
            </p>
            <span className="text-xs text-gray-500">- Kofi A.</span>
          </div>
          <div className="bg-gray-50 p-4 rounded mb-2">
            <p className="text-gray-700 italic">
              "Quick to respond and gave clear advice."
            </p>
            <span className="text-xs text-gray-500">- Abena S.</span>
          </div>
        </section>
      </div>
    </main>
  );
}
