# Admin Dashboard UI (Login + Approve) Implementation Plan

## Repository Research

**Current state:**
- One monolithic route exists at [admin/certificates/page.tsx](file:///e:/kodefort/Kodefort/src/app/admin/certificates/page.tsx) — it combines **both** unauthenticated login UI **and** the full post-auth approvals dashboard (stat cards, search/filter, Excel sync, per-row Approve/Reject actions) into a single file.
- Backend API already works (see prior session):
  - `POST /api/admin/login` + `GET /api/admin/login` (auto-seed default admin) — [login/route.ts](file:///e:/kodefort/Kodefort/src/app/api/admin/login/route.ts)
  - `GET|PATCH|POST /api/admin/approvals` protected by `verifyAdminAuth` JWT check — [approvals/route.ts](file:///e:/kodefort/Kodefort/src/app/api/admin/approvals/route.ts)
  - Auth util at [adminAuth.ts](file:///e:/kodefort/Kodefort/src/lib/adminAuth.ts)
  - Prisma schema synced to DB (`Admin`, `CertificateApproval`, etc. tables exist)
- **No dedicated `/admin/login`** route.
- **No root `/admin`** entry page — 404 at `/admin`.
- **No `middleware.ts`** — routes rely solely on client-side localStorage guard (the dashboard self-kicks to login UI when no token; API routes return 401).
- UI conventions already established in the existing page follow the project's Stripe/Vercel/Linear aesthetic (`Creato Display` headings, `#12294D → #2A5AA6` gradient, pill filters, rounded-2xl cards, ring-1 shadow), and `lucide-react` icons.
- The existing dashboard in `admin/certificates/page.tsx` is very feature-complete; user's "create admin dashboard ui to login and approve" is best served by **structural polish + dedicated entry routes** not rewriting from scratch.

**Ambiguity resolution:**
- "login" → dedicated standalone `/admin/login` page (extracted so login has its own URL/route + redirects to dashboard on auth).
- "dashboard ui to login and approve" → `/admin` root redirects to either `/admin/login` or `/admin/certificates` based on auth; `/admin/certificates` remains the approval workbench.
- Keep the existing approval workbench as-is (it is already high quality and matches aesthetic); only extract, split, and add clean entry + middleware guard.

## Files and Modules

| Path | Expected change |
|---|---|
| `src/app/admin/page.tsx` | **Create.** Server component → redirects to `/admin/certificates` (dashboard) or `/admin/login` based on cookie/token. Client redirect wrapper if no middleware. |
| `src/app/admin/login/page.tsx` | **Create.** Dedicated "client" login page: same premium shield-centered UI + POSTs to `/api/admin/login`, redirects to `/admin/certificates` on success, shows inline seed hint. Shares the `AUTH_KEY` constant. |
| `src/app/admin/certificates/page.tsx` (existing) | **Modify (small).** Remove the embedded login-screen branch (it's now its own page). Keep only post-auth dashboard. Add redirect-to-login when auth missing (single pushState on mount + inline guard). |
| `src/lib/adminAuthClient.ts` | **Create (optional tiny helper).** Shared `AUTH_KEY`, `parseAuth()`, `logout()`, `saveAuth()` helpers so both pages don't duplicate localStorage logic. Avoid breaking the existing file by keeping it small. |
| `src/middleware.ts` | **Create.** Protect every route under `/admin/*` except `/admin/login`, `/admin/login/*`, and `/api/*`. Require valid JWT cookie — or if cookie-less, **allow-list `/admin/login`** and rely on existing client-side guard + API 401s (middleware must not break current token-in-localStorage pattern). To avoid cookie churn, use middleware only for route-organization (clean path enforcement) or skip if implementation complexity > value. Decision: add a "soft-guard" middleware that rewrites `/` → `/admin/login` only when NOT already there, and **optionally** validates a Bearer token via JWT if present as cookie (but keep existing localStorage flow for backward compat). |

**No changes to:** `/api/admin/*` routes, `prisma/schema.prisma`, existing visual styling tokens, `Navbar`, `globals.css`.

## Implementation Steps

1. **Shared client-auth helper** — create `src/lib/adminAuthClient.ts` exporting:
   - `AUTH_KEY = "kodefort_admin_auth"`
   - `parseAuth(): { token, admin } | null` (window guard, parse, shape check)
   - `saveAuth(data)` (stringify + localStorage)
   - `clearAuth()`

2. **Dedicated login page** — `src/app/admin/login/page.tsx`
   - `"use client"`
   - Copies the exact premium login visual currently embedded at lines 265–356 of `admin/certificates/page.tsx` (shield icon, radial gradient, Creato Display heading, rounded-2xl card, error banner with AlertCircle).
   - Imports + uses the shared helper.
   - `useEffect` on mount: if already authed, `router.replace("/admin/certificates")`.
   - On POST success → `saveAuth(data)` → `router.replace("/admin/certificates")`.
   - Keep the "First time? GET /api/admin/login" seed hint.

3. **Admin root entry** — `src/app/admin/page.tsx`
   - `"use client"`.
   - On mount: if parseAuth → `/admin/certificates`, else `/admin/login`.
   - Minimal loading state (inline spinner).

4. **Refactor dashboard page** — `admin/certificates/page.tsx`
   - Remove lines 265–356 (the embedded login screen branch) and the `if (!auth) return (...)` gate.
   - Add a single redirect guard at the top of the component body:
     ```
     useEffect(() => { if (!parseAuth()) router.replace("/admin/login"); }, [])
     ```
   - Replace all inlined `AUTH_KEY` / `parseAuth` / `logout` references with imports from `adminAuthClient`.
   - Keep the exact dashboard UI (stat cards, toolbar, table, sub-components: StatCard, Row, StatusBadge, Th, InfoCell).
   - Keep the `401 response → logout() + redirect` branch in `loadApprovals`.

5. **(Optional, low-risk) Soft middleware** — `src/middleware.ts` (root of `src/`)
   - Only run on `/admin/:path*` matcher.
   - Skip `/admin/login` and the API routes (API folder is outside `app/admin` anyway).
   - Without requiring cookies, use middleware purely to redirect `/admin` → `/admin/login` **when** there's no Bearer auth header AND no JWT cookie. If this is fragile given localStorage-only token storage, **skip middleware entirely** and rely on client-side redirects (already correct behavior).
   - Default for safety: **skip middleware** in v1 — client guards + API 401s already cover security. Add a `// TODO` note for cookie-based middleware in the future if the team wants to move auth token storage.

6. **Link wiring check** — ensure no hard-coded navigation breaks. Grep for `router.push`/`Link href` targeting old assumptions and replace with new routes where needed.

## Dependencies and Considerations

- **Already installed (no new deps needed):** `lucide-react`, `next/image`, `react`, tailwind v4 (`@tailwindcss/postcss`).
- **Shared `AUTH_KEY` const** must match exactly `"kodefort_admin_auth"` to preserve existing sessions.
- **Backwards compat:** existing users with localStorage tokens stay logged in across the split (shared key).
- **Project aesthetic constraints (user profile):** no placeholder content, pixel-perfect, Creato Display on headings, clamp() for big type, inline optimistic feedback (already in dashboard via toast + row loading state — keep them).
- **Admin seeding flow:** must remain the documented one-time `GET /api/admin/login` in-browser hit. No changes.

## Validation

1. **Route sanity (manual in browser):**
   - `/admin` → redirects to `/admin/login` (unauth) or `/admin/certificates` (auth).
   - `/admin/login` → renders standalone login, works with valid creds, redirects to dashboard, shows error for bad creds, shows seed hint when first-time.
   - `/admin/certificates` unauth → redirects to `/admin/login`.
   - `/admin/certificates` authed → renders dashboard.
2. **Functional:**
   - Approve / Reject / Remark + Reset actions still call `PATCH /api/admin/approvals` → optimistically update rows → toast fires.
   - Sync from Excel still works (POST /api/admin/approvals + counters update).
   - Search + filter narrow the list.
   - Logout button clears localStorage + ideally pushes to `/admin/login`.
3. **Static checks:**
   - `GetDiagnostics` reports 0 TS/ESLint errors.
   - If tsc runs without OOM, `npx tsc --noEmit` (optional, known to OOM here).

## Risks

- **Risk 1 (medium):** Refactor introduces a stale-reference bug (e.g. duplicate `AUTH_KEY` that doesn't match). → Mitigation: extract to single helper file, import everywhere.
- **Risk 2 (low):** Client-only redirect vs SEO crawlers. → Acceptable — admin routes are non-public.
- **Risk 3 (low):** Dashboard becomes blank screen if redirect guard misfires. → Mitigation: redirect guard runs in `useEffect` after `ready: true` state; mirror the existing two-step pattern (`ready` flag returns `null` on first render).
- **Risk 4 (medium):** Middleware added incorrectly would 401 everything. → Mitigation: **don't ship middleware in v1** (see step 5).
