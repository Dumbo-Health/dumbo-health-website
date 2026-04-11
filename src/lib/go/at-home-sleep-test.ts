import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface AtHomeSleepTestPageData {
  slug?: string;
  location_type?: "city" | "state";
  formatted_location?: string;
  city?: string;
  state?: string;
  state_slug?: string;
  city_slug?: string;
  meta_title?: string;
  meta_description?: string;
  hero_headline?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_primary_cta_anchor?: string;
  hero_primary_cta_link?: string;
  hero_secondary_cta_anchor?: string;
  hero_secondary_cta_link?: string;
  hero_image_src?: string;
  hero_image_alt?: string;
  quick_facts?: {
    headline?: string;
    title?: string;
    facts?: Array<{
      label: string;
      value: string;
      detail?: string;
    }>;
  };
  medical_review?: {
    headline?: string;
    badge_text?: string;
    last_updated?: string;
    medical_team?: Array<{ name: string; imageSrc?: string; imageAlt?: string }>;
    scientific_team?: Array<{ name: string; imageSrc?: string; imageAlt?: string }>;
    certifications?: string[];
    cta_text?: string;
    cta_link?: string;
  };
  local_relevance_headline?: string;
  local_relevance_title?: string;
  local_relevance_subtitle?: string;
  local_relevance_check_1?: string;
  local_relevance_check_2?: string;
  local_relevance_check_3?: string;
  local_relevance_image_src?: string;
  local_relevance_image_alt?: string;
  local_relevance_reverse_flex?: boolean;
  how_it_works_headline?: string;
  how_it_works_title?: string;
  how_it_works_subtitle?: string;
  how_it_works_steps?: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  how_it_works_cta_text?: string;
  how_it_works_cta_link?: string;
  price_transparency_headline?: string;
  price_transparency_title?: string;
  price_transparency_subtitle?: string;
  price_transparency_check_1?: string;
  price_transparency_check_2?: string;
  price_transparency_check_3?: string;
  price_transparency_image_src?: string;
  price_transparency_image_alt?: string;
  price_transparency_reverse_flex?: boolean;
  trust_badges_headline?: string;
  trust_badges_title?: string;
  trust_badges_subtitle?: string;
  trust_badges_check_1?: string;
  trust_badges_check_2?: string;
  trust_badges_check_3?: string;
  trust_badges_check_4?: string;
  trust_badges_check_5?: string;
  trust_badges_image_src?: string;
  trust_badges_image_alt?: string;
  trust_badges_reverse_flex?: boolean;
  comparison_title?: string;
  comparison_subtitle_1?: string;
  comparison_subtitle_2?: string;
  comparison_table_header?: string;
  comparison_small_note?: string;
  comparison_text_footer?: string;
  comparison_cta_text?: string;
  comparison_cta_link?: string;
  comparison_data?: Array<{ category: string; traditional: string | boolean; dumbo: string | boolean }>;
  map_title?: string;
  map_subtitle?: string;
  map_cta_title?: string;
  map_cta_subtitle?: string;
  map_phone_label?: string;
  map_features?: string[];
  map_schedule_text?: string;
  bounding_box?: {
    min_lat: string;
    max_lat: string;
    min_lon: string;
    max_lon: string;
    center_lat?: string;
    center_lon?: string;
    zoom?: string;
  };
  city_data?: { phone_number?: string; latitude?: number; longitude?: number; zoom?: number };
  state_data?: { phone_number?: string; latitude?: number; longitude?: number; zoom?: number };
  testimonial_title?: string;
  testimonials?: Array<{
    quote: string;
    name: string;
    title?: string;
    credential?: string;
    rating?: number;
  }>;
  testimonial_bottom_tagline?: string;
  faq_title?: string;
  faq_subtitle?: string;
  faqs?: Array<{ question: string; answer: string }>;
  final_cta_title?: string;
  final_cta_subtitle?: string;
  final_cta_button_anchor?: string;
  final_cta_button_link?: string;
  cities_served?: Array<{
    text: string;
    link: string;
    image_src?: string;
    image_alt?: string;
  }>;
  solution_slug?: string;
  interlink_heading?: { city_level?: string };
  [key: string]: unknown;
}

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars are not set");
  _client = createClient(url, key);
  return _client;
}

export async function getAllAtHomeSleepTestSlugs(): Promise<string[]> {
  const { data, error } = await getClient()
    .from("go_at_home_sleep_test_pages")
    .select("slug")
    .eq("is_published", true)
    .order("slug", { ascending: true });

  if (error || !data) return [];
  return data.map((row) => row.slug as string);
}

export async function getAtHomeSleepTestStates(): Promise<
  Array<{ slug: string; state: string; formatted_location: string; city_count?: number }>
> {
  const { data, error } = await getClient()
    .from("go_at_home_sleep_test_pages")
    .select("slug,state,formatted_location")
    .eq("is_published", true)
    .eq("location_type", "state")
    .order("state", { ascending: true });

  if (error || !data) return [];
  return data as Array<{ slug: string; state: string; formatted_location: string }>;
}

export async function getAtHomeSleepTestPage(slug: string): Promise<AtHomeSleepTestPageData | null> {
  const { data, error } = await getClient()
    .from("go_at_home_sleep_test_pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return data as AtHomeSleepTestPageData;
}
