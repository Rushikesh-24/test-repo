import "@testing-library/jest-dom";
import { vi } from "vitest";

// Bug: incorrect mock setup
global.fetch = vi.fn();

// Bug: wrong property name and incomplete setup
Object.defineProperty(window, "matchedMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    // Bug: missing required properties
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
});
