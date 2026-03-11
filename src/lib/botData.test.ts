import { describe, it, expect } from "vitest";
import { BOTS } from "./botData";

describe("botData", () => {
  it("has four bots", () => {
    expect(BOTS).toHaveLength(4);
  });

  it("each bot has required fields and Phase 2 supportingText", () => {
    BOTS.forEach((bot) => {
      expect(bot.id).toBeDefined();
      expect(bot.name).toBeDefined();
      expect(bot.subtitle).toBeDefined();
      expect(bot.supportingText).toBeDefined();
      expect(Array.isArray(bot.supportingText)).toBe(true);
      expect((bot.supportingText ?? []).length).toBeGreaterThanOrEqual(2);
    });
  });
});
