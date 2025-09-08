"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image, Video, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadService from '../../services/uploadService';

interface DocumentUploadProps {
  lawyerId: string;
  documentType: string;
  label: string;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  existingFiles?: string[];
  onUploadSuccess?: (urls: string[]) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
}

export default function DocumentUpload({
  lawyerId,
  documentType,
  label,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  maxSizeMB = 10,
  multiple = false,
  existingFiles = [],
  onUploadSuccess,
  onUploadError,
  className = ''
}: DocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
    success: false
  });
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    
    // Validate files
    for (const file of newFiles) {
      const validation = UploadService.validateFile(file, maxSizeMB);
      if (!validation.valid) {
        setUploadState(prev => ({ ...prev, error: validation.error || 'Invalid file' }));
        return;
      }
    }

    if (multiple) {
      setFiles(prev => [...prev, ...newFiles]);
    } else {
      setFiles(newFiles);
    }
    
    setUploadState(prev => ({ ...prev, error: null, success: false }));
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploadState({ uploading: true, progress: 0, error: null, success: false });

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadState(prev => ({ 
          ...prev, 
          progress: Math.round(((i + 0.5) / files.length) * 100) 
        }));

        const result = await UploadService.uploadSingleDocument(lawyerId, documentType, file);
        
        if (result.success && result.url) {
          uploadedUrls.push(result.url);
        } else {
          throw new Error(result.error || 'Upload failed');
        }
      }

      setUploadState({ uploading: false, progress: 100, error: null, success: true });
      setFiles([]);
      
      if (onUploadSuccess) {
        onUploadSuccess(uploadedUrls);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadState({ uploading: false, progress: 0, error: errorMessage, success: false });
      
      if (onUploadError) {
        onUploadError(errorMessage);
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
    if (file.type.startsWith('video/')) return <Video className="w-8 h-8 text-purple-500" />;
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {existingFiles.length > 0 && (
          <span className="ml-2 text-xs text-green-600">
            ({existingFiles.length} file{existingFiles.length > 1 ? 's' : ''} uploaded)
          </span>
        )}
      </label>

      {/* Drag and Drop Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : uploadState.success
            ? 'border-green-400 bg-green-50'
            : uploadState.error
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {uploadState.uploading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Uploading files...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadState.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{uploadState.progress}%</p>
            </div>
          </motion.div>
        ) : uploadState.success ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-2"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <p className="text-sm text-green-600">Upload successful!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-sm text-gray-600">
                Drag and drop your files here, or{' '}
                <button
                  type="button"
                  onClick={onButtonClick}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Max size: {maxSizeMB}MB • Supported: {accept}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {uploadState.error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{uploadState.error}</p>
        </motion.div>
      )}

      {/* Selected Files */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            <h4 className="text-sm font-medium text-gray-700">Selected Files:</h4>
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {UploadService.formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            
            <button
              onClick={handleUpload}
              disabled={uploadState.uploading}
              className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploadState.uploading ? 'Uploading...' : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Files:</h4>
          <div className="space-y-2">
            {existingFiles.map((url, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">
                    File {index + 1} uploaded
                  </span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
