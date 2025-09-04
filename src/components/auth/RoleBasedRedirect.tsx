"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface RoleBasedRedirectProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export default function RoleBasedRedirect({ 
  children, 
  allowedRoles,
  redirectTo 
}: RoleBasedRedirectProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait for auth to load

    if (!isAuthenticated) {
      // Not authenticated, redirect to login
      router.push('/login');
      return;
    }

    if (user && redirectTo) {
      // Custom redirect specified
      router.push(redirectTo);
      return;
    }

    if (user?.role) {
      // Role-based automatic routing
      switch (user.role.toUpperCase()) {
        case 'LAWYER':
          router.push('/Lawyer');
          break;
        case 'CLIENT':
          router.push('/User-landing');
          break;
        case 'ADMIN':
          router.push('/admin');
          break;
        default:
          // Unknown role, redirect to a default page
          console.warn(`Unknown user role: ${user.role}`);
          router.push('/');
          break;
      }
    }
  }, [user, isAuthenticated, isLoading, router, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a017] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If we have allowed roles specified, check them
  if (allowedRoles && user) {
    if (!allowedRoles.includes(user.role.toUpperCase())) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8941f] transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
