import { describe, it, expect } from "vitest";
import { getBotLink } from "./botLinks";

describe("getBotLink", () => {
  it("returns undefined when no URL is configured for the bot id", () => {
    expect(getBotLink("digital-iris")).toBeUndefined();
    expect(getBotLink("unknown-bot")).toBeUndefined();
  });

  it("returns undefined for empty string bot id", () => {
    expect(getBotLink("")).toBeUndefined();
  });
});
