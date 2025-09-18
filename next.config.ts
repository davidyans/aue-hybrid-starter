import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Permite que Universal Editor (local) embeda tu app
          { key: "Content-Security-Policy",
            value: [
              "frame-ancestors 'self' https://localhost:8000",     // UE local
              // Si planeas abrir también desde experience.adobe.com, añade:
              // " https://experience.adobe.com"
            ].join(" ")
          }
        ],
      },
    ];
  },
};

export default nextConfig;
