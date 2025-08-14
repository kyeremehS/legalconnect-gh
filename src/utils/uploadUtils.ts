// Frontend utility for handling lawyer document uploads

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    uploadedFiles?: string[];
    urls?: { [key: string]: string };
    failed?: string[];
    url?: string;
    key?: string;
    documentType?: string;
  };
  error?: string;
}

export interface DocumentFiles {
  practisingCertificate?: File;
  barCertificate?: File;
  idDocument?: File;
  cvResume?: File;
  profilePhoto?: File;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

/**
 * Upload multiple lawyer documents
 */
export const uploadLawyerDocuments = async (
  lawyerId: string,
  files: DocumentFiles
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    
    // Add each file to FormData if it exists
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    const response = await fetch(`${API_BASE_URL}/uploads/lawyer/${lawyerId}/documents`, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Upload a single document
 */
export const uploadSingleDocument = async (
  lawyerId: string,
  documentType: string,
  file: File
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/uploads/lawyer/${lawyerId}/document/${documentType}`, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error('Single upload error:', error);
    return {
      success: false,
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Upload a video file
 */
export const uploadVideo = async (
  lawyerId: string,
  videoFile: File
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('video', videoFile);

    const response = await fetch(`${API_BASE_URL}/uploads/lawyer/${lawyerId}/video`, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error('Video upload error:', error);
    return {
      success: false,
      message: 'Video upload failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (
  lawyerId: string,
  documentType: string
): Promise<UploadResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/uploads/lawyer/${lawyerId}/document/${documentType}`, {
      method: 'DELETE',
    });

    return await response.json();
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      message: 'Delete failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Get all documents for a lawyer
 */
export const getLawyerDocuments = async (
  lawyerId: string
): Promise<UploadResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/uploads/lawyer/${lawyerId}/documents`);
    return await response.json();
  } catch (error) {
    console.error('Get documents error:', error);
    return {
      success: false,
      message: 'Failed to get documents',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validate file before upload
 */
export const validateFile = (file: File, isVideo: boolean = false): { valid: boolean; error?: string } => {
  const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for video, 10MB for docs
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`
    };
  }

  const allowedTypes = isVideo ? [
    'video/mp4',
    'video/avi',
    'video/quicktime',
    'video/webm',
    'video/x-msvideo',
    'video/x-ms-wmv'
  ] : [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: isVideo 
        ? 'Invalid video format. Allowed: MP4, AVI, QuickTime, WebM, WMV'
        : 'Invalid file format. Allowed: PDF, DOC, DOCX, JPG, PNG'
    };
  }

  return { valid: true };
};

/**
 * Get file type display name
 */
export const getFileTypeDisplay = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  const typeMap: { [key: string]: string } = {
    pdf: 'PDF Document',
    doc: 'Word Document',
    docx: 'Word Document',
    jpg: 'JPEG Image',
    jpeg: 'JPEG Image',
    png: 'PNG Image',
    mp4: 'MP4 Video',
    avi: 'AVI Video',
    mov: 'QuickTime Video',
    webm: 'WebM Video',
    wmv: 'WMV Video'
  };
  
  return typeMap[extension || ''] || 'Unknown';
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Extract S3 key from URL
 */
export const extractS3Key = (url: string): string | null => {
  try {
    const urlParts = url.split('/');
    const bucketIndex = urlParts.findIndex(part => part.includes('s3.'));
    if (bucketIndex === -1) return null;
    
    return urlParts.slice(bucketIndex + 2).join('/');
  } catch {
    return null;
  }
};
