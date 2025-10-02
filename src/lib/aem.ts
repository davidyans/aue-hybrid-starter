import https from "https";

const AEM_HOST = (process.env.AEM_HOST || "https://localhost:8443").replace(/\/$/, "");
const AEM_AUTH_TYPE = process.env.AEM_AUTH_TYPE || "basic"; // basic | bearer

const insecureAgent =
  process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0"
    ? new https.Agent({ rejectUnauthorized: false })
    : new https.Agent({ rejectUnauthorized: false }); // self-signed

function toHttpPath(jcrPath: string) {
  // AEM expone jcr:content como _jcr_content en endpoints .json
  return jcrPath.replace("/jcr:content/", "/_jcr_content/");
}

function buildAuthHeader(): string | undefined {
  if (AEM_AUTH_TYPE === "basic") {
    const u = process.env.AEM_USERNAME ?? "admin";
    const p = process.env.AEM_PASSWORD ?? "admin";
    return `Basic ${Buffer.from(`${u}:${p}`).toString("base64")}`;
  }
  if (AEM_AUTH_TYPE === "bearer") {
    const token = process.env.AEM_TOKEN ?? "";
    return token ? `Bearer ${token}` : undefined;
  }
  return undefined;
}

/**
 * Trae el JSON de un recurso (profundidad configurable).
 * depth=1 => .json, depth=2 => .2.json (incluye hijos inmediatos), etc.
 */
export async function fetchResourceJson(jcrPath: string, depth = 1): Promise<unknown> {
  const httpPath = toHttpPath(jcrPath);
  const suffix = depth > 1 ? `.${depth}.json` : `.json`;
  const url = `${AEM_HOST}${httpPath}${suffix}`;

  const headers: Record<string, string> = { Accept: "application/json" };
  const auth = buildAuthHeader();
  if (auth) headers["Authorization"] = auth;

  const res = await fetch(url, {
    headers,
    cache: "no-store",
    // @ts-expect-error Node fetch acepta agent
    agent: insecureAgent,
  });

  if (!res.ok) {
    throw new Error(`AEM fetch failed ${res.status} for ${url}`);
  }
  console.log(`Fetched AEM resource: ${url}`);
  return res.json();
}

export async function fetchComponentJson(jcrPath: string): Promise<unknown> {
  return fetchResourceJson(jcrPath, 1);
}
