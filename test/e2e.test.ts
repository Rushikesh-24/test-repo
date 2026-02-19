// E2E Tests with intentional bugs
import { test, expect } from "@playwright/test";

// Bug: no proper Playwright setup or import

test.describe("E2E Application Tests", () => {
  // Bug: incorrect URL
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3001"); // Wrong port
  });

  test("should display home page correctly", async ({ page }) => {
    // Bug: wrong selector
    await expect(page.locator("h1")).toHaveText("Welcome to React Router");

    // Bug: expecting element that doesn't exist
    await expect(page.locator('[data-testid=\"navigation\"]')).toBeVisible();
  });

  test("should navigate to hello page", async ({ page }) => {
    // Bug: wrong route due to typo in routes.ts
    await page.click('a[href=\"/hello\"]');

    // Bug: waiting for wrong URL
    await page.waitForURL("**/hello");

    // Bug: this will fail due to the component error
    await expect(page.locator("h1")).toHaveText("Hello World!");
  });

  // Bug: test with no implementation
  test("should handle form submissions", async ({ page }) => {
    // Empty test body - will pass but tests nothing
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Bug: incorrect viewport size
    await page.setViewportSize({ width: 100, height: 200 }); // Too small

    // Bug: testing desktop-specific elements on mobile
    await expect(page.locator(".desktop-only")).toBeVisible();
  });

  // Bug: test that will timeout
  test("should load within reasonable time", async ({ page }) => {
    const start = Date.now();

    await page.goto("http://localhost:3001");

    // Bug: infinite wait
    while (Date.now() - start < 100000) {
      // Wait forever
    }

    expect(true).toBe(true);
  });

  test("should handle network errors", async ({ page }) => {
    // Bug: simulating network error but not handling it
    await page.route("**/*", (route) => route.abort());

    await page.goto("http://localhost:3001");

    // Bug: expecting normal loading despite network abortion
    await expect(page.locator("body")).toContainText("React Router");
  });
});
