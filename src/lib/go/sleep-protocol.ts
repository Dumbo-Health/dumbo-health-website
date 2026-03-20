import fs from "fs";
import path from "path";

const SLEEP_PROTOCOL_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "go",
  "sleep-protocol"
);
const SLEEP_PROTOCOL_DATA_DIR = path.join(SLEEP_PROTOCOL_DIR, "data");

export interface SleepProtocolDigestItem {
  title: string;
  target_audience?: string[];
  tldr?: string;
  summary: string;
  why_it_matters?: string;
  author: string;
  cta: {
    anchor: string;
    url: string;
  };
}

export interface SleepProtocolActionable {
  text: string;
  target_audience?: string[];
}

export interface SleepProtocolEntry {
  slug: string;
  date?: string;
  meta_title?: string;
  title: string;
  intro: string;
  keywords?: string[];
  meta_description?: string;
  transcription_for_ai?: string;
  audio_file?: string;
  digest: SleepProtocolDigestItem[];
  actionables: SleepProtocolActionable[] | string[];
}

export type SleepProtocolVersions = Record<
  string,
  {
    title: string;
    changes: string[];
  }
>;

export interface SleepProtocolTip {
  title: string;
  description: string;
  source?: string;
  image_src?: string;
  cta?: {
    anchor: string;
    url: string;
  };
}

export type SleepProtocolTips = Record<string, Record<string, SleepProtocolTip[]>>;

function readJsonFile<T>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function getAllSleepProtocolDates(): string[] {
  if (!fs.existsSync(SLEEP_PROTOCOL_DATA_DIR)) {
    return [];
  }

  return fs
    .readdirSync(SLEEP_PROTOCOL_DATA_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""))
    .sort()
    .reverse();
}

export function getAllSleepProtocols(): SleepProtocolEntry[] {
  return getAllSleepProtocolDates()
    .map((date) => getSleepProtocolByDate(date))
    .filter((entry): entry is SleepProtocolEntry => Boolean(entry));
}

export function getSleepProtocolByDate(date: string): SleepProtocolEntry | null {
  const entry = readJsonFile<SleepProtocolEntry>(
    path.join(SLEEP_PROTOCOL_DATA_DIR, `${date}.json`)
  );

  if (!entry) return null;
  return { ...entry, date };
}

export function getSleepProtocolBySlug(slug: string): SleepProtocolEntry | null {
  for (const date of getAllSleepProtocolDates()) {
    const entry = getSleepProtocolByDate(date);
    if (entry?.slug === slug) {
      return entry;
    }
  }

  return null;
}

export function getSleepProtocolByEntry(entry: string): SleepProtocolEntry | null {
  const isDate = /^\d{4}-\d{2}-\d{2}$/.test(entry);
  return isDate ? getSleepProtocolByDate(entry) : getSleepProtocolBySlug(entry);
}

export function getSleepProtocolStaticParams() {
  const params: Array<{ date: string }> = [];

  for (const date of getAllSleepProtocolDates()) {
    const entry = getSleepProtocolByDate(date);
    if (!entry) continue;
    params.push({ date });
    params.push({ date: entry.slug });
  }

  return params;
}

export function getSleepProtocolVersions(): SleepProtocolVersions {
  return (
    readJsonFile<SleepProtocolVersions>(path.join(SLEEP_PROTOCOL_DIR, "versions.json")) ?? {}
  );
}

export function getSleepProtocolTips(): SleepProtocolTips {
  return readJsonFile<SleepProtocolTips>(path.join(SLEEP_PROTOCOL_DIR, "tips.json")) ?? {};
}
