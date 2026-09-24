"use client";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function auth() {
  return { Authorization: `Bearer ${localStorage.getItem("authToken")}` };
}

export default function AdminInvites() {
  const [tab, setTab] = useState<"requests" | "invites">("requests");
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [inviteForm, setInviteForm] = useState({ email: "", name: "" });
  const [lastToken, setLastToken] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    try {
      const [e, i] = await Promise.all([
        fetch(`${API_BASE_URL}/api/enquiries`, { headers: auth() }).then((r) => r.json()),
        fetch(`${API_BASE_URL}/api/invitations`, { headers: auth() }).then((r) => r.json()),
      ]);
      if (e.success) setEnquiries(e.data);
      if (i.success) setInvites(i.data);
      if (!e.success && !i.success) setError(e.message || i.message);
    } catch {
      setError("Failed to load. Are you signed in as admin?");
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateEnquiry = async (id: string, status: string) => {
    await fetch(`${API_BASE_URL}/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...auth() },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const inviteEnquiry = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/api/enquiries/${id}/invite`, {
      method: "POST",
      headers: auth(),
    });
    const j = await res.json();
    if (j.success) setLastToken(`${window.location.origin}/Lawyer/accept-invite?token=${j.data.token}`);
    else setError(j.message);
    load();
  };

  const directInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/api/invitations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...auth() },
      body: JSON.stringify(inviteForm),
    });
    const j = await res.json();
    if (j.success) {
      setLastToken(`${window.location.origin}/Lawyer/accept-invite?token=${j.data.token}`);
      setInviteForm({ email: "", name: "" });
    } else setError(j.message);
    load();
  };

  const revoke = async (id: string) => {
    await fetch(`${API_BASE_URL}/api/invitations/${id}/revoke`, { method: "POST", headers: auth() });
    load();
  };

  const reissue = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/api/invitations/${id}/reissue`, { method: "POST", headers: auth() });
    const j = await res.json();
    if (j.success) setLastToken(`${window.location.origin}/Lawyer/accept-invite?token=${j.data.token}`);
    else setError(j.message);
    load();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lawyer onboarding</h1>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      {lastToken && (
        <div className="bg-green-50 border border-green-300 rounded p-3 mb-4 text-sm">
          <p className="font-medium">Invitation link (copy & send — shown once):</p>
          <p className="break-all text-green-800">{lastToken}</p>
        </div>
      )}
      <div className="flex gap-2 mb-5">
        <button onClick={() => setTab("requests")} className={`px-4 py-1 rounded ${tab === "requests" ? "bg-black text-white" : "border"}`}>Requests</button>
        <button onClick={() => setTab("invites")} className={`px-4 py-1 rounded ${tab === "invites" ? "bg-black text-white" : "border"}`}>Invitations</button>
      </div>

      {tab === "requests" && (
        <div className="space-y-3">
          {enquiries.map((q) => (
            <div key={q.id} className="border rounded p-4 text-sm">
              <p className="font-semibold">{q.fullName} — {q.email} <span className="ml-2 text-gray-500">{q.status}</span></p>
              <p className="text-gray-600">{q.firm} · {q.location} · {q.barNumber} · {(q.practiceAreas || []).join(", ")}</p>
              {q.message && <p className="mt-1 italic">{q.message}</p>}
              <div className="flex gap-2 mt-2">
                <button onClick={() => inviteEnquiry(q.id)} className="bg-[#d4a017] text-white px-3 py-1 rounded">Approve & invite</button>
                <button onClick={() => updateEnquiry(q.id, "UNDER_REVIEW")} className="border px-3 py-1 rounded">Under review</button>
                <button onClick={() => updateEnquiry(q.id, "NEEDS_INFO")} className="border px-3 py-1 rounded">Needs info</button>
                <button onClick={() => updateEnquiry(q.id, "REJECTED")} className="border px-3 py-1 rounded">Reject</button>
              </div>
            </div>
          ))}
          {enquiries.length === 0 && <p className="text-gray-500 text-sm">No enquiries yet.</p>}
        </div>
      )}

      {tab === "invites" && (
        <div>
          <form onSubmit={directInvite} className="flex gap-2 mb-5">
            <input required type="email" placeholder="Email" value={inviteForm.email} onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} className="border rounded px-3 py-1 text-sm" />
            <input placeholder="Name" value={inviteForm.name} onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })} className="border rounded px-3 py-1 text-sm" />
            <button className="bg-black text-white px-4 py-1 rounded text-sm">Direct invite</button>
          </form>
          <div className="space-y-2">
            {invites.map((v) => (
              <div key={v.id} className="border rounded p-3 text-sm flex justify-between items-center">
                <span>{v.email} {v.name && `(${v.name})`} — <span className="text-gray-500">{v.status}, expires {new Date(v.expiresAt).toLocaleDateString()}</span></span>
                <span className="flex gap-2">
                  <button onClick={() => reissue(v.id)} className="border px-2 py-0.5 rounded">Reissue</button>
                  <button onClick={() => revoke(v.id)} className="border px-2 py-0.5 rounded">Revoke</button>
                </span>
              </div>
            ))}
            {invites.length === 0 && <p className="text-gray-500 text-sm">No invitations yet.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
