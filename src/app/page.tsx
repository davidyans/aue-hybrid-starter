/* eslint-disable @typescript-eslint/no-explicit-any */
import ContainerCF from "@/components/ContainerCF";
import RenderSwitch from "@/components/RenderSwitch";
import { fetchComponentListItems } from "@/services/graphql";

export default async function Page() {
  const listPath = '/content/dam/oshynsite-headless/cfs/component-list-1';

  let items: any[] = [];
  try {
    items = await fetchComponentListItems(listPath);
  } catch (err) {
    console.error('AEM fetch error:', err);
  }

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