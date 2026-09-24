"use client";
import Link from "next/link";

// Public self-registration retired with the Excel system.
// Lawyer onboarding is now enquiry -> invitation only.
export default function LawyerSignUpRetired() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-3">Registration is by invitation</h1>
        <p className="text-gray-600 mb-5">
          To join LegalConnect as a lawyer, start with a short enquiry. If approved,
          we&apos;ll send you a personal invitation link to create your account.
        </p>
        <Link href="/join-as-lawyer" className="inline-block bg-[#d4a017] text-white rounded px-6 py-2 font-semibold">
          Enquire to join
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          Already invited? Open your invitation link to continue.
        </p>
      </div>
    </div>
  );
}
