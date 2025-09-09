"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { User, Scale, Building, ArrowRight } from "lucide-react";

export default function RegistrationOptions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e7daa5] via-[#ebeacf] to-[#eeeef2] flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#d4a017] mb-4">
            Join LegalConnect
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you want to join our legal community
          </p>
        </motion.div>

        {/* Registration Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Client Registration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:scale-105"
          >
            <div className="w-16 h-16 bg-[#d4a017]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-[#d4a017]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Client</h3>
            <p className="text-gray-600 mb-6">
              Seek legal advice, book consultations, and access legal resources.
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-2">
              <li>• Connect with verified lawyers</li>
              <li>• Book appointments</li>
              <li>• Access legal education</li>
              <li>• Chat with AI legal assistant</li>
            </ul>
            <Link
              href="/client-register"
              className="w-full bg-[#d4a017] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b38a15] transition-all flex items-center justify-center gap-2 group"
            >
              Register as Client
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Lawyer Registration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:scale-105"
          >
            <div className="w-16 h-16 bg-[#d4a017]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-[#d4a017]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Lawyer</h3>
            <p className="text-gray-600 mb-6">
              Offer legal services, manage clients, and grow your practice.
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-2">
              <li>• List your legal services</li>
              <li>• Manage client appointments</li>
              <li>• Secure document sharing</li>
              <li>• Professional verification</li>
            </ul>
            <Link
              href="/Lawyer/sign-up"
              className="w-full bg-[#d4a017] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b38a15] transition-all flex items-center justify-center gap-2 group"
            >
              Register as Lawyer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        {/* Alternative Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Already have an account?{" "}
            <Link href="/client-login" className="text-[#d4a017] hover:text-[#b38a15] font-medium">
              Sign in with email
            </Link>
            {" "}or{" "}
            <Link href="/sign-in" className="text-[#d4a017] hover:text-[#b38a15] font-medium">
              use social login
            </Link>
          </p>
        </motion.div>

        {/* Logo/Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Image
            src="/Coat_of_arms_of_Ghana.svg"
            alt="Ghana Coat of Arms"
            width={100}
            height={100}
            className="opacity-20"
          />
        </motion.div>
      </div>
    </div>
  );
}
