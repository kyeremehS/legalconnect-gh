"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function EnquiryStatus() {
  const params = useSearchParams();
  const [ref, setRef] = useState(params.get("ref") || "");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const check = async (r: string) => {
    if (!r) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries/status?ref=${encodeURIComponent(r)}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Not found");
      setData(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lookup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const r = params.get("ref");
    if (r) check(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Track your enquiry</h1>
        <div className="flex gap-2 mb-4">
          <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Reference token" className="flex-1 border rounded px-3 py-2" />
          <button onClick={() => check(ref)} disabled={loading} className="bg-[#d4a017] text-white rounded px-4 disabled:opacity-50">
            Check
          </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {data && (
          <div className="text-sm space-y-1">
            <p><span className="font-medium">Name:</span> {data.fullName}</p>
            <p><span className="font-medium">Status:</span> {data.status}</p>
            {data.reviewNotes && <p><span className="font-medium">Note from our team:</span> {data.reviewNotes}</p>}
            <p className="text-gray-500">Last update: {new Date(data.updatedAt).toLocaleString()}</p>
            {data.status === "INVITED" && (
              <p className="text-green-700">Approved! Check your email/messages for your invitation link.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
