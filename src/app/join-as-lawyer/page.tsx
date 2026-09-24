"use client";
import { useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const PRACTICE_AREAS = [
  "Corporate Law", "Criminal Law", "Family Law", "Real Estate Law",
  "Employment Law", "Immigration Law", "Tax Law", "Intellectual Property",
  "Environmental Law", "Human Rights", "Commercial Law", "Constitutional Law",
];

export default function JoinAsLawyer() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", firm: "", location: "",
    barNumber: "", barAdmissionYear: "", message: "", practiceAreas: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ refToken: string; status: string } | null>(null);

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setError(null);
  };
  const toggleArea = (a: string) =>
    setForm((p) => ({
      ...p,
      practiceAreas: p.practiceAreas.includes(a)
        ? p.practiceAreas.filter((x) => x !== a)
        : [...p.practiceAreas, a],
    }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Could not submit enquiry");
      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const trackUrl = `/enquiry-status?ref=${result.refToken}`;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Enquiry received</h2>
          <p className="text-gray-600 mb-4">
            Our team reviews every enquiry. Track progress any time with your reference link —
            save it somewhere safe:
          </p>
          <Link href={trackUrl} className="block break-all text-[#d4a017] underline mb-6">
            {trackUrl}
          </Link>
          <p className="text-sm text-gray-500">Status: {result.status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <form onSubmit={submit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-2">Join LegalConnect as a lawyer</h1>
        <p className="text-gray-600 mb-6">
          Tell us who you are. If approved, we&apos;ll send you a personal invitation link to create
          your account. Registration is by invitation only.
        </p>
        {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder="Full name *" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className="border rounded px-3 py-2" />
          <input required type="email" placeholder="Email *" value={form.email} onChange={(e) => set("email", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Firm" value={form.firm} onChange={(e) => set("firm", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Location" value={form.location} onChange={(e) => set("location", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Bar number (if known)" value={form.barNumber} onChange={(e) => set("barNumber", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Year of call" value={form.barAdmissionYear} onChange={(e) => set("barAdmissionYear", e.target.value)} className="border rounded px-3 py-2" />
        </div>
        <p className="mt-5 mb-2 font-medium text-sm">Practice areas</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {PRACTICE_AREAS.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => toggleArea(a)}
              className={`px-3 py-1 rounded-full text-sm border ${form.practiceAreas.includes(a) ? "bg-[#d4a017] text-white border-[#d4a017]" : "border-gray-300"}`}
            >
              {a}
            </button>
          ))}
        </div>
        <textarea placeholder="Anything we should know?" value={form.message} onChange={(e) => set("message", e.target.value)} className="w-full border rounded px-3 py-2 mb-5" rows={3} />
        <button disabled={loading} className="w-full bg-[#d4a017] text-white rounded py-2 font-semibold disabled:opacity-50">
          {loading ? "Submitting…" : "Submit enquiry"}
        </button>
      </form>
    </div>
  );
}
