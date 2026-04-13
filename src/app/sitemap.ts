import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllAtHomeSleepTestSlugs } from "@/lib/go/at-home-sleep-test";
import { getAllSleepProtocols } from "@/lib/go/sleep-protocol";
import { getSleepPlanOrderedKeys } from "@/lib/go/sleep-plan";
import { getBlogPosts } from "@/lib/supabase";

const baseUrl = "https://www.dumbo.health";

// Routes excluded from sitemap (redirects, notFound, private, or not indexable)
const EXCLUDED_SEGMENTS = new Set([
  "admin",
  "coming-soon",
  "internal",
  "upload",
  "cpap-care",              // redirects to /cpap
  "oral-appliance-therapy", // notFound
  "resupply",               // redirects
  "learn",                  // redirects to /resources/facts
  "pricing",                // redirects to /cpap
]);

// Priority overrides for known high-value pages
const PRIORITY_MAP: Record<string, number> = {
  "/": 1.0,
  "/solutions": 0.9,
  "/at-home-sleep-test": 0.9,
  "/cpap": 0.9,
  "/get-your-at-home-sleep-apnea-test": 0.8,
  "/get-started": 0.8,
  "/pricing": 0.8,
  "/blog": 0.8,
  "/dot-sleep-apnea-testing": 0.8,
  "/sleep-test": 0.8,
  "/resources/facts": 0.8,
  "/go/tools": 0.8,
  "/go/sleep-protocol": 0.8,
  "/go/tools/ai-sleep-consultant": 0.8,
  "/go/tools/cpap-mask-selector-quiz": 0.8,
  "/go/tools/sleep-diary": 0.8,
  "/go/at-home-sleep-test": 0.8,
};

// Change frequency overrides
const FREQ_MAP: Record<string, MetadataRoute.Sitemap[number]["changeFrequency"]> = {
  "/": "weekly",
  "/blog": "weekly",
  "/learn": "weekly",
  "/go": "weekly",
  "/go/tools": "weekly",
  "/go/sleep-hub": "weekly",
  "/privacy-policy": "yearly",
  "/terms-of-use": "yearly",
  "/medical-review-policy": "yearly",
};

function getPriority(route: string): number {
  if (PRIORITY_MAP[route] !== undefined) return PRIORITY_MAP[route];
  const depth = route.split("/").filter(Boolean).length;
  if (depth <= 1) return 0.8;
  if (depth === 2) return 0.7;
  return 0.6;
}

function getFrequency(route: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  return FREQ_MAP[route] ?? "monthly";
}

function discoverStaticRoutes(): string[] {
  const appDir = path.join(process.cwd(), "src", "app");
  const routes: string[] = [];

  function walk(dir: string, urlPath: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const hasPage = entries.some(
      (e) => e.isFile() && (e.name === "page.tsx" || e.name === "page.ts" || e.name === "page.js")
    );

    if (hasPage) {
      routes.push(urlPath || "/");
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const segment = entry.name;
      // Skip: route groups (parentheses), dynamic segments (brackets), excluded paths
      if (
        segment.startsWith("(") ||
        segment.startsWith("[") ||
        EXCLUDED_SEGMENTS.has(segment)
      ) continue;
      walk(path.join(dir, segment), `${urlPath}/${segment}`);
    }
  }

  walk(appDir, "");
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = discoverStaticRoutes().map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: getFrequency(route),
    priority: getPriority(route),
  }));

  const sleepProtocolPages = (await getAllSleepProtocols()).map((protocol) => ({
    url: `${baseUrl}/go/sleep-protocol/${protocol.slug}`,
    lastModified: protocol.date ? new Date(protocol.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const atHomeSleepTestPages = (await getAllAtHomeSleepTestSlugs()).map((slug) => ({
    url: `${baseUrl}/go/at-home-sleep-test/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const sleepPlanPages = getSleepPlanOrderedKeys().map((day) => ({
    url: `${baseUrl}/go/30-day-sleep-plan/${day}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let blogPostPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogPostPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Supabase unavailable at build time — skip blog posts
  }

  // Blog author pages — match Webflow site authors
  const authors = ["alex-carter", "kaila-caldwell", "nicky-charles-peters"].map((author) => ({
    url: `${baseUrl}/blog-author/${author}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  const categories = ["sleep-tracking", "sleep-apnea", "sleep-disorders", "cpap"].map((cat) => ({
    url: `${baseUrl}/blog-category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...blogPostPages,
    ...sleepProtocolPages,
    ...atHomeSleepTestPages,
    ...sleepPlanPages,
    ...authors,
    ...categories,
  ];
}
