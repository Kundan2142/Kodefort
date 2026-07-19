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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
    fetch("/api/internship/seed").catch(() => {});
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">Loading internships...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full pt-28 pb-20 bg-gradient-to-b from-[#FCF8F2] via-[#F8F1E6] to-white">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-orange-100/25 blur-[160px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-orange-100 text-sm font-medium text-slate-700">
                ◉ Live Projects
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-orange-100 text-sm font-medium text-slate-700">
                ◉ Mentorship
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-orange-100 text-sm font-medium text-slate-700">
                ◉ Certificate
              </div>
            </div>

            {/* Paint Stroke / Highlighter Effect */}
            <div className="relative inline-block mb-6">
              <h1 className="relative text-6xl md:text-7xl font-semibold tracking-tighter text-slate-900">
                Internships
                {/* Highlighter stroke - covers ~60% of the word */}
                <span 
                  className="absolute bottom-2 left-1/4 right-0 h-[18px] -z-10 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, rgba(125,211,252,0.15), rgba(96,165,250,0.22))",
                  }}
                />
              </h1>
            </div>

            <p className="text-5xl md:text-6xl font-light text-slate-700 tracking-tight mb-10">
              that build<br />real engineers.
            </p>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
              Learn from industry experts. Build real products.<br />Get hired faster.
            </p>

            <Link href="#programs">
              <motion.button
                className="inline-flex items-center gap-3 bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Programs
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Programs Header */}
      <div className="bg-white pt-8 pb-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-slate-900 mb-3">Explore Programs</h2>
          <p className="text-xl text-slate-600">Choose the internship that matches your goals.</p>
        </div>
      </div>

      {/* Internship Cards */}
      <section id="programs" className="relative bg-white rounded-t-[64px] -mt-10 pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,23,42,.12)] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="relative h-56">
                  <img
                    src={internshipImages[internship.name] || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80"}
                    alt={internship.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white transition-colors">
                    <Bookmark className="w-5 h-5 text-slate-700" />
                  </button>

                  <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-2xl text-sm font-semibold text-slate-900 shadow">
                    ₹{internship.price || 499} <span className="text-xs font-normal text-slate-500">Lifetime</span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-[#D97706] transition-colors">
                    {internship.name}
                  </h3>
                  <p className="text-slate-600 line-clamp-3 mb-8">
                    {internship.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-4 py-1 rounded-full text-sm">
                      ★★★★☆ <span className="font-medium">{internship.rating}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-4 py-1 rounded-full text-sm">
                      {internship.difficulty}
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-4 py-1 rounded-full text-sm">
                      {internship.tasks?.length || 0} Lessons
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <Link href={`/internship/register?internshipId=${internship.id}`}>
                      <motion.button
                        className="w-full py-4 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Enroll Now
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <div className="bg-[#FCF8F2] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-semibold text-slate-900 mb-6 tracking-tight">
              Ready to build your future?
            </h2>
            <p className="text-2xl text-slate-600 mb-12 max-w-lg mx-auto">
              Apply now and start working on real-world projects with industry mentors.
            </p>
            <Link href="#programs">
              <motion.button
                className="inline-flex items-center gap-3 px-12 py-5 bg-slate-900 text-white rounded-2xl text-xl font-medium hover:bg-black transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Internship
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Login Link */}
      <div className="text-center py-20">
        <Link
          href="/internship/login"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-lg"
        >
          Already enrolled? Login here
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}