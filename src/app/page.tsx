import ContainerCF from "@/components/ContainerCF";
import RenderSwitch from "@/components/RenderSwitch";
// import { fetchComponentListItems } from "@/lib/aem-graphql";
import ImageWithTextCF from "@/components/ImageWithTextCF";

export default async function Page() {
  const listPath = "/content/dam/wknd/cfs/component-list-1";
  // const items = await fetchComponentListItems(listPath);

  const dummyItem = {
    _path: "/content/dam/wknd/cfs/dummy-image",
    __typename: "ImageWithTextModel",
    imagePath: {
      _path: "/content/dam/wknd/cfs/sample.jpg",
    },
    altText: "This is a sample description for the image.",
  } as const;

  return (
    <main data-aue-model="page" style={{ padding: 24 }}>
      <ImageWithTextCF item={dummyItem} />
      {/* <ContainerCF
        listPath={listPath}
        filterId="cf-components"
        label="Main container"
      >
        {items.map((it) => (
          <RenderSwitch key={it._path} item={it} />
        ))}
      </ContainerCF> */}
    </main>
  );
}
