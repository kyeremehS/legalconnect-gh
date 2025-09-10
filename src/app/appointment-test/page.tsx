"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Calendar, Clock, User, Settings, TestTube, CheckCircle } from 'lucide-react';

export default function AppointmentTestPage() {
  const [testResults, setTestResults] = useState<{
    backend: { success: boolean; message: string } | null;
    frontend: { success: boolean; message: string } | null;
    authentication: { success: boolean; message: string } | null;
  }>({
    backend: null,
    frontend: null,
    authentication: null,
  });

  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:4000/health');
      const data = await response.json();
      setTestResults(prev => ({ ...prev, backend: { success: true, message: 'Backend connected successfully' } }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, backend: { success: false, message: 'Backend connection failed' } }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            🎉 Appointment System Integration Test
          </h1>
          <p className="text-gray-600 text-lg">
            Test all components of the integrated lawyer availability and appointment booking system
          </p>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TestTube className="w-6 h-6 mr-2 text-[#d4a017]" />
            System Status Check
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={testBackendConnection}
              className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-6 py-3 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 font-semibold"
            >
              Test Backend Connection
            </button>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Frontend Status</p>
              <p className="font-semibold text-green-600">✅ Running</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Database Status</p>
              <p className="font-semibold text-blue-600">🔄 Check via API</p>
            </div>
          </div>

          {/* Test Results */}
          {testResults.backend && (
            <div className={`p-4 rounded-lg flex items-center ${
              testResults.backend.success 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {testResults.backend.success ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <TestTube className="w-5 h-5 mr-2" />
              )}
              {testResults.backend.message}
            </div>
          )}
        </div>

        {/* Feature Test Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Lawyer Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                👨‍⚖️ Lawyer Features
              </h3>
              <Link
                href="/Lawyer/availability"
                className="block bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-4 py-3 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 text-center font-medium"
              >
                <Clock className="w-5 h-5 mx-auto mb-1" />
                Manage Availability
              </Link>
              <Link
                href="/Lawyer/appointment-dashboard"
                className="block bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-4 py-3 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 text-center font-medium"
              >
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                Appointment Dashboard
              </Link>
            </div>

            {/* Client Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                👤 Client Features
              </h3>
              <Link
                href="/User-landing/appointment-booking"
                className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center font-medium"
              >
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                Book Appointment (Old)
              </Link>
              <Link
                href="/User-landing/appointment-booking-integrated"
                className="block bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center font-medium"
              >
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                Book Appointment (New)
              </Link>
            </div>

            {/* Authentication */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                🔐 Authentication
              </h3>
              <Link
                href="/login"
                className="block bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-3 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-center font-medium"
              >
                <User className="w-5 h-5 mx-auto mb-1" />
                Login as Lawyer
              </Link>
              <Link
                href="/register"
                className="block bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-3 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-center font-medium"
              >
                <User className="w-5 h-5 mx-auto mb-1" />
                Login as Client
              </Link>
            </div>

            {/* API Testing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                🔧 API Testing
              </h3>
              <button
                onClick={() => window.open('http://localhost:4000/health', '_blank')}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center font-medium"
              >
                <Settings className="w-5 h-5 mx-auto mb-1" />
                Health Check
              </button>
              <button
                onClick={() => window.open('http://localhost:4000/api/availability/lawyers/available', '_blank')}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center font-medium"
              >
                <Settings className="w-5 h-5 mx-auto mb-1" />
                Available Lawyers
              </button>
            </div>
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 Testing Flow</h3>
              <ol className="space-y-2 text-gray-700">
                <li><strong>1.</strong> Login as a lawyer</li>
                <li><strong>2.</strong> Set availability using "Manage Availability"</li>
                <li><strong>3.</strong> Check appointments in "Appointment Dashboard"</li>
                <li><strong>4.</strong> Login as a client</li>
                <li><strong>5.</strong> Book appointment using "Book Appointment (New)"</li>
                <li><strong>6.</strong> Return to lawyer dashboard to confirm booking</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Features to Test</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lawyer availability creation (recurring & specific dates)</li>
                <li>• Real-time lawyer availability display for clients</li>
                <li>• Multi-step appointment booking process</li>
                <li>• Appointment status management (Pending → Confirmed)</li>
                <li>• Practice area filtering</li>
                <li>• Meeting type selection (Video, Phone, In-Person)</li>
                <li>• Duration selection and time slot validation</li>
                <li>• Authentication and authorization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Endpoints Reference */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints Reference</h2>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <p className="mb-2"><strong>Backend URL:</strong> http://localhost:4000</p>
            <p className="mb-2"><strong>Frontend URL:</strong> http://localhost:3000</p>
            <hr className="my-4" />
            <p className="mb-1"><strong>GET</strong> /api/availability/lawyers/available - Get available lawyers</p>
            <p className="mb-1"><strong>POST</strong> /api/appointments - Create appointment (Client)</p>
            <p className="mb-1"><strong>GET</strong> /api/appointments/lawyer - Get lawyer appointments</p>
            <p className="mb-1"><strong>PATCH</strong> /api/appointments/:id/status - Update appointment status</p>
            <p className="mb-1"><strong>GET</strong> /api/availability/lawyer/my-availability - Get lawyer availability</p>
            <p className="mb-1"><strong>POST</strong> /api/availability/lawyer/my-availability - Create availability</p>
          </div>
        </div>
      </div>
    </div>
  );
}
