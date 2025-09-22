type Props = { path: string; id?: string; node?: any };

export default function Image({ path, id, node }: Props) {
  const aueResource = `urn:aemconnection:${path}`;
  const fileRef: string | undefined = node?.fileReference;
  const alt: string = node?.alt || node?.["jcr:title"] || "image";

  const src = fileRef
    ? `/api/aem-asset?path=${encodeURIComponent(fileRef)}`
    : undefined;

  return (
    <div
      id={id}
      data-aue-resource={aueResource}
      data-aue-type="component"
      data-aue-label="Image"
      data-aue-behavior="component"
      style={{ maxWidth: "20rem" }}
    >
      {src ? <img src={src} alt={alt} style={{ maxWidth: "100%", height: "auto" }} /> : <em>Missing image</em>}
    </div>
  );
}