import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("unknown");

  return (
    <div>
      Hello "/"!
      <button
        onClick={() => {
          fetch("/api/")
            .then((res) => res.json() as Promise<{ name: string }>)
            .then((data) => setName(data.name));
        }}
        aria-label="get name"
      >
        Name from API is: {name}
      </button>
      <Link to="/about">About</Link>
    </div>
  );
}
