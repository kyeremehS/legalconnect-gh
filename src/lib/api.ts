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
  // Video endpoints
  GET_ALL_LAWYER_VIDEOS: '/api/lawyers/videos',
  GET_LAWYER_VIDEOS: (lawyerId: string) => `/api/lawyers/${lawyerId}/videos`,
  // Video interactions
  TOGGLE_VIDEO_LIKE: '/api/videos/like',
  ADD_VIDEO_COMMENT: '/api/videos/comment',
  RECORD_VIDEO_VIEW: '/api/videos/view',
  GET_VIDEO_COMMENTS: '/api/videos/comments',
  GET_VIDEO_STATS: '/api/videos/test-stats-simple',
  DELETE_VIDEO_COMMENT: (commentId: string) => `/api/videos/comment/${commentId}`,
  // Message endpoints
  SEND_MESSAGE: '/api/messages',
  GET_USER_CONVERSATIONS: '/api/messages/conversations',
  GET_LAWYER_MESSAGE_CALLS: '/api/messages/lawyer/calls',
  SEND_CALL_REQUEST: '/api/messages/call-request',
  GET_CONVERSATION: (senderId: string, receiverId: string) => `/api/messages/${senderId}/${receiverId}`,
  // Appointment endpoints
  CREATE_APPOINTMENT: '/api/appointments',
  GET_APPOINTMENT: (id: string) => `/api/appointments/${id}`,
  UPDATE_APPOINTMENT_STATUS: (id: string) => `/api/appointments/${id}/status`,
  GET_LAWYER_APPOINTMENTS: '/api/appointments/lawyer/my-appointments',
  GET_CLIENT_APPOINTMENTS: '/api/appointments/client/my-appointments',
  GET_LAWYER_AVAILABILITY: (lawyerId: string) => `/api/appointments/lawyer/${lawyerId}/availability`,
  SET_LAWYER_AVAILABILITY: '/api/appointments/lawyer/availability',
  GET_APPOINTMENT_NOTIFICATIONS: '/api/appointments/notifications',
  GET_USER_NOTIFICATIONS: '/api/appointments/user/notifications',
  MARK_NOTIFICATION_READ: (id: string) => `/api/appointments/notifications/${id}/read`,
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

// Video types
export interface LawyerVideoData {
  id: string;
  url: string;
  lawyer: {
    id: string;
    name: string;
    firm: string;
    practiceAreas: string[];
  };
  views: number;
  likes: number; // Real like count from API
  comments: number; // Real comment count from API
  duration: string;
  uploadedAt: string;
  title?: string;
  description?: string;
  category?: string;
  language?: string;
  tags?: string[];
}

// Appointment types
export interface CreateAppointmentRequest {
  lawyerId: string;
  startTime: string;
  endTime: string;
  practiceArea?: string;
  description?: string;
  meetingType?: 'VIRTUAL' | 'IN_PERSON' | 'PHONE';
  duration?: string;
}

export interface UpdateAppointmentStatusRequest {
  status: 'PENDING' | 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  notes?: string;
}

export interface AppointmentData {
  id: string;
  clientId: string;
  lawyerId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: string;
  meetingType: string;
  meetingLink?: string;
  notes?: string;
  practiceArea?: string;
  duration?: string;
  createdAt: string;
  updatedAt: string;
  client?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  lawyer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
}

export interface LawyerAvailability {
  id: string;
  lawyerId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

// Message types
export interface SendMessageRequest {
  receiverId: string;
  content: string;
}

export interface MessageData {
  id: string;
  senderId: string;
  receiverId: string;
  senderRole: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  readAt?: string;
  sender?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  receiver?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
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
    console.log('Auth token from localStorage:', token ? 'present' : 'missing');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('🔗 Making API request to:', url);
    console.log('🔧 Request config:', options);
    
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
      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📡 Response data:', data);

