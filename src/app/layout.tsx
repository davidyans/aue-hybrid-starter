"use client";

import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import EditorScripts from "../components/EditorScripts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <HelmetProvider>
          <EditorScripts />
          {children}
        </HelmetProvider>
      </body>
    </html>
  );
}