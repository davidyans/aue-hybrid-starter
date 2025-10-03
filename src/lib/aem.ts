import "server-only";
import https from "https";

const AEM_HOST = (process.env.AEM_HOST || "https://localhost:8443").replace(
  /\/$/,
  ""
);
const AEM_AUTH_TYPE = process.env.AEM_AUTH_TYPE || "bearer";

function buildAuthHeader(): string {
  if (AEM_AUTH_TYPE === "basic") {
    const u = process.env.AEM_USERNAME ?? "admin";
    const p = process.env.AEM_PASSWORD ?? "admin";
    return `Basic ${Buffer.from(`${u}:${p}`).toString("base64")}`;
  }
  // bearer (LDAT)
  const token = process.env.AEM_TOKEN;
  if (!token) {
    throw new Error("AEM_TOKEN not defined.");
  }
  return `Bearer ${token}`;
}

// Para local
function maybeAgent() {
  return AEM_HOST.includes("localhost")
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;
}

export async function aemFetch<T>(
  path: string,
  init?: RequestInit & { asJson?: boolean }
): Promise<T> {
  const url = `${AEM_HOST}${path}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string>),
    Authorization: buildAuthHeader(),
  };

  const res = await fetch(url, {
    ...init,
    headers,
    // @ts-expect-error Node fetch no tipa 'agent', pero en runtime funciona
    agent: maybeAgent(),
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `AEM returned ${res.status}. Please check that your AEM_TOKEN (LDAT) is valid and that AEM_HOST points to the Author instance. Response: ${body}`
    );
  }
  if (!res.ok) {
    throw new Error(`Fetch a ${url} falló con ${res.status}`);
  }

  if (init?.asJson === false) {
    return (await res.text()) as unknown as T;
  }
  return (await res.json()) as T;
}
