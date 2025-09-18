import { JSX } from "react";

// Server Component
type TextProps = {
  /** Ruta del nodo en AEM; acepta "urn:aemconnection:..." o ruta JCR absoluta */
  path: string;
  /** Contenido de texto (lo que llega del Page JSON o del mapper) */
  text?: string;
  /** Etiqueta HTML a usar */
  tag?: keyof JSX.IntrinsicElements;
  /** Clases opcionales */
  className?: string;
  /** Si el campo es rich text */
  rich?: boolean;
};

function toAueResource(path: string) {
  return path.startsWith("urn:") ? path : `urn:aemconnection:${path}`;
}

export default function Text({
  path,
  text = "",
  tag: Tag = "p",
  className = "",
  rich = false,
}: TextProps) {
  const aueResource = toAueResource(path);

  return (
    <Tag
      data-aue-resource={aueResource}
      data-aue-type="component"
      data-aue-label="Text"
      className={className}
    >
      {rich ? (
        <span
          data-aue-prop="text"
          data-aue-type="richtext"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ) : (
        <span data-aue-prop="text" data-aue-type="text">
          {text}
        </span>
      )}
    </Tag>
  );
}

