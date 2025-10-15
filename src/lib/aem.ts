import "server-only";
import https from "https";
import { cookies, headers } from "next/headers";

const AUTHOR_HOST  = (process.env.AEM_AUTHOR_HOST  || "").replace(/\/$/, "");
const PUBLISH_HOST = (process.env.AEM_PUBLISH_HOST || "").replace(/\/$/, "");

const AUTHOR_AUTH_TYPE = process.env.AEM_AUTHOR_AUTH_TYPE || "";
const AUTHOR_TOKEN     = process.env.AEM_AUTHOR_TOKEN || "";

async function isUE(): Promise<boolean> {
  const ck = await cookies();
  const hs = await headers();
  const c = ck.get("aue")?.value === "1";
  const ref = hs.get("referer") || "";
  return c || ref.includes("experience.adobe.com");
}

async function resolveBase(): Promise<string> {
  return (await isUE()) ? AUTHOR_HOST : (PUBLISH_HOST || AUTHOR_HOST);
}

function buildAuthHeader(base: string): string | undefined {
  if (base !== AUTHOR_HOST) return undefined;
  if (AUTHOR_AUTH_TYPE === "basic") {
    const u = process.env.AEM_USERNAME ?? "admin";
    const p = process.env.AEM_PASSWORD ?? "admin";
    return `Basic ${Buffer.from(`${u}:${p}`).toString("base64")}`;
  }
  if (AUTHOR_AUTH_TYPE === "bearer") {
    if (!AUTHOR_TOKEN) throw new Error("Token faltante para AUTHOR");
    return `Bearer ${AUTHOR_TOKEN}`;
  }
  return undefined;
}

function maybeAgent(base: string) {
  const b = base.toLowerCase();
  const isLocal =
    b.startsWith("http://localhost") ||
    b.startsWith("https://localhost") ||
    b.includes("127.0.0.1");
  return isLocal ? new https.Agent({ rejectUnauthorized: false }) : undefined;
}

export async function aemFetch<T>(
  path: string,
  init?: RequestInit & { asJson?: boolean; revalidateSeconds?: number }
): Promise<T> {
  const base = await resolveBase();
  const url  = `${base}${path}`;
  const auth = buildAuthHeader(base);
  const cacheDirectives = (await isUE())
    ? { cache: "no-store" as const }
    : { next: { revalidate: init?.revalidateSeconds ?? 300 } };

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers as Record<string, string>),
      ...(auth ? { Authorization: auth } : {}),
    },
    // @ts-expect-error Node runtime acepta agent
    agent: maybeAgent(base),
    ...cacheDirectives,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AEM ${res.status} en ${url} — ${body.slice(0, 500)}`);
  }

  if (init?.asJson === false) {
    return (await res.arrayBuffer()) as unknown as T;
  }
  return (await res.json()) as T;
}

export async function aemFetchResponse(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const base = await resolveBase();
  const url  = `${base}${path}`;
  const auth = buildAuthHeader(base);

  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers as Record<string, string>),
      ...(auth ? { Authorization: auth } : {}),
    },
    // @ts-expect-error Node runtime acepta agent
    agent: maybeAgent(base),
    ...((await isUE()) ? { cache: "no-store" as const } : {}),
  });
}
