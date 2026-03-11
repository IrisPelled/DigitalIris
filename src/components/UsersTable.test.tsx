import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UsersTable } from "./UsersTable";

describe("UsersTable", () => {
  it("shows empty state when no users", () => {
    render(
      <MemoryRouter>
        <UsersTable users={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText(/no registered users yet/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /choose your bot/i })).toHaveAttribute("href", "/contact");
  });

  it("renders table with user data when populated", () => {
    const users = [
      {
        id: "1",
        fullName: "Jane Doe",
        phoneNumber: "+1234567890",
        selectedBot: "digital-iris",
        timestamp: "2026-03-11T12:00:00.000Z",
      },
    ];
    render(
      <MemoryRouter>
        <UsersTable users={users} />
      </MemoryRouter>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("+1234567890")).toBeInTheDocument();
  });
});
