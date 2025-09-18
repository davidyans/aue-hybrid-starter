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

export default async function Page() {
  const NODE = "/content/wknd/us/en/test_headless/jcr:content/root/container/container/text";
  return (
    <main 
    data-aue-type="container"
    data-aue-label="Container"
    data-aue-filter="container-filter"
    data-aue-resource="urn:aemconnection:/content/wknd/us/en/test_headless/jcr:content/root/container/container"
    >
       <Text path={NODE} value="Texto inicial (se reemplazará al guardar)" />
    </main>
  );
}
