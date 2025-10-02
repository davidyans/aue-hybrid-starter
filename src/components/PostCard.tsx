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

    return (
        <article
            data-aue-resource={aue}
            data-aue-type="component"
            data-aue-label="Post Card"
            data-aue-behavior="component"
            data-aue-model="postcardmodel"
        >

            <img
                src={assetSrc(item.imagePath?._path)}
                alt={item.altText || item.title || ""}
                style={{ maxWidth: "100%", height: "auto" }}
                data-aue-prop="imagePath"
                data-aue-type="media"
            />


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
