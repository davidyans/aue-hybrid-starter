import Text from "../components/Text";
import { fetchComponentJson } from "../lib/aem";

const TEXT_JCR_PATH =
  "/content/wknd/us/en/test_headless/jcr:content/root/container/container/text";

export default async function Page() {
  const json = await fetchComponentJson(TEXT_JCR_PATH);
  const html = typeof json?.text === "string" ? json.text : "";

  return (
    <main style={{ padding: 24 }}>
      <Text path={TEXT_JCR_PATH} html={html} />
    </main>
  );
}
