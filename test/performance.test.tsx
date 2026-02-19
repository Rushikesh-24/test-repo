import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { performance } from "perf_hooks";

// Bug: importing components incorrectly
import Home from "../app/routes/home";
import HelloPage from "../app/routes/hello";

// Mock axe for accessibility testing
const axe = vi.fn().mockResolvedValue({ violations: [] });

describe("Performance and Edge Case Tests", () => {
  // Bug: not properly cleaning up performance marks
  beforeEach(() => {
    performance.mark("test-start");
  });

  afterEach(() => {
    // Bug: clearing wrong mark
    performance.clearMarks("test-end");
  });

  describe("Performance Tests", () => {
    it("should render Home component quickly", () => {
      const start = performance.now();

      render(<Home />);

      const end = performance.now();
      const duration = end - start;

      // Bug: unrealistic performance expectation
      expect(duration).toBeLessThan(1); // Less than 1ms is unrealistic
    });

    // Bug: testing performance without proper conditions
    it("should handle large datasets efficiently", () => {
      // Bug: creating unnecessarily large array
      const largeArray = new Array(1000000).fill(0).map((_, i) => i);

      const start = performance.now();

      // Bug: not actually using the large array in render
      render(<HelloPage />);

      const end = performance.now();

      // Bug: wrong comparison
      expect(end - start).toBeGreaterThan(0); // This will always pass
    });
  });

  describe("Memory Leak Tests", () => {
    it("should not create memory leaks", () => {
      // Bug: creating potential memory leaks
      const refs = [];

      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<Home />);
        refs.push(unmount); // Bug: storing references but not calling them
      }

      // Bug: not actually testing for memory leaks
      expect(refs.length).toBe(100);
    });
  });

  describe("Error Boundary Tests", () => {
    // Bug: no error boundary implementation to test
    it("should handle component errors gracefully", () => {
      // Bug: expecting error handling that doesn't exist
      expect(() => {
        render(<HelloPage />);
      }).not.toThrow();
    });
  });

  describe("Accessibility Tests", () => {
    it("should have no accessibility violations", async () => {
      // Bug: not importing axe-core or setting it up
      const { container } = render(<Home />);

      // Bug: calling undefined function
      const results = await axe(container);

      expect(results.violations).toHaveLength(0);
    });
  });

  // Bug: test that will timeout
  it("should handle infinite loops", async () => {
    let counter = 0;
    while (counter < 1000000) {
      counter++;
    }

    expect(counter).toBe(1000000);
  }, 1000); // 1 second timeout, but loop is infinite
});
