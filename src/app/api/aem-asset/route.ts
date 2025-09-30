export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import https from "https";

const AEM_HOST = (process.env.AEM_HOST || "https://localhost:8443").replace(/\/$/, "");
const AUTH_TYPE = process.env.AEM_AUTH_TYPE || "basic";

function authHeader() {
  if (AUTH_TYPE === "basic") {
    const u = process.env.AEM_USERNAME ?? "admin";
    const p = process.env.AEM_PASSWORD ?? "admin";
    return `Basic ${Buffer.from(`${u}:${p}`).toString("base64")}`;
  }
  if (AUTH_TYPE === "bearer") {
    const token = process.env.AEM_TOKEN ?? "";
    return token ? `Bearer ${token}` : undefined;
  }
  return undefined;
}

const insecureAgent = new https.Agent({ rejectUnauthorized: false }); // solo para AEM local

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") || "";

  // Evita SSRF: solo /content/dam
  if (!path.startsWith("/content/dam/")) {
    return new Response("Invalid path", { status: 400 });
  }

  const url = `${AEM_HOST}${path}`;
  const headers: Record<string, string> = {};
  const auth = authHeader();
  if (auth) headers["Authorization"] = auth;

  const res = await fetch(url, {
    headers,
    // @ts-expect-error Node runtime acepta agent
    agent: insecureAgent,
    redirect: "follow",
    cache: "no-store",
  });

  if (!res.ok || !res.body) {
    return new Response(`AEM fetch ${res.status} for ${url}`, { status: res.status });
  }

  const ct = res.headers.get("content-type") ?? "application/octet-stream";
  const cl = res.headers.get("content-length") ?? undefined;
  const etag = res.headers.get("etag") ?? undefined;
  const lastMod = res.headers.get("last-modified") ?? undefined;

  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": ct,
      ...(cl ? { "Content-Length": cl } : {}),
      ...(etag ? { ETag: etag } : {}),
      ...(lastMod ? { "Last-Modified": lastMod } : {}),
      "Cache-Control": "no-store",
    },
  });
}