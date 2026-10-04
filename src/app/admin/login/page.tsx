"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { parseAuth, saveAuth } from "@/lib/adminAuthClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const a = parseAuth();
    if (a) router.replace("/admin/certificates");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPass,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        saveAuth({ token: data.token, admin: data.admin });
        setLoginPass("");
        router.replace("/admin/certificates");
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("Network error");
    } finally {
      setLoginLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,rgba(18,41,77,0.15),rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-md px-5 sm:px-8 pt-28 pb-20">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <div className="absolute -inset-3 rounded-full bg-[#12294D]/10 blur-xl" />
            <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
              <ShieldCheck
                className="h-8 w-8 text-[#12294D]"
                strokeWidth={1.8}
              />
            </div>
          </div>
          <h1
            className="font-bold tracking-tight text-slate-900 text-3xl leading-tight"
            style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
          >
            Admin Control Panel
          </h1>
          <p className="mt-3 text-[15px] text-slate-600 leading-6">
            Sign in to review and approve Kodefort internship completion
            certificates.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-20px_rgba(18,41,77,0.25)] p-7">
          <form onSubmit={doLogin} className="space-y-4">
            <div>
              <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@kodefort.com"
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-[14.5px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2A5AA6] focus:ring-4 focus:ring-[#2A5AA6]/10"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-[14.5px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2A5AA6] focus:ring-4 focus:ring-[#2A5AA6]/10"
                autoComplete="current-password"
              />
            </div>
            {loginError && (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-[13px] text-rose-700">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="group w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#12294D] to-[#2A5AA6] px-6 text-sm font-bold text-white shadow-lg shadow-[#12294D]/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[12.5px] text-slate-500 leading-5">
              <span className="font-semibold text-slate-700">First time?</span>{" "}
              Visit{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11.5px]">
                GET /api/admin/login
              </code>{" "}
              once (in browser) to auto-seed the default admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
