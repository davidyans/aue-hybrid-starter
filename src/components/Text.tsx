type Props = {
  path: string;
  html: string;
  id?: string;
  node?: any; // opcional
};

export default function Text({ path, html, id }: Props) {
  const aueResource = `urn:aemconnection:${path}`;
  return (
    <div
      id={id}
      data-aue-resource={aueResource}
      data-aue-type="text"
      data-aue-prop="text"
      data-aue-label="Text"
      data-aue-model="text"
      data-aue-behavior="component"
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}