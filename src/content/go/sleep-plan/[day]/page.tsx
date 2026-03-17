import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getOrderedKeys,
  getPlanEntry,
  readPlanContent,
} from '../lib/planLoader';
import SleepPlanDayClient from './SleepPlanDayClient';

interface PageProps {
  params: Promise<{ day: string }>;
}

export function generateStaticParams() {
  const keys = getOrderedKeys();
  return keys.map((day) => ({ day }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { day } = await params;
  const entry = getPlanEntry(day);
  if (!entry) {
    return { title: '30 Day Sleep Plan | Dumbo Health' };
  }
  const title = `${entry.title} | 30 Day Sleep Plan | Dumbo Health`;
  const description = entry.description || 'Part of the Dumbo Health 30 Day Sleep Plan.';
  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: { title, description, type: 'article' },
  };
}

export default async function SleepPlanDayPage({ params }: PageProps) {
  const { day } = await params;
  const entry = getPlanEntry(day);
  if (!entry) notFound();

  const content = readPlanContent(entry.content);
  const keys = getOrderedKeys();
  const currentIndex = keys.indexOf(day);
  const prevSlug = currentIndex > 0 ? keys[currentIndex - 1] : null;
  const nextSlug = currentIndex >= 0 && currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null;

  return (
    <SleepPlanDayClient
      day={day}
      entry={entry}
      content={content}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
    />
  );
}
