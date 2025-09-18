import https from "https";

const insecureAgent =
  process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

export async function fetchAemHtml(contentPath: string): Promise<string> {
  const base = (process.env.AEM_HOST || "https://localhost:8443").replace(/\/$/, "");
  const url = `${base}${contentPath.endsWith(".html") ? contentPath : `${contentPath}.html`}`;

  const headers: Record<string, string> = {};
  const authType = process.env.AEM_AUTH_TYPE;

  if (authType === "basic") {
    const u = process.env.AEM_USERNAME ?? "";
    const p = process.env.AEM_PASSWORD ?? "";
    headers["Authorization"] = `Basic ${Buffer.from(`${u}:${p}`).toString("base64")}`;
  } else if (authType === "bearer") {
    headers["Authorization"] = `Bearer ${process.env.AEM_TOKEN}`;
  }

  const res = await fetch(url, {
    headers,
    cache: "no-store",
    // Agente para cert self-signed en dev
    ...(insecureAgent ? { agent: insecureAgent as any } : {}),
  });

  if (!res.ok) throw new Error(`AEM XF fetch failed ${res.status}: ${url}`);
  return await res.text();
}

export function sanitizeXfHtml(html: string): string {
  // 1) Si viene documento completo, extrae solo el <body>…
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const onlyBody = bodyMatch ? bodyMatch[1] : html;

  // 2) Quita scripts del fragmento (opcional si no los necesitas)
  return onlyBody.replace(/<script[\s\S]*?<\/script>/gi, "");
}

export async function readNodePropFromAuthor(path: string, prop: string, loginToken?: string) {
  const base = process.env.NEXT_PUBLIC_AEM_AUTHOR_URL!; // https://author-xxx.adobeaemcloud.com
  // Intentamos leer el nodo como JSON del Sling GET: .../text.json
  const url = new URL(`${base}${path}.json`);
  if (loginToken) url.searchParams.set("login-token", loginToken);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    // Si tu componente no tiene exporter/GET, podrías caer al page.model.json y navegar
    // o devolver vacío y editar igual.
    return "";
  }
  const json = await res.json();
  return json?.[prop] ?? "";
}