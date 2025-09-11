"use client";

import React, { useState, useEffect } from 'react';
import { FileText, Video, Image, Download, Trash2, Plus, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadService, { LawyerDocuments } from '../../services/uploadService';
import DocumentUpload from '../ui/DocumentUpload';

interface DocumentManagerProps {
  lawyerId: string;
}

interface DocumentCategory {
  key: keyof LawyerDocuments;
  label: string;
  description: string;
  accept: string;
  icon: React.ReactNode;
  maxSizeMB: number;
}

export default function DocumentManager({ lawyerId }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<LawyerDocuments>({
    practicingCertificateUrl: [],
    barCertificateUrl: [],
    idDocumentUrl: [],
    cvResumeUrl: [],
    lawDegreeUrl: [],
    otherDocumentUrl: [],
    videoUrl: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const documentCategories: DocumentCategory[] = [
    {
      key: 'practicingCertificateUrl',
      label: 'Practicing Certificate',
      description: 'Current practicing certificate from Ghana Bar Association',
      accept: '.pdf,.jpg,.jpeg,.png',
      icon: <FileText className="w-5 h-5" />,
      maxSizeMB: 10
    },
    {
      key: 'barCertificateUrl',
      label: 'Bar Certificate',
      description: 'Bar admission certificate',
      accept: '.pdf,.jpg,.jpeg,.png',
      icon: <FileText className="w-5 h-5" />,
      maxSizeMB: 10
    },
    {
      key: 'idDocumentUrl',
      label: 'ID Document',
      description: 'Government issued ID or passport',
      accept: '.pdf,.jpg,.jpeg,.png',
      icon: <FileText className="w-5 h-5" />,
      maxSizeMB: 10
    },
    {
      key: 'cvResumeUrl',
      label: 'CV/Resume',
      description: 'Professional CV or resume',
      accept: '.pdf,.doc,.docx',
      icon: <FileText className="w-5 h-5" />,
      maxSizeMB: 10
    },
    {
      key: 'lawDegreeUrl',
      label: 'Law Degree',
      description: 'Law degree certificate',
      accept: '.pdf,.jpg,.jpeg,.png',
      icon: <FileText className="w-5 h-5" />,
      maxSizeMB: 10
    },
    {
      key: 'otherDocumentUrl',
      label: 'Other Documents',
      description: 'Profile photos and other professional documents',
      accept: '.pdf,.jpg,.jpeg,.png,.doc,.docx',
      icon: <Image className="w-5 h-5" />,
      maxSizeMB: 10
    },
    {
      key: 'videoUrl',
      label: 'Video Introductions',
      description: 'Professional introduction videos',
      accept: '.mp4,.avi,.mov,.webm',
      icon: <Video className="w-5 h-5" />,
      maxSizeMB: 50
    }
  ];

  useEffect(() => {
    loadDocuments();
  }, [lawyerId]);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await UploadService.getLawyerDocuments(lawyerId);
      
      // Ensure we have a valid documents object with all required keys
      const safeDocuments = {
        practicingCertificateUrl: docs?.practicingCertificateUrl || [],
        barCertificateUrl: docs?.barCertificateUrl || [],
        idDocumentUrl: docs?.idDocumentUrl || [],
        cvResumeUrl: docs?.cvResumeUrl || [],
        lawDegreeUrl: docs?.lawDegreeUrl || [],
        otherDocumentUrl: docs?.otherDocumentUrl || [],
        videoUrl: docs?.videoUrl || []
      };
      
      setDocuments(safeDocuments);
    } catch (error) {
      console.error('Failed to load documents:', error);
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (category: keyof LawyerDocuments, urls: string[]) => {
    setDocuments(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), ...urls]
    }));
    setExpandedCategory(null);
  };

  const handleDeleteDocument = async (category: keyof LawyerDocuments, url: string) => {
    try {
      const documentType = category.replace('Url', '').replace(/([A-Z])/g, '-$1').toLowerCase();
      const result = await UploadService.deleteDocument(lawyerId, documentType, url);
      
      if (result.success) {
        setDocuments(prev => ({
          ...prev,
          [category]: (prev[category] || []).filter(docUrl => docUrl !== url)
        }));
      } else {
        setError(result.error || 'Failed to delete document');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete document');
    }
  };

  const getFileName = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1] || 'Document';
  };

  const getCompletionPercentage = (): number => {
    if (!documentCategories || !documents) return 0;
    
    const totalCategories = documentCategories.length;
    const completedCategories = documentCategories.filter(cat => 
      cat && cat.key && documents[cat.key] && documents[cat.key].length > 0
    ).length;
    return Math.round((completedCategories / totalCategories) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading documents...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{getCompletionPercentage()}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600 mt-2">
          Upload all required documents to complete your profile verification
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-600"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Document Categories */}
      <div className="space-y-4">
        {documentCategories && documentCategories.map((category) => {
          if (!category || !category.key) return null;
          
          const categoryDocs = documents && documents[category.key] ? documents[category.key] : [];
          const isExpanded = expandedCategory === category.key;
          
          return (
            <motion.div
              key={category.key}
              layout
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedCategory(isExpanded ? null : category.key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-600">{category.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{category.label}</h3>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {categoryDocs.length > 0 ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-green-600">
                            {categoryDocs.length} file{categoryDocs.length > 1 ? 's' : ''}
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                          <span className="text-sm text-orange-600">No files</span>
                        </>
                      )}
                    </div>
                    
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Plus className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t bg-gray-50"
                  >
                    <div className="p-4 space-y-4">
                      {/* Existing Files */}
                      {categoryDocs.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Current Files:</h4>
                          <div className="space-y-2">
                            {categoryDocs.map((url, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                                <div className="flex items-center gap-3">
                                  {category.icon}
                                  <span className="text-sm text-gray-900">{getFileName(url)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 text-blue-600 hover:text-blue-700"
                                    title="Download"
                                  >
                                    <Download className="w-4 h-4" />
                                  </a>
                                  <button
                                    onClick={() => handleDeleteDocument(category.key, url)}
                                    className="p-1 text-red-600 hover:text-red-700"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upload Component */}
                      <DocumentUpload
                        lawyerId={lawyerId}
                        documentType={category.key.replace('Url', '').replace(/([A-Z])/g, '-$1').toLowerCase()}
                        label="Add New Files"
                        accept={category.accept}
                        maxSizeMB={category.maxSizeMB}
                        multiple={true}
                        existingFiles={categoryDocs}
                        onUploadSuccess={(urls) => handleUploadSuccess(category.key, urls)}
                        onUploadError={(error) => setError(error)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
