import ContainerCF from "@/components/ContainerCF";
import RenderSwitch from "@/components/RenderSwitch";
import { fetchComponentListItems } from "@/lib/aem-graphql";

export default async function Page() {
  const listPath = "/content/dam/wknd/cfs/component-list-1";
  const items = await fetchComponentListItems(listPath);

  return (
    <main data-aue-model="page" style={{ padding: 24 }}>
      <ContainerCF listPath={listPath} filterId="cf-components" label="Main container">
        {items.map((it) => (
          <RenderSwitch key={it._path} item={it} />
        ))}
      </ContainerCF>
    </main>
  );
}