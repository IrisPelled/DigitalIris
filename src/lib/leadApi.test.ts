import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitLead, getLeads, exportLeads } from "./leadApi";

describe("leadApi", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("submitLead POSTs to /api/leads and returns lead", async () => {
    const mockLead = {
      id: "x",
      fullName: "Jane",
      phoneNumber: "+1",
      selectedBot: "digital-iris",
      timestamp: "2026-01-01T00:00:00.000Z",
    };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockLead),
    });
    const result = await submitLead({
      fullName: "Jane",
      phoneNumber: "+1",
      selectedBot: "digital-iris",
    });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/leads"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Jane",
          phoneNumber: "+1",
          selectedBot: "digital-iris",
        }),
      })
    );
    expect(result).toEqual(mockLead);
  });

  it("submitLead throws on non-ok response", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Bad request" }),
    });
    await expect(
      submitLead({
        fullName: "Jane",
        phoneNumber: "+1",
        selectedBot: "digital-iris",
      })
    ).rejects.toThrow("Bad request");
  });

  it("getLeads fetches with credentials and returns array", async () => {
    const list = [
      {
        id: "1",
        fullName: "A",
        phoneNumber: "1",
        selectedBot: "digital-iris",
        timestamp: "2026-01-01T00:00:00.000Z",
      },
    ];
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(list),
    });
    const result = await getLeads();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/leads"),
      expect.objectContaining({ credentials: "include" })
    );
    expect(result).toEqual(list);
  });

  it("getLeads throws Unauthorized on 401", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });
    const err = await getLeads().catch((e) => e);
    expect(err.message).toBe("Unauthorized");
    expect((err as { status?: number }).status).toBe(401);
  });

  it("exportLeads requests export endpoint and returns blob", async () => {
    const blob = new Blob(["id,name\n1,A"], { type: "text/csv" });
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(blob),
    });
    const result = await exportLeads("csv");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/leads\/export\?format=csv/),
      expect.objectContaining({ credentials: "include" })
    );
    expect(result).toBe(blob);
  });

  it("exportLeads throws Unauthorized on 401", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });
    await expect(exportLeads("json")).rejects.toThrow("Unauthorized");
  });
});
