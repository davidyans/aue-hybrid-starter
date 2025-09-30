/* eslint-disable @next/next/no-sync-scripts */
"use client";

import { Helmet } from "react-helmet-async";

export default function EditorScripts() {
  return (
    <Helmet>
       <script src="https://universal-editor-service.adobe.io/cors.js" async></script>
      <meta name="urn:adobe:aue:system:aemconnection" content="aem:https://localhost:8443" />
      {<meta name="urn:adobe:aue:config:service" content="https://localhost:8000" />}
      <script
        type="application/vnd.adobe.aue.component+json"
        src="/editor/component-definition.json?v=4"
      ></script>
      <script
        type="application/vnd.adobe.aue.model+json"
        src="/editor/model-definition.json?v=4"
      ></script>
      <script
        type="application/vnd.adobe.aue.filter+json"
        src="/editor/filter-definition.json?v=4"
      ></script>
    </Helmet>
  );
}
