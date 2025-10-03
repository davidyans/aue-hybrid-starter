import { ImageWithTextCF as ImageWithTextCFType } from "@/services/graphql";
import Image from "next/image";
const assetSrc = (p?: string) =>
  p ? `/api/aem-asset?path=${encodeURIComponent(p)}` : "";

export default function ImageWithTextCF({
  item,
}: {
  item: ImageWithTextCFType;
}) {
  const resource = `urn:aemconnection:${item._path}/jcr:content/data/master`;

  return (
    <div
      className="flex items-center bg-white rounded-lg shadow-md p-6 max-w-3xl w-full"
      data-aue-resource={resource}
      data-aue-type="component"
      data-aue-model="imagewithtextcf"
      data-aue-label="Image with Text CF"
    >
      <figure className="mr-6 flex-shrink-0">
        <div className="overflow-hidden rounded-full w-40 h-40 relative">
          {/* <Image
            src={assetSrc(item.imagePath?._path)}
            alt={"alt"}
            fill
            sizes="160px"
            className="object-cover"
            data-aue-prop="imagePath"
            data-aue-type="path"
            priority
          /> */}
          <Image
            src={assetSrc(item.imagePath?._path) || "/globe.svg"} // Fallback to a default image if imagePath is not available
            alt={item.altText || "Description of the image"} // Use altText from item or a more descriptive default
            width={160} // Set a fixed width for better performance and layout stability
            height={160} // Set a fixed height for better performance and layout stability
            sizes="160px"
            className="object-cover w-full h-full"
            data-aue-prop="imagePath"
            data-aue-type="path"
            priority
          />
        </div>
      </figure>
      <div
        data-aue-prop="altText"
        data-aue-type="text"
        className="text-lg text-gray-700"
      >
        {item.altText || ""}
      </div>
    </div>
  );
}
