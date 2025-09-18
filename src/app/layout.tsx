import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

import EditorScripts from "./editor";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <EditorScripts />
        <Script
          src="https://universal-editor-service.adobe.io/cors.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}