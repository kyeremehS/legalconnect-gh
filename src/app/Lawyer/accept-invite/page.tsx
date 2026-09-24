"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AcceptInvite() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const token = params.get("token") || "";

  const [invite, setInvite] = useState<{ email: string; name: string | null; expiresAt: string } | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "", password: "", confirmPassword: "", firm: "", location: "",
    barAdmissionYear: "", experience: "", education: "", practiceAreas: [] as string[],
    specializations: "", languages: "", website: "", professionalSummary: "",
  });
  const [files, setFiles] = useState<Record<string, File | null>>({
    practisingCertificate: null, barCertificate: null, idDocument: null, cvResume: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setInviteError("No invitation token. Registration is by invitation only — start with an enquiry.");
      return;
    }
    fetch(`${API_BASE_URL}/api/invitations/validate/${token}`)
      .then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (!ok || !j.success) {
          setInviteError(j.message || "This invitation is not valid.");
          return;
        }
        setInvite(j.data);
        setForm((p) => ({ ...p, fullName: j.data.name || "" }));
      })
      .catch(() => setInviteError("Could not validate invitation. Try again later."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.practiceAreas.length === 0) return setError("Select at least one practice area.");
    if (!files.practisingCertificate) return setError("Please attach your practising certificate.");
    setLoading(true);
    try {
      const reg = await fetch(`${API_BASE_URL}/api/lawyer-registration/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: invite!.email,
          password: form.password,
          firm: form.firm || "Independent Practice",
          location: form.location || "Ghana",
          invitationToken: token,
          barAdmissionYear: form.barAdmissionYear,
          experience: form.experience,
          education: form.education || "Law Degree",
          practiceAreas: form.practiceAreas,
          specializations: form.specializations ? form.specializations.split(",").map((s) => s.trim()) : [],
          languages: form.languages ? form.languages.split(",").map((s) => s.trim()) : ["English"],
          website: form.website,
          professionalSummary: form.professionalSummary,
        }),
      });
      const regJson = await reg.json();
      if (!reg.ok || !regJson.success) throw new Error(regJson.message || "Registration failed");
      const { lawyerId, token: authToken, user } = {
        lawyerId: regJson.data.lawyerId,
        authToken: regJson.data.token,
        user: regJson.data.user,
      };
      login({ id: user.id, email: user.email, fullName: user.fullName, role: "LAWYER" }, authToken);

      const mapping: Record<string, string> = {
        practisingCertificate: "practising-certificate",
        barCertificate: "bar-certificate",
        idDocument: "id-document",
        cvResume: "cv-resume",
      };
      for (const [key, type] of Object.entries(mapping)) {
        const f = files[key];
        if (!f) continue;
        const fd = new FormData();
        fd.append("file", f);
        const up = await fetch(`${API_BASE_URL}/api/uploads/lawyer/${lawyerId}/document/${type}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${authToken}` },
          body: fd,
        });
        if (!up.ok) throw new Error(`Document upload failed (${key})`);
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (inviteError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">Invitation not valid</h1>
          <p className="text-gray-600 mb-5">{inviteError}</p>
          <Link href="/join-as-lawyer" className="text-[#d4a017] underline">Enquire to join instead</Link>
        </div>
      </div>
    );
  }

  if (!invite) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Validating invitation…</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">Application submitted</h1>
          <p className="text-gray-600 mb-5">
            Our team will review your documents. You can follow progress after signing in.
          </p>
          <button onClick={() => router.push("/Lawyer")} className="bg-[#d4a017] text-white rounded px-6 py-2">
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <form onSubmit={submit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-1">Accept your invitation</h1>
        <p className="text-gray-600 mb-6">
          Invited as <span className="font-medium">{invite.email}</span>
          {invite.name ? ` (${invite.name})` : ""}. This email is locked to your invitation.
        </p>
        {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input required placeholder="Full name *" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className="border rounded px-3 py-2" />
          <input disabled value={invite.email} className="border rounded px-3 py-2 bg-gray-100" />
          <input required type="password" placeholder="Password (min 8 chars) *" value={form.password} onChange={(e) => set("password", e.target.value)} className="border rounded px-3 py-2" />
          <input required type="password" placeholder="Confirm password *" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} className="border rounded px-3 py-2" />
          <input required placeholder="Firm *" value={form.firm} onChange={(e) => set("firm", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Location" value={form.location} onChange={(e) => set("location", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Year of call" value={form.barAdmissionYear} onChange={(e) => set("barAdmissionYear", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Years of experience" value={form.experience} onChange={(e) => set("experience", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Education" value={form.education} onChange={(e) => set("education", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Website" value={form.website} onChange={(e) => set("website", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Specializations (comma separated)" value={form.specializations} onChange={(e) => set("specializations", e.target.value)} className="border rounded px-3 py-2" />
          <input placeholder="Languages (comma separated)" value={form.languages} onChange={(e) => set("languages", e.target.value)} className="border rounded px-3 py-2" />
        </div>
        <textarea placeholder="Professional summary" value={form.professionalSummary} onChange={(e) => set("professionalSummary", e.target.value)} rows={3} className="w-full border rounded px-3 py-2 mb-4" />
        <p className="mb-2 font-medium text-sm">Practice areas *</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {["Corporate Law", "Criminal Law", "Family Law", "Real Estate Law", "Employment Law", "Immigration Law", "Tax Law", "Intellectual Property", "Environmental Law", "Human Rights", "Commercial Law", "Constitutional Law"].map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => setForm((p) => ({ ...p, practiceAreas: p.practiceAreas.includes(a) ? p.practiceAreas.filter((x) => x !== a) : [...p.practiceAreas, a] }))}
              className={`px-3 py-1 rounded-full text-sm border ${form.practiceAreas.includes(a) ? "bg-[#d4a017] text-white border-[#d4a017]" : "border-gray-300"}`}
            >
              {a}
            </button>
          ))}
        </div>
        <p className="mb-2 font-medium text-sm">Documents</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {[
            ["practisingCertificate", "Practising certificate *"],
            ["barCertificate", "Bar certificate"],
            ["idDocument", "ID document"],
            ["cvResume", "CV / resume"],
          ].map(([key, label]) => (
            <label key={key} className="border rounded px-3 py-2 text-sm cursor-pointer">
              {label}: {files[key]?.name || "choose file"}
              <input type="file" className="hidden" onChange={(e) => setFiles((p) => ({ ...p, [key]: e.target.files?.[0] || null }))} />
            </label>
          ))}
        </div>
        <button disabled={loading} className="w-full bg-[#d4a017] text-white rounded py-2 font-semibold disabled:opacity-50">
          {loading ? "Submitting…" : "Create account & submit for review"}
        </button>
      </form>
    </div>
  );
}
