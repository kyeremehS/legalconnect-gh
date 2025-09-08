'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  User, 
  Calendar, 
  MapPin, 
  Building, 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Eye, 
  Download,
  Search,
  Filter,
  ChevronDown,
  AlertCircle,
  RefreshCw,
  Archive,
  UserCheck,
  Mail,
  Phone,
  ExternalLink,
  Briefcase,
  GraduationCap
} from 'lucide-react';

// Types
interface LawyerApplication {
  id: string;
  fullName: string;
  email: string;
  firm: string;
  location: string;
  certificateNumber: string;
  barAdmissionYear: string;
  experience: string;
  education: string;
  practiceAreas: string[];
  specializations: string;
  languages: string;
  website: string;
  professionalSummary: string;
  status: 'pending' | 'verified' | 'rejected' | 'under_review';
  submittedAt: string;
  documents: {
    practisingCertificate?: string;
    barLicense?: string;
    idDocument?: string;
    cvResume?: string;
  };
  verificationResults?: {
    status: 'verified' | 'not_found' | 'error';
    message: string;
    confidence: number;
    matchedLawyer?: any;
  };
  adminNotes?: string;
  lastUpdated: string;
}

const AdminLawyerVerificationPage = () => {
  const [applications, setApplications] = useState<LawyerApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<LawyerApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<LawyerApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Real API integration
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/lawyer-registration/admin/applications');
        const result = await response.json();
        
        if (result.success) {
          // Transform backend data to match frontend interface
          const transformedApplications = result.data.applications.map((app: any) => ({
            id: app.id,
            fullName: app.user.fullName,
            email: app.user.email,
            firm: app.firm,
            location: app.location,
            certificateNumber: app.certificateNumber || '',
            barAdmissionYear: app.barAdmissionYear || '',
            experience: app.experience?.toString() || '0',
            education: app.education || '',
            practiceAreas: app.practiceAreas || [],
            specializations: Array.isArray(app.specializations) ? app.specializations.join(', ') : app.specializations || '',
            languages: Array.isArray(app.languages) ? app.languages.join(', ') : app.languages || '',
            website: app.website || '',
            professionalSummary: app.professionalSummary || '',
            status: app.verificationStatus?.toLowerCase() === 'approved' ? 'verified' : 
                   app.verificationStatus?.toLowerCase() === 'rejected' ? 'rejected' :
                   app.verificationStatus?.toLowerCase() === 'under_review' ? 'under_review' : 'pending',
            submittedAt: app.user.createdAt || new Date().toISOString(),
            documents: {
              practisingCertificate: app.practicingCertificateUrl,
              barLicense: app.barCertificateUrl,
              idDocument: app.idDocumentUrl,
              cvResume: app.cvResumeUrl
            },
            verificationResults: app.verification ? {
              status: app.verification.certificateVerified ? 'verified' : 'not_found',
              message: app.verification.certificateVerified ? 'Certificate verified successfully' : 'Certificate verification pending',
              confidence: app.verification.certificateMatchScore || 0,
              matchedLawyer: app.verification.certificateVerified ? {
                name: app.verification.certificateName,
                certificate: app.certificateNumber,
                admissionYear: app.barAdmissionYear,
                status: 'Active'
              } : undefined
            } : {
              status: 'pending',
              message: 'Verification pending',
              confidence: 0
            },
            adminNotes: app.verification?.adminNotes || '',
            lastUpdated: app.verification?.updatedAt || app.user.updatedAt || new Date().toISOString()
          }));
          
          setApplications(transformedApplications);
          setFilteredApplications(transformedApplications);
        } else {
          console.error('Failed to fetch applications:', result.message);
          setApplications([]);
          setFilteredApplications([]);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
        setFilteredApplications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Filter applications based on search and status
  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.firm.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  const handleApprove = async (applicationId: string) => {
    setActionLoading(`approve-${applicationId}`);
    try {
      const response = await fetch(`http://localhost:4000/api/lawyer-registration/admin/applications/${applicationId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminNotes: 'Approved by admin'
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setApplications(prev => prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: 'verified' as const, lastUpdated: new Date().toISOString() }
            : app
        ));
        alert('Application approved successfully!');
      } else {
        throw new Error(result.message || 'Failed to approve application');
      }
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Error approving application');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (applicationId: string, reason: string) => {
    setActionLoading(`reject-${applicationId}`);
    try {
      const response = await fetch(`http://localhost:4000/api/lawyer-registration/admin/applications/${applicationId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: reason,
          adminNotes: reason
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setApplications(prev => prev.map(app => 
          app.id === applicationId 
            ? { 
                ...app, 
                status: 'rejected' as const, 
                adminNotes: reason,
                lastUpdated: new Date().toISOString() 
              }
            : app
        ));
        alert('Application rejected successfully!');
      } else {
        throw new Error(result.message || 'Failed to reject application');
      }
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Error rejecting application');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'under_review': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVerificationStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'not_found': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lawyer Verification</h1>
                <p className="text-gray-600">Manage and verify lawyer applications</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/admin"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'verified').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'under_review').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, certificate number, or firm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Applications ({filteredApplications.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                        {application.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.fullName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{application.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            <span>{application.firm}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{application.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            <span>{application.certificateNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Admitted: {application.barAdmissionYear}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span>{application.experience} years experience</span>
                          </div>
                        </div>

                        {application.verificationResults && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              {getVerificationStatusIcon(application.verificationResults.status)}
                              <span className="font-medium text-sm">
                                Verification: {application.verificationResults.status.replace('_', ' ').toUpperCase()}
                              </span>
                              {application.verificationResults.confidence > 0 && (
                                <span className="text-xs text-gray-500">
                                  ({application.verificationResults.confidence}% confidence)
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{application.verificationResults.message}</p>
                          </div>
                        )}

                        {application.adminNotes && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                              <strong>Admin Notes:</strong> {application.adminNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    
                    {application.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(application.id)}
                          disabled={actionLoading === `approve-${application.id}`}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          {actionLoading === `approve-${application.id}` ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          Approve
                        </button>
                        
                        <button
                          onClick={() => {
                            const reason = prompt('Reason for rejection:');
                            if (reason) handleReject(application.id, reason);
                          }}
                          disabled={actionLoading === `reject-${application.id}`}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          {actionLoading === `reject-${application.id}` ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredApplications.length === 0 && (
              <div className="p-12 text-center">
                <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Application Details</h2>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                        <p className="text-gray-900">{selectedApplication.fullName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-gray-900">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Law Firm</label>
                        <p className="text-gray-900">{selectedApplication.firm}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <p className="text-gray-900">{selectedApplication.location}</p>
                      </div>
                      {selectedApplication.website && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Website</label>
                          <a 
                            href={selectedApplication.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-500 flex items-center gap-1"
                          >
                            {selectedApplication.website}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      Professional Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Certificate Number</label>
                        <p className="text-gray-900">{selectedApplication.certificateNumber}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Bar Admission Year</label>
                        <p className="text-gray-900">{selectedApplication.barAdmissionYear}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Years of Experience</label>
                        <p className="text-gray-900">{selectedApplication.experience} years</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Education</label>
                        <p className="text-gray-900">{selectedApplication.education}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Languages</label>
                        <p className="text-gray-900">{selectedApplication.languages}</p>
                      </div>
                    </div>
                  </div>

                  {/* Practice Areas */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Practice Areas & Specializations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Practice Areas</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedApplication.practiceAreas.map((area, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Specializations</label>
                        <p className="text-gray-900">{selectedApplication.specializations}</p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  {selectedApplication.professionalSummary && (
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedApplication.professionalSummary}</p>
                    </div>
                  )}

                  {/* Documents */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedApplication.documents).map(([key, url]) => (
                        url && (
                          <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <span className="font-medium text-gray-700">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedDocument(url);
                                  setShowDocumentModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-500"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <a
                                href={url}
                                download
                                className="text-green-600 hover:text-green-500"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Verification Results */}
                  {selectedApplication.verificationResults && (
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Verification Results
                      </h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {getVerificationStatusIcon(selectedApplication.verificationResults.status)}
                          <span className="font-medium">
                            {selectedApplication.verificationResults.status.replace('_', ' ').toUpperCase()}
                          </span>
                          {selectedApplication.verificationResults.confidence > 0 && (
                            <span className="text-sm text-gray-500">
                              ({selectedApplication.verificationResults.confidence}% confidence)
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{selectedApplication.verificationResults.message}</p>
                        
                        {selectedApplication.verificationResults.matchedLawyer && (
                          <div className="bg-white p-3 rounded border">
                            <h4 className="font-medium text-gray-900 mb-2">Matched Lawyer Record:</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">Name:</span>
                                <span className="ml-2 font-medium">{selectedApplication.verificationResults.matchedLawyer.name}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Certificate:</span>
                                <span className="ml-2 font-medium">{selectedApplication.verificationResults.matchedLawyer.certificate}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Admission:</span>
                                <span className="ml-2 font-medium">{selectedApplication.verificationResults.matchedLawyer.admissionYear}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Status:</span>
                                <span className="ml-2 font-medium text-green-600">{selectedApplication.verificationResults.matchedLawyer.status}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLawyerVerificationPage;
