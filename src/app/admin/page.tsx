"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { parseAuth } from "@/lib/adminAuthClient";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const a = parseAuth();
    if (a) router.replace("/admin/certificates");
    else router.replace("/admin/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
        <Loader2 className="h-4 w-4 animate-spin text-[#2A5AA6]" />
        Redirecting…
      </div>
    </div>
  );
}
