import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BotChooserCard } from "./BotChooserCard";

describe("BotChooserCard", () => {
  const defaultProps = {
    botName: "Digital Iris",
    tagline: "Your 24/7 tutor",
    svgThumbnailPath: "/assets/svgs/DigitalIris.svg",
    gradientColors: ["hsl(190, 85%, 65%)", "hsl(260, 85%, 65%)"] as [string, string],
    isSelected: false,
    onSelect: vi.fn(),
  };

  it("renders bot name and tagline", () => {
    render(<BotChooserCard {...defaultProps} />);
    expect(screen.getByText("Digital Iris")).toBeInTheDocument();
    expect(screen.getByText("Your 24/7 tutor")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(<BotChooserCard {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: /select digital iris/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("has aria-pressed true when selected", () => {
    render(<BotChooserCard {...defaultProps} isSelected />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
