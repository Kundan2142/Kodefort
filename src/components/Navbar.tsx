"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "About", href: "/#about" },
    { name: "Technologies", href: "/#technologies" },
    { name: "Team", href: "/#team" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* ================= Top Status Bar ================= */}
      <div className="relative overflow-hidden w-full border-b border-sky-200/70 bg-gradient-to-r from-[#d9f4ff] via-[#eaf8ff] to-[#d5f3ff] text-sm backdrop-blur-2xl">
        {/* Subtle glow mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-20 top-0 h-24 w-72 rounded-full bg-sky-400/20 blur-3xl"></div>
          <div className="absolute right-0 top-0 h-20 w-60 rounded-full bg-cyan-400/15 blur-3xl"></div>
        </div>

        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-sky-200 to-transparent"></div>

        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-1.5">
          {/* Left: Status */}
          <div className="flex items-center gap-3 font-medium text-sky-700">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <div className="flex flex-col text-xs leading-tight">
              <span>Protected</span>
              <span className="text-emerald-600 font-semibold">99.99% Uptime</span>
            </div>
            <div className="hidden sm:block text-[10px] uppercase tracking-widest text-sky-600/80 font-medium border-l border-sky-200 pl-3">
              SOC 2 READY
            </div>
          </div>

          {/* Right: Links + Button */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/status"
              className="text-slate-600 hover:text-sky-600 transition-colors"
            >
              System Status
            </Link>

            <a
              href="mailto:security@kodefort.com"
              className="rounded-full bg-white border border-sky-200 text-sky-700 px-4 py-1.5 font-medium hover:bg-sky-50 transition-all active:scale-95"
            >
              Report Incident
            </a>
          </div>
        </div>
      </div>

      {/* ================= Main Navbar ================= */}
      <nav className="bg-white/70 backdrop-blur-2xl border-b border-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <div className="max-w-[1400px] mx-auto h-20 flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Kodefort"
              width={40}
              height={40}
            />
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Kodefort
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-all px-4 py-2 rounded-full ${
                  pathname === link.href
                    ? "bg-sky-50 text-sky-700 border border-sky-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Internship CTA */}
            <Link
              href="/internship"
              className="rounded-full bg-neutral-900 text-white px-6 py-2.5 font-semibold hover:bg-black hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              🚀 Internship
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* ================= Mobile Menu ================= */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/internship"
                onClick={() => setIsOpen(false)}
                className="mt-4 block w-full text-center rounded-full bg-neutral-900 py-4 text-white font-semibold hover:bg-black transition"
              >
                🚀 Join Internship
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}