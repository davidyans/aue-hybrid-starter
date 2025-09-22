/* eslint-disable @next/next/no-sync-scripts */
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
       <script src="https://universal-editor-service.adobe.io/cors.js" async></script>
      <meta name="urn:adobe:aue:system:aemconnection" content="aem:https://localhost:8443" />
      {<meta name="urn:adobe:aue:config:service" content="https://localhost:8000" />}
      <script
        type="application/vnd.adobe.aue.component+json"
        src="/editor/component-definition.json"
      ></script>
      <script
        type="application/vnd.adobe.aue.model+json"
        src="/editor/model-definition.json"
      ></script>
      <script
        type="application/vnd.adobe.aue.filter+json"
        src="/editor/filter-definition.json"
      ></script>
    </Helmet>
  );
}
