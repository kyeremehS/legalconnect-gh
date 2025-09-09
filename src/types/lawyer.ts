// Backend API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
}

// User interface from backend
export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Lawyer interface matching backend response
export interface BackendLawyer {
  id: string;
  userId: string;
  professionalSummary: string;
  firm: string;
  location: string;
  barAdmissionYear: string;
  experience: number;
  practiceAreas: string[];
  education: string;
  barAssociation: string | null;
  website: string;
  specializations: string[];
  languages: string[];
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  isVerified: boolean;
  verifiedAt: string | null;
  barCertificateUrl: string[];
  practicingCertificateUrl: string[];
  idDocumentUrl: string[];
  cvResumeUrl: string[];
  lawDegreeUrl: string[];
  otherDocumentUrl: string[];
  videoUrl: string[];
  certificateNumber: string;
  certificateVerified: boolean;
  certificateVerifiedAt: string | null;
  user: User;
}

// Frontend Lawyer interface (for compatibility with existing components)
export interface Lawyer {
  id: string;
  name: string;
  title: string;
  firm: string;
  location: string;
  barAdmissionYear: number;
  experience: number;
  practiceAreas: string[];
  education: string;
  barAssociation: string;
  profileImage: string;
  isConnected: boolean;
  isPending: boolean;
  connectionCount: number;
  professionalSummary: string;
  publications: string[];
  calendlyLink: string;
  email: string;
  phone: string;
  website?: string;
  detailedBio: string;
  specializations: string[];
  awards: string[];
  languages: string[];
  isVerified: boolean;
  verificationStatus: string;
  videoUrl: string[];
}

// Function to transform backend lawyer data to frontend format
export function transformBackendLawyer(backendLawyer: BackendLawyer): Lawyer {
  return {
    id: backendLawyer.id,
    name: backendLawyer.user.fullName || `${backendLawyer.user.firstName || ''} ${backendLawyer.user.lastName || ''}`.trim() || 'Unknown Lawyer',
    title: backendLawyer.practiceAreas.length > 0 ? `${backendLawyer.practiceAreas[0]} Specialist` : 'Legal Practitioner',
    firm: backendLawyer.firm || 'Private Practice',
    location: backendLawyer.location || 'Ghana',
    barAdmissionYear: parseInt(backendLawyer.barAdmissionYear) || new Date().getFullYear(),
    experience: backendLawyer.experience || 0,
    practiceAreas: backendLawyer.practiceAreas || [],
    education: backendLawyer.education || 'Law Degree',
    barAssociation: backendLawyer.barAssociation || 'Ghana Bar Association',
    profileImage: backendLawyer.user.avatar || '',
    isConnected: false,
    isPending: false,
    connectionCount: 0,
    professionalSummary: backendLawyer.professionalSummary || 'Experienced legal practitioner',
    publications: [], // This would need to be added to backend if needed
    calendlyLink: '', // This would need to be added to backend if needed
    email: backendLawyer.user.email,
    phone: backendLawyer.user.phone || '',
    website: backendLawyer.website || '',
    detailedBio: backendLawyer.professionalSummary || 'Experienced legal practitioner',
    specializations: backendLawyer.specializations || [],
    awards: [], // This would need to be added to backend if needed
    languages: backendLawyer.languages || ['English'],
    isVerified: backendLawyer.isVerified,
    verificationStatus: backendLawyer.verificationStatus,
    videoUrl: backendLawyer.videoUrl || []
  };
}

// Function to fetch lawyers from backend API
export async function fetchLawyers(): Promise<Lawyer[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/lawyers`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch lawyers: ${response.statusText}`);
    }
    
    const apiResponse: ApiResponse<BackendLawyer[]> = await response.json();
    
    if (!apiResponse.success) {
      throw new Error(apiResponse.message || 'Failed to fetch lawyers');
    }
    
    // Transform backend lawyers to frontend format
    return apiResponse.data.map(transformBackendLawyer);
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    return [];
  }
}

// Legacy mock data export for compatibility (need to be imported from existing mockdata)
// These will need to be updated based on your existing mockdata structure
export const legalArticles: any[] = [];
export const videoFeeds: any[] = [];
export const courseData: any[] = [];
export const lawyerVideos: any[] = [];
