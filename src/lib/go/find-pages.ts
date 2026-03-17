import { getAllAtHomeSleepTestSlugs } from "./at-home-sleep-test";

const FIND_SLUG_PREFIX = "sleep-doctor-";

export function getAllFindSlugs(): string[] {
  const atHomeSlugs = getAllAtHomeSleepTestSlugs();
  return atHomeSlugs.map((slug) => `${FIND_SLUG_PREFIX}${slug}`).sort();
}
