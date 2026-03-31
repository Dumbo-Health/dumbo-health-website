import fs from "fs";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SLEEP_PROTOCOL_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "go",
  "sleep-protocol"
);

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

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars are not set");
  _client = createClient(url, key);
  return _client;
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
}

function rowToEntry(row: Record<string, unknown>): SleepProtocolEntry {
  return {
    slug: row.slug as string,
    date: row.date as string | undefined,
    meta_title: row.meta_title as string | undefined,
    meta_description: row.meta_description as string | undefined,
    title: row.title as string,
    intro: row.intro as string,
    keywords: row.keywords as string[] | undefined,
    transcription_for_ai: row.transcription_for_ai as string | undefined,
    audio_file: row.audio_file as string | undefined,
    digest: row.digest as SleepProtocolDigestItem[],
    actionables: row.actionables as SleepProtocolActionable[],
  };
}

export async function getAllSleepProtocolDates(): Promise<string[]> {
  const { data, error } = await getClient()
    .from("go_sleep_protocol_entries")
    .select("date")
    .eq("is_published", true)
    .order("date", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => row.date as string);
}

export async function getAllSleepProtocols(): Promise<SleepProtocolEntry[]> {
  const { data, error } = await getClient()
    .from("go_sleep_protocol_entries")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: false });

  if (error || !data) return [];
  return data.map(rowToEntry);
}

export async function getSleepProtocolByDate(date: string): Promise<SleepProtocolEntry | null> {
  const { data, error } = await getClient()
    .from("go_sleep_protocol_entries")
    .select("*")
    .eq("date", date)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return rowToEntry(data as Record<string, unknown>);
}

export async function getSleepProtocolBySlug(slug: string): Promise<SleepProtocolEntry | null> {
  const { data, error } = await getClient()
    .from("go_sleep_protocol_entries")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return rowToEntry(data as Record<string, unknown>);
}

export async function getSleepProtocolByEntry(entry: string): Promise<SleepProtocolEntry | null> {
  const isDate = /^\d{4}-\d{2}-\d{2}$/.test(entry);
  return isDate ? getSleepProtocolByDate(entry) : getSleepProtocolBySlug(entry);
}

export async function getSleepProtocolStaticParams(): Promise<Array<{ date: string }>> {
  const { data, error } = await getClient()
    .from("go_sleep_protocol_entries")
    .select("date, slug")
    .eq("is_published", true);

  if (error || !data) return [];

  const params: Array<{ date: string }> = [];
  for (const row of data) {
    params.push({ date: row.date as string });
    params.push({ date: row.slug as string });
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
