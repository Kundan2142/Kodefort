"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CertificatePDF from "./components/CertificatePDF";
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

export default function CertificatesPage() {
  const [registrationNo, setRegistrationNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<StudentData | null>(null);
  const [searched, setSearched] = useState(false);

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
      } else {
        setError(data.error || "Certificate not found");
        setStudent(null);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRegistrationNo("");
    setStudent(null);
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
            Internship Completion Certificates
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-slate-400">Kodefort</span>
          </div>

          <div className="relative mb-8">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/10 via-sky-500/10 to-emerald-500/10 blur-xl" />
            <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-12px_rgba(99,102,241,0.25)] ring-1 ring-slate-200/70">
              <Award className="h-10 w-10 text-slate-900" strokeWidth={1.75} />
            </div>
          </div>

          <h1
            className="font-bold tracking-tight text-slate-900 text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] max-w-[18ch]"
            style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
          >
            Download your
            <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}certificate
            </span>
          </h1>

          <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-8 text-slate-600">
            Enter your registration number to instantly verify your enrollment and download your official Kodefort
            Internship Completion Certificate — signed, sealed, and ready for print.
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
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 px-8 sm:px-10 py-8 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-2 rounded-2xl bg-emerald-400/20 blur-lg" />
                      <div className="relative h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 text-white">
                        <CheckCircle2 className="h-7 w-7" strokeWidth={2.25} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 tracking-wide uppercase">
                          Verified
                        </span>
                        <span className="text-[12px] text-slate-400 font-medium">
                          Issued {getCurrentDate()}
                        </span>
                      </div>
                      <h2
                        className="text-[1.75rem] font-bold tracking-tight text-slate-900 leading-tight"
                        style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
                      >
                        Certificate ready for download
                      </h2>
                      <p className="mt-1 text-[14.5px] text-slate-600">
                        All record checks passed — your details match our official database.
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
                    <div className="flex flex-col items-center text-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-600 mb-5">
                        <FileText className="h-3.5 w-3.5" strokeWidth={2} />
                        High-quality PDF • A4 Landscape • Print-ready
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
                        className="group relative inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-8 text-base font-bold text-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-12px_rgba(15,23,42,0.5)] transition-all duration-250 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_28px_50px_-12px_rgba(15,23,42,0.6)] active:translate-y-0"
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
                    Download & Print
                  </h3>
                </div>
                <p className="text-[14px] leading-6 text-slate-600 mt-2">
                  Receive a signed, sealed, high-resolution PDF certificate — A4 landscape, ready to submit or frame.
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
