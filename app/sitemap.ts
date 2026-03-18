import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://oneqr.sh",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://oneqr.sh/pricing",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://oneqr.sh/compare/qr-tiger",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://oneqr.sh/compare/uniqode",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://oneqr.sh/compare/bitly-qr",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://oneqr.sh/guides/qr-codes-for-restaurants",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://oneqr.sh/guides/wifi-qr-code",
      lastModified: new Date("2026-03-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
