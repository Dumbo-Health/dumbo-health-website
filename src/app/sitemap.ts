import type { MetadataRoute } from "next";
import {
  getAllAtHomeSleepTestSlugs,
} from "@/lib/go/at-home-sleep-test";
import {
  getAllSleepProtocols,
} from "@/lib/go/sleep-protocol";
import {
  getSleepPlanOrderedKeys,
} from "@/lib/go/sleep-plan";
import { getBlogPosts } from "@/lib/supabase";

const baseUrl = "https://www.dumbo.health";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sleepProtocolPages = getAllSleepProtocols().map((protocol) => ({
    url: `${baseUrl}/go/sleep-protocol/${protocol.slug}`,
    lastModified: protocol.date ? new Date(protocol.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const atHomeSleepTestPages = getAllAtHomeSleepTestSlugs().map((slug) => ({
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

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/at-home-sleep-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/dot-sleep-apnea-testing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sleep-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/watchpat-one-set-up`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/cpap`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/medical-review-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/faqs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/resources/facts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-use`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/go`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/go/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/go/tools/cpap-mask-selector-quiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/go/tools/sleep-diary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/go/tools/dream-interpreter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/go/tools/sleep-mate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/go/tools/sleep-sound-check`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/go/tools/sleep-schedule-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/go/tools/ahi-index-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/go/tools/ai-sleep-consultant`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/go/tools/ess-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/go/30-day-sleep-plan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/go/sleep-protocol`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/go/sleep-hub`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/go/ebook/free-cpap-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/get-your-at-home-sleep-apnea-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Symptom landing pages
    { url: `${baseUrl}/always-tired`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cant-focus`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/loud-snoring`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/anxiety-and-stress`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/low-sex-drive`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/hard-to-lose-weight`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/high-blood-pressure`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/constantly-getting-sick`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

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

  return [...staticPages, ...blogPostPages, ...sleepProtocolPages, ...atHomeSleepTestPages, ...sleepPlanPages, ...authors, ...categories];
}
