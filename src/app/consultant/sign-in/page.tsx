"use client";
import Image from "next/image";
import Link from "next/link";

export default function ConsultantSignIn() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side (illustration or branding) */}
      <div className="hidden md:flex items-center justify-center bg-[#1A237E]">
        <Image
          src="/consultant-illustration.png"
          alt="Consultant Illustration"
          width={400}
          height={400}
          className="object-contain"
          priority
        />
      </div>

      {/* Right side (sign-in form) */}
      <div className="flex items-center justify-center p-8 bg-[#F7F9FC]">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1A237E] mb-2 text-center">Consultant Sign In</h2>
            <p className="text-[#212121]/70 text-center">
              Welcome back! Please sign in to your consultant account.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1A237E] mb-1">Email address</label>
              <input
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#1A237E] focus:border-[#1A237E]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A237E] mb-1">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#1A237E] focus:border-[#1A237E]"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1A237E] text-white py-3 rounded-lg font-semibold hover:bg-[#283593] transition-all hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-sm text-[#212121]/70">
            Don't have an account?{" "}
            <Link href="/consultant" className="text-[#1A237E] hover:underline font-medium">
              Sign up as consultant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}