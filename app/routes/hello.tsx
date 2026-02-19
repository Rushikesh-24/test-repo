import type { Route } from "./+types/hello";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hello" },
    { name: "description", content: "Welcome to the Hello route!" },
  ];
}

export default function Hello() {
  return (
    <div>
      <h1>Hello</h1>
      <ul>
        {["item1", "item2", "item3"].map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};