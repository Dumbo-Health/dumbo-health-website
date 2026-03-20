import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { calculateReadingTime } from "./reading-time";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars are not set");
  _client = createClient(url, key);
  return _client;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  profile_picture: string | null;
  short_bio: string | null;
  content: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  archived: boolean;
  draft: boolean;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
}

export interface ScientificCommitteeMember {
  id: string;
  full_name: string;
  slug: string;
  expertise_area: string | null;
  short_description: string | null;
  profile_picture: string | null;
  linkedin_url: string | null;
  display_order: number | null;
  archived: boolean;
  draft: boolean;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
}

export interface MedicalTeamMember {
  id: string;
  full_name: string;
  slug: string;
  expertise_area: string | null;
  short_description: string | null;
  profile_picture: string | null;
  linkedin_url: string | null;
  display_order: number | null;
  archived: boolean;
  draft: boolean;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
}

export interface BlogCategory {
  id: string;
  slug: string;
  label: string;
  display_order: number | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  short_description: string | null;
  main_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  category_slug: string | null;
  author_id: string | null;
  scientific_committee_slug: string | null;
  content: string | null;
  ai_summary: string | null;
  reading_time?: number; // minutes, computed from content
  archived: boolean;
  draft: boolean;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
  reviewer_name: string | null;
  reviewer_title: string | null;
  reviewer_slug: string | null;
  // Joined fields
  blog_authors?: BlogAuthor;
  blog_categories?: BlogCategory;
}

export interface FaqCategory {
  id: string;
  slug: string;
  label: string;
  display_order: number | null;
}

export interface Faq {
  id: string;
  question: string;
  slug: string;
  answer: string;
  category_slug: string | null;
  display_order: number | null;
  featured: boolean;
  archived: boolean;
  draft: boolean;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
  // Joined fields
  faq_categories?: FaqCategory;
}

// ─── Query helpers ────────────────────────────────────────────────────────────

/** Returns all published blog posts, newest first */
export async function getBlogPosts(categorySlug?: string) {
  let query = getClient()
    .from("blog_posts")
    .select("*, blog_authors(name, slug, profile_picture), blog_categories(slug, label)")
    .eq("archived", false)
    .eq("draft", false)
    .order("published_at", { ascending: false });

  if (categorySlug) {
    query = query.eq("category_slug", categorySlug);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as BlogPost[]).map((post) => ({
    ...post,
    reading_time: calculateReadingTime(post.content),
  }));
}

/** Returns a single published blog post by slug */
export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await getClient()
    .from("blog_posts")
    .select("*, blog_authors(name, slug, profile_picture, short_bio, role), blog_categories(slug, label)")
    .eq("slug", slug)
    .eq("archived", false)
    .single();

  if (error) throw error;
  const post = data as BlogPost;
  return { ...post, reading_time: calculateReadingTime(post.content) };
}

/** Returns up to 3 related posts (same category, excluding current slug) */
export async function getRelatedPosts(categorySlug: string | null, excludeSlug: string): Promise<BlogPost[]> {
  let query = getClient()
    .from("blog_posts")
    .select("*, blog_authors(name, slug, profile_picture), blog_categories(slug, label)")
    .eq("archived", false)
    .eq("draft", false)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(3);

  if (categorySlug) {
    query = query.eq("category_slug", categorySlug);
  }

  const { data, error } = await query;
  if (error) return [];
  return (data as BlogPost[]).map((post) => ({
    ...post,
    reading_time: calculateReadingTime(post.content),
  }));
}

/** Returns all blog categories ordered by display_order */
export async function getBlogCategories() {
  const { data, error } = await getClient()
    .from("blog_categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as BlogCategory[];
}

/** Returns all published FAQs, optionally filtered by category slug */
export async function getFaqs(categorySlug?: string) {
  let query = getClient()
    .from("faqs")
    .select("*, faq_categories(slug, label)")
    .eq("archived", false)
    .eq("draft", false)
    .order("display_order", { ascending: true, nullsFirst: false });

  if (categorySlug) {
    query = query.eq("category_slug", categorySlug);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Faq[];
}

/** Returns all FAQ categories ordered by display_order */
export async function getFaqCategories() {
  const { data, error } = await getClient()
    .from("faq_categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as FaqCategory[];
}

/** Returns all medical team members ordered by display_order */
export async function getMedicalTeam() {
  const { data, error } = await getClient()
    .from("medical_team")
    .select("*")
    .eq("archived", false)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as MedicalTeamMember[];
}

/** Returns all scientific committee members ordered by display_order */
export async function getScientificCommittee() {
  const { data, error } = await getClient()
    .from("scientific_committee")
    .select("*")
    .eq("archived", false)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as ScientificCommitteeMember[];
}

/** Returns all published posts by a given author id */
export async function getPostsByAuthorId(authorId: string): Promise<BlogPost[]> {
  const { data, error } = await getClient()
    .from("blog_posts")
    .select("*, blog_authors(name, slug, profile_picture), blog_categories(slug, label)")
    .eq("author_id", authorId)
    .eq("archived", false)
    .eq("draft", false)
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data as BlogPost[]).map((post) => ({
    ...post,
    reading_time: calculateReadingTime(post.content),
  }));
}

/** Returns all published authors */
export async function getAllAuthors(): Promise<BlogAuthor[]> {
  const { data, error } = await getClient()
    .from("blog_authors")
    .select("*")
    .eq("archived", false)
    .eq("draft", false)
    .order("name", { ascending: true });
  if (error) throw error;
  return data as BlogAuthor[];
}

/** Returns an author by slug */
export async function getAuthorBySlug(slug: string) {
  const { data, error } = await getClient()
    .from("blog_authors")
    .select("*, blog_posts(id, title, slug, short_description, main_image, published_at, category_slug)")
    .eq("slug", slug)
    .eq("archived", false)
    .single();

  if (error) throw error;
  return data as BlogAuthor & { blog_posts: BlogPost[] };
}
