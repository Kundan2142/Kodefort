"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  LogOut,
  Check,
  X,
  Eye,
  FileCheck2,
  Download,
  Users,
  Filter,
  ChevronDown,
  Sparkles,
  ArrowLeftRight,
} from "lucide-react";
import { parseAuth, clearAuth, type AdminSession } from "@/lib/adminAuthClient";

interface ApprovalItem {
  id: number;
  registrationNo: string;
  studentName: string;
  collegeName: string;
  internshipTopic: string;
  status: "pending" | "approved" | "rejected";
  degree: string | null;
  session: string | null;
  subject: string | null;
  email: string | null;
  mobileNo: string | null;
  address: string | null;
  remarks: string | null;
  approvedBy: number | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

type FilterStatus = "all" | "pending" | "approved" | "rejected";

export default function AdminApprovalsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<ApprovalItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Record<string, number>>({
    pending: 0,
    approved: 0,
    rejected: 0,
    all: 0,
  });
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [query, setQuery] = useState("");
  const [actioningId, setActioningId] = useState<number | null>(null);
  const [remark, setRemark] = useState("");
  const [remarkTarget, setRemarkTarget] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const a = parseAuth();
    if (!a) {
      router.replace("/admin/login");
      return;
    }
    setAuth(a);
    setReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth) loadApprovals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, statusFilter]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    let list = items;
    if (statusFilter !== "all")
      list = list.filter((i) => i.status === statusFilter);
    if (q)
      list = list.filter(
        (i) =>
          i.studentName.toLowerCase().includes(q) ||
          i.registrationNo.toLowerCase().includes(q) ||
          i.collegeName.toLowerCase().includes(q) ||
          i.internshipTopic.toLowerCase().includes(q) ||
          (i.email || "").toLowerCase().includes(q)
      );
    setFilteredItems(list);
  }, [items, query, statusFilter]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  function apiHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth?.token || ""}`,
    };
  }

  function logout() {
    clearAuth();
    setAuth(null);
    router.replace("/admin/login");
  }

  async function loadApprovals() {
    if (!auth) return;
    setLoading(true);
    try {
      const url = new URL("/api/admin/approvals", window.location.origin);
      if (statusFilter !== "all") url.searchParams.set("status", statusFilter);
      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
        setSummary(data.summary || summary);
      }
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(
    item: ApprovalItem,
    status: "approved" | "rejected" | "pending"
  ) {
    if (!auth) return;
    setActioningId(item.id);
    try {
      const res = await fetch("/api/admin/approvals", {
        method: "PATCH",
        headers: apiHeaders(),
        body: JSON.stringify({
          id: item.id,
          status,
          remarks: remarkTarget === item.id ? remark : item.remarks,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((x) =>
            x.id === item.id ? { ...x, ...(data.item as any) } : x
          )
        );
        setToast(
          `Marked ${item.studentName} as ${status.toUpperCase()}`
        );
        setRemark("");
        setRemarkTarget(null);
      } else {
        setToast("Action failed: " + (data.error || ""));
      }
    } finally {
      setActioningId(null);
    }
  }

  const totalCount = items.length;
  const pendingCount = items.filter((i) => i.status === "pending").length;
  const approvedCount = items.filter((i) => i.status === "approved").length;
  const rejectedCount = items.filter((i) => i.status === "rejected").length;

  if (!ready) return null;
  if (!auth) return null;

  // ===== Admin Dashboard =====
  return (
    <div className="relative min-h-screen bg-slate-50/60">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 shadow-2xl text-sm font-medium">
          <Check className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#12294D] to-[#2A5AA6] flex items-center justify-center text-white shadow-md">
              <FileCheck2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-900 leading-tight">
                Kodefort Admin
              </div>
              <div className="text-[11.5px] text-slate-500">
                Certificate Approvals
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#2A5AA6]" />
              <span className="text-[12.5px] text-slate-700 font-medium">
                {auth.admin.name}
              </span>
              <span className="text-[11px] text-slate-400">
                · {auth.admin.email}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 py-8 sm:py-10">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard
            label="Total Students"
            value={totalCount}
            icon={<Users className="h-4.5 w-4.5" />}
            tint="slate"
          />
          <StatCard
            label="Pending Review"
            value={pendingCount}
            icon={<Clock className="h-4.5 w-4.5" />}
            tint="amber"
            highlight
          />
          <StatCard
            label="Approved"
            value={approvedCount}
            icon={<CheckCircle2 className="h-4.5 w-4.5" />}
            tint="emerald"
          />
          <StatCard
            label="Rejected"
            value={rejectedCount}
            icon={<XCircle className="h-4.5 w-4.5" />}
            tint="rose"
          />
        </div>

        {/* Toolbar */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="group relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 group-focus-within:text-[#2A5AA6]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, reg no., college, email, topic…"
                className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2A5AA6] focus:ring-4 focus:ring-[#2A5AA6]/10"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as FilterStatus)
                  }
                  className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-[13px] font-medium text-slate-700 focus:outline-none focus:border-[#2A5AA6] focus:ring-4 focus:ring-[#2A5AA6]/10"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <Filter className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              </div>

              <button
                type="button"
                onClick={loadApprovals}
                disabled={loading}
                className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-gradient-to-br from-[#12294D] to-[#2A5AA6] px-4 text-[13px] font-bold text-white shadow-md shadow-[#12294D]/25 hover:shadow-lg disabled:opacity-60 transition"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Loading…" : "Refresh Queue"}
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <Th className="w-8 pl-5">
                    <Eye className="h-3.5 w-3.5" />
                  </Th>
                  <Th>Student</Th>
                  <Th>Reg. No.</Th>
                  <Th>College</Th>
                  <Th>Internship Topic</Th>
                  <Th>Status</Th>
                  <Th>Remarks</Th>
                  <Th>Updated</Th>
                  <Th className="pr-5 text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-16 text-center text-slate-500"
                    >
                      <div className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading approvals…
                      </div>
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-16 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                          <Award className="h-6 w-6 text-slate-400" />
                        </div>
                        <p className="text-[14px] font-semibold text-slate-700 mb-1">
                          No records found
                        </p>
                        <p className="text-[12.5px] text-slate-500 max-w-md">
                          {statusFilter !== "all"
                            ? `No students with status "${statusFilter}". Clear filters or refresh the queue.`
                            : "Approval queue is empty. Refresh the list to pull the latest submissions into the review list."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((it) => (
                    <Row
                      key={it.id}
                      item={it}
                      expanded={expandedId === it.id}
                      onToggle={() =>
                        setExpandedId(expandedId === it.id ? null : it.id)
                      }
                      actioning={actioningId === it.id}
                      remarkOpen={remarkTarget === it.id}
                      remarkValue={remark}
                      onRemarkChange={(v) => setRemark(v)}
                      onRemarkToggle={() => {
                        setRemarkTarget(remarkTarget === it.id ? null : it.id);
                        if (remarkTarget !== it.id)
                          setRemark(it.remarks || "");
                      }}
                      onApprove={() => setStatus(it, "approved")}
                      onReject={() => setStatus(it, "rejected")}
                      onReset={() => setStatus(it, "pending")}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-100 px-5 py-4">
            <p className="text-[12.5px] text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredItems.length}
              </span>{" "}
              of <span className="font-semibold text-slate-700">{totalCount}</span>{" "}
              total records.
            </p>
            <p className="text-[12px] text-slate-400">
              Tip: Approve each student individually, then students can download
              their completion certificate via /certificates.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------- Sub components ----------

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`h-11 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 whitespace-nowrap ${className}`}
    >
      {children}
    </th>
  );
}

function StatusBadge({ status }: { status: ApprovalItem["status"] }) {
  const map = {
    pending: {
      label: "Pending",
      cls: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20",
      icon: <Clock className="h-3 w-3" />,
    },
    approved: {
      label: "Approved",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    rejected: {
      label: "Rejected",
      cls: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20",
      icon: <XCircle className="h-3 w-3" />,
    },
  } as const;
  const cfg = map[status] || map.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold shadow-sm ring-1 ${cfg.cls}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon,
  tint,
  highlight = false,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tint: "slate" | "amber" | "emerald" | "rose";
  highlight?: boolean;
}) {
  const tints = {
    slate: "from-slate-600/10 to-slate-500/5 text-slate-600 border-slate-200",
    amber:
      "from-amber-500/15 to-amber-400/5 text-amber-700 border-amber-200",
    emerald:
      "from-emerald-500/15 to-emerald-400/5 text-emerald-700 border-emerald-200",
    rose: "from-rose-500/15 to-rose-400/5 text-rose-700 border-rose-200",
  } as const;
  return (
    <div
      className={`relative rounded-2xl border bg-gradient-to-br p-4 sm:p-5 ${tints[tint]} ${
        highlight ? "shadow-lg shadow-amber-500/10" : "shadow-sm"
      } bg-white`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`h-9 w-9 rounded-xl flex items-center justify-center bg-white shadow-sm ring-1 ring-black/5`}
        >
          {icon}
        </div>
      </div>
      <div
        className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-slate-900 leading-none mb-1"
        style={{ fontFamily: "Creato Display, Outfit, sans-serif" }}
      >
        {value}
      </div>
      <div className="text-[12px] font-medium text-slate-600">{label}</div>
    </div>
  );
}

function Row({
  item,
  expanded,
  onToggle,
  actioning,
  remarkOpen,
  remarkValue,
  onRemarkChange,
  onRemarkToggle,
  onApprove,
  onReject,
  onReset,
}: {
  item: ApprovalItem;
  expanded: boolean;
  onToggle: () => void;
  actioning: boolean;
  remarkOpen: boolean;
  remarkValue: string;
  onRemarkChange: (v: string) => void;
  onRemarkToggle: () => void;
  onApprove: () => void;
  onReject: () => void;
  onReset: () => void;
}) {
  return (
    <>
      <tr className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
        <td className="pl-5 py-3.5">
          <button
            type="button"
            onClick={onToggle}
            className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            title="Toggle details"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </td>
        <td className="py-3.5 pr-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 ring-1 ring-slate-200 flex items-center justify-center text-[13px] font-bold text-slate-700 flex-shrink-0">
              {item.studentName
                .split(" ")
                .map((s) => s[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")
                .toUpperCase() || "??"}
            </div>
            <div className="min-w-0">
              <div className="text-[13.5px] font-semibold text-slate-900 truncate">
                {item.studentName}
              </div>
              <div className="text-[11.5px] text-slate-500 truncate">
                {item.email || "—"}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3.5 pr-3">
          <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[12px] font-semibold text-slate-700">
            {item.registrationNo}
          </span>
        </td>
        <td className="py-3.5 pr-3">
          <div className="text-[13px] text-slate-700 truncate max-w-[220px]">
            {item.collegeName}
          </div>
        </td>
        <td className="py-3.5 pr-3">
          <span className="inline-flex items-center rounded-lg bg-[#F8FAFC] border border-[#2A5AA6]/15 px-2.5 py-1 text-[12px] font-semibold text-[#12294D]">
            {item.internshipTopic}
          </span>
        </td>
        <td className="py-3.5 pr-3">
          <StatusBadge status={item.status} />
          {item.status === "approved" && item.approvedAt && (
            <div className="text-[10.5px] text-slate-400 mt-1 leading-tight">
              {new Date(item.approvedAt).toLocaleDateString("en-IN")}
            </div>
          )}
        </td>
        <td className="py-3.5 pr-3">
          <div className="text-[12px] text-slate-600 max-w-[220px] truncate">
            {item.remarks || (
              <span className="text-slate-400 italic">No remarks</span>
            )}
          </div>
        </td>
        <td className="py-3.5 pr-3">
          <div className="text-[11.5px] text-slate-500 whitespace-nowrap">
            {new Date(item.updatedAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })}
          </div>
        </td>
        <td className="py-3.5 pr-5">
          <div className="flex items-center justify-end gap-1.5 flex-nowrap">
            <button
              type="button"
              onClick={onRemarkToggle}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
              title="Add remarks"
              disabled={actioning}
            >
              <ArrowLeftRight className="h-3 w-3" />
              Remark
            </button>
            {item.status !== "approved" && (
              <button
                type="button"
                onClick={onApprove}
                disabled={actioning}
                className="inline-flex h-8 items-center gap-1 rounded-lg bg-emerald-600 px-3 text-[12px] font-bold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition"
                title="Approve completion certificate"
              >
                {actioning ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
                Approve
              </button>
            )}
            {item.status !== "rejected" && (
              <button
                type="button"
                onClick={onReject}
                disabled={actioning}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 text-[12px] font-bold text-rose-700 hover:bg-rose-100 disabled:opacity-50 transition"
                title="Reject completion certificate"
              >
                <X className="h-3 w-3" />
                Reject
              </button>
            )}
            {item.status !== "pending" && (
              <button
                type="button"
                onClick={onReset}
                disabled={actioning}
                className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white px-2.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition"
                title="Move back to pending"
              >
                <Download className="h-3 w-3 -rotate-90" />
              </button>
            )}
          </div>
        </td>
      </tr>

      {remarkOpen && (
        <tr className="border-b border-slate-100 bg-[#FAFBFF]">
          <td />
          <td colSpan={7} className="px-0 py-0">
            <div className="mx-5 mb-3 mt-1 rounded-xl border border-[#2A5AA6]/20 bg-white p-4">
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                Admin remarks for {item.studentName}
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={remarkValue}
                  onChange={(e) => onRemarkChange(e.target.value)}
                  placeholder="e.g. All tasks completed, approved for certification"
                  className="flex-1 h-10 rounded-lg border border-slate-200 bg-white px-3 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2A5AA6] focus:ring-4 focus:ring-[#2A5AA6]/10"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onApprove();
                    }}
                    disabled={actioning}
                    className="h-10 inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 text-[12.5px] font-bold text-white hover:bg-emerald-700 disabled:opacity-50 transition"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Save &amp; Approve
                  </button>
                  <button
                    type="button"
                    onClick={onRemarkToggle}
                    className="h-10 inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 text-[12.5px] font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </td>
          <td />
        </tr>
      )}

      {expanded && (
        <tr className="border-b border-slate-100 bg-gradient-to-br from-slate-50/90 to-white">
          <td />
          <td colSpan={7} className="px-0 py-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-5">
              <InfoCell label="Degree" value={item.degree} />
              <InfoCell label="Session" value={item.session} />
              <InfoCell label="Subject" value={item.subject} />
              <InfoCell label="Mobile" value={item.mobileNo} />
              <InfoCell label="Email" value={item.email} wide />
              <InfoCell label="Address" value={item.address} wide />
              <InfoCell
                label="Created"
                value={new Date(item.createdAt).toLocaleString("en-IN")}
              />
              <InfoCell
                label="Last updated"
                value={new Date(item.updatedAt).toLocaleString("en-IN")}
              />
            </div>
          </td>
          <td />
        </tr>
      )}
    </>
  );
}

function InfoCell({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string | null;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-3 ${
        wide ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-1">
        {label}
      </div>
      <div className="text-[13px] text-slate-700 break-words min-h-[18px]">
        {value || <span className="text-slate-400 italic">—</span>}
      </div>
    </div>
  );
}
