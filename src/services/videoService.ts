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
  likes?: number; // Real like count from API
  comments?: number; // Real comment count from API
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
          likes: video.likes, // Include real like count from API
          comments: video.comments, // Include real comment count from API
          duration: video.duration,
          language: video.language || "English", // Use actual language from video
          thumbnail: `/thumbnails/default${(index % 4) + 1}.jpg`, // Default thumbnails
          description: video.description || `Educational video by ${video.lawyer.name} from ${video.lawyer.firm}`,
          tags: video.tags || [], // Include tags from video
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
          likes: video.likes, // Include real like count from API
          comments: video.comments, // Include real comment count from API
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
   * Get only real videos from the API (no mock data)
   */
  static async getCombinedVideoFeed(): Promise<VideoItem[]> {
    console.log('🎬 Fetching real video feed...');
    
    try {
      const realVideos = await this.getAllLawyerVideos();
      console.log('✅ Real videos fetched:', realVideos.length);
      
      if (realVideos.length === 0) {
        console.log('📭 No videos available. Please upload some videos through the lawyer dashboard.');
      }
      
      return realVideos;
    } catch (error) {
      console.log('⚠️ Error fetching videos:', error instanceof Error ? error.message : error);
      return []; // Return empty array - no fallback to mock data
    }
  }
}
