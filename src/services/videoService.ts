/**
 * Video Service for handling video data operations
 */

import { apiClient } from '../lib/api';

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  lawyer: string;
  lawyerId: string; // Add lawyerId for video interactions
  category: string;
  views: string;
  duration: string;
  language: string;
  thumbnail: string;
  description: string;
  tags?: string[];
}

export class VideoService {
  /**
   * Get all lawyer videos for the legal content feed
   */
  static async getAllLawyerVideos(): Promise<VideoItem[]> {
    try {
      console.log('🔍 Attempting to fetch videos from API...');
      const response = await apiClient.getAllLawyerVideos();
      console.log('📡 API Response:', response);
      
      if (response.success && response.data && response.data.length > 0) {
        console.log('✅ Found real videos:', response.data.length);
        // Transform API data to match the VideoItem interface
        return response.data.map((video, index) => ({
          id: video.id,
          title: video.title || `Legal Video ${index + 1}`,
          url: video.url,
          lawyer: video.lawyer.name,
          lawyerId: video.lawyer.id, // Include lawyerId for interactions
          category: this.determineCategoryFromPracticeAreas(video.lawyer.practiceAreas),
          views: this.formatViews(video.views),
          duration: video.duration,
          language: "English", // Default language
          thumbnail: `/thumbnails/default${(index % 4) + 1}.jpg`, // Default thumbnails
          description: video.description || `Educational video by ${video.lawyer.name} from ${video.lawyer.firm}`,
          tags: video.lawyer.practiceAreas
        }));
      }
      
      console.log('📭 No videos found in API response');
      return [];
    } catch (error) {
      console.log('❌ API Error (will use mock data only):', error instanceof Error ? error.message : error);
      // Return empty array instead of throwing error - let getCombinedVideoFeed handle fallbacks
      return [];
    }
  }

  /**
   * Get videos by specific lawyer
   */
  static async getLawyerVideos(lawyerId: string): Promise<VideoItem[]> {
    try {
      const response = await apiClient.getLawyerVideos(lawyerId);
      
      if (response.success && response.data) {
        return response.data.map((video, index) => ({
          id: video.id,
          title: video.title || `Legal Video ${index + 1}`,
          url: video.url,
          lawyer: video.lawyer.name,
          lawyerId: video.lawyer.id, // Include lawyerId for interactions
          category: this.determineCategoryFromPracticeAreas(video.lawyer.practiceAreas),
          views: this.formatViews(video.views),
          duration: video.duration,
          language: "English",
          thumbnail: `/thumbnails/default${(index % 4) + 1}.jpg`,
          description: video.description || `Educational video by ${video.lawyer.name} from ${video.lawyer.firm}`,
          tags: video.lawyer.practiceAreas
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching lawyer videos:', error);
      return [];
    }
  }

  /**
   * Determine video category based on lawyer's practice areas
   */
  private static determineCategoryFromPracticeAreas(practiceAreas: string[]): string {
    if (!practiceAreas || practiceAreas.length === 0) {
      return "General Law";
    }

    // Map practice areas to video categories
    const categoryMap: { [key: string]: string } = {
      "Family Law": "Family Law",
      "Criminal Law": "Criminal Law", 
      "Business Law": "Business Law",
      "Corporate Law": "Business Law",
      "Real Estate": "Land Law",
      "Property Law": "Land Law",
      "Employment Law": "Employment Law",
      "Immigration Law": "Immigration Law",
      "Constitutional Law": "Constitutional Law"
    };

    for (const area of practiceAreas) {
      if (categoryMap[area]) {
        return categoryMap[area];
      }
    }

    return practiceAreas[0] || "General Law";
  }

  /**
   * Format view count for display
   */
  private static formatViews(views: number): string {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    } else {
      return views.toString();
    }
  }

  /**
   * Combine real videos with mock videos for better content variety
   */
  static async getCombinedVideoFeed(): Promise<VideoItem[]> {
    console.log('🎬 Fetching combined video feed...');
    
    let realVideos: VideoItem[] = [];
    
    try {
      realVideos = await this.getAllLawyerVideos();
      console.log('✅ Real videos fetched:', realVideos.length);
    } catch (error) {
      console.log('⚠️ Error fetching real videos (will use mock data only):', error instanceof Error ? error.message : error);
      realVideos = []; // Ensure it's an empty array
    }
    
    // Mock videos for fallback/variety
    const mockVideos: VideoItem[] = [
      {
        id: "uploaded_video_1",
        title: "Recently Uploaded Legal Content",
        url: "https://legalconnect-bucket.s3.eu-north-1.amazonaws.com/lawyer-videos/cmebptmg00002940ootz16ivm/a25e529d-c6b9-4d9d-b741-cf10c1d83718.mp4",
        lawyer: "Current Lawyer",
        lawyerId: "current_lawyer_1", // Mock lawyerId
        category: "General Law",
        views: "1",
        duration: "3:45",
        language: "English",
        thumbnail: "/thumbnails/default1.jpg",
        description: "Recently uploaded video content from your dashboard.",
      },
      {
        id: "mock_1",
        title: "Understanding Landlord and Tenant Rights",
        url: "/legal-videos/tenant-and-landlord.mp4",
        lawyer: "Yudah Brown, Esq.",
        lawyerId: "mock_lawyer_1", // Mock lawyerId
        category: "Land Law",
        views: "12.5K",
        duration: "5:32",
        language: "English",
        thumbnail: "/thumbnails/land1.jpg",
        description: "Education on getting a rent card from the landlord and understanding your rights as a tenant.",
      },
      {
        id: "mock_2",
        title: "Building without permits",
        url: "/legal-videos/building-without-permit.mp4",
        lawyer: "Yudah Brown, Esq.",
        lawyerId: "mock_lawyer_1", // Mock lawyerId
        category: "Land Law",
        views: "8.2K",
        duration: "2:46",
        language: "English",
        thumbnail: "/thumbnails/land2.jpg",
        description: "Education on being served with a notice to stop building without a permit and the legal implications.",
      },
      {
        id: "mock_3",
        title: "Marriage and Divorce Laws",
        url: "/legal-videos/getting-divorce-in-ghana.mp4",
        lawyer: "Tina, Esq.",
        lawyerId: "mock_lawyer_2", // Mock lawyerId
        category: "Family Law",
        views: "15.1K",
        duration: "3:09",
        language: "Twi",
        thumbnail: "/thumbnails/family1.jpg",
        description: "Understanding how to get a divorce in a Ghanaian court.",
      }
    ];

    // Combine real videos with mock videos, prioritizing real videos
    const combinedVideos = [...realVideos, ...mockVideos];
    console.log('📊 Combined video feed:', combinedVideos.length, 'videos total');
    
    return combinedVideos;
  }
}