      if (!response.ok) {
        console.error('❌ API error response:', data);
        throw new Error(data.message || `API request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('❌ API request error for URL:', url);
      console.error('❌ Error details:', error);
      console.error('❌ Network error or server down?', error instanceof TypeError);
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
  // VIDEO METHODS
  // ========================

  // Get all lawyer videos
  async getAllLawyerVideos(): Promise<ApiResponse<LawyerVideoData[]>> {
    return this.request(API_ENDPOINTS.GET_ALL_LAWYER_VIDEOS);
  }

  // Get videos by specific lawyer
  async getLawyerVideos(lawyerId: string): Promise<ApiResponse<LawyerVideoData[]>> {
    return this.request(API_ENDPOINTS.GET_LAWYER_VIDEOS(lawyerId));
  }

  // ========================
  // USER PROFILE METHODS
  // ========================

  // Get current user profile (protected)
  async getCurrentUser(): Promise<ApiResponse<any>> {
    return this.request(API_ENDPOINTS.GET_CURRENT_USER);
  }

  // ========================
  // APPOINTMENT METHODS
  // ========================

  // Create appointment (Client only)
  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<ApiResponse<AppointmentData>> {
    return this.request(API_ENDPOINTS.CREATE_APPOINTMENT, {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  // Get appointment by ID
  async getAppointment(id: string): Promise<ApiResponse<AppointmentData>> {
    return this.request(API_ENDPOINTS.GET_APPOINTMENT(id));
  }

  // Update appointment status (Lawyer only)
  async updateAppointmentStatus(id: string, statusData: UpdateAppointmentStatusRequest): Promise<ApiResponse<AppointmentData>> {
    return this.request(API_ENDPOINTS.UPDATE_APPOINTMENT_STATUS(id), {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }

  // Get lawyer's appointments
  async getLawyerAppointments(filters?: { status?: string; date?: string }): Promise<ApiResponse<AppointmentData[]>> {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.date) queryParams.append('date', filters.date);
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.GET_LAWYER_APPOINTMENTS}?${queryParams.toString()}`
      : API_ENDPOINTS.GET_LAWYER_APPOINTMENTS;
    
    return this.request(endpoint);
  }

  // Get client's appointments
  async getClientAppointments(filters?: { status?: string }): Promise<ApiResponse<AppointmentData[]>> {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.GET_CLIENT_APPOINTMENTS}?${queryParams.toString()}`
      : API_ENDPOINTS.GET_CLIENT_APPOINTMENTS;
    
    return this.request(endpoint);
  }

  // Get lawyer availability
  async getLawyerAvailability(lawyerId: string, date?: string): Promise<ApiResponse<LawyerAvailability | LawyerAvailability[]>> {
    const queryParams = new URLSearchParams();
    if (date) queryParams.append('date', date);
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.GET_LAWYER_AVAILABILITY(lawyerId)}?${queryParams.toString()}`
      : API_ENDPOINTS.GET_LAWYER_AVAILABILITY(lawyerId);
    
    return this.request(endpoint);
  }

  // Set lawyer availability (Lawyer only)
  async setLawyerAvailability(availability: Omit<LawyerAvailability, 'id' | 'lawyerId'>[]): Promise<ApiResponse<any>> {
    return this.request(API_ENDPOINTS.SET_LAWYER_AVAILABILITY, {
      method: 'POST',
      body: JSON.stringify(availability),
    });
  }

  // Get appointment notifications for lawyer
  async getAppointmentNotifications(): Promise<ApiResponse<any[]>> {
    return this.request(API_ENDPOINTS.GET_APPOINTMENT_NOTIFICATIONS);
  }

