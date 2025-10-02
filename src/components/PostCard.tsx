import Link from "next/link";

type Rich = { html?: string; plaintext?: string };
type ImgRef = { _path: string; width?: number; height?: number; mimeType?: string };
type PostCard = {
    _path: string;
    title?: string;
    description?: Rich;
    linkLabel?: string;
    linkUrl?: string;
    altText?: string;
    imagePath?: ImgRef | null;
};

const assetSrc = (p?: string) => (p ? `/api/aem-asset?path=${encodeURIComponent(p)}` : "");

export default function PostCard({ item }: { item: PostCard }) {
    const cfDataPath = `${item._path}/jcr:content/data/master`;
    const aue = `urn:aemconnection:${cfDataPath}`;

    const hasImage = Boolean(item.imagePath?._path);

    return (
        <article
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
          <img
            src={assetSrc(item.imagePath!._path)}
            alt={item.altText || item.title || ""}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <div
            style={{
              minHeight: 120,
              border: "1px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12
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


            <h3 data-aue-prop="title" data-aue-type="text">
                {item.title}
            </h3>


            <div
                data-aue-prop="description"
                data-aue-type="richtext"
                dangerouslySetInnerHTML={{ __html: item.description.html }}
            />


            {item.linkUrl && (
                <Link href={item.linkUrl} aria-label={item.linkLabel || item.title || ""}>
                    {item.linkLabel || "Read more"}
                </Link>
            )}
        </article>
    );
}
