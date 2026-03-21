import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/pricing",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/compare/qr-tiger",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/compare/uniqode",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/compare/bitly-qr",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/guides/qr-codes-for-restaurants",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/guides/wifi-qr-code",
      lastModified: new Date("2026-03-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/guides/qr-codes-for-events",
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/use-cases/restaurant-menu",
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/use-cases/business-cards",
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/use-cases/real-estate",
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/use-cases/event-tickets",
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/use-cases/wifi",
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/use-cases/marketing",
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/guide",
      lastModified: new Date("2026-03-21"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
