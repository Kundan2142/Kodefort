"use client";
export const dynamic = 'force-dynamic';
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

interface Internship {
  id: number;
  name: string;
}

function RegisterContent() {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("internshipId");
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedInternship, setSelectedInternship] = useState(internshipId || "");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    registrationNo: "",
    email: "",
    mobileNo: "",
    dateOfBirth: "",
    session: "",
  });

  useEffect(() => {
    const fetchInternships = async () => {
      const res = await fetch("/api/internship");
      const data = await res.json();
      setInternships(data);
    };
    fetchInternships();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/internship/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, internshipId: selectedInternship }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("student", JSON.stringify(data.student));
        localStorage.setItem("enrollment", JSON.stringify(data.enrollment));
        router.push(`/internship/dashboard?enrollmentId=${data.enrollment.id}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/50 via-amber-50/30 to-transparent" />
      
      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative container mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Let's get you started
          </h1>
          <p className="text-slate-600">
            Enter the details to get going
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">1</div>
            <span className="text-sm font-semibold text-slate-800">General Details</span>
          </div>
          <div className="w-24 h-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 text-slate-500 flex items-center justify-center text-sm font-semibold">2</div>
            <span className="text-sm font-medium text-slate-500">Event Details</span>
          </div>
          <div className="w-24 h-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 text-slate-500 flex items-center justify-center text-sm font-semibold">3</div>
            <span className="text-sm font-medium text-slate-500">Pricing and Submit</span>
          </div>
        </div>

        {/* Glassmorphism Form Container */}
        <div className="relative">
          {/* Blurred Gradient Blobs behind form */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-300/40 rounded-full blur-3xl" />
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                First Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter First Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Last Name (we'll just map to part of name for now) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your Last Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Gender<span className="text-red-600">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Date of Birth<span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 border border-red-500 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
              <p className="text-xs text-red-600 mt-1">Please enter date of birth</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* College Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                College Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your College Name"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
              />
            </div>

            {/* Registration No (Unique) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Registration No<span className="text-red-600">*</span>
                <span className="text-xs text-slate-500 ml-2">(Unique)</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your Registration Number"
                value={formData.registrationNo}
                onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email Address<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pin Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Pin Code<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your area's Pin Code"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Country<span className="text-red-600">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Select</option>
                <option value="india">India</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Session */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Session<span className="text-red-600">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={formData.session}
                onChange={(e) => setFormData({ ...formData, session: e.target.value })}
              >
                <option value="">Select Session</option>
                <option value="2023-2027">2023-2027</option>
                <option value="2024-2028">2024-2028</option>
              </select>
            </div>

            {/* Time Zone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Time Zone<span className="text-red-600">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="IST">IST - Indian Standard Time - GMT +5:30</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone Number (Mobile No) */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Phone Number (include country code)<span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="+91 XXXXX XXXXX"
                value={formData.mobileNo}
                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
              />
            </div>
          </div>

          {/* Internship Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Internship Program <span className="text-red-600">*</span>
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              value={selectedInternship}
              onChange={(e) => setSelectedInternship(e.target.value)}
            >
              <option value="">Select an internship</option>
              {internships.map((internship) => (
                <option key={internship.id} value={internship.id}>
                  {internship.name}
                </option>
              ))}
            </select>
          </div>

          {/* Next Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Next"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-10 text-center">
          <Link href="/internship/login" className="text-blue-600 hover:text-blue-700 font-medium text-base">
            Already have an account? Login
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-xl text-slate-700 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
