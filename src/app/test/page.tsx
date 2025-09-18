// src/app/test/page.tsx
import { cookies } from "next/headers";
import Text from "@/components/text/Text";
import { readNodePropFromAuthor } from "@/lib/aem";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const TEXT_NODE =
  "/content/wknd/us/en/test_headless/jcr:content/root/container/container/text";

type SearchParams =
  | Record<string, string>
  | Record<string, string[]>
  | undefined;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // ⬇️ esperar a searchParams
  const sp = (await searchParams) ?? {};
  const raw = Array.isArray(sp?.["login-token"])
    ? sp?.["login-token"][0]
    : (sp?.["login-token"] as string | undefined);

  // ⬇️ cookies() también es async en Next 15
  const cookieStore = await cookies();
  const loginToken = raw || cookieStore.get("aem_login_token")?.value;

  const value = await readNodePropFromAuthor(TEXT_NODE, "text", loginToken);

  return (
    <main className="p-6">
      <Text path={`urn:aemconnection:${TEXT_NODE}`} text={value} tag="p" />
    </main>
  );
}
