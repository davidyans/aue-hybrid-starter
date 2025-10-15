export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { cookies, headers as nextHeaders } from "next/headers";
import { aemFetchResponse } from "@/lib/aem";

async function isUE() {
  const c = (await cookies()).get("aue")?.value === "1";
  const ref = (await nextHeaders()).get("referer") || "";
  return c || ref.includes("experience.adobe.com");
}

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "";
  if (!path.startsWith("/content/dam/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  const upstream = await aemFetchResponse(path, { method: "GET" });
  if (!upstream.ok || !upstream.body) {
    return new NextResponse(`AEM fetch ${upstream.status} for ${path}`, { status: upstream.status });
  }
  const hdrs = new Headers(upstream.headers);
  hdrs.set("Cache-Control", await isUE() ? "no-store" : "public, max-age=604800, s-maxage=604800");
  return new NextResponse(upstream.body, { status: upstream.status, headers: hdrs });
}
