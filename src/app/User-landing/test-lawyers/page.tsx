"use client";

import React, { useState, useEffect } from "react";
import { Lawyer, fetchLawyers } from "../../../../types/lawyer";
import LawyerCard from "../../../components/lawyer/LawyerCard";

export default function TestLawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLawyers = async () => {
      try {
        setLoading(true);
        const data = await fetchLawyers();
        console.log("Fetched lawyers:", data);
        setLawyers(data);
      } catch (err) {
        console.error("Error loading lawyers:", err);
        setError("Failed to load lawyers");
      } finally {
        setLoading(false);
      }
    };

    loadLawyers();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Loading Lawyers...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Lawyers from Backend API</h1>
      
      <div className="mb-6">
        <p className="text-gray-600">
          Found {lawyers.length} lawyer(s) from the backend API
        </p>
      </div>

      {lawyers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No lawyers found in the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-bold mb-2">Debug Info:</h2>
        <pre className="text-xs text-gray-700 overflow-auto">
          {JSON.stringify({ 
            count: lawyers.length,
            firstLawyer: lawyers[0] || null 
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
