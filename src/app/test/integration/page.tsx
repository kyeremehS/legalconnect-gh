"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../contexts/AuthContext";
import { apiClient } from "../../../lib/api";
import { useLawyers } from "../../../hooks/useLawyers";
import { useLawyerProfile } from "../../../hooks/useLawyerProfile";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw,
  User,
  Shield,
  Database,
  Network
} from "lucide-react";

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  data?: any;
}

export default function IntegrationTestPage() {
  const { user, isAuthenticated, token } = useAuth();
  const { lawyers, loading: lawyersLoading, error: lawyersError } = useLawyers();
  const { profile, loading: profileLoading, error: profileError } = useLawyerProfile();
  
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runTests = async () => {
    setIsRunningTests(true);
    const results: TestResult[] = [];

    // Test 1: Authentication Status
    results.push({
      name: "Authentication Status",
      status: isAuthenticated ? 'success' : 'error',
      message: isAuthenticated 
        ? `Authenticated as ${user?.firstName} ${user?.lastName} (${user?.role})`
        : "Not authenticated",
      data: { user, token: token?.substring(0, 20) + '...' }
    });

    // Test 2: JWT Token Presence
    results.push({
      name: "JWT Token",
      status: token ? 'success' : 'error',
      message: token ? "JWT token is present" : "No JWT token found",
      data: { tokenLength: token?.length }
    });

    // Test 3: API Health Check
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const healthResponse = await fetch(`${API_BASE_URL}/api/lawyers`);
      const healthData = await healthResponse.json();
      
      results.push({
        name: "API Connection",
        status: healthResponse.ok ? 'success' : 'error',
        message: healthResponse.ok 
          ? `API is responding (${healthResponse.status})`
          : `API error (${healthResponse.status})`,
        data: { status: healthResponse.status, dataLength: healthData?.data?.length || 0 }
      });
    } catch (error) {
      results.push({
        name: "API Connection",
        status: 'error',
        message: "Cannot connect to API server",
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }

    // Test 4: Public Lawyers Endpoint
    results.push({
      name: "Public Lawyers Data",
      status: lawyersError ? 'error' : lawyers.length > 0 ? 'success' : 'pending',
      message: lawyersError 
        ? `Error: ${lawyersError}`
        : lawyers.length > 0 
          ? `Loaded ${lawyers.length} lawyers`
          : lawyersLoading ? "Loading..." : "No lawyers found",
      data: { count: lawyers.length, loading: lawyersLoading }
    });

    // Test 5: Protected Profile Endpoint (if authenticated)
    if (isAuthenticated && token) {
      try {
        const profileResponse = await apiClient.getCurrentLawyerProfile();
        results.push({
          name: "Protected Profile Access",
          status: profileResponse.success ? 'success' : 'error',
          message: profileResponse.success 
            ? "Successfully accessed protected endpoint"
            : `Error: ${profileResponse.message}`,
          data: profileResponse.data
        });
      } catch (error) {
        results.push({
          name: "Protected Profile Access",
          status: 'error',
          message: "Failed to access protected endpoint",
          data: { error: error instanceof Error ? error.message : 'Unknown error' }
        });
      }

      // Test 6: Current User Endpoint
      try {
        const userResponse = await apiClient.getCurrentUser();
        results.push({
          name: "Current User Data",
          status: userResponse.success ? 'success' : 'error',
          message: userResponse.success 
            ? "Successfully retrieved user data"
            : `Error: ${userResponse.message}`,
          data: userResponse.data
        });
      } catch (error) {
        results.push({
          name: "Current User Data",
          status: 'error',
          message: "Failed to get user data",
          data: { error: error instanceof Error ? error.message : 'Unknown error' }
        });
      }
    } else {
      results.push({
        name: "Protected Endpoints",
        status: 'error',
        message: "Cannot test protected endpoints - authentication required",
        data: null
      });
    }

    // Test 7: Lawyer Profile Hook
    results.push({
      name: "Lawyer Profile Hook",
      status: profileError ? 'error' : profile ? 'success' : 'pending',
      message: profileError 
        ? `Error: ${profileError}`
        : profile 
          ? "Profile loaded successfully"
          : profileLoading ? "Loading profile..." : "No profile found",
      data: { hasProfile: !!profile, loading: profileLoading }
    });

    setTestResults(results);
    setIsRunningTests(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'pending':
        return 'border-yellow-200 bg-yellow-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">API Integration Test</h1>
                  <p className="text-white/90">
                    Testing authentication and API endpoints
                  </p>
                </div>
              </div>
              
              <button
                onClick={runTests}
                disabled={isRunningTests}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
                <span>{isRunningTests ? 'Running...' : 'Run Tests'}</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* System Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Authentication</p>
                    <p className="text-lg font-bold text-blue-900">
                      {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">User Role</p>
                    <p className="text-lg font-bold text-green-900">
                      {user?.role || 'None'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Database className="w-6 h-6 text-purple-500" />
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Lawyers Loaded</p>
                    <p className="text-lg font-bold text-purple-900">
                      {lawyers.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Test Results
                </h2>
                
                {testResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {result.name}
                        </h3>
                        <p className="text-gray-700 text-sm mt-1">
                          {result.message}
                        </p>
                        {result.data && (
                          <details className="mt-2">
                            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                              View Details
                            </summary>
                            <pre className="text-xs text-gray-600 mt-2 bg-white/50 p-2 rounded overflow-auto">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Initial State */}
            {testResults.length === 0 && (
              <div className="text-center py-12">
                <Network className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Test
                </h2>
                <p className="text-gray-600 mb-6">
                  Click "Run Tests" to verify API integration and authentication.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
