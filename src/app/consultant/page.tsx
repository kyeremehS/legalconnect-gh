'use client';

import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Left Section - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/next.svg"
              alt="LegalConnect Logo"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="text-2xl font-bold text-[#1A237E]">
              LegalConnect
            </span>
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#212121]">
              Sign up as consultant
            </h1>
            <Link 
              href="/company-signup" 
              className="text-[#1A237E] hover:text-[#F9A825] text-sm mt-2 inline-block"
            >
              Sign up as company
            </Link>
          </div>

          {/* Registration Form */}
          <form className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#212121] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A237E] focus:border-transparent outline-none transition-all"
                placeholder="Enter your work email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#212121] mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A237E] focus:border-transparent outline-none transition-all"
                placeholder="Create a strong password"
              />
            </div>

            <div className="text-sm text-[#212121]/70">
              By registering on LegalConnect, you accept our{" "}
              <Link href="/privacy" className="text-[#1A237E] hover:text-[#F9A825]">
                privacy policy
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A237E] text-white py-3 rounded-lg font-semibold hover:bg-[#1A237E]/90 transition-all hover:scale-105 shadow-lg hover:shadow-[#1A237E]/20"
            >
              Sign up →
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#F7F9FC] text-[#212121]/70">or</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-[#212121] py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Image src="/google.png" alt="Google" width={20} height={20} />
              Continue with Google
            </button>

            <p className="text-center text-sm text-[#212121]/70">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1A237E] hover:text-[#F9A825] font-medium">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Info */}
      <div className="hidden lg:flex flex-1 bg-[#1A237E] text-white p-16">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-8">
            The #1 platform for legal consultants
          </h2>
          
          <p className="text-lg text-white/80 mb-12">
            Join our network to get access to exciting legal projects that fit your
            expertise. Your profile is not public and is only shared once you
            explicitly pitch on a project.
          </p>

          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-4">Why Should You Apply?</h3>
            {[
              "Interesting legal projects",
              "Attractive consultation rates",
              "Flexibility in time and location",
              "Continuous support and resources"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F9A825] flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#1A237E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}