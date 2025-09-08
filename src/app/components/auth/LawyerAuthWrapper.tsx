"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";

interface LawyerAuthWrapperProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowAdmin?: boolean;
}

export default function LawyerAuthWrapper({ 
  children, 
  redirectTo = '/auth/login',
  allowAdmin = true 
}: LawyerAuthWrapperProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }
    
    if (!isLoading && isAuthenticated) {
      const allowedRoles = allowAdmin ? ['LAWYER', 'ADMIN'] : ['LAWYER'];
      if (!allowedRoles.includes(user?.role || '')) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, router, redirectTo, allowAdmin]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a017] mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            Please log in to access this page.
          </p>
          <div className="space-y-3">
            <Link
              href={redirectTo}
              className="block w-full bg-[#d4a017] text-white px-4 py-2 rounded-lg hover:bg-[#b8941f] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show role-based access denied
  const allowedRoles = allowAdmin ? ['LAWYER', 'ADMIN'] : ['LAWYER'];
  if (!allowedRoles.includes(user?.role || '')) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            You need to be a verified lawyer to access this page.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-red-800 font-medium">Current Role: {user?.role || 'Unknown'}</p>
                <p className="text-sm text-red-600">Required Role: LAWYER</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Link
              href="/contact"
              className="block w-full bg-[#d4a017] text-white px-4 py-2 rounded-lg hover:bg-[#b8941f] transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/User-landing"
              className="block w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
}
