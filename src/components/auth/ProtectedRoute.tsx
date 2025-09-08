"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackUrl?: string;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles, 
  fallbackUrl = '/login' 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(fallbackUrl);
      return;
    }

    if (user && allowedRoles.includes(user.role.toUpperCase())) {
      setHasAccess(true);
    } else {
      // User doesn't have the required role
      const userRole = user?.role?.toUpperCase();
      
      // Redirect to appropriate dashboard based on their actual role
      switch (userRole) {
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
          router.push('/');
          break;
      }
    }
  }, [user, isAuthenticated, isLoading, router, allowedRoles, fallbackUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a017] mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a017] mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
