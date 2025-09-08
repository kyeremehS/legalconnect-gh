"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { apiClient } from "../../../lib/api";

export default function LawyerSignIn() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Check if user is a lawyer or admin
        if (user.role !== 'LAWYER' && user.role !== 'ADMIN') {
          setError('Access denied. This login is for verified lawyers only.');
          setIsLoading(false);
          return;
        }

        // Login and redirect
        login(user, token);
        router.push('/Lawyer');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-[#e7daa5] via-[#ebeacf] to-[#eeeef2] md:flex-row py-36 md:gap-10 justify-center items-center h-screen">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#d4a017] mb-2">Lawyer Sign In</h2>
          <p className="text-gray-600">Welcome back! Please sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
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

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right text-sm">
            <Link href="#" className="text-[#d4a017] hover:text-[#b38a15] font-medium">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d4a017] text-white py-3 rounded-lg font-semibold hover:bg-[#b38a15] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/Lawyer/sign-up" className="text-[#d4a017] hover:text-[#b38a15] font-medium">
            Sign up
          </Link>
        </div>
      </div>
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