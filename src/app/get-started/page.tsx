'use client';


import Image from "next/image";
import Link from "next/link";



export default function AuthPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Section - Indigo Background with Content */}
      <div className="bg-gradient-to-br from-[#1A237E] via-[#1A237E]/95 to-[#1A237E]/90 p-12 text-white relative hidden md:block">
        <div className="absolute inset-0 bg-[url('/next.svg')] opacity-5"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-16">
            <Image
              src="/next.svg"
              alt="LegalConnect Logo"
              width={40}
              height={40}
              className="mr-3 animate-pulse"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#F9A825] bg-clip-text text-transparent">
              LegalConnect
            </span>
          </div>
          
          {/* <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#F9A825] to-white bg-clip-text text-transparent">
            Hello Captain 👋
          </h1> */}
          <p className="text-xl text-gray-200 mb-8">

            The platform where clients and legal consultants succeed. Together.
          </p>
          
          <div className="mt-12">
            <Image
              src="/file.svg"
              alt="Legal Illustration"
              width={400}
              height={300}
              className="mx-auto hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -inset-4 bg-[#F9A825]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div className="flex items-center justify-center p-8 bg-[#F7F9FC]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-[#212121]">Welcome back</h2>
            <p className="text-[#212121]/70">Please sign in to continue</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#212121] mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A237E] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#212121] mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A237E] focus:border-transparent outline-none transition-all"
              />
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-[#1A237E] hover:text-[#F9A825] transition-colors">
                  forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F9A825] text-[#1A237E] py-3 rounded-lg font-semibold hover:bg-[#F9A825]/90 transition-all hover:scale-105 shadow-lg hover:shadow-[#F9A825]/20"
            >
              Sign in
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
              className="w-full bg-white border border-gray-300 text-[#212121] py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Image src="/google.png" alt="Google" width={20} height={20} />
              Sign in with Google
            </button>

            <div className="text-center text-sm text-[#212121]/70">
              <p>
                Not a member yet?{" "}
                <Link href="/signup" className="text-[#1A237E] hover:text-[#F9A825] font-medium transition-colors">
                  Sign up as consultant
                </Link>
                {" "}or{" "}
                <Link href="/company-signup" className="text-[#1A237E] hover:text-[#F9A825] font-medium transition-colors">
                  company
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}