// API configuration and utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// API endpoints
export const API_ENDPOINTS = {
  REGISTER_USER: '/api/users/register',
  LOGIN_USER: '/api/users/login',
  GET_USERS: '/api/users',
  GET_USER_BY_ID: (id: string) => `/api/users/${id}`,
  UPDATE_USER: (id: string) => `/api/users/${id}`,
  DELETE_USER: (id: string) => `/api/users/${id}`,
  GET_CURRENT_USER: '/api/users/profile/me',
  // Lawyer endpoints
  GET_LAWYERS: '/api/lawyers',
  GET_LAWYER_BY_ID: (id: string) => `/api/lawyers/${id}`,
  CREATE_LAWYER: '/api/lawyers',
  UPDATE_LAWYER: (id: string) => `/api/lawyers/${id}`,
  DELETE_LAWYER: (id: string) => `/api/lawyers/${id}`,
  SEARCH_LAWYERS: '/api/lawyers/search',
  SEARCH_LAWYERS_BY_PRACTICE_AREA: '/api/lawyers/search/practice-areas',
  SEARCH_LAWYERS_BY_LOCATION: '/api/lawyers/search/location',
  GET_LAWYER_BY_USER_ID: (userId: string) => `/api/lawyers/user/${userId}`,
  GET_CURRENT_LAWYER_PROFILE: '/api/lawyers/profile/me',
};

// Types for API requests/responses
export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: 'CLIENT' | 'LAWYER' | 'ADMIN';
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    // ... other user fields
  };
  token: string;
}

// Lawyer types for API
export interface LawyerData {
  id?: string;
  userId: string;
  professionalSummary?: string;
  firm: string;
  location?: string;
  barAdmissionYear?: string;
  experience?: number;
  practiceAreas: string[];
  education?: string;
  barAssociation?: string;
  website?: string;
  calendlyLink?: string;
  detailedBio?: string;
  specializations?: string[];
  awards?: string[];
  languages?: string[];
  phone?: string;
  // Populated user data
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface SearchLawyersParams {
  practiceArea?: string;
  location?: string;
  experience?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// API utility functions
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // User registration
  async registerUser(userData: RegisterUserRequest): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.REGISTER_USER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User login
  async loginUser(loginData: LoginUserRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request(API_ENDPOINTS.LOGIN_USER, {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  }

  // Get all users
  async getUsers(): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.GET_USERS);
  }

  // Get user by ID
  async getUserById(id: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.GET_USER_BY_ID(id));
  }

  // Update user
  async updateUser(id: string, userData: Partial<RegisterUserRequest>): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.UPDATE_USER(id), {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Delete user
  async deleteUser(id: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.DELETE_USER(id), {
      method: 'DELETE',
    });
  }

  // ========================
  // LAWYER API METHODS
  // ========================

  // Get all lawyers
  async getLawyers(): Promise<ApiResponse<LawyerData[]>> {
    return this.request(API_ENDPOINTS.GET_LAWYERS);
  }

  // Search lawyers with filters
  async searchLawyers(params: SearchLawyersParams): Promise<ApiResponse<LawyerData[]>> {
    const searchParams = new URLSearchParams();
    
    if (params.practiceArea) searchParams.append('practiceArea', params.practiceArea);
    if (params.location) searchParams.append('location', params.location);
    if (params.experience) searchParams.append('experience', params.experience.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.SEARCH_LAWYERS}?${queryString}` : API_ENDPOINTS.SEARCH_LAWYERS;
    
    return this.request(endpoint);
  }

  // Get lawyer by ID
  async getLawyerById(id: string): Promise<ApiResponse<LawyerData>> {
    return this.request(API_ENDPOINTS.GET_LAWYER_BY_ID(id));
  }

  // Create lawyer
  async createLawyer(lawyerData: Omit<LawyerData, 'id'>): Promise<ApiResponse<LawyerData>> {
    return this.request(API_ENDPOINTS.CREATE_LAWYER, {
      method: 'POST',
      body: JSON.stringify(lawyerData),
    });
  }

  // Update lawyer
  async updateLawyer(id: string, lawyerData: Partial<LawyerData>): Promise<ApiResponse<LawyerData>> {
    return this.request(API_ENDPOINTS.UPDATE_LAWYER(id), {
      method: 'PUT',
      body: JSON.stringify(lawyerData),
    });
  }

  // Delete lawyer
  async deleteLawyer(id: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.DELETE_LAWYER(id), {
      method: 'DELETE',
    });
  }

  // ========================
  // PROTECTED LAWYER ROUTES
  // ========================

  // Get lawyer by user ID (protected)
  async getLawyerByUserId(userId: string): Promise<ApiResponse<LawyerData>> {
    return this.request(API_ENDPOINTS.GET_LAWYER_BY_USER_ID(userId));
  }

  // Get current user's lawyer profile (protected)
  async getCurrentLawyerProfile(): Promise<ApiResponse<LawyerData>> {
    return this.request(API_ENDPOINTS.GET_CURRENT_LAWYER_PROFILE);
  }

  // Search lawyers by practice area
  async searchLawyersByPracticeArea(practiceArea: string): Promise<ApiResponse<LawyerData[]>> {
    return this.request(`${API_ENDPOINTS.SEARCH_LAWYERS_BY_PRACTICE_AREA}?practiceArea=${encodeURIComponent(practiceArea)}`);
  }

  // Search lawyers by location
  async searchLawyersByLocation(location: string): Promise<ApiResponse<LawyerData[]>> {
    return this.request(`${API_ENDPOINTS.SEARCH_LAWYERS_BY_LOCATION}?location=${encodeURIComponent(location)}`);
  }

  // ========================
  // USER PROFILE METHODS
  // ========================

  // Get current user profile (protected)
  async getCurrentUser(): Promise<ApiResponse<any>> {
    return this.request(API_ENDPOINTS.GET_CURRENT_USER);
  }
}

// Create a default instance
export const apiClient = new ApiClient();

// Utility function to transform API lawyer data to frontend format
export function transformLawyerData(apiLawyer: LawyerData): any {
  return {
    id: apiLawyer.id || apiLawyer.userId,
    name: apiLawyer.user ? `${apiLawyer.user.firstName} ${apiLawyer.user.lastName}` : 'Unknown',
    title: "Legal Practitioner", // Default title, could be enhanced
    firm: apiLawyer.firm,
    location: apiLawyer.location || "Ghana",
    barAdmissionYear: apiLawyer.barAdmissionYear ? parseInt(apiLawyer.barAdmissionYear) : 2020,
    experience: apiLawyer.experience || 0,
    practiceAreas: apiLawyer.practiceAreas || [],
    education: apiLawyer.education || "",
    barAssociation: apiLawyer.barAssociation || "Ghana Bar Association",
    profileImage: "/lawyers/default-avatar.jpg", // Default image
    isConnected: false, // Default connection status
    isPending: false,
    connectionCount: Math.floor(Math.random() * 500) + 50, // Random for now
    professionalSummary: apiLawyer.professionalSummary || "",
    publications: [], // Could be enhanced with real data
    calendlyLink: apiLawyer.calendlyLink || "",
    email: apiLawyer.user?.email || "",
    phone: apiLawyer.phone || "",
    website: apiLawyer.website || "",
    detailedBio: apiLawyer.detailedBio || apiLawyer.professionalSummary || "",
    specializations: apiLawyer.specializations || [],
    awards: apiLawyer.awards || [],
    languages: apiLawyer.languages || ["English"]
  };
}
