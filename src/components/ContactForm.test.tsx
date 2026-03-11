import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ContactForm } from "./ContactForm";

function renderForm(props: { selectedBot: string | null; onSubmit: (p: unknown) => void }) {
  return render(
    <MemoryRouter>
      <ContactForm {...props} />
    </MemoryRouter>
  );
}

describe("ContactForm", () => {
  it("renders fields and submit button", () => {
    renderForm({ selectedBot: "digital-iris", onSubmit: () => {} });
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get access/i })).toBeInTheDocument();
  });

  it("submit is disabled when bot not selected", () => {
    renderForm({ selectedBot: null, onSubmit: vi.fn() });
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "123" } });
    expect(screen.getByRole("button", { name: /get access/i })).toBeDisabled();
  });

  it("calls onSubmit with payload when valid", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    renderForm({ selectedBot: "digital-iris", onSubmit });
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "+1234567890" } });
    fireEvent.click(screen.getByRole("button", { name: /get access/i }));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        fullName: "Jane Doe",
        phoneNumber: "+1234567890",
        selectedBot: "digital-iris",
      })
    );
  });

  it("shows inline errors when required fields empty", () => {
    renderForm({ selectedBot: "digital-iris", onSubmit: vi.fn() });
    const form = screen.getByRole("button", { name: /get access/i }).closest("form")!;
    fireEvent.submit(form);
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
  });
});
