import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export interface UseRoleAccessOptions {
  allowedRoles: string[];
  redirectTo?: string;
  allowAdmin?: boolean;
}

export function useRoleAccess({ 
  allowedRoles, 
  redirectTo = '/unauthorized',
  allowAdmin = true 
}: UseRoleAccessOptions) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const hasAccess = () => {
    if (!isAuthenticated || !user) return false;
    
    const validRoles = allowAdmin ? [...allowedRoles, 'ADMIN'] : allowedRoles;
    return validRoles.includes(user.role);
  };

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }
      
      if (!hasAccess()) {
        router.push(redirectTo);
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, router, redirectTo]);

  return {
    hasAccess: hasAccess(),
    isLoading,
    user,
    isAuthenticated
  };
}

// Specific role hooks
export function useLawyerAccess(redirectTo?: string) {
  return useRoleAccess({ 
    allowedRoles: ['LAWYER'], 
    redirectTo,
    allowAdmin: true 
  });
}

export function useClientAccess(redirectTo?: string) {
  return useRoleAccess({ 
    allowedRoles: ['CLIENT'], 
    redirectTo,
    allowAdmin: true 
  });
}

export function useAdminAccess(redirectTo?: string) {
  return useRoleAccess({ 
    allowedRoles: ['ADMIN'], 
    redirectTo,
    allowAdmin: false 
  });
}

// Role checking utilities
export function isLawyer(userRole?: string): boolean {
  return userRole === 'LAWYER' || userRole === 'ADMIN';
}

export function isClient(userRole?: string): boolean {
  return userRole === 'CLIENT' || userRole === 'ADMIN';
}

export function isAdmin(userRole?: string): boolean {
  return userRole === 'ADMIN';
}

export function hasRole(allowedRoles: string[], userRole?: string): boolean {
  return allowedRoles.includes(userRole || '');
}

export function canAccessLawyerResources(userRole?: string): boolean {
  return isLawyer(userRole);
}

export function canAccessClientResources(userRole?: string): boolean {
  return isClient(userRole);
}
