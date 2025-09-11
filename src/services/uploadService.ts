/**
 * Upload Service for handling file uploads to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface VideoMetadata {
  title: string;
  description: string;
  category: string;
  language: string;
  tags: string[];
  duration?: string;
}

export interface DocumentUploadResult {
  uploadedFiles: string[];
  urls: { [key: string]: string };
  failed: string[];
}

export interface LawyerDocuments {
  practicingCertificateUrl: string[];
  barCertificateUrl: string[];
  idDocumentUrl: string[];
  cvResumeUrl: string[];
  lawDegreeUrl: string[];
  otherDocumentUrl: string[];
  videoUrl: string[];
}

export class UploadService {
  /**
   * Upload multiple documents for a lawyer during registration
   */
  static async uploadLawyerDocuments(
    lawyerId: string,
    files: {
      practisingCertificate?: File;
      barCertificate?: File;
      idDocument?: File;
      cvResume?: File;
      profilePhoto?: File;
    }
  ): Promise<DocumentUploadResult> {
    try {
      const formData = new FormData();

      // Append files to FormData
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/uploads/lawyer/${lawyerId}/documents`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Multiple document upload error:', error);
      throw error;
    }
  }

  /**
   * Upload a single document
   */
  static async uploadSingleDocument(
    lawyerId: string,
    documentType: string,
    file: File
  ): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/api/uploads/lawyer/${lawyerId}/document/${documentType}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Single document upload error:', error);
      throw error;
    }
  }

  /**
   * Upload a video introduction
   */
  static async uploadVideo(lawyerId: string, videoFile: File): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const url = `${API_BASE_URL}/api/uploads/lawyer/${lawyerId}/video`;
      console.log('Upload URL:', url);
      console.log('Lawyer ID:', lawyerId);
      console.log('Video file:', videoFile.name, videoFile.size);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`Video upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Video upload error:', error);
      throw error;
    }
  }

  /**
   * Upload a video with metadata (title, description, tags, etc.)
   */
  static async uploadVideoWithMetadata(
    lawyerId: string, 
    videoFile: File, 
    metadata: VideoMetadata
  ): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', metadata.title);
      formData.append('description', metadata.description);
      formData.append('category', metadata.category);
      formData.append('language', metadata.language);
      formData.append('tags', JSON.stringify(metadata.tags));

      const url = `${API_BASE_URL}/api/uploads/lawyer/${lawyerId}/video-with-metadata`;
      console.log('Upload URL:', url);
      console.log('Lawyer ID:', lawyerId);
      console.log('Video file:', videoFile.name, videoFile.size);
      console.log('Video metadata:', metadata);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`Video upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Video upload with metadata error:', error);
      throw error;
    }
  }

  /**
   * Delete a document
   */
  static async deleteDocument(
    lawyerId: string,
    documentType: string,
    documentUrl: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/uploads/lawyer/${lawyerId}/document/${documentType}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentUrl }),
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Document delete error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Delete failed' };
    }
  }

  /**
   * Get all documents for a lawyer
   */
  static async getLawyerDocuments(lawyerId: string): Promise<LawyerDocuments> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/uploads/lawyer/${lawyerId}/documents`);

      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.statusText}`);
      }

      const result = await response.json();
      return result.documents;
    } catch (error) {
      console.error('Get documents error:', error);
      throw error;
    }
  }

  /**
   * Get presigned URL for secure file access
   */
  static async getPresignedUrl(s3Key: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/uploads/presigned/${encodeURIComponent(s3Key)}`);

      if (!response.ok) {
        throw new Error(`Failed to get presigned URL: ${response.statusText}`);
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('Presigned URL error:', error);
      throw error;
    }
  }

  /**
   * Validate file before upload
   */
  static validateFile(file: File, maxSizeMB: number = 10): { valid: boolean; error?: string } {
    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File too large. Maximum size is ${maxSizeMB}MB`
      };
    }

    // Check file type for documents
    const allowedDocumentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];

    // Check file type for videos
    const allowedVideoTypes = [
      'video/mp4',
      'video/avi',
      'video/quicktime',
      'video/webm',
      'video/x-msvideo'
    ];

    const isDocument = allowedDocumentTypes.includes(file.type);
    const isVideo = allowedVideoTypes.includes(file.type);

    if (!isDocument && !isVideo) {
      return {
        valid: false,
        error: 'Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG for documents; MP4, AVI, QuickTime, WebM for videos'
      };
    }

    return { valid: true };
  }

  /**
   * Format file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get file extension from filename
   */
  static getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }

  /**
   * Generate thumbnail URL for document types
   */
  static getDocumentThumbnail(filename: string): string {
    const extension = this.getFileExtension(filename).toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '/icons/pdf-icon.png';
      case 'doc':
      case 'docx':
        return '/icons/doc-icon.png';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '/icons/image-icon.png';
      default:
        return '/icons/file-icon.png';
    }
  }
}

export default UploadService;