  // Get user notifications
  async getUserNotifications(unreadOnly?: boolean): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (unreadOnly) queryParams.append('unreadOnly', 'true');
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.GET_USER_NOTIFICATIONS}?${queryParams.toString()}`
      : API_ENDPOINTS.GET_USER_NOTIFICATIONS;
    
    return this.request(endpoint);
  }

  // Mark notification as read
  async markNotificationAsRead(id: string): Promise<ApiResponse<any>> {
    return this.request(API_ENDPOINTS.MARK_NOTIFICATION_READ(id), {
      method: 'PUT',
    });
  }

  // Video interaction methods
  async toggleVideoLike(lawyerId: string, videoId: string): Promise<{ liked: boolean; likeCount: number }> {
    try {
      console.log('Toggling like for:', { lawyerId, videoId });
      
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.TOGGLE_VIDEO_LIKE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({
          lawyerId,
          videoId
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`Failed to toggle like: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      return result.data || result;
    } catch (error) {
      console.error('Error toggling video like:', error);
      throw error;
    }
  }

  async addVideoComment(lawyerId: string, videoId: string, content: string): Promise<any> {
    try {
      const response = await fetch(API_ENDPOINTS.ADD_VIDEO_COMMENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({
          lawyerId,
          videoId,
          content
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error adding video comment:', error);
      throw error;
    }
  }

  async getVideoComments(videoId: string, page = 1, limit = 10): Promise<{ comments: any[]; totalPages: number; currentPage: number }> {
    try {
      const url = `${API_ENDPOINTS.GET_VIDEO_COMMENTS}?videoId=${encodeURIComponent(videoId)}&page=${page}&limit=${limit}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error fetching video comments:', error);
      throw error;
    }
  }

  async getVideoStats(videoId: string): Promise<{ likeCount: number; commentCount: number; userLiked: boolean }> {
    try {
      // Use GET with query parameters for the test endpoint
      const url = `${this.baseUrl}${API_ENDPOINTS.GET_VIDEO_STATS}?videoId=${encodeURIComponent(videoId)}`;
      console.log('Fetching stats from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        // Temporarily remove auth for test endpoint
        // headers: this.getAuthHeaders(),
      });

      console.log('Stats response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Stats error response:', errorText);
        throw new Error(`Failed to fetch video stats: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Stats API Response:', result);
      return result.data || result;
    } catch (error) {
      console.error('Error fetching video stats:', error);
      throw error;
    }
  }

  async deleteVideoComment(commentId: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_VIDEO_COMMENT(commentId), {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete comment: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting video comment:', error);
      throw error;
    }
  }

  async recordVideoView(lawyerId: string, videoId: string, duration?: number): Promise<any> {
    try {
      console.log('Recording video view:', { lawyerId, videoId, duration });
      
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.RECORD_VIDEO_VIEW}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({
          lawyerId,
          videoId,
          duration
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`Failed to record view: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('View recorded:', result);
      return result.data || result;
    } catch (error) {
      console.error('Error recording video view:', error);
      // Don't throw error for view recording - it's not critical
      // Just log it and continue
      return null;
    }
  }

  // ========================
  // MESSAGING API METHODS
  // ========================

  // Send a message
  async sendMessage(messageData: SendMessageRequest): Promise<ApiResponse<MessageData>> {
    return this.request(API_ENDPOINTS.SEND_MESSAGE, {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  // Get all conversations for the authenticated user
  async getUserConversations(): Promise<ApiResponse<any[]>> {
    console.log('🌐 API Client: Making getUserConversations request to:', API_ENDPOINTS.GET_USER_CONVERSATIONS);
    const result = await this.request(API_ENDPOINTS.GET_USER_CONVERSATIONS);
    console.log('🌐 API Client: getUserConversations response:', result);
    return result;
  }

  // Get lawyer message calls (clients who have sent messages to lawyers)
  async getLawyerMessageCalls(): Promise<ApiResponse<any[]>> {
    console.log('🌐 API Client: Making getLawyerMessageCalls request to:', API_ENDPOINTS.GET_LAWYER_MESSAGE_CALLS);
    const result = await this.request(API_ENDPOINTS.GET_LAWYER_MESSAGE_CALLS);
    console.log('🌐 API Client: getLawyerMessageCalls response:', result);
    return result;
  }

  // Send a call request to a lawyer
  async sendCallRequest(callRequestData: { lawyerId: string; content?: string; requestType?: string }): Promise<ApiResponse<MessageData>> {
    console.log('🌐 API Client: Sending call request:', callRequestData);
    return this.request(API_ENDPOINTS.SEND_CALL_REQUEST, {
      method: 'POST',
      body: JSON.stringify(callRequestData),
    });
  }

  // Get conversation between two users
  async getConversation(senderId: string, receiverId: string): Promise<ApiResponse<MessageData[]>> {
    return this.request(API_ENDPOINTS.GET_CONVERSATION(senderId, receiverId));
  }
}

// Create a default instance
export const apiClient = new ApiClient();

// Utility function to transform API lawyer data to frontend format
export function transformLawyerData(apiLawyer: LawyerData): any {
  return {
    id: apiLawyer.userId || apiLawyer.user?.id, // Use userId for appointments, not profile id
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
