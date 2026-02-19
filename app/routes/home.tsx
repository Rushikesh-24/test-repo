import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // Bug: accessing property of potentially undefined object
  const config = window.appConfig;
  const theme = config.theme; // This will throw if appConfig is undefined

  // Bug: unused variable that could cause render issues
  const [count, setCount] = useState(0);

  // Bug: missing useEffect dependency
  useEffect(() => {
    document.title = config.title;
  }, []); // Missing config dependency

  return (
    <div className={theme}>
      <Welcome />
      {/* Bug: rendering count but no way to update it */}
      <p>Visit count: {count}</p>
    </div>
  );
}
