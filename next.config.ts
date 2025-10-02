import type { NextConfig } from "next";

const csp = [
  "frame-ancestors 'self'",
  "https://experience.adobe.com",
  "https://experience-stage.adobe.com",
  "https://*.adobeaemcloud.com",
  "https://*.aem.live",
  "https://*.adobe.com",
].join(" ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: `${csp};` },
        ],
      },
    ];
  },
};

export default nextConfig;