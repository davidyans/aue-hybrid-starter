/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import "./globals.css"; //test

const AEM_UE_HOST = process.env.NEXT_PUBLIC_AEM_UE_HOST ?? "";

export const metadata: Metadata = {
  other: {
    "urn:adobe:aue:system:aemconnection": `aem:${AEM_UE_HOST}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Conditionally render the AEM scripts on the server */}

        <>
          <Script
            src="https://universal-editor-service.adobe.io/cors.js"
            strategy="afterInteractive"
          />
          <script
            id="aue-component-def"
            type="application/vnd.adobe.aue.component+json"
            src="/editor/component-definition.json?v=4"
          />
          <script
            id="aue-model-def"
            type="application/vnd.adobe.aue.model+json"
            src="/editor/model-definition.json?v=4"
          />
          <script
            id="aue-filter-def"
            type="application/vnd.adobe.aue.filter+json"
            src="/editor/filter-definition.json?v=4"
          />
        </>
      </head>
      <body>{children}</body>
    </html>
  );
}
