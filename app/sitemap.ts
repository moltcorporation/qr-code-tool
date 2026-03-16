import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://qdot.sh",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://qdot.sh/pricing",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
