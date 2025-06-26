"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, FileText, User, Calendar, Award, Mail, Lock } from "lucide-react";

export default function LawyerSignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    certificateNumber: "",
    yearOfIssuance: "",
    barLicense: null,
    callToBarCertificate: null,
    idDocument: null,
  });

  const [isLoading, setIsLoading] = useState(false);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement form submission logic
    console.log("Form data:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to lawyer dashboard or show success message
    }, 2000);
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-[#e7daa5] via-[#ebeacf] to-[#eeeef2] md:flex-row py-36 md:gap-10 justify-center items-center min-h-screen">
      {/* Sign-up Form */}
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#d4a017] mb-2">Lawyer Registration</h2>
          <p className="text-gray-600">Join our legal community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#d4a017] focus:border-[#d4a017] transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#d4a017] focus:border-[#d4a017] transition-colors"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#d4a017] focus:border-[#d4a017] transition-colors"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#d4a017] focus:border-[#d4a017] transition-colors"
              placeholder="Confirm your password"
            />
          </div>

          {/* Certificate Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certificate Number
            </label>
            <input
              type="text"
              name="certificateNumber"
              value={formData.certificateNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#d4a017] focus:border-[#d4a017] transition-colors"
              placeholder="Enter your certificate number"
            />
          </div>

          {/* Year of Issuance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Year of Issuance
            </label>
            <input
              type="number"
              name="yearOfIssuance"
              value={formData.yearOfIssuance}
              onChange={handleInputChange}
              required
              min="1950"
              max={new Date().getFullYear()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#d4a017] focus:border-[#d4a017] transition-colors"
              placeholder="e.g., 2020"
            />
          </div>

          {/* Supporting Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Supporting Documents (Optional)
            </h3>
            
            {/* Bar License */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bar License
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="barLicense"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="barLicense"
                />
                <label
                  htmlFor="barLicense"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#d4a017] hover:bg-[#fff8eb] transition-all cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Upload Bar License</span>
                </label>
              </div>
            </div>

            {/* Call-to-Bar Certificate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call-to-Bar Certificate
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
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#d4a017] hover:bg-[#fff8eb] transition-all cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Upload Call-to-Bar Certificate</span>
                </label>
              </div>
            </div>

            {/* ID Document */}
            <div>
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
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#d4a017] hover:bg-[#fff8eb] transition-all cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Upload ID Document</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d4a017] text-white py-3 rounded-lg font-semibold hover:bg-[#b38a15] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/Lawyer/sign-in" className="text-[#d4a017] hover:text-[#b38a15] font-medium">
            Sign in
          </Link>
        </div>
      </div>

      {/* Right side illustration */}
      <div className="text-white relative hidden md:block">
        <div className="absolute inset-0 bg-[url('/Legalhammer.webp')] opacity-5"></div>
        <div className="relative z-10">
          {/* <div className="mt-12">
            <Image
              src="/lawyer-in-ghana-legal-empire-hs3.jpg"
              alt="Lawyer Illustration"
              width={400}
              height={300}
              className="mx-auto hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -inset-4 bg-[#F9A825]/20 rounded-full blur-3xl"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
} 