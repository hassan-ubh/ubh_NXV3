import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubh.ae").replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/en/cart", "/ar/cart", "/en/checkout", "/ar/checkout", "/en/profile", "/ar/profile", "/en/login", "/ar/login", "/en/signup", "/ar/signup", "/en/wishlist", "/ar/wishlist", "/en/addresses", "/ar/addresses"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
