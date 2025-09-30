import { ImageWithTextCF as ImageWithTextCFType } from "@/lib/aem-graphql";

const assetSrc = (p?: string) => (p ? `/api/aem-asset?path=${encodeURIComponent(p)}` : "");

export default function ImageWithTextCF({ item }: { item: ImageWithTextCFType }) {
  const resource = `urn:aemconnection:${item._path}/jcr:content/data/master`;

  return (
    <figure
      data-aue-resource={resource}
      data-aue-type="component"
      data-aue-model="imagewithtextcf"
      data-aue-label="Image with Text CF"
    >
      <img
        src={assetSrc(item.imagePath?._path)}
        alt={item.altText || ""}
        data-aue-prop="imagePath"
        data-aue-type="path"
        style={{ maxWidth: "300px", height: "auto" }}
      />
      <figcaption data-aue-prop="altText" data-aue-type="text">
        {item.altText || ""}
      </figcaption>
    </figure>
  );
}