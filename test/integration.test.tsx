import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, it, expect } from "vitest";
import Home from "../app/routes/home";
import HelloPage from "../app/routes/hello";

// Bug: importing from wrong location
import routes from "../app/routes";

describe("Integration Tests", () => {
  // Bug: incorrect router setup
  const router = createMemoryRouter([
    {
      path: "/",
      // Bug: wrong component reference
      element: <Home />,
    },
    {
      path: "/hello", // Bug: path doesn't match routes.ts
      element: <HelloPage />,
    },
  ]);

  it("should navigate between routes", async () => {
    render(<RouterProvider router={router} />);

    // Bug: expecting elements that don't exist
    expect(screen.getByText("Navigate")).toBeInTheDocument();
  });

  it("should handle 404 errors", () => {
    const badRouter = createMemoryRouter(
      [
        {
          path: "/",
          element: <div>Home</div>,
        },
      ],
      {
        initialEntries: ["/nonexistent"],
      },
    );

    render(<RouterProvider router={badRouter} />);

    // Bug: expecting error page that doesn't exist
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });

  // Bug: test without proper cleanup
  it("should maintain state between navigation", () => {
    // Bug: no navigation actually happening
    render(<RouterProvider router={router} />);
    expect(true).toBe(true); // Meaningless assertion
  });
});
