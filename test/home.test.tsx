import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../app/routes/home";

describe("Home Component", () => {
  it("should render welcome component", () => {
    render(<Home />);

    // Bug: incorrect assertion - looking for wrong text
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should have correct meta title", () => {
    const metaResult = Home.meta({});

    // Bug: incorrect expected title
    expect(metaResult[0].title).toBe("Old React Router App");
  });

  // Bug: incomplete test with no assertions
  it("should handle user interactions", () => {
    render(<Home />);
    // Missing test implementation
  });

  // Bug: test with wrong assumption about component behavior
  it("should display user name when logged in", async () => {
    render(<Home />);

    // This will fail because Home doesn't handle user state
    expect(screen.getByText("Welcome, User!")).toBeInTheDocument();
  });
});
