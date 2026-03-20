import path from 'path';
import fs from 'fs';

const PLAN_DIR = path.join(process.cwd(), 'app', '30-day-sleep-plan');
const JSON_PATH = path.join(PLAN_DIR, '30day.json');

export interface PlanEntry {
  title: string;
  description: string;
  content: string;
  /** Optional thumbnail image URL (e.g. /go/30-day/intro/intro-1.png) */
  thumbnail?: string;
}

export type PlanConfig = Record<string, PlanEntry>;

export function getPlanConfig(): PlanConfig {
  const raw = fs.readFileSync(JSON_PATH, 'utf-8');
  return JSON.parse(raw) as PlanConfig;
}

export function getOrderedKeys(): string[] {
  const config = getPlanConfig();
  const order = ['intro', ...Array.from({ length: 30 }, (_, i) => `day-${i + 1}`), 'conclusion'];
  return order.filter((key) => key in config);
}

export function getPlanEntry(day: string): PlanEntry | null {
  const config = getPlanConfig();
  return config[day] ?? null;
}

export function readPlanContent(relativePath: string): string {
  const fullPath = path.join(PLAN_DIR, relativePath);
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch {
    return '';
  }
}
