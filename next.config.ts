// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     formats: ["image/avif", "image/webp"],
//   },
//   poweredByHeader: false,
//   reactStrictMode: true,
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Explicitly allow the qualities used by optimized Next/Image components.
    qualities: [75, 85],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: "https",
        hostname: "www.ubh.ae",
      },
      {
        protocol: "https",
        hostname: "mitpress.mit.edu",
      },
    ],
  },

  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;