"use client";

import { ReactNode } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ClientAuthWrapperProps {
  children: ReactNode;
}

export default function ClientAuthWrapper({ children }: ClientAuthWrapperProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login/register
    if (!isLoading && !user) {
      // You can redirect to a login page here if needed
      console.log('User not authenticated, but allowing access for now');
    }
  }, [isLoading, user, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4a017] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // For now, allow access even without authentication
  // In production, you might want to redirect to login page
  return <>{children}</>;
}
