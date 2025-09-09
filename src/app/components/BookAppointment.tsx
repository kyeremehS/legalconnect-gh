"use client";

import { InlineWidget } from "react-calendly";

export default function BookAppointment({
  name,
  calendlyLink,
}: {
  name: string;
  calendlyLink: string;
}) {
  return (
    <section
      className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-4 md:p-6 w-full border border-gray-100`}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Professional Information & Instructions */}
        <div className="lg:w-2/5 space-y-4">
          {/* Header Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#d4a017] to-[#b8941f] rounded-xl flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
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
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                  Book Consultation
                </h2>
                <p className="text-sm text-[#d4a017] font-semibold">
                  with {name}
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              Schedule your professional legal consultation. Choose a convenient
              time from the available slots.
            </p>
          </div>

          {/* Professional Features */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#d4a017]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              What's Included
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <svg
                  className="w-4 h-4 text-green-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Confidential consultation</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <svg
                  className="w-4 h-4 text-green-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Professional legal advice</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <svg
                  className="w-4 h-4 text-green-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Secure video/phone meeting</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <svg
                  className="w-4 h-4 text-green-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Email confirmation</span>
              </li>
            </ul>
          </div>

          {/* Preparation Tips */}
          <div className="bg-gradient-to-r from-[#d4a017]/10 to-[#b8941f]/10 rounded-xl p-4 border border-[#d4a017]/20">
            <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#d4a017]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Preparation Tips
            </h3>
            <ul className="space-y-1 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#d4a017] font-bold">•</span>
                <span>Prepare relevant documents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4a017] font-bold">•</span>
                <span>Check internet connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4a017] font-bold">•</span>
                <span>List your questions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Enhanced Calendly Embed */}
        <div className="lg:w-3/5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden h-full">
            {/* Calendly Header */}
            <div className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] px-4 py-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-white"
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
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Select Your Time
                  </h3>
                  <p className="text-white/90 text-xs">
                    Choose from available slots
                  </p>
                </div>
              </div>
            </div>

            {/* Calendly Widget Container - Fixed Height */}
            <div className="h-[500px] lg:h-[600px] bg-white">
              <InlineWidget
                url={calendlyLink}
                styles={{
                  height: "100%",
                  width: "100%",
                }}
                pageSettings={{
                  backgroundColor: "ffffff",
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: "d4a017",
                  textColor: "4d5055",
                }}
              />
            </div>
          </div>

          {/* Compact Professional Notice */}
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900 text-xs">Notice</h4>
                <p className="text-blue-800 text-xs">
                  For urgent legal matters, please contact emergency services
                  directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
