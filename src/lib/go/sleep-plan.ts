import fs from "fs";
import path from "path";

const SLEEP_PLAN_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "go",
  "sleep-plan"
);
const SLEEP_PLAN_JSON = path.join(SLEEP_PLAN_DIR, "30day.json");

export interface SleepPlanEntry {
  title: string;
  description: string;
  content: string;
  thumbnail?: string;
}

export type SleepPlanConfig = Record<string, SleepPlanEntry>;

export function getSleepPlanConfig(): SleepPlanConfig {
  return JSON.parse(fs.readFileSync(SLEEP_PLAN_JSON, "utf-8")) as SleepPlanConfig;
}

export function getSleepPlanOrderedKeys(): string[] {
  const config = getSleepPlanConfig();
  const order = [
    "intro",
    ...Array.from({ length: 30 }, (_, index) => `day-${index + 1}`),
    "conclusion",
  ];

  return order.filter((key) => key in config);
}

export function getSleepPlanEntry(day: string): SleepPlanEntry | null {
  const config = getSleepPlanConfig();
  return config[day] ?? null;
}

export function readSleepPlanContent(relativePath: string): string {
  const fullPath = path.join(SLEEP_PLAN_DIR, relativePath);
  try {
    return fs.readFileSync(fullPath, "utf-8");
  } catch {
    return "";
  }
}
