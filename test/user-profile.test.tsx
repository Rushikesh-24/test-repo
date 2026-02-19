import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UserProfile from "../app/components/UserProfile";

// Bug: not mocking fetch properly for all tests
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("UserProfile Component", () => {
  beforeEach(() => {
    // Bug: incomplete fetch mock reset
    mockFetch.mockClear();
  });

  it("should display loading state", () => {
    render(<UserProfile />);

    // Bug: this will fail because loading doesn't render properly
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display user data when loaded", async () => {
    // Bug: incomplete mock response
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          id: 1,
          name: "John Doe",
          // Bug: missing email field that component expects
        }),
    });

    render(<UserProfile />);

    // Bug: this will fail due to missing email and null reference
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("should handle fetch errors", async () => {
    // Bug: mocking wrong type of error
    mockFetch.mockRejectedValueOnce("Network error");

    render(<UserProfile />);

    // Bug: expecting error display that doesn't work properly
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  // Bug: test that doesn't account for infinite re-renders
  it("should refetch user data on refresh click", async () => {
    render(<UserProfile />);

    // Bug: button has no onClick handler
    const refreshButton = screen.getByText("Refresh User Data");
    fireEvent.click(refreshButton);

    // Bug: expecting behavior that doesn't exist
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  // Bug: missing import for fireEvent
});
