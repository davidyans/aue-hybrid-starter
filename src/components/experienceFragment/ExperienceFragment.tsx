import { sanitizeXfHtml } from "@/lib/aem";

export default function  ExperienceFragment({ html, label }: { html: string; label?: string }) {
  const safe = sanitizeXfHtml(html);
  return (
    <div
      aria-label={label}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}