"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, FileText, User, Calendar, Award, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export default function LawyerSignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    certificateNumber: "",
    DateOfIssuance: "",
    barLicense: null,
    callToBarCertificate: null,
    idDocument: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    barLicense: false,
    practisingCertificate: false,
    idDocument: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Split fullName into firstName and lastName
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

      // Register lawyer with available data
      const response = await fetch('http://localhost:4000/api/lawyers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formData.email,
          password: formData.password,
          firm: 'Not specified', // Default value since form doesn't have this
          location: 'Ghana', // Default value 
          barAdmissionYear: formData.DateOfIssuance,
          experience: 0, // Default value since form doesn't have this
          practiceAreas: ['General Practice'], // Default value
          education: 'Not specified', // Default value
          barAssociation: formData.certificateNumber, // Using certificate number
          specializations: ['General Law'], // Default value
          languages: ['English'], // Default value
          professionalSummary: `Lawyer with certificate number ${formData.certificateNumber}, admitted in ${formData.DateOfIssuance}.`
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Registration failed');
      }

      // Success! Show success message and redirect
      alert('Registration successful! Please log in to access your dashboard.');
      // Use window.location since router is not imported
      window.location.href = '/Lawyer/login';

    } catch (error) {
      console.error('Registration error:', error);
      alert(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isPasswordMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const isPasswordLengthValid = formData.password.length >= 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center mx-auto items-center">
          

          {/* Right side - Registration Form */}
          <div className="w-full max-w-2xl mx-auto lg:max-w-4xl ">
            <div className="bg-white shadow-2xl rounded-3xl p-8 lg:p-10">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Lawyer Registration</h2>
                <p className="text-gray-600">Create your professional account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
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

                    {/* Email */}
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

                    {/* Password */}
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
                      {formData.password && (
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          {isPasswordLengthValid ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className={isPasswordLengthValid ? "text-green-600" : "text-red-600"}>
                            At least 8 characters
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
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
                      {formData.confirmPassword && (
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          {isPasswordMatch ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-600">Passwords match</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-500" />
                              <span className="text-red-600">Passwords don't match</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Award className="w-5 h-5 text-blue-600" />
                    Professional Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Certificate Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bar Certificate Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="certificateNumber"
                          value={formData.certificateNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter certificate number"
                        />
                        <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/*  Date of Issuance */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Issuance *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="DateOfIssuance"
                          value={formData.DateOfIssuance}
                          onChange={handleInputChange}
                          required
                          min="1950"
                          max={new Date().getFullYear()}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="e.g., 2020"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supporting Documents */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Supporting Documents
                    <span className="text-sm font-normal text-gray-500">(Needed to complete verification)</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                  
                   

                    {/* Practising Certificate */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Practising Certificate
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="callToBarCertificate"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="callToBarCertificate"
                        />
                        <label
                          htmlFor="callToBarCertificate"
                          className={`flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                            uploadedFiles.practisingCertificate 
                              ? 'border-green-300 bg-green-50 text-green-700' 
                              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >
                          {uploadedFiles.practisingCertificate ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium"> Certificate Uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-600">Upload Practising Certificate (PDF, JPG, PNG)</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* ID Document */}
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID Document
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="idDocument"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="idDocument"
                        />
                        <label
                          htmlFor="idDocument"
                          className={`flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                            uploadedFiles.idDocument 
                              ? 'border-green-300 bg-green-50 text-green-700' 
                              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >
                          {uploadedFiles.idDocument ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">ID Document Uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-600">Upload ID Document (PDF, JPG, PNG)</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                        Privacy Policy
                      </Link>
                      . I understand that my account will be reviewed for verification before activation.
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isPasswordMatch || !isPasswordLengthValid}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Professional Account"
                  )}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    href="/Lawyer/sign-in" 
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}