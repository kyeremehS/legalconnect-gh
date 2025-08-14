
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, FileText, User, Calendar, Award, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Building, MapPin, Scale } from "lucide-react";
import { motion } from "framer-motion";

interface VerificationResult {
  verified: boolean;
  certificate?: {
    nameOfLawyer: string;
    dateOfIssue: string;
    certificateNumber: string;
  };
  matchScore?: number;
  message?: string;
}

interface RegistrationResult {
  success: boolean;
  data?: {
    user: any;
    lawyer: any;
    verification?: any;
  };
  message?: string;
}

export default function LawyerSignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firm: "",
    location: "",
    certificateNumber: "",
    barAdmissionYear: "",
    practiceAreas: [] as string[],
    experience: "",
    education: "",
    specializations: "",
    languages: "",
    website: "",
    professionalSummary: "",
    barLicense: null as File | null,
    practisingCertificate: null as File | null,
    idDocument: null as File | null,
    cvResume: null as File | null,
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    barLicense: false,
    practisingCertificate: false,
    idDocument: false,
    cvResume: false,
  });
  const [certificateVerificationResult, setCertificateVerificationResult] = useState<VerificationResult | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const practiceAreaOptions = [
    "Corporate Law", "Criminal Law", "Family Law", "Real Estate Law", 
    "Employment Law", "Immigration Law", "Tax Law", "Intellectual Property",
    "Environmental Law", "Human Rights", "Commercial Law", "Constitutional Law"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handlePracticeAreaChange = (area: string) => {
    setFormData(prev => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(area)
        ? prev.practiceAreas.filter(a => a !== area)
        : [...prev.practiceAreas, area]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      setUploadedFiles(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };

  // Certificate verification function
  const verifyCertificate = async (): Promise<VerificationResult> => {
    try {
      const response = await fetch('http://localhost:4000/api/lawyer-registration/verify-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certificateNumber: formData.certificateNumber,
          fullName: formData.fullName,
          barAdmissionYear: formData.barAdmissionYear,
        }),
      });

      const result = await response.json();
      
      if (result.success && result.data) {
        return {
          verified: result.data.isVerified,
          certificate: result.data.matchedCertificate,
          matchScore: result.data.confidence,
          message: result.data.message || "Certificate verified against Ghana Bar database"
        };
      } else {
        return {
          verified: false,
          message: result.message || "Certificate verification failed"
        };
      }
    } catch (error) {
      console.error('Certificate verification error:', error);
      return {
        verified: false,
        message: "Error during certificate verification"
      };
    }
  };

  // File upload function using our real upload service
  const uploadFile = async (file: File, type: string, lawyerId: string): Promise<string> => {
    try {
      const result = await fetch('http://localhost:4000/api/upload/lawyer/' + lawyerId + '/document/' + type, {
        method: 'POST',
        body: (() => {
          const formData = new FormData();
          formData.append('file', file);
          return formData;
        })()
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.statusText}`);
      }

      const data = await result.json();
      
      if (data.success && data.url) {
        return data.url;
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.practiceAreas.length === 0) {
        throw new Error('Please select at least one practice area');
      }

      // Step 1: Verify certificate if provided
      let certificationResult: VerificationResult | null = null;
      if (formData.certificateNumber && formData.barAdmissionYear) {
        certificationResult = await verifyCertificate();
        setCertificateVerificationResult(certificationResult);
      }

      // Step 2: First register the user and lawyer to get the lawyerId
      const registrationResponse = await fetch('http://localhost:4000/api/lawyer-registration/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          firm: formData.firm || 'Independent Practice',
          location: formData.location || 'Ghana',
          certificateNumber: formData.certificateNumber,
          barAdmissionYear: formData.barAdmissionYear,
          experience: formData.experience,
          education: formData.education || 'Law Degree',
          practiceAreas: formData.practiceAreas,
          specializations: formData.specializations ? formData.specializations.split(',').map(s => s.trim()) : [],
          languages: formData.languages ? formData.languages.split(',').map(l => l.trim()) : ['English'],
          website: formData.website,
          professionalSummary: formData.professionalSummary || `Experienced lawyer specializing in ${formData.practiceAreas.join(', ')}.`,
        }),
      });

      const registrationResult: RegistrationResult = await registrationResponse.json();

      if (!registrationResult.success || !registrationResult.data?.lawyer?.id) {
        throw new Error(registrationResult.message || 'Registration failed');
      }

      const lawyerId = registrationResult.data.lawyer.id;

      // Step 3: Upload documents if provided
      const documentUrls: Record<string, string> = {};
      
      if (formData.practisingCertificate) {
        documentUrls.practisingCertificateUrl = await uploadFile(formData.practisingCertificate, 'practising-certificate', lawyerId);
      }
      if (formData.barLicense) {
        documentUrls.barCertificateUrl = await uploadFile(formData.barLicense, 'bar-certificate', lawyerId);
      }
      if (formData.idDocument) {
        documentUrls.idDocumentUrl = await uploadFile(formData.idDocument, 'id-document', lawyerId);
      }
      if (formData.cvResume) {
        documentUrls.cvResumeUrl = await uploadFile(formData.cvResume, 'cv-resume', lawyerId);
      }

      // Success! Mark registration as complete
      setRegistrationComplete(true);

    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Success screen
  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Submitted!</h2>
          
          <div className="mb-6 space-y-4">
            {certificateVerificationResult && (
              <div className={`p-4 rounded-lg ${
                certificateVerificationResult.verified 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {certificateVerificationResult.verified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className="font-medium text-sm">
                    Certificate Status: {certificateVerificationResult.verified ? 'Verified' : 'Requires Review'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{certificateVerificationResult.message}</p>
              </div>
            )}
            
            <div className="text-left space-y-3">
              <h3 className="font-semibold text-gray-800">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span>Admin team will review your documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span>Identity and credentials verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span>Email notification with decision</span>
                </li>
              </ul>
            </div>
            
            <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
              <strong>⏱️ Estimated review time:</strong> 24-48 hours
            </p>
          </div>
          
          <div className="space-y-3">
            <Link
              href="/Lawyer/sign-in"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Login Page
            </Link>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Register Another Account
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Our Legal Network</h1>
              <p className="text-gray-600">Complete your registration to start connecting with clients</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-600" />
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter your full legal name"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter your professional email"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Create a strong password"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Confirm your password"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Professional Information */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Building className="w-6 h-6 text-blue-600" />
                    Professional Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Law Firm *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firm"
                          value={formData.firm}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Your law firm name"
                        />
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="City, Region"
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="certificateNumber"
                          value={formData.certificateNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="e.g., GAR 11131 / 15"
                        />
                        <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bar Admission Year *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="barAdmissionYear"
                          value={formData.barAdmissionYear}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="YYYY or DD/MM/YYYY"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        min="0"
                        max="50"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Years of practice"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education
                      </label>
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Law school, degree, year"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Practice Areas & Specializations */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Scale className="w-6 h-6 text-blue-600" />
                    Practice Areas & Specializations
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Practice Areas * (Select at least one)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {practiceAreaOptions.map((area) => (
                        <label
                          key={area}
                          className={`relative flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.practiceAreas.includes(area)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.practiceAreas.includes(area)}
                            onChange={() => handlePracticeAreaChange(area)}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{area}</span>
                          {formData.practiceAreas.includes(area) && (
                            <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specializations
                      </label>
                      <input
                        type="text"
                        name="specializations"
                        value={formData.specializations}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="e.g., Corporate Mergers, Criminal Defense"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Languages Spoken
                      </label>
                      <input
                        type="text"
                        name="languages"
                        value={formData.languages}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="e.g., English, Twi, French"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="https://your-website.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Summary
                      </label>
                      <textarea
                        name="professionalSummary"
                        value={formData.professionalSummary}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Brief description of your experience and expertise..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Document Upload */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Document Upload
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Practising Certificate */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Practising Certificate * <span className="text-red-500">(Required)</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          <label htmlFor="practisingCertificate" className="cursor-pointer text-blue-600 hover:text-blue-500">
                            Click to upload
                          </label>
                          <span> or drag and drop</span>
                        </div>
                        <input
                          id="practisingCertificate"
                          name="practisingCertificate"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                        {uploadedFiles.practisingCertificate && (
                          <div className="mt-2 flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Practising certificate uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bar Certificate */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bar Certificate <span className="text-gray-500">(Optional)</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          <label htmlFor="barLicense" className="cursor-pointer text-blue-600 hover:text-blue-500">
                            Click to upload
                          </label>
                          <span> or drag and drop</span>
                        </div>
                        <input
                          id="barLicense"
                          name="barLicense"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                        {uploadedFiles.barLicense && (
                          <div className="mt-2 flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Bar certificate uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ID Document */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Government ID <span className="text-gray-500">(Optional)</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          <label htmlFor="idDocument" className="cursor-pointer text-blue-600 hover:text-blue-500">
                            Click to upload
                          </label>
                          <span> or drag and drop</span>
                        </div>
                        <input
                          id="idDocument"
                          name="idDocument"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">National ID, Passport, or Driver's License</p>
                        {uploadedFiles.idDocument && (
                          <div className="mt-2 flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">ID document uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CV/Resume */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CV/Resume <span className="text-gray-500">(Optional)</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          <label htmlFor="cvResume" className="cursor-pointer text-blue-600 hover:text-blue-500">
                            Click to upload
                          </label>
                          <span> or drag and drop</span>
                        </div>
                        <input
                          id="cvResume"
                          name="cvResume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                        {uploadedFiles.cvResume && (
                          <div className="mt-2 flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">CV/Resume uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2">🔒 Document Security</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• All documents are encrypted and stored securely</li>
                        <li>• Only authorized admin staff can access your documents</li>
                        <li>• Documents are used solely for verification purposes</li>
                        <li>• We comply with Ghana Data Protection Act</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Application...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Already have account link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/Lawyer/sign-in" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
