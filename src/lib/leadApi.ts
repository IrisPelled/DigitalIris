import type { Lead } from "./leadStorage";

const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (url) return url.replace(/\/$/, "");
  if (import.meta.env.DEV) return ""; // use Vite proxy /api in dev
  return "";
};

export async function submitLead(lead: Omit<Lead, "id" | "timestamp">): Promise<Lead> {
  const base = getBaseUrl();
  const url = base ? `${base}/api/leads` : "/api/leads";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Failed to save lead");
  }
  return res.json() as Promise<Lead>;
}

export async function getLeads(): Promise<Lead[]> {
  const base = getBaseUrl();
  const url = base ? `${base}/api/leads` : "/api/leads";
  const res = await fetch(url, { credentials: "include" });
  if (res.status === 401 || res.status === 403) {
    const e = new Error("Unauthorized") as Error & { status?: number };
    e.status = res.status;
    throw e;
  }
  if (!res.ok) throw new Error("Failed to load leads");
  return res.json() as Promise<Lead[]>;
}

export async function exportLeads(format: "csv" | "json"): Promise<Blob> {
  const base = getBaseUrl();
  const url = base ? `${base}/api/leads/export` : "/api/leads/export";
  const res = await fetch(`${url}?format=${format}`, { credentials: "include" });
  if (res.status === 401 || res.status === 403) {
    const e = new Error("Unauthorized") as Error & { status?: number };
    e.status = res.status;
    throw e;
  }
  if (!res.ok) throw new Error("Export failed");
  return res.blob();
}
