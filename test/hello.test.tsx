import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HelloPage from "../app/routes/hello";

describe("Hello Component", () => {
  // Bug: using console.error but not properly mocking it
  const originalError = console.error;

  beforeEach(() => {
    // Bug: not properly restoring console.error
    console.error = vi.fn();
  });

  it("should render hello message", () => {
    // Bug: This will fail due to the null reference error in the component
    expect(() => render(<HelloPage />)).not.toThrow();

    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });

  it("should display user message", () => {
    render(<HelloPage />);

    // Bug: This test expects text that will cause an error
    expect(screen.getByText(/says hello/)).toBeInTheDocument();
  });

  it("should render list items", () => {
    render(<HelloPage />);

    // Bug: expecting 4 items but component only has 3
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(4);
  });

  // Bug: test name doesn't match what it's testing
  it("should handle async operations", () => {
    render(<HelloPage />);

    // Bug: testing synchronous content in async test
    expect(screen.getByRole("heading")).toHaveTextContent("Hello World!");
  });

  // Bug: trying to test component that doesn't exist
  it("should render HelloPage component", () => {
    render(<HelloPage />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
