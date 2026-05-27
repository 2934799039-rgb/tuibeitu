import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const schools = [
    "bazi", "ziwei", "liuyao", "meihua", "qimen", "zhouyi",
    "tarot", "name", "phone", "daily", "yearly", "romance", "wealth", "career",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of siteConfig.locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          siteConfig.locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    });

    entries.push({
      url: `${baseUrl}/${locale}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });

    for (const school of schools) {
      entries.push({
        url: `${baseUrl}/${locale}/${school}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
