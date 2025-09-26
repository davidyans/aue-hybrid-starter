import { JSX } from "react";

type Props = {
  item: {
    _path: string;
    text?: { html?: string; plaintext?: string };
  };
  as?: keyof JSX.IntrinsicElements; // p, div, span...
  label?: string;
};

export default function TextCF({ item, as = "div", label = "Text CF" }: Props) {
  const cfDataPath = `${item._path}/jcr:content/data/master`;
  const aueResource = `urn:aemconnection:${cfDataPath}`;
  const Tag: any = as;
  const html = item.text?.html ?? "";
  const plain = item.text?.plaintext ?? "";

  return (
    <div
      data-aue-resource={aueResource}
      data-aue-type="reference"
      data-aue-filter="cf"
      data-aue-label={label}
      data-aue-behavior="component"
      style={{ minHeight: 8 }}
    >
      {html ? (
        <Tag
          data-aue-prop="text"
          data-aue-type="richtext"
          data-aue-label="text"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <Tag
          data-aue-prop="text"
          data-aue-type="text"
          data-aue-label="text"
        >
          {plain || ""}
        </Tag>
      )}
    </div>
  );
}
