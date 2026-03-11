const STORAGE_KEY = "iris_leads";

export interface Lead {
  id: string;
  fullName: string;
  phoneNumber: string;
  selectedBot: string;
  timestamp: string;
}

export function saveLeadSubmission(lead: Omit<Lead, "id" | "timestamp">): Lead {
  const id = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const timestamp = new Date().toISOString();
  const record: Lead = { ...lead, id, timestamp };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list: Lead[] = [];
    if (raw) {
      try {
        list = JSON.parse(raw) as Lead[];
        if (!Array.isArray(list)) list = [];
      } catch {
        list = [];
      }
    }
    list.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return record;
  } catch {
    throw new Error("Failed to save lead. Storage may be full or unavailable.");
  }
}

export function getAllLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as unknown;
    if (!Array.isArray(list)) return [];
    return list.filter(
      (item): item is Lead =>
        item &&
        typeof item === "object" &&
        typeof (item as Lead).id === "string" &&
        typeof (item as Lead).fullName === "string" &&
        typeof (item as Lead).phoneNumber === "string" &&
        typeof (item as Lead).selectedBot === "string" &&
        typeof (item as Lead).timestamp === "string"
    );
  } catch {
    return [];
  }
}
