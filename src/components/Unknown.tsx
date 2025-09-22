type Props = {
  path: string;
  id?: string;
  node?: any;
};

export default function Unknown({ path, id, node }: Props) {
  const aueResource = `urn:aemconnection:${path}`;
  const rt = node?.["sling:resourceType"] || "unknown";

  return (
    <div
      id={id}
      data-aue-resource={aueResource}
      data-aue-type="component"
      data-aue-label={`Unsupported: ${rt}`}
      data-aue-behavior="component"
      style={{
        padding: 12,
        border: "1px dashed #aaa",
        borderRadius: 8,
        fontFamily: "monospace",
      }}
    >
      <div>Unsupported component</div>
      <small>{rt}</small>
    </div>
  );
}
