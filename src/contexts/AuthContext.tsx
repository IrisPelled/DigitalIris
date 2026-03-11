import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./authContextDef";

const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (url) return url.replace(/\/$/, "");
  if (import.meta.env.DEV) return "";
  return "";
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(async () => {
    const base = getBaseUrl();
    const url = base ? `${base}/api/auth/me` : "/api/auth/me";
    try {
      const res = await fetch(url, { credentials: "include" });
      setIsAuthenticated(res.ok);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (password: string) => {
      const base = getBaseUrl();
      const url = base ? `${base}/api/auth/login` : "/api/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Login failed");
      }
      setIsAuthenticated(true);
    },
    []
  );

  const logout = useCallback(async () => {
    const base = getBaseUrl();
    const url = base ? `${base}/api/auth/logout` : "/api/auth/logout";
    try {
      await fetch(url, { method: "POST", credentials: "include" });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
