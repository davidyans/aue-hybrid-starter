import Script from "next/script";
import Head from "next/head";

export default function EditorScripts() {
  // Paleta de componentes del UE
  const componentJson = {
    groups: [
      {
        title: "Components",
        id: "general",
        components: [
          {
            title: "Text",
            id: "text",
            plugins: {
              aem: {
                page: {
                  resourceType: "aue/components/text", // resourceType del nodo que se creará
                },
              },
            },
          },
        ],
      },
    ],
  };

  // Formulario de propiedades (panel derecho)
  const modelJson = [
    {
      id: "text",
      fields: [
        { component: "text", name: "text", label: "Text", valueType: "string" },
      ],
    },
  ];

  // Qué componentes permite un contenedor
  const containerFilterJson = [
    { id: "container-filter", components: ["text"] },
  ];

  return (
    <>
      {/* conexión a tu Author y preview origin */}
      <meta
        name="urn:adobe:aue:system:aemconnection"
        content={`aem:${process.env.AEM_HOST ?? ""}`}
      />
      <meta
        name="urn:adobe:aue:config:preview"
        content={process.env.NEXT_PUBLIC_PREVIEW_ORIGIN ?? ""}
      />

      {/* JSONs que el UE lee */}
      <script
        id="aue-component-json"
        type="application/vnd.adobe.aue.component+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(componentJson) }}
      />
      <script
        id="aue-model-json"
        type="application/vnd.adobe.aue.model+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modelJson) }}
      />
      <script
        id="aue-filter-json"
        type="application/vnd.adobe.aue.filter+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(containerFilterJson) }}
      />
    </>
  );
}
