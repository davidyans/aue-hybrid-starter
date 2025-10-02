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
    <div className="flex flex-wrap items-center bg-white rounded-lg shadow-md p-6 max-w-3xl w-full">
      <figure
        data-aue-resource={resource}
        data-aue-type="component"
        data-aue-model="imagewithtextcf"
        data-aue-label="Image with Text CF"
        className="mr-6 lg:w-1/4 w-full"
      >
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
            src={item.imagePath?._path || "/globe.svg"}
            alt={"alt"}
            width={150}
            height={150}
            sizes="160px"
            className=" relative"
            data-aue-prop="imagePath"
            data-aue-type="path"
            priority
          />
        </div>
      </figure>
      {/* <Image
        src={item.imagePath?._path || "/globe.svg"}
        alt={"alt"}
        width={150}
        height={150}
        sizes="160px"
        className="object-cover relative"
        data-aue-prop="imagePath"
        data-aue-type="path"
        priority
      /> */}
      <div
        data-aue-prop="altText"
        data-aue-type="text"
        className="text-lg text-gray-700 w-full md:w-1/2"
      >
        {item.altText || ""}
      </div>
    </div>
  );
}
