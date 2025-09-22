const AEM_HOST = "https://localhost:8443";

export async function fetchComponentJson(jcrPath: string): Promise<any> {
  const httpPath = jcrPath.replace("/jcr:content/", "/_jcr_content/");
  const url = `${AEM_HOST}${httpPath}.json`;

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const auth = Buffer.from("admin:admin").toString("base64");

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`AEM fetch failed ${res.status} for ${url}`);
  }
  return res.json();
}
