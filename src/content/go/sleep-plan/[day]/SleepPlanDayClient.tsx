'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import PrimaryCTASection from '@/components/go/legacy/sections/PrimaryCTASection';
import { EmailCaptureProvider, useEmailCapture } from '@/components/EmailCaptureProvider';
import type { PlanEntry } from '../lib/planLoader';

interface SleepPlanDayClientProps {
  day: string;
  entry: PlanEntry;
  content: string;
  prevSlug: string | null;
  nextSlug: string | null;
}

function splitPreviewAndLockedContent(html: string): { preview: string; locked: string } {
  if (!html) {
    return { preview: '', locked: '' };
  }

  const paragraphCloseTag = '</p>';
  let cursor = 0;
  let paragraphCount = 0;

  while (paragraphCount < 2) {
    const idx = html.indexOf(paragraphCloseTag, cursor);
    if (idx === -1) break;
    cursor = idx + paragraphCloseTag.length;
    paragraphCount += 1;
  }

  if (cursor === 0) {
    const previewChars = 900;
    const fallbackPreview = html.slice(0, previewChars);
    const fallbackLocked = html.slice(previewChars);
    return { preview: fallbackPreview, locked: fallbackLocked };
  }

  return {
    preview: html.slice(0, cursor),
    locked: html.slice(cursor),
  };
}

function SleepPlanDayContent({ day, entry, content, prevSlug, nextSlug }: SleepPlanDayClientProps) {
  const { ensureEmailCapture, hasCapturedEmail } = useEmailCapture();
  const [isUnlocking, setIsUnlocking] = useState(false);

  const { preview, locked } = useMemo(() => splitPreviewAndLockedContent(content), [content]);
  const hasLockedSection = Boolean(locked.trim());
  const shouldGate = hasLockedSection && !hasCapturedEmail;

  const label = day === 'intro' ? 'Intro' : day === 'conclusion' ? 'Conclusion' : day.replace('day-', 'Day ');

  const handleUnlock = async () => {
    setIsUnlocking(true);
    try {
      await ensureEmailCapture({
        heading: 'Unlock the Full 30-Day Sleep Plan',
        description: `Get full access to ${label} and the rest of the plan with one quick signup.`,
        successHeadline: 'Unlocked ✅',
        successMessage: 'You now have access to the full daily plan content.',
        metadata: {
          page: '30-day-sleep-plan-day',
          day,
          action: 'unlock-day-content',
        },
      });
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Hero */}
      <section className="bg-primary text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/80 font-aeonik flex-wrap">
              <li>
                <Link href="/30-day-sleep-plan" className="hover:text-white transition-colors">
                  30-Day Sleep Plan
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white font-medium">{label}</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3">{entry.title}</h1>
          {entry.description && (
            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-aeonik">{entry.description}</p>
          )}
          {entry.thumbnail && (
            <div className="mt-6 rounded-lg overflow-hidden bg-white/10">
              <Image
                src={entry.thumbnail}
                alt=""
                width={720}
                height={405}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {content ? (
          <div className="space-y-8">
            <div
              className="sleep-plan-content prose prose-primary max-w-none font-aeonik text-primary text-base sm:text-lg leading-relaxed
                prose-headings:font-heading prose-headings:text-primary prose-p:mb-4
                prose-a:text-orange prose-a:no-underline hover:prose-a:underline
                [&_iframe]:max-w-full [&_video]:max-w-full [&_embed]:max-w-full"
              dangerouslySetInnerHTML={{ __html: shouldGate ? preview : content }}
            />

            {shouldGate && (
              <div className="relative h-[320px] sm:h-[360px] overflow-hidden rounded-xl border border-primary/10 bg-white">
                <div className="absolute inset-x-0 top-4 z-20 flex justify-center px-4">
                  <div className="max-w-lg w-full rounded-xl border border-primary/10 bg-white shadow-xl p-5 text-center">
                    <h3 className="font-heading text-xl text-primary mb-2">Unlock the rest of this day</h3>
                    <p className="text-primary/80 font-aeonik text-sm mb-4">
                      Get full access to all daily steps and the complete 30-day plan.
                    </p>
                    <button
                      type="button"
                      onClick={handleUnlock}
                      disabled={isUnlocking}
                      className="inline-flex items-center justify-center rounded-lg bg-orange px-5 py-2.5 text-white font-semibold font-aeonik hover:bg-orange-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isUnlocking ? 'Unlocking...' : 'Unlock Full Content'}
                    </button>
                  </div>
                </div>

                <div
                  className="pointer-events-none select-none blur-[3px] opacity-85 sleep-plan-content prose prose-primary max-w-none font-aeonik text-primary text-base sm:text-lg leading-relaxed
                    prose-headings:font-heading prose-headings:text-primary prose-p:mb-4
                    prose-a:text-orange prose-a:no-underline"
                  aria-hidden
                  dangerouslySetInnerHTML={{ __html: locked }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-light/90 via-transparent to-light" />
              </div>
            )}
          </div>
        ) : (
          <div className="prose prose-primary max-w-none font-aeonik text-primary">
            <p className="text-primary/70">Content for this day is coming soon.</p>
          </div>
        )}

        <nav
          className="mt-10 pt-8 border-t border-primary/10 flex flex-row flex-wrap items-center justify-between gap-4"
          aria-label="Day navigation"
        >
          {prevSlug ? (
            <Link
              href={`/30-day-sleep-plan/${prevSlug}`}
              className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-medium font-aeonik transition-colors"
            >
              <span aria-hidden>←</span> Previous
            </Link>
          ) : (
            <span />
          )}
          <Link href="/30-day-sleep-plan" className="text-primary/70 hover:text-primary text-sm font-aeonik">
            All days
          </Link>
          {nextSlug ? (
            <Link
              href={`/30-day-sleep-plan/${nextSlug}`}
              className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-medium font-aeonik"
            >
              Next <span aria-hidden>→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </section>

      <PrimaryCTASection
        title="Think you might have sleep apnea?"
        subtitle="Dumbo Health offers at-home sleep testing, diagnosis, and ongoing care for sleep apnea-at a fraction of traditional clinic costs."
        ctaText="Start your assessment"
        ctaLink="https://app.dumbo.health/assessment"
      />
    </div>
  );
}

export default function SleepPlanDayClient(props: SleepPlanDayClientProps) {
  return (
    <EmailCaptureProvider
      defaults={{
        metadata: {
          page: '30-day-sleep-plan-day',
          day: props.day,
        },
      }}
    >
      <SleepPlanDayContent {...props} />
    </EmailCaptureProvider>
  );
}
