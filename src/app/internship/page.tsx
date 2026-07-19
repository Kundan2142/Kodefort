"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

interface Internship {
  id: number;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  icon: string;
  rating: number;
  tasks?: { id: number }[];
}

// Sample images for each internship
const internshipImages: Record<string, string> = {
  "Web Development": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "Cyber Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "AI Basics": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "Digital Marketing": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
  "Python Programming": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
  "Cloud Computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "DevOps": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
  "Software Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  "Database Management": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
};

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch("/api/internship");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setInternships(data);
        } else {
          setError(data.error || "Failed to load internships");
        }
      } catch (err) {
        setError("Failed to load internships");
      }
    };
    fetchInternships();
    // Seed data on first load
    fetch("/api/internship/seed");
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8F5F0] overflow-hidden">
      <div className="relative container mx-auto max-w-7xl px-4 py-16">
        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h2>
            <p className="text-slate-600">{error}</p>
          </div>
        )}
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-100 shadow-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl">🚀</span>
            <span className="text-sm font-medium text-orange-700">Industry Certified Programs</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            Kickstart Your <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              Tech Career
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Learn from industry experts, build real-world projects, earn certificates, and launch your dream career.
          </p>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-8 px-8 py-4 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">Trusted by 10,000+ learners</span>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <span key={i} className="text-yellow-500 text-xl">⭐</span>
              ))}
              <span className="ml-2 font-semibold text-slate-700">4.9/5</span>
            </div>
          </div>
        </motion.div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.id}
              className="group relative bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={internshipImages[internship.name] || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80"}
                  alt={internship.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Bookmark Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                {/* Price Tag */}
                <div className="absolute top-4 right-16 bg-white px-4 py-2 rounded-xl shadow-lg font-bold text-slate-800 flex items-center gap-1">
                  <span className="text-sm">₹</span>
                  {internship.price}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Title */}
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {internship.name}
                </h2>

                {/* Description */}
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                  {internship.description}
                </p>

                {/* Rating + Difficulty + Lessons */}
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-red-500">★</span>
                    <span className="font-semibold">{internship.rating}</span>
                  </div>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="font-medium">{internship.difficulty}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="font-medium">{internship.tasks?.length || 0} Lessons</span>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 mb-4" />

                {/* Instructor Info + Enroll Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      K
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Kodefort Team</p>
                      <p className="text-xs text-slate-500">(5+ Year Exp)</p>
                    </div>
                  </div>

                  <Link href={`/internship/register?internshipId=${internship.id}`}>
                    <motion.button
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Enroll Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 md:p-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]" />
          
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Ready to Start Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students building real-world skills.
            </p>
            <Link href="#top">
              <motion.button
                className="relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-slate-900 font-bold text-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-white" />
                <span className="relative z-10">Explore All Programs</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Login Link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/internship/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline"
          >
            Already enrolled? Login here
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
