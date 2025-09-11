// Backend API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
}
// Legal Articles Mock Data
export const legalArticles = [
  {
    id: "1",
    title: "Understanding Landlord-Tenant Rights in Ghana",
    excerpt: "A comprehensive guide to rental laws, tenant rights, and landlord obligations under Ghanaian law.",
    content: "Learn about the Rent Act 1963, security deposits, eviction procedures, and tenant protections in Ghana.",
    author: "Aaron Arnold Anim",
    category: "Property Law",
    readTime: "8 min read",
    publishDate: "2024-01-15",
    featured: true,
    relatedLawyers: ["lawyer1", "lawyer2"],
    tags: ["Property Law", "Tenant Rights", "Rental Law"]
  },
  {
    id: "2",
    title: "Corporate Registration Process in Ghana",
    excerpt: "Step-by-step guide to registering a business in Ghana, including requirements and procedures.",
    content: "Understand the Companies Act 2019, registration procedures at the Registrar General's Department, and compliance requirements.",
    author: "Sarah Mensah",
    category: "Corporate Law",
    readTime: "12 min read",
    publishDate: "2024-01-10",
    featured: true,
    relatedLawyers: ["lawyer3", "lawyer4"],
    tags: ["Corporate Law", "Business Registration", "Compliance"]
  },
  {
    id: "3",
    title: "Employment Law Basics for Ghanaian Workers",
    excerpt: "Know your rights as an employee in Ghana, including working hours, leave entitlements, and termination procedures.",
    content: "Overview of the Labour Act 2003, employee rights, employer obligations, and dispute resolution mechanisms.",
    author: "Kwame Asante",
    category: "Employment Law",
    readTime: "10 min read",
    publishDate: "2024-01-05",
    featured: false,
    relatedLawyers: ["lawyer5", "lawyer6"],
    tags: ["Employment Law", "Worker Rights", "Labour Act"]
  },
  {
    id: "4",
    title: "Family Law and Marriage in Ghana",
    excerpt: "Understanding marriage laws, divorce proceedings, and child custody arrangements under Ghanaian law.",
    content: "Learn about customary marriage, ordinance marriage, Islamic marriage, and family dispute resolution.",
    author: "Akosua Osei",
    category: "Family Law",
    readTime: "15 min read",
    publishDate: "2023-12-28",
    featured: true,
    relatedLawyers: ["lawyer7", "lawyer8"],
    tags: ["Family Law", "Marriage", "Divorce", "Child Custody"]
  },
  {
    id: "5",
    title: "Intellectual Property Protection in Ghana",
    excerpt: "Guide to protecting trademarks, copyrights, and patents in Ghana's growing digital economy.",
    content: "Understanding IP registration processes, enforcement mechanisms, and protection strategies for businesses.",
    author: "Dr. Emmanuel Kusi",
    category: "Intellectual Property",
    readTime: "11 min read",
    publishDate: "2023-12-20",
    featured: false,
    relatedLawyers: ["lawyer9", "lawyer10"],
    tags: ["Intellectual Property", "Trademarks", "Copyright", "Patents"]
  },
  {
    id: "6",
    title: "Criminal Law Procedures in Ghana",
    excerpt: "Understanding your rights during arrest, police procedures, and the criminal justice process.",
    content: "Know your constitutional rights, police powers, court procedures, and legal representation options.",
    author: "Justice Adjei",
    category: "Criminal Law",
    readTime: "9 min read",
    publishDate: "2023-12-15",
    featured: false,
    relatedLawyers: ["lawyer11", "lawyer12"],
    tags: ["Criminal Law", "Constitutional Rights", "Police Procedures"]
  }
];

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
export const videoFeeds: any[] = [];
export const courseData: any[] = [];
export const lawyerVideos: any[] = [];
