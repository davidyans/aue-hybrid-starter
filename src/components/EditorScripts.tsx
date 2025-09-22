"use client";

import { Helmet } from "react-helmet-async";

export default function EditorScripts() {
  const componentJson = {
    groups: [
      {
        title: "Components",
        id: "general",
        components: [
          {
            title: "Text",
            id: "text",
            plugins: { aem: { page: { resourceType: "aue/components/text" } } },
          },
        ],
      },
    ],
  };

  const modelJson = [
    {
      id: "text",
      fields: [{ component: "text", name: "text", label: "Text", valueType: "string" }],
    },
  ];

  const containerFilterJson = [{ id: "container-filter", components: ["text"] }];

  return (
    <Helmet>
      <script src="https://universal-editor-service.experiencecloud.live/corslib/LATEST" async />
      <meta name="urn:adobe:aue:system:aemconnection" content="aem:https://localhost:8443" />
      <meta name="urn:adobe:aue:config:service" content="https://localhost:8000" />
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
    </Helmet>
  );
}
