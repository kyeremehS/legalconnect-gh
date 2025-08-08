'use client';

import { useState, useEffect } from 'react';
import { apiClient, LawyerData } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export interface LawyerProfileHook {
  profile: LawyerData | null;
  loading: boolean;
  error: string | null;
  createProfile: (profileData: Omit<LawyerData, 'id' | 'userId'>) => Promise<void>;
  updateProfile: (profileData: Partial<LawyerData>) => Promise<void>;
  deleteProfile: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useLawyerProfile(): LawyerProfileHook {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<LawyerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!isAuthenticated || !user) {
      setProfile(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Try to get current lawyer profile first
      const profileResponse = await apiClient.getCurrentLawyerProfile();
      
      if (profileResponse.success && profileResponse.data) {
        setProfile(profileResponse.data);
      } else {
        // If no profile exists, try to get by user ID
        try {
          const userProfileResponse = await apiClient.getLawyerByUserId(user.id);
          if (userProfileResponse.success && userProfileResponse.data) {
            setProfile(userProfileResponse.data);
          } else {
            setProfile(null);
          }
        } catch (userErr) {
          // No profile exists yet
          setProfile(null);
        }
      }
    } catch (err) {
      console.error('Error fetching lawyer profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: Omit<LawyerData, 'id' | 'userId'>) => {
    if (!isAuthenticated || !user) {
      throw new Error('Authentication required');
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.createLawyer({
        ...profileData,
        userId: user.id
      });

      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        throw new Error(response.message || 'Failed to create profile');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<LawyerData>) => {
    if (!isAuthenticated || !user || !profile?.id) {
      throw new Error('Profile not found or authentication required');
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.updateLawyer(profile.id, profileData);

      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async () => {
    if (!isAuthenticated || !user || !profile?.id) {
      throw new Error('Profile not found or authentication required');
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.deleteLawyer(profile.id);

      if (response.success) {
        setProfile(null);
      } else {
        throw new Error(response.message || 'Failed to delete profile');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
      setError(null);
    }
  }, [isAuthenticated, user]);

  return {
    profile,
    loading,
    error,
    createProfile,
    updateProfile,
    deleteProfile,
    refetch: fetchProfile
  };
}

// Hook for managing any lawyer profile by ID (public access)
export function useLawyerPublicProfile(lawyerId: string | null) {
  const [profile, setProfile] = useState<LawyerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!lawyerId) {
      setProfile(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.getLawyerById(lawyerId);

      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        setError(response.message || 'Profile not found');
        setProfile(null);
      }
    } catch (err) {
      console.error('Error fetching public lawyer profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [lawyerId]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile
  };
}
