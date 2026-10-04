export const AUTH_KEY = "kodefort_admin_auth";

export interface AdminSession {
  token: string;
  admin: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

export function parseAuth(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (obj && typeof obj.token === "string" && obj.admin && typeof obj.admin.id === "number") {
      return obj as AdminSession;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveAuth(data: AdminSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}
