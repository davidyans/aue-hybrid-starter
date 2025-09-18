// src/app/components/text/Text.tsx
type TextProps = {
  /** Nodo JCR que edita este componente (puede venir como ruta o como urn:aemconnection:...) */
  path: string;
  /** Nombre de la propiedad que editará el UE (por defecto "text") */
  prop?: string;
  /** Valor inicial (lo que pintas en pantalla) */
  value?: string;
  /** p, h1, h2... */
  tag?: keyof JSX.IntrinsicElements;
  /** ¿El campo es rich text (HTML)? */
  rich?: boolean;
  className?: string;
};

function toAue(path: string) {
  return path.startsWith("urn:") ? path : `urn:aemconnection:${path}`;
}

export default function Text({
  path,
  prop = "text",
  value = "",
  tag: Tag = "p",
  rich = false,
  className = "",
}: TextProps) {
  const resource = toAue(path);

  return (
    <Tag
      data-aue-resource={resource}  
      data-aue-type="component"
      data-aue-label="Text"
      className={className}
    >
      {rich ? (
        <span
          data-aue-prop={prop}   
          data-aue-type="richtext"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <span data-aue-prop={prop} data-aue-type="text">
          {value}
        </span>
      )}
    </Tag>
  );
}
