import { Hono } from "hono";
import { getAuth } from "./lib/auth";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  const auth = getAuth(c.env);
  return auth.handler(c.req.raw);
});

app.get("/api/me", async (c) => {
  const auth = getAuth(c.env);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({ user: session.user });
});

export default app;
