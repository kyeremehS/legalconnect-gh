"use client";

import { useAuth } from '../contexts/AuthContext';

export function useRoleBasedNavigation() {
  const { user } = useAuth();

  const getDashboardUrl = () => {
    if (!user?.role) return '/';
    
    switch (user.role.toUpperCase()) {
      case 'LAWYER':
        return '/Lawyer';
      case 'CLIENT':
        return '/User-landing';
      case 'ADMIN':
        return '/admin';
      default:
        return '/';
    }
  };

  const getProfileUrl = () => {
    if (!user?.role) return '/profile';
    
    switch (user.role.toUpperCase()) {
      case 'LAWYER':
        return '/Lawyer/profile';
      case 'CLIENT':
        return '/User-landing/profile-settings';
      case 'ADMIN':
        return '/admin/profile';
      default:
        return '/profile';
    }
  };

  const getSettingsUrl = () => {
    if (!user?.role) return '/settings';
    
    switch (user.role.toUpperCase()) {
      case 'LAWYER':
        return '/Lawyer/settings';
      case 'CLIENT':
        return '/User-landing/settings';
      case 'ADMIN':
        return '/admin/settings';
      default:
        return '/settings';
    }
  };

  const getAppointmentsUrl = () => {
    if (!user?.role) return '/appointments';
    
    switch (user.role.toUpperCase()) {
      case 'LAWYER':
        return '/Lawyer/appointments';
      case 'CLIENT':
        return '/User-landing/appointments';
      case 'ADMIN':
        return '/admin/appointments';
      default:
        return '/appointments';
    }
  };

  const getLoginUrl = () => {
    if (!user?.role) return '/';
    
    switch (user.role.toUpperCase()) {
      case 'LAWYER':
        return '/Lawyer/sign-in';
      case 'CLIENT':
        return '/';
      case 'ADMIN':
        return '/admin/login';
      default:
        return '/';
    }
  };

  const getDashboardLabel = () => {
    if (!user?.role) return 'Dashboard';
    
    switch (user.role.toUpperCase()) {
      case 'LAWYER':
        return 'Dashboard';
      case 'CLIENT':
        return 'Dashboard';
      case 'ADMIN':
        return 'Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const isLawyer = () => user?.role?.toUpperCase() === 'LAWYER';
  const isClient = () => user?.role?.toUpperCase() === 'CLIENT';
  const isAdmin = () => user?.role?.toUpperCase() === 'ADMIN';

  return {
    getDashboardUrl,
    getProfileUrl,
    getSettingsUrl,
    getAppointmentsUrl,
    getLoginUrl,
    getDashboardLabel,
    isLawyer,
    isClient,
    isAdmin,
    userRole: user?.role?.toUpperCase()
  };
}
