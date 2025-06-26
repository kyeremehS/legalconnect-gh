"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A237E] via-[#1A237E]/95 to-[#1A237E]/90 p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Section - Image/Illustration */}
          <div className="hidden md:block relative">
            <Image
              src="/Coat_of_arms_of_Ghana.svg"
              alt="Legal Illustration"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#F9A825]/20 rounded-full blur-3xl"></div>
          </div>

          {/* Right Section - Content */}
          <div className="p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4 text-[#212121]"
              >
                Welcome to LegalConnect
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#212121]/70 mb-8"
              >
                Your journey to legal success starts here. LegalConnect connects clients with legal consultants, making legal services accessible and efficient.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <p className="text-[#212121]/70">
                  <strong>How it works:</strong> Sign up, connect with legal experts, and get the support you need.
                </p>
                <p className="text-[#212121]/70">
                  <strong>Steps to get started:</strong>
                </p>
                <ul className="list-disc list-inside text-[#212121]/70">
                  <li>Create an account</li>
                  <li>Browse legal consultants</li>
                  <li>Connect and collaborate</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link href="/sign-in">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#F9A825] text-[#1A237E] px-8 py-3 rounded-lg font-semibold hover:bg-[#F9A825]/90 transition-all shadow-lg hover:shadow-[#F9A825]/20"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
