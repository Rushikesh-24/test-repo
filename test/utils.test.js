import { describe, it, expect } from "vitest";

// Bug: testing non-existent utility functions
describe("Utility Functions", () => {
  // Bug: importing function that doesn't exist
  const { formatDate, validateEmail, calculateTotal } = require("../app/utils");

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2024-01-01");

      // Bug: expecting wrong format
      expect(formatDate(date)).toBe("01/01/24");
    });

    // Bug: testing with null but no null handling
    it("should handle null date", () => {
      expect(formatDate(null)).toBe("");
    });
  });

  describe("validateEmail", () => {
    it("should validate correct email", () => {
      // Bug: expecting validation to pass for invalid email
      expect(validateEmail("invalid-email")).toBe(true);
    });

    it("should reject invalid email format", () => {
      expect(validateEmail("test@example.com")).toBe(false); // Bug: backwards logic
    });
  });

  describe("calculateTotal", () => {
    it("should calculate sum correctly", () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ];

      // Bug: wrong expected result
      expect(calculateTotal(items)).toBe(30); // Should be 35
    });

    // Bug: testing edge case that will cause error
    it("should handle empty items array", () => {
      expect(calculateTotal([])).toBe(0);
    });

    // Bug: testing undefined without handling
    it("should handle undefined input", () => {
      expect(calculateTotal(undefined)).toBe(0);
    });
  });
});
