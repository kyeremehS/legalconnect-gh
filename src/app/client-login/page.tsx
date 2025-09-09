"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { apiClient, LoginUserRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ClientLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const loginData: LoginUserRequest = {
        email: formData.email,
        password: formData.password,
      };

      const response = await apiClient.loginUser(loginData);

      if (response.success && response.data) {
        // Use auth context to store user data and token
        login(response.data.user, response.data.token);
        
        // Redirect based on user role
        const userRole = response.data.user.role;
        switch (userRole) {
          case 'CLIENT':
            router.push('/User-landing');
            break;
          case 'LAWYER':
            router.push('/Lawyer');
            break;
          case 'ADMIN':
            router.push('/Admin');
            break;
          default:
            router.push('/User-landing');
        }
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-[#e7daa5] via-[#ebeacf] to-[#eeeef2] md:flex-row py-8 md:gap-10 justify-center items-center min-h-screen">
      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-4"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#d4a017] mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your LegalConnect account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
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
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#d4a017] focus:border-[#d4a017] transition-colors pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#d4a017] shadow-sm focus:border-[#d4a017] focus:ring focus:ring-[#d4a017] focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-[#d4a017] hover:text-[#b38a15] font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d4a017] text-white py-3 rounded-lg font-semibold hover:bg-[#b38a15] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#d4a017] hover:text-[#b38a15] font-medium">
            Sign up
          </Link>
        </div>
      </motion.div>

      {/* Right side illustration */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white relative hidden md:block"
      >
        <div className="absolute inset-0 bg-[url('/Legalhammer.webp')] opacity-5"></div>
        <div className="relative z-10">
          <div className="mt-12">
            <Image
              src="/Coat_of_arms_of_Ghana.svg"
              alt="Legal Illustration"
              width={400}
              height={300}
              className="mx-auto hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -inset-4 bg-[#F9A825]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
