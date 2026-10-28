import type { MetadataRoute } from "next";
import { products } from "@/lib/store/catalog";
import { publishers } from "@/lib/data";
import { newsArticles } from "@/lib/news";
import { researchItems } from "@/lib/research";
import { digitalSolutions } from "@/lib/digital-solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubh.ae").replace(/\/$/, "");
  const staticRoutes = [
    "", "/about-us", "/shop", "/shop/products", "/publications", "/publishers",
    "/institutions", "/digital-solutions", "/ai-solutions", "/research", "/news",
    "/contact-us", "/help", "/privacy-policy", "/terms", "/accessibility", "/publish-with-us",
  ];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of ["en", "ar"] as const) {
    for (const route of staticRoutes) {
      entries.push({ url: `${base}/${locale}${route}`, changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/shop" ? 0.9 : 0.65 });
    }
    for (const product of products) entries.push({ url: `${base}/${locale}/shop/${product.slug}`, changeFrequency: "monthly", priority: 0.7 });
    for (const publisher of publishers) entries.push({ url: `${base}/${locale}/publishers/${publisher.slug}`, changeFrequency: "monthly", priority: 0.55 });
    for (const article of newsArticles) entries.push({ url: `${base}/${locale}/news/${article.slug}`, lastModified: new Date(`${article.date}T00:00:00.000Z`), changeFrequency: "yearly", priority: 0.45 });
    for (const item of researchItems) entries.push({ url: `${base}/${locale}/research/${item.slug}`, lastModified: new Date(`${item.date}T00:00:00.000Z`), changeFrequency: "yearly", priority: 0.45 });
    for (const solution of digitalSolutions) entries.push({ url: `${base}/${locale}/digital-solutions/${solution.slug}`, changeFrequency: "monthly", priority: 0.5 });
  }
  return entries;
}
