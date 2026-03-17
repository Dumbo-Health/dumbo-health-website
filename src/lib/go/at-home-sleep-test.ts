import fs from "fs";
import path from "path";

const AT_HOME_SLEEP_TEST_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "go",
  "at-home-sleep-test",
  "pages"
);
const FILE_PREFIX = "at-home-sleep-test-";

export interface AtHomeSleepTestPageData {
  meta_title?: string;
  meta_description?: string;
  hero_headline?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_primary_cta_anchor?: string;
  hero_primary_cta_link?: string;
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
    medical_team?: Array<{ name: string }>;
    scientific_team?: Array<{ name: string }>;
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
  trust_badges_headline?: string;
  trust_badges_title?: string;
  trust_badges_subtitle?: string;
  trust_badges_check_1?: string;
  trust_badges_check_2?: string;
  trust_badges_check_3?: string;
  trust_badges_check_4?: string;
  trust_badges_check_5?: string;
  map_title?: string;
  map_subtitle?: string;
  map_cta_title?: string;
  map_cta_subtitle?: string;
  map_phone_label?: string;
  map_features?: string[];
  map_schedule_text?: string;
  testimonial_title?: string;
  testimonials?: Array<{
    quote: string;
    name: string;
    title?: string;
    credential?: string;
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
  }>;
  location_type?: "city" | "state";
  formatted_location?: string;
  final_url?: string;
  [key: string]: unknown;
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function getAllAtHomeSleepTestSlugs(): string[] {
  if (!fs.existsSync(AT_HOME_SLEEP_TEST_DIR)) {
    return [];
  }

  return fs
    .readdirSync(AT_HOME_SLEEP_TEST_DIR)
    .filter((file) => file.startsWith(FILE_PREFIX) && file.endsWith(".json"))
    .map((file) => file.replace(FILE_PREFIX, "").replace(/\.json$/, ""))
    .sort();
}

export function getAtHomeSleepTestPage(slug: string): AtHomeSleepTestPageData | null {
  return readJsonFile<AtHomeSleepTestPageData>(
    path.join(AT_HOME_SLEEP_TEST_DIR, `${FILE_PREFIX}${slug}.json`)
  );
}
