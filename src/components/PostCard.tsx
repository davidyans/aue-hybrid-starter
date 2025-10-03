import Link from "next/link";
import Image from "next/image";

type Rich = { html?: string; plaintext?: string };
type ImgRef = {
  _path: string;
  width?: number;
  height?: number;
  mimeType?: string;
};
type PostCard = {
  _path: string;
  title?: string;
  description?: Rich;
  linkLabel?: string;
  linkUrl?: string;
  altText?: string;
  imagePath?: ImgRef | null;
};

const assetSrc = (p?: string) =>
  p ? `/api/aem-asset?path=${encodeURIComponent(p)}` : "";

export default function PostCard({ item }: { item: PostCard }) {
  const cfDataPath = `${item._path}/jcr:content/data/master`;
  const aue = `urn:aemconnection:${cfDataPath}`;

  const hasImage = Boolean(item.imagePath?._path);

  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden"
      data-aue-resource={aue}
      data-aue-type="component"
      data-aue-label="Post Card"
      data-aue-behavior="component"
      data-aue-model="postcardmodel"
    >
      <figure
        data-aue-prop="imagePath"
        data-aue-type="media"
        data-aue-label="Image"
        style={{ margin: 0 }}
      >
        {hasImage ? (
          <Image
            src={assetSrc(item.imagePath!._path)}
            alt={item.altText || item.title || ""}
            className="w-full h-48 object-cover"
            width={500} // Assuming a common card width, adjust as needed
            height={300} // Assuming a common card height, adjust as needed
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust based on your layout
          />
        ) : (
          <div
            style={{
              minHeight: 120,
              border: "1px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            Click para seleccionar imagen
          </div>
        )}

        <figcaption
          data-aue-prop="altText"
          data-aue-type="text"
          style={{ display: "none" }}
          aria-hidden="true"
        >
          {item.altText || ""}
        </figcaption>
      </figure>

      <div className="p-4">
        <h3
          data-aue-prop="title"
          data-aue-type="text"
          className="text-xl font-semibold mb-2"
        >
          {item.title}
        </h3>

        <div
          data-aue-prop="description"
          data-aue-type="richtext"
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: item.description?.html || "" }}
        />

        {item.linkUrl && (
          <Link
            href={item.linkUrl}
            aria-label={item.linkLabel || item.title || ""}
            className="text-blue-500 hover:underline"
          >
            {item.linkLabel || "Read more"}
          </Link>
        )}
      </div>
    </article>
  );
}
