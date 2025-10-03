import { JSX } from "react";

type TextCFItem = {
  _path: string;
  text?: { html?: string; plaintext?: string };
};

export default function TextCF({
  item,
  as = "div",
  label = "Text CF",
}: {
  item: TextCFItem;
  as?: keyof JSX.IntrinsicElements;
  label?: string;
}) {
  const Tag = as as keyof JSX.IntrinsicElements;
  const resource = `urn:aemconnection:${item._path}/jcr:content/data/master`;
  const html = item.text?.html ?? "";

  return (
    <div className="flex flex-wrap items-center bg-white rounded-lg shadow-md p-6 max-w-3xl w-full mb-5">
      <div
        data-aue-resource={resource}
        data-aue-type="component"
        data-aue-model="textcf"
        data-aue-label={label}
        className="text-lg text-gray-700 w-full"
      >
        <Tag
          data-aue-prop="text"
          data-aue-type="richtext"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
