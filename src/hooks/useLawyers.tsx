'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient, LawyerData, SearchLawyersParams, transformLawyerData } from '../lib/api';

export interface LawyerFilters {
  practiceArea?: string;
  location?: string;
  search?: string;
}

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useLawyers(filters: LawyerFilters = {}) {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search query to avoid too many API calls
  const debouncedSearch = useDebounce(filters.search || '', 300);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Prepare search parameters
      const searchParams: SearchLawyersParams = {};
      
      if (filters.practiceArea && filters.practiceArea !== "All Areas") {
        searchParams.practiceArea = filters.practiceArea;
      }
      
      if (filters.location && filters.location !== "All Locations") {
        searchParams.location = filters.location;
      }
      
      if (debouncedSearch) {
        searchParams.search = debouncedSearch;
      }

      // Use search endpoint if filters are applied, otherwise get all lawyers
      const response = Object.keys(searchParams).length > 0 
        ? await apiClient.searchLawyers(searchParams)
        : await apiClient.getLawyers();

      if (response.success && response.data) {
        // Transform API data to frontend format
        const transformedLawyers = response.data.map(transformLawyerData);
        setLawyers(transformedLawyers);
      } else {
        setError(response.message || 'Failed to fetch lawyers');
        setLawyers([]);
      }
    } catch (err) {
      console.error('Error fetching lawyers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch lawyers');
      setLawyers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [filters.practiceArea, filters.location, debouncedSearch]);

  return {
    lawyers,
    loading,
    error,
    refetch: fetchLawyers
  };
}
