import { getAllAtHomeSleepTestSlugs } from "./at-home-sleep-test";

const FIND_SLUG_PREFIX = "sleep-doctor-";

export async function getAllFindSlugs(): Promise<string[]> {
  const atHomeSlugs = await getAllAtHomeSleepTestSlugs();
  return atHomeSlugs.map((slug) => `${FIND_SLUG_PREFIX}${slug}`).sort();
}
