import https from "https";

const AEM_HOST = (process.env.AEM_HOST || "https://localhost:8443").replace(/\/$/, "");
const AEM_AUTH_TYPE = process.env.AEM_AUTH_TYPE || "basic"; // basic | bearer
const insecureAgent = new https.Agent({ rejectUnauthorized: false });

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

export type TextCF = {
  _id: string;
  _path: string; // /content/dam/wknd/cfs/text-1-test
  text?: {
    html?: string;
    markdown?: string;
    plaintext?: string;
    json?: unknown;
  };
};

export async function fetchAllTexts(): Promise<TextCF[]> {
  const url = `${AEM_HOST}/graphql/execute.json/wknd/getAllTexts`;
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
    throw new Error(`GraphQL fetch failed ${res.status} for ${url}`);
  }

  const json = await res.json();
  return json?.data?.textModelList?.items ?? [];
}
