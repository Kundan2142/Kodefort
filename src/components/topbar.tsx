"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full border-b border-sky-200/60 bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 text-slate-700 text-sm backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2.5">
        {/* Left: Status */}
        <span className="font-medium text-sky-700">
          🛡️ Protected • Uptime 99.99%
        </span>

        {/* Right: Quick Links + Button */}
        <div className="flex items-center gap-6">
          <Link
            href="/security"
            className="text-slate-600 hover:text-sky-600 transition-colors"
          >
            Security
          </Link>
          <Link
            href="/recent-attacks"
            className="text-slate-600 hover:text-sky-600 transition-colors"
          >
            Recent Attacks
          </Link>
          <Link
            href="/status"
            className="text-slate-600 hover:text-sky-600 transition-colors"
          >
            System Status
          </Link>

          <a
            href="mailto:kundan@kodefort.com"
            className="rounded-full bg-sky-600 px-4 py-1.5 text-white font-medium shadow-sm hover:bg-sky-700 transition"
          >
            Report Incident
          </a>
        </div>
      </div>
    </div>
  );
}