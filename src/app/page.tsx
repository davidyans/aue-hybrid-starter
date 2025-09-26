import TextCF from "@/components/TextCF";
import { fetchAllTexts } from "@/lib/aem-graphql";

export default async function Page() {
  const items = await fetchAllTexts();

  return (
    <main style={{ padding: 24, display: "grid", gap: 16 }}>
      {items.map((it) => (
        <TextCF key={it._path} item={it} as="p" />
      ))}
    </main>
  );
}
