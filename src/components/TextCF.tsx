import { JSX } from "react";

type TextCFItem = { _path: string; text?: { html?: string; plaintext?: string } };

export default function TextCF({ item, as = "div", label = "Text CF" }: {
  item: TextCFItem; as?: keyof JSX.IntrinsicElements; label?: string;
}) {
  const Tag = as as keyof JSX.IntrinsicElements;
  const resource = `urn:aemconnection:${item._path}/jcr:content/data/master`;
  const html = item.text?.html ?? "";

  return (
    <div
      data-aue-resource={resource}
      data-aue-type="component"
      data-aue-model="textcf"
      data-aue-label={label}
    >
      <Tag data-aue-prop="text" data-aue-type="richtext"
           dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
