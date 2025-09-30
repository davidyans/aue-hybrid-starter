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

// ----- Tipos base
export type BaseCF = { _path: string; __typename: string };

export type TextCF = BaseCF & {
  __typename: "TextModel";
  text?: { html?: string; plaintext?: string };
};

export type ImageWithTextCF = BaseCF & {
  __typename: "ImageWithTextModel";
  imagePath?: { _path?: string; width?: number; height?: number; mimeType?: string };
  altText?: string;
};

export type ComponentItem = TextCF | ImageWithTextCF | BaseCF;
// ----- Persisted query: getComponentListByPath
export async function fetchComponentListItems(listPath: string): Promise<ComponentItem[]> {
  const url = `${AEM_HOST}/graphql/execute.json/wknd/getComponentListByPath`;
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const auth = buildAuthHeader();
  if (auth) headers["Authorization"] = auth;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ variables: { path: listPath } }),
    // @ts-expect-error Node fetch acepta agent
    agent: insecureAgent,
    cache: "no-store"
  });

  if (!res.ok) throw new Error(`GraphQL fetch failed ${res.status} for ${url}`);

  const json = await res.json();
  
  const items: ComponentItem[] =
    json?.data?.componentListByPath?.item?.items
    ?? json?.data?.component_listByPath?.items
    ?? [];

  return items;
}
