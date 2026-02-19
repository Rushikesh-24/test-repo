import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Bug: intentional typo in route path
export default [
  index("routes/home.tsx"),
  route("helo", "routes/hello.tsx"),
] satisfies RouteConfig;
