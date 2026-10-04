"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CertificatePDF from "./components/CertificatePDF";
import OfferLetterPDF from "./components/OfferLetterPDF";
import {
  Search,
  Download,
  Loader2,
  FileText,
  Award,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Building2,
  Hash,
  CalendarDays,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Briefcase,
  FileCheck2,
  Clock,
} from "lucide-react";

interface StudentData {
  studentName: string;
  collegeName: string;
  registrationNo: string;
  degree: string;
  session: string;
  subject: string;
  internshipTopic: string;
  email: string;
  mobileNo: string;
  address: string;
}

type DocTab = "offer" | "certificate";
type ApprovalStatus = "pending" | "approved" | "rejected";

interface ApprovalInfo {
  status: ApprovalStatus;
  remarks: string | null;
  approvedAt: string | null;
  approvedBy: number | null;
  internshipTopic: string | null;
  updatedAt: string | null;
}

interface DocAvailability {
  offerLetter: { available: boolean; requiresApproval: boolean };
  completionCertificate: {
    available: boolean;
    requiresApproval: boolean;
    status: ApprovalStatus;
  };
}

// ------------------------ Sub components ------------------------

function ApprovalBanner({
  status,
  remarks,
  approvedAt,
}: {
  status: ApprovalStatus;
  remarks: string | null;
  approvedAt: string | null;
}) {
  if (status === "approved") {
    return (
      <div className="flex items-start gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200/60 px-8 sm:px-10 py-4">
        <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] font-bold text-emerald-800 leading-snug">
            Completion certificate approved by Kodefort admin
            {approvedAt && (
              <span className="text-emerald-700/80 font-semibold ml-1.5">
                · on {new Date(approvedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
            )}
          </p>
          {remarks && (
            <p className="mt-1 text-[12.5px] text-emerald-700/80 leading-5">
              <span className="font-semibold">Note:</span> {remarks}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="flex items-start gap-3 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-200/60 px-8 sm:px-10 py-4">
        <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center">
          <XCircle className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] font-bold text-rose-800 leading-snug">
            Completion certificate request has been reviewed and rejected
          </p>
          {remarks ? (
            <p className="mt-1 text-[12.5px] text-rose-700/90 leading-5">
              <span className="font-semibold">Reason:</span> {remarks}
            </p>
          ) : (
            <p className="mt-1 text-[12.5px] text-rose-700/80 leading-5">
              No remarks provided. Please reach out to Kodefort support for further info.
            </p>
          )}
        </div>
      </div>
    );
  }

  // pending
  return (
    <div className="flex items-start gap-3 bg-gradient-to-r from-amber-50 via-amber-50/60 to-orange-50/60 border-b border-amber-200/60 px-8 sm:px-10 py-4">
      <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
        <Clock className="h-4 w-4 animate-pulse" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-bold text-amber-800 leading-snug">
          Completion certificate is under Kodefort admin review — Offer Letter is available immediately
        </p>
        <p className="mt-1 text-[12.5px] text-amber-700/80 leading-5">
          Allow up to 48 hours for review. Your certificate will unlock automatically once approved.
        </p>
      </div>
    </div>
  );
}

function LockedCertificateView({
  status,
  remarks,
  onSwitchToOffer,
  studentName,
}: {
  status: ApprovalStatus;
  remarks: string | null;
  onSwitchToOffer: () => void;
  studentName: string;
}) {
  const isPending = status === "pending";
  const isRejected = status === "rejected";

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        className="absolute -inset-2 rounded-2xl blur-2xl opacity-70"
        style={{
          background: isPending
            ? "linear-gradient(to bottom right, rgba(251,191,36,0.18), rgba(234,88,12,0.08))"
            : "linear-gradient(to bottom right, rgba(244,63,94,0.18), rgba(225,29,72,0.08))",
        }}
        aria-hidden="true"
      />
      <div
        className={
          "relative overflow-hidden rounded-2xl border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_50px_-18px_rgba(0,0,0,0.2)] " +
          (isPending ? "border-amber-200/70" : "border-rose-200/70")
        }
      >
        {/* Top lock bar */}
        <div
          className={
            "flex items-center gap-3 px-6 sm:px-8 py-5 border-b " +
            (isPending
              ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60"
              : "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200/60")
          }
        >
          <div
            className={
              "relative flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-xl shadow-md text-white " +
              (isPending
                ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/25"
                : "bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/25")
            }
          >
            {isPending ? (
              <Clock className="h-6 w-6 animate-pulse" strokeWidth={2.1} />
            ) : (
              <XCircle className="h-6 w-6" strokeWidth={2.1} />
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase " +
                  (isPending
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800")
                }
              >
                {isPending ? "Awaiting Approval" : "Request Rejected"}
              </span>
            </div>
            <h3
              className="text-[1.3rem] font-bold tracking-tight text-slate-900 leading-tight"
              style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
            >
              {isPending
                ? "Completion Certificate is Locked"
                : "Completion Certificate Unavailable"}
            </h3>
            <p className="mt-0.5 text-[13.5px] text-slate-600">
              {isPending
                ? "Kodefort admin will verify your internship completion before this certificate becomes downloadable."
                : "This request was not approved. Contact Kodefort admin if you believe this is an error."}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-7">
          <div
            className={
              "rounded-2xl border-2 border-dashed p-6 sm:p-7 mb-6 " +
              (isPending
                ? "border-amber-200 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40"
                : "border-rose-200 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/40")
            }
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div
                className={
                  "flex-shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center ring-8 " +
                  (isPending
                    ? "bg-white text-amber-500 ring-amber-100 shadow-sm"
                    : "bg-white text-rose-500 ring-rose-100 shadow-sm")
                }
              >
                {isPending ? (
                  <Clock className="h-8 w-8" strokeWidth={1.9} />
                ) : (
                  <XCircle className="h-8 w-8" strokeWidth={1.9} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={
                    "text-[1.05rem] font-bold leading-snug mb-1 " +
                    (isPending ? "text-amber-900" : "text-rose-900")
                  }
                  style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
                >
                  {isPending
                    ? "Admin review in progress"
                    : "Request needs admin attention"}
                </h4>
                <p className="text-[13.5px] leading-6 text-slate-700">
                  {isPending ? (
                    <>
                      Hi <span className="font-semibold">{studentName}</span>, Kodefort
                      is currently verifying your task submissions, attendance, and
                      overall internship completion. Expect an update within{" "}
                      <span className="font-semibold">24–48 hours</span>.
                    </>
                  ) : (
                    <>
                      Your completion certificate request has been reviewed by
                      Kodefort admin and requires additional steps. Contact{" "}
                      <a
                        href="mailto:support@kodefort.com"
                        className="font-semibold underline underline-offset-4 text-rose-700 hover:text-rose-800"
                      >
                        support@kodefort.com
                      </a>{" "}
                      for resolution.
                    </>
                  )}
                </p>
                {remarks && (
                  <div
                    className={
                      "mt-3 rounded-xl px-3.5 py-2.5 text-[13px] leading-5 " +
                      (isPending
                        ? "bg-white border border-amber-200 text-amber-800"
                        : "bg-white border border-rose-200 text-rose-800")
                    }
                  >
                    <span className="font-bold mr-1.5">
                      {isPending ? "Admin note:" : "Reason:"}
                    </span>
                    {remarks}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checklist */}
          <ul className="space-y-2.5 text-[13.5px] mb-7">
            <li className="flex items-start gap-2.5">
              <CheckCircle2
                className={
                  "h-4 w-4 mt-0.5 flex-shrink-0 " +
                  (isPending ? "text-amber-500" : "text-rose-500")
                }
                strokeWidth={2.3}
              />
              <span className="text-slate-700">
                Offer Letter — <span className="font-semibold text-emerald-700">available for download</span> now
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock
                className={
                  "h-4 w-4 mt-0.5 flex-shrink-0 " +
                  (isPending ? "text-amber-500" : "text-rose-500")
                }
                strokeWidth={2.3}
              />
              <span className="text-slate-700">
                Completion Certificate —{" "}
                <span
                  className={
                    "font-semibold " +
                    (isPending ? "text-amber-700" : "text-rose-700")
                  }
                >
                  {isPending ? "locked until admin approval" : "denied"}
                </span>
              </span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
            <button
              type="button"
              onClick={onSwitchToOffer}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Briefcase className="h-4 w-4" />
              Download Offer Letter Instead
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------ Page component ------------------------

export default function CertificatesPage() {
  const [registrationNo, setRegistrationNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<StudentData | null>(null);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<DocTab>("offer");
  const [approval, setApproval] = useState<ApprovalInfo | null>(null);
  const [docs, setDocs] = useState<DocAvailability | null>(null);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationNo.trim()) {
      setError("Please enter your registration number");
      return;
    }

    setLoading(true);
    setError(null);
    setStudent(null);
    setApproval(null);
    setDocs(null);
    setSearched(true);

    try {
      const response = await fetch("/api/certificates/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNo: registrationNo.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStudent(data.student);
        setApproval(data.approval || null);
        setDocs(data.documents || null);
        // Switch to offer letter by default; but preserve if user was exploring
      } else {
        setError(data.error || "Certificate not found");
        setStudent(null);
        setApproval(null);
        setDocs(null);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setStudent(null);
      setApproval(null);
      setDocs(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRegistrationNo("");
    setStudent(null);
    setApproval(null);
    setDocs(null);
    setError(null);
    setSearched(false);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-200/30 via-sky-200/20 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 -left-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-amber-100/40 via-orange-100/20 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cg fill='%2394a3b8' fill-opacity='0.06'%3E%3Cpath d='M0 0h1v1H0zM16 16h1v1h-1z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-28">
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur mb-8">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Offer Letters &amp; Completion Certificates
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-slate-400">Kodefort</span>
          </div>

          <div className="relative mb-8">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/10 via-sky-500/10 to-emerald-500/10 blur-xl" />
            <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-12px_rgba(99,102,241,0.25)] ring-1 ring-slate-200/70">
              <FileCheck2 className="h-10 w-10 text-slate-900" strokeWidth={1.75} />
            </div>
          </div>

          <h1
            className="font-bold tracking-tight text-slate-900 text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] max-w-[18ch]"
            style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
          >
            Download your
            <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}documents
            </span>
          </h1>

          <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-8 text-slate-600">
            Enter your registration number to instantly verify your enrollment and download both your
            official Kodefort Internship Offer Letter and Completion Certificate — signed, sealed, and
            ready for print.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-3xl">
          <div
            className="absolute -inset-2 rounded-[28px] bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10 blur-2xl opacity-70"
            aria-hidden="true"
          />
          <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_60px_-20px_rgba(15,23,42,0.12)] backdrop-blur p-6 sm:p-10">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col gap-2 mb-6">
                <label
                  htmlFor="registrationNo"
                  className="text-[13px] font-semibold text-slate-700 tracking-tight"
                >
                  Registration Number
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-indigo-500">
                    <Hash className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <input
                    type="text"
                    id="registrationNo"
                    autoComplete="off"
                    spellCheck={false}
                    value={registrationNo}
                    onChange={(e) => {
                      setRegistrationNo(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="e.g. 2455508990"
                    className="w-full h-[60px] rounded-xl border border-slate-200 bg-white pl-12 pr-28 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 placeholder:font-normal focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:-translate-y-px hover:shadow-md active:translate-y-0 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Looking up
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4" strokeWidth={2} />
                          Verify
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                  Your data stays private — verified server-side
                </div>
                {searched && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Clear & reset
                    <ArrowRight className="h-3 w-3 -rotate-45" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {error && (
          <div className="mx-auto mt-10 w-full max-w-3xl">
            <div className="rounded-2xl border border-rose-200/60 bg-rose-50/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-500 shadow-sm">
                  <XCircle className="h-5.5 w-5.5" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[1.35rem] font-bold tracking-tight text-slate-900 mb-2"
                    style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
                  >
                    No certificate found
                  </h3>
                  <p className="text-[15px] leading-7 text-slate-600">{error}</p>

                  <div className="mt-6 rounded-xl border border-slate-200/70 bg-white p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-amber-500" strokeWidth={2} />
                      <p className="text-[13px] font-semibold text-slate-700 tracking-tight">
                        Quick checks to resolve this
                      </p>
                    </div>
                    <ul className="space-y-2.5 text-[13.5px] text-slate-600 leading-6">
                      <li className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-indigo-400" />
                        Double-check the registration number — one wrong digit causes a mismatch.
                      </li>
                      <li className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-indigo-400" />
                        Use the exact reg. number from the enrollment form, no extra spaces.
                      </li>
                      <li className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-indigo-400" />
                        If you recently submitted, allow up to 48 hours for certificate processing.
                      </li>
                      <li className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-indigo-400" />
                        Still stuck? Email support at{" "}
                        <a
                          href="mailto:support@kodefort.com"
                          className="font-semibold text-indigo-600 underline-offset-4 hover:underline"
                        >
                          support@kodefort.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {student && (
          <div className="mx-auto mt-12 w-full max-w-4xl">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-emerald-400/10 via-sky-400/10 to-indigo-400/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_40px_80px_-24px_rgba(15,23,42,0.16)]">
                <ApprovalBanner
                  status={(approval?.status || "pending") as ApprovalStatus}
                  remarks={approval?.remarks ?? null}
                  approvedAt={approval?.approvedAt ?? null}
                />
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 px-8 sm:px-10 py-8 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-2 rounded-2xl bg-emerald-400/20 blur-lg" />
                      <div className="relative h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 text-white">
                        <CheckCircle2 className="h-7 w-7" strokeWidth={2.25} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 tracking-wide uppercase">
                          Enrollment Verified
                        </span>
                        {(approval?.status === "approved") && (
                          <span className="inline-flex items-center rounded-full bg-[#12294D]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#12294D] tracking-wide uppercase">
                            Certificate Approved
                          </span>
                        )}
                        {approval?.status === "pending" && (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 tracking-wide uppercase">
                            Certificate Pending
                          </span>
                        )}
                        {approval?.status === "rejected" && (
                          <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 tracking-wide uppercase">
                            Certificate Rejected
                          </span>
                        )}
                        <span className="text-[12px] text-slate-400 font-medium">
                          Issued {getCurrentDate()}
                        </span>
                      </div>
                      <h2
                        className="text-[1.75rem] font-bold tracking-tight text-slate-900 leading-tight"
                        style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
                      >
                        {approval?.status === "approved"
                          ? "Both documents ready for download"
                          : "Offer letter ready · certificate under admin review"}
                      </h2>
                      <p className="mt-1 text-[14.5px] text-slate-600">
                        {approval?.status === "approved"
                          ? "All record checks passed and admin has approved your completion certificate. Download your signed PDFs below."
                          : "Your enrollment has been verified. Your Offer Letter is available now. The Completion Certificate will unlock after Kodefort admin review."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-8 sm:px-10 py-9">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group relative rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/60 p-5 transition-all duration-300 hover:border-indigo-200 hover:shadow-[0_8px_24px_-12px_rgba(99,102,241,0.25)]">
                      <div className="flex items-center gap-3 mb-3.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:scale-110">
                          <GraduationCap className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                          Student
                        </span>
                      </div>
                      <p className="text-[15.5px] font-semibold text-slate-900 tracking-tight leading-snug">
                        {student.studentName}
                      </p>
                    </div>

                    <div className="group relative rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/60 p-5 transition-all duration-300 hover:border-sky-200 hover:shadow-[0_8px_24px_-12px_rgba(14,165,233,0.25)]">
                      <div className="flex items-center gap-3 mb-3.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 transition-transform duration-300 group-hover:scale-110">
                          <Building2 className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                          College / University
                        </span>
                      </div>
                      <p className="text-[15.5px] font-semibold text-slate-900 tracking-tight leading-snug">
                        {student.collegeName}
                      </p>
                    </div>

                    <div className="group relative rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/60 p-5 transition-all duration-300 hover:border-violet-200 hover:shadow-[0_8px_24px_-12px_rgba(139,92,246,0.25)]">
                      <div className="flex items-center gap-3 mb-3.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition-transform duration-300 group-hover:scale-110">
                          <Hash className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                          Registration No.
                        </span>
                      </div>
                      <p className="font-mono text-[16px] font-semibold text-slate-900 tracking-wide">
                        {student.registrationNo}
                      </p>
                    </div>

                    <div className="group relative rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/60 p-5 transition-all duration-300 hover:border-emerald-200 hover:shadow-[0_8px_24px_-12px_rgba(16,185,129,0.25)]">
                      <div className="flex items-center gap-3 mb-3.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                          <BookOpen className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                          Internship Topic
                        </span>
                      </div>
                      <p className="text-[15.5px] font-semibold text-slate-900 tracking-tight leading-snug">
                        {student.internshipTopic}
                      </p>
                    </div>

                    <div className="group relative rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/60 p-5 transition-all duration-300 hover:border-amber-200 hover:shadow-[0_8px_24px_-12px_rgba(245,158,11,0.25)]">
                      <div className="flex items-center gap-3 mb-3.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                          <FileText className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                          Degree
                        </span>
                      </div>
                      <p className="text-[15.5px] font-semibold text-slate-900 tracking-tight leading-snug">
                        {student.degree}
                        {student.subject && student.subject !== "N/A" ? (
                          <span className="text-slate-500 font-medium"> • {student.subject}</span>
                        ) : null}
                      </p>
                    </div>

                    <div className="group relative rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/60 p-5 transition-all duration-300 hover:border-rose-200 hover:shadow-[0_8px_24px_-12px_rgba(244,63,94,0.25)]">
                      <div className="flex items-center gap-3 mb-3.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-transform duration-300 group-hover:scale-110">
                          <CalendarDays className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                          Academic Session
                        </span>
                      </div>
                      <p className="text-[15.5px] font-semibold text-slate-900 tracking-tight leading-snug">
                        {student.session}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <div className="flex flex-col items-center text-center mb-7">
                      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-600 mb-5">
                        <FileCheck2 className="h-3.5 w-3.5" strokeWidth={2} />
                        Two documents available · High-quality PDF · Print-ready
                      </div>

                      <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setActiveTab("offer")}
                          className={
                            "inline-flex items-center gap-2 rounded-lg px-4 sm:px-5 h-11 text-sm font-semibold transition-all duration-200 " +
                            (activeTab === "offer"
                              ? "bg-gradient-to-br from-[#12294D] to-[#2A5AA6] text-white shadow-md"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50")
                          }
                        >
                          <Briefcase className="h-4 w-4" strokeWidth={2} />
                          Offer Letter
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab("certificate")}
                          className={
                            "inline-flex items-center gap-2 rounded-lg px-4 sm:px-5 h-11 text-sm font-semibold transition-all duration-200 " +
                            (activeTab === "certificate"
                              ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50")
                          }
                        >
                          <Award className="h-4 w-4" strokeWidth={2} />
                          Completion Certificate
                        </button>
                      </div>
                    </div>

                    {activeTab === "offer" && (
                      <div className="relative mx-auto w-full max-w-3xl">
                        <div
                          className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#12294D]/10 via-[#2A5AA6]/10 to-indigo-500/10 blur-2xl opacity-70"
                          aria-hidden="true"
                        />
                        <div className="relative overflow-hidden rounded-2xl border border-[#12294D]/15 bg-gradient-to-br from-white via-white to-[#F8FAFC] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_50px_-18px_rgba(18,41,77,0.22)]">
                          <div className="flex items-center gap-4 px-6 sm:px-8 py-5 border-b border-slate-100">
                            <div className="relative flex-shrink-0">
                              <div className="absolute -inset-2 rounded-xl bg-[#2A5AA6]/20 blur-lg" />
                              <div className="relative h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#12294D] to-[#2A5AA6] shadow-lg shadow-[#12294D]/20 text-white">
                                <Briefcase className="h-6 w-6" strokeWidth={2} />
                              </div>
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center rounded-full bg-[#12294D]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#12294D] tracking-wide uppercase">
                                  Official Document
                                </span>
                                <span className="text-[12px] text-slate-400 font-medium">
                                  Issued {getCurrentDate()}
                                </span>
                              </div>
                              <h3
                                className="text-[1.3rem] font-bold tracking-tight text-slate-900 leading-tight"
                                style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
                              >
                                Internship Offer Letter
                              </h3>
                              <p className="mt-0.5 text-[13.5px] text-slate-600">
                                Formal offer of internship at Kodefort — reference-numbered, signed, and addressed to you.
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-6 sm:px-8 py-5 bg-white/50 border-b border-slate-100">
                            <div className="rounded-lg border border-slate-200/70 bg-white p-3.5">
                              <div className="flex items-center gap-2 mb-1.5">
                                <Hash className="h-3.5 w-3.5 text-[#2A5AA6]" strokeWidth={2} />
                                <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                                  Ref. No.
                                </span>
                              </div>
                              <p className="font-mono text-[12.5px] font-semibold text-slate-900">
                                KDF/INT/202607/XXXXX
                              </p>
                            </div>
                            <div className="rounded-lg border border-slate-200/70 bg-white p-3.5">
                              <div className="flex items-center gap-2 mb-1.5">
                                <BookOpen className="h-3.5 w-3.5 text-[#2A5AA6]" strokeWidth={2} />
                                <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                                  Topic
                                </span>
                              </div>
                              <p className="text-[12.5px] font-semibold text-slate-900 truncate">
                                {student.internshipTopic}
                              </p>
                            </div>
                            <div className="rounded-lg border border-slate-200/70 bg-white p-3.5">
                              <div className="flex items-center gap-2 mb-1.5">
                                <CalendarDays className="h-3.5 w-3.5 text-[#2A5AA6]" strokeWidth={2} />
                                <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                                  Period
                                </span>
                              </div>
                              <p className="text-[12.5px] font-semibold text-slate-900">
                                20 Jul – 10 Aug 2026
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-6 sm:px-8 py-6">
                            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 sm:mr-3">
                              <FileText className="h-3.5 w-3.5" strokeWidth={2} />
                              A4 Portrait · {student.studentName}
                            </div>
                            <PDFDownloadLink
                              document={
                                <OfferLetterPDF
                                  studentName={student.studentName}
                                  collegeName={student.collegeName}
                                  registrationNo={student.registrationNo}
                                  degree={student.degree}
                                  session={student.session}
                                  subject={student.subject}
                                  internshipTopic={student.internshipTopic}
                                  email={student.email}
                                  mobileNo={student.mobileNo}
                                  address={student.address}
                                  issueDate={getCurrentDate()}
                                />
                              }
                              fileName={`Kodefort_Offer_Letter_${student.registrationNo}.pdf`}
                              className="group relative inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-[#12294D] to-[#2A5AA6] px-8 text-base font-bold text-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-12px_rgba(18,41,77,0.55)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_28px_50px_-12px_rgba(18,41,77,0.65)] active:translate-y-0"
                            >
                              {({ loading: pdfLoading }) =>
                                pdfLoading ? (
                                  <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Generating offer letter…
                                  </>
                                ) : (
                                  <>
                                    <Download
                                      className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                      strokeWidth={2}
                                    />
                                    Download Offer Letter PDF
                                  </>
                                )
                              }
                            </PDFDownloadLink>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "certificate" && (
                      (approval?.status === "approved" &&
                        docs?.completionCertificate.available) ? (
                        // =============== APPROVED: Normal download UI ===============
                        <div className="relative mx-auto w-full max-w-3xl">
                          <div
                            className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-emerald-400/10 via-sky-400/10 to-indigo-400/10 blur-2xl opacity-70"
                            aria-hidden="true"
                          />
                          <div className="relative overflow-hidden rounded-2xl border border-emerald-200/40 bg-gradient-to-br from-white via-white to-emerald-50/40 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_50px_-18px_rgba(16,185,129,0.22)]">
                            <div className="flex items-center gap-4 px-6 sm:px-8 py-5 border-b border-slate-100">
                              <div className="relative flex-shrink-0">
                                <div className="absolute -inset-2 rounded-xl bg-emerald-400/20 blur-lg" />
                                <div className="relative h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 text-white">
                                  <Award className="h-6 w-6" strokeWidth={2} />
                                </div>
                              </div>
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 tracking-wide uppercase">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Approved
                                  </span>
                                  <span className="text-[12px] text-slate-400 font-medium">
                                    Issued {getCurrentDate()}
                                  </span>
                                </div>
                                <h3
                                  className="text-[1.3rem] font-bold tracking-tight text-slate-900 leading-tight"
                                  style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
                                >
                                  Internship Completion Certificate
                                </h3>
                                <p className="mt-0.5 text-[13.5px] text-slate-600">
                                  Recognition of successful internship completion — framed, landscape A4, with certificate ID.
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-6 sm:px-8 py-5 bg-white/50 border-b border-slate-100">
                              <div className="rounded-lg border border-slate-200/70 bg-white p-3.5">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Hash className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2} />
                                  <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                                    Cert ID
                                  </span>
                                </div>
                                <p className="font-mono text-[12.5px] font-semibold text-slate-900">
                                  KDF-{String(student.registrationNo).padStart(8, "0")}
                                </p>
                              </div>
                              <div className="rounded-lg border border-slate-200/70 bg-white p-3.5">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <GraduationCap className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2} />
                                  <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                                    Discipline
                                  </span>
                                </div>
                                <p className="text-[12.5px] font-semibold text-slate-900 truncate">
                                  {student.internshipTopic}
                                </p>
                              </div>
                              <div className="rounded-lg border border-slate-200/70 bg-white p-3.5">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Building2 className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2} />
                                  <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                                    Verified
                                  </span>
                                </div>
                                <p className="text-[12.5px] font-semibold text-slate-900 truncate">
                                  {student.collegeName}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-6 sm:px-8 py-6">
                              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 sm:mr-3">
                                <FileText className="h-3.5 w-3.5" strokeWidth={2} />
                                A4 Landscape · High resolution
                              </div>
                              <PDFDownloadLink
                                document={
                                  <CertificatePDF
                                    studentName={student.studentName}
                                    collegeName={student.collegeName}
                                    registrationNo={student.registrationNo}
                                    internshipTopic={student.internshipTopic}
                                    degree={student.degree}
                                    session={student.session}
                                    issueDate={getCurrentDate()}
                                  />
                                }
                                fileName={`Kodefort_Certificate_${student.registrationNo}.pdf`}
                                className="group relative inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 px-8 text-base font-bold text-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-12px_rgba(16,185,129,0.55)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_28px_50px_-12px_rgba(16,185,129,0.65)] active:translate-y-0"
                              >
                                {({ loading: pdfLoading }) =>
                                  pdfLoading ? (
                                    <>
                                      <Loader2 className="h-5 w-5 animate-spin" />
                                      Generating certificate…
                                    </>
                                  ) : (
                                    <>
                                      <Download
                                        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        strokeWidth={2}
                                      />
                                      Download Certificate PDF
                                    </>
                                  )
                                }
                              </PDFDownloadLink>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // =============== LOCKED: pending or rejected ===============
                        <LockedCertificateView
                          status={(approval?.status || "pending") as ApprovalStatus}
                          remarks={approval?.remarks ?? null}
                          onSwitchToOffer={() => setActiveTab("offer")}
                          studentName={student.studentName}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!searched && !student && !error && (
          <div className="mx-auto mt-20 w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="relative group rounded-2xl border border-slate-200/70 bg-white p-7 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)] hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-5 transition-transform duration-300 group-hover:scale-110">
                  <Hash className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[12px] font-bold text-white">
                    01
                  </span>
                  <h3 className="text-[1.15rem] font-bold tracking-tight text-slate-900">
                    Enter Registration No.
                  </h3>
                </div>
                <p className="text-[14px] leading-6 text-slate-600 mt-2">
                  Type the official registration number you used while filling the Kodefort internship enrollment form.
                </p>
              </div>

              <div className="relative group rounded-2xl border border-slate-200/70 bg-white p-7 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)] hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5 transition-transform duration-300 group-hover:scale-110">
                  <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[12px] font-bold text-white">
                    02
                  </span>
                  <h3 className="text-[1.15rem] font-bold tracking-tight text-slate-900">
                    Instant Verification
                  </h3>
                </div>
                <p className="text-[14px] leading-6 text-slate-600 mt-2">
                  Our server cross-references your number against the official Kodefort responses database — in under a second.
                </p>
              </div>

              <div className="relative group rounded-2xl border border-slate-200/70 bg-white p-7 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)] hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-5 transition-transform duration-300 group-hover:scale-110">
                  <Download className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[12px] font-bold text-white">
                    03
                  </span>
                  <h3 className="text-[1.15rem] font-bold tracking-tight text-slate-900">
                    Download Both Documents
                  </h3>
                </div>
                <p className="text-[14px] leading-6 text-slate-600 mt-2">
                  Receive your official Internship Offer Letter and Completion Certificate as
                  separate, signed, high-resolution PDFs — ready to submit, print, or frame.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 pt-8 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[13px] text-slate-500">
              © {new Date().getFullYear()} Kodefort. All certificates are digitally verified.
            </p>
            <div className="flex items-center gap-5 text-[13px]">
              <a
                href="mailto:support@kodefort.com"
                className="font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                support@kodefort.com
              </a>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-300" />
              <a
                href="/contact"
                className="font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Contact page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
