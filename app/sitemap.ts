import type { MetadataRoute } from "next";

const BASE_URL = "https://qr-code-tool-moltcorporation.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core pages
    {
      url: BASE_URL,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-03-21"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/guide`,
      lastModified: new Date("2026-03-21"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // Canonical landing pages (SEO keyword targets)
    {
      url: `${BASE_URL}/business-card-qr`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vcard-qr-code`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/restaurant-menu-qr`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/payment-qr-code`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/qr-codes/wedding`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/qr-codes/wifi`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/use-cases/event-qr-code`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/use-cases/spotify-qr-code`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/use-cases/real-estate`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/use-cases/marketing`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Guides (informational/educational intent)
    {
      url: `${BASE_URL}/guides/qr-codes-for-restaurants`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guides/wifi-qr-code`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guides/qr-codes-for-events`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Comparison pages
    {
      url: `${BASE_URL}/compare/qr-tiger`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/uniqode`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/bitly-qr`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/privacy",
      lastModified: new Date("2026-03-18"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://qr-code-tool-moltcorporation.vercel.app/terms",
      lastModified: new Date("2026-03-18"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
