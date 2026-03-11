import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SuccessModal } from "./SuccessModal";

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe("SuccessModal", () => {
  it("shows Welcome aboard! and bot name in body", () => {
    render(
      <MemoryRouter>
        <SuccessModal
          botName="Digital Iris"
          onDismiss={vi.fn()}
          onViewList={vi.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /welcome aboard/i })).toBeInTheDocument();
    expect(screen.getByText(/You've registered for Digital Iris\. We'll be in touch soon\./)).toBeInTheDocument();
  });

  it("has View registered users button", () => {
    render(
      <MemoryRouter>
        <SuccessModal
          botName="Iris Coach"
          onDismiss={vi.fn()}
          onViewList={vi.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /view registered users/i })).toBeInTheDocument();
  });
});
