"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ registrationNo: "", dateOfBirth: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/internship/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("student", JSON.stringify(data.student));
        if (data.enrollment) {
          localStorage.setItem("enrollment", JSON.stringify(data.enrollment));
        }
        router.push("/internship/dashboard");
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

      <div className="relative container mx-auto max-w-2xl px-4 py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-slate-600">
            Login to access your internship dashboard
          </p>
        </div>

        {/* Glassmorphism Form Container */}
        <div className="relative">
          {/* Blurred Gradient Blobs behind form */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-300/40 rounded-full blur-3xl" />
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="relative space-y-8">
          {/* Registration Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Registration Number<span className="text-red-600">*</span>
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

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Date of Birth<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-10 text-center">
          <Link href="/internship" className="text-blue-600 hover:text-blue-700 font-medium text-base">
            Don't have an account? Register here
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
