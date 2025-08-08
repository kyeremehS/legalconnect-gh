"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, ArrowLeft, Home, Mail } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

export default function UnauthorizedPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Shield className="w-10 h-10 text-red-500" />
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. This area is restricted to verified lawyers only.
          </p>

          {/* User Info */}
          {isAuthenticated && user && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-800">Current Access Level</span>
              </div>
              <div className="text-sm text-yellow-700">
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <div className="mt-3 text-xs text-yellow-600">
                <p>Required role: <strong>LAWYER</strong> or <strong>ADMIN</strong></p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {/* Go Back */}
            <Link
              href="/"
              className="w-full bg-[#d4a017] text-white px-4 py-3 rounded-lg hover:bg-[#b8941f] transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
            </Link>

            {/* User Dashboard */}
            {isAuthenticated && (
              <Link
                href="/User-landing"
                className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            )}

            {/* Contact Support */}
            <Link
              href="/contact"
              className="w-full text-[#d4a017] hover:text-[#b8941f] px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If you believe this is an error, please contact support or verify your account status.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
