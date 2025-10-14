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
      data-aue-model="image"
      data-aue-behavior="component"
      style={{ maxWidth: "20rem" }}
    >
      {src ? (
        <div
          data-aue-prop="fileReference"
          data-aue-type="reference"
          style={{ display: "inline-block", maxWidth: "100%" }}
        >
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : (
        <em>Missing image</em>
      )}

      <p
        data-aue-prop="alt"
        data-aue-type="text"
        style={{ fontSize: "0.875rem", color: "#666" }}
      >
        {alt}
      </p>
    </div>
  );
}