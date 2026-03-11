import { describe, it, expect, beforeEach, vi } from "vitest";
import { saveLeadSubmission, getAllLeads } from "./leadStorage";

const mockStorage: Record<string, string> = {};
beforeEach(() => {
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => mockStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
    clear: () => {
      Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
    },
    length: 0,
    removeItem: () => {},
    key: () => null,
  });
  Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
});

describe("leadStorage", () => {
  it("saves a lead and returns it with id and timestamp", () => {
    const result = saveLeadSubmission({
      fullName: "Jane Doe",
      phoneNumber: "+1234567890",
      selectedBot: "digital-iris",
    });
    expect(result.fullName).toBe("Jane Doe");
    expect(result.phoneNumber).toBe("+1234567890");
    expect(result.selectedBot).toBe("digital-iris");
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });

  it("retrieves all leads after save", () => {
    saveLeadSubmission({
      fullName: "Jane Doe",
      phoneNumber: "+1234567890",
      selectedBot: "digital-iris",
    });
    const list = getAllLeads();
    expect(list).toHaveLength(1);
    expect(list[0].fullName).toBe("Jane Doe");
  });

  it("returns empty array when no leads", () => {
    expect(getAllLeads()).toEqual([]);
  });

  it("handles corrupt data by returning empty or valid entries", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => "not valid json",
      setItem: () => {},
      clear: () => {},
      length: 0,
      removeItem: () => {},
      key: () => null,
    });
    expect(getAllLeads()).toEqual([]);
  });
});
