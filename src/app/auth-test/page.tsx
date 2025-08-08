"use client";
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthTest() {
  const { user, token, isAuthenticated, logout } = useAuth();

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Authentication Status</h2>
      
      {isAuthenticated ? (
        <div>
          <p className="text-green-600 font-semibold mb-2">✅ Authenticated</p>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Token:</strong> {token?.substring(0, 20)}...</p>
          </div>
          <button 
            onClick={logout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="text-red-600 font-semibold">❌ Not Authenticated</p>
          <p>Please log in to see your information.</p>
        </div>
      )}
    </div>
  );
}
