"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface Internship {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    const fetchInternships = async () => {
      const res = await fetch("/api/internship");
      const data = await res.json();
      setInternships(data);
    };
    fetchInternships();
    // Seed data on first load
    fetch("/api/internship/seed");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Kickstart Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Tech Career
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join our industry-aligned internship programs and gain hands-on experience with real-world projects
          </p>
        </div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="group bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Card Top Gradient */}
              <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500" />
              
              {/* Card Content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {internship.name}
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {internship.description}
                </p>

                {/* Features List */}
                <div className="mb-8 space-y-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">Hands-on Projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">Mentorship Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">Certificate of Completion</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Program Fee</p>
                    <p className="text-3xl font-bold text-emerald-600">₹{internship.price}</p>
                  </div>
                </div>

                <Link
                  href={`/internship/register?internshipId=${internship.id}`}
                  className="group/btn flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
                >
                  Enroll Now
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Login Link */}
        <div className="mt-16 text-center">
          <Link href="/internship/login" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline">
            Already enrolled? Login here
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
