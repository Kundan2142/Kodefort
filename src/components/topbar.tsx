"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
        {/* Left: status */}
        <span className="text-green-400 font-medium">🛡️ Protected • Uptime 99.99%</span>

        {/* Right: quick links */}
        <div className="flex gap-4">
          <Link href="/security" className="hover:underline">Security</Link>
          <Link href="/recent-attacks" className="hover:underline">Recent Attacks</Link>
          <Link href="/status" className="hover:underline">System Status</Link>
          <a
            href="mailto:kundan@kodefort.com"
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 font-medium"
          >
            Report Incident
          </a>
        </div>
      </div>
    </div>
  );
}
