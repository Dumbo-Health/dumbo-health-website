import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Private / utility routes
          "/admin",
          "/api",
          "/upload",
          "/coming-soon",
          "/internal",
          // Static asset directories — no crawl budget value
          "/_next/",
          // Programmatic sub-paths not ready for indexing
          "/go/alternative-to/",
          "/go/cost-of/",
          "/go/sleep-clinics/",
        ],
      },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: "https://www.dumbo.health/sitemap.xml",
  };
}
