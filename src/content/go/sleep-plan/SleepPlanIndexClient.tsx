'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryCTASection from '@/components/go/legacy/sections/PrimaryCTASection';
import { EmailCaptureProvider, useEmailCapture } from '@/components/EmailCaptureProvider';
import type { PlanConfig } from './lib/planLoader';

interface SleepPlanIndexClientProps {
  config: PlanConfig;
  keys: string[];
}

function CardPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="aspect-[4/3] w-full bg-primary/10 flex items-center justify-center rounded-t-lg"
      aria-hidden
    >
      <span className="text-primary/40 font-heading font-medium text-sm uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function SleepPlanIndexContent({ config, keys }: SleepPlanIndexClientProps) {
  const { ensureEmailCapture, hasCapturedEmail } = useEmailCapture();
  const router = useRouter();

  const handleUnlockAll = useCallback(async () => {
    await ensureEmailCapture({
      heading: 'Unlock the Full 30-Day Sleep Plan',
      description: 'Enter your email to unlock all 30 days and get practical, evidence-based sleep steps.',
      successHeadline: 'You are in! 🎉',
      successMessage: 'The full 30-day plan is now unlocked.',
      metadata: {
        page: '30-day-sleep-plan',
        action: 'unlock-all',
      },
    });
  }, [ensureEmailCapture]);

  const handleLockedCardClick = useCallback(
    async (href: string) => {
      await ensureEmailCapture({
        heading: 'Unlock Full Daily Plans',
        description: 'Share your email to unlock all daily steps, worksheets, and implementation details.',
        successHeadline: 'Unlocked ✅',
        successMessage: 'You now have full access to the 30-day plan.',
        metadata: {
          page: '30-day-sleep-plan',
          action: 'open-locked-day',
          destination: href,
        },
      });
      router.push(href);
    },
    [ensureEmailCapture, router]
  );

  return (
    <div className="min-h-screen bg-light">
      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">
            Dumbo Health 30-Day Sleep Improvement Plan
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-aeonik max-w-2xl mx-auto">
            Build better sleep in 30 days with evidence-based steps. One small action per day - no overwhelm, just progress.
          </p>
          {!hasCapturedEmail && (
            <div className="mt-8">
              <button
                onClick={handleUnlockAll}
                className="inline-flex items-center justify-center rounded-lg bg-orange px-6 py-3 text-white font-semibold font-aeonik hover:bg-orange-dark transition-colors"
              >
                Unlock Full 30-Day Plan
              </button>
              <p className="text-white/75 text-sm mt-3 font-aeonik">
                Free access after a quick email signup.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* What is this */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary mb-6">
          What is the 30-Day Sleep Plan?
        </h2>
        <p className="text-primary text-base sm:text-lg leading-relaxed font-aeonik mb-6">
          This program is built on Cognitive Behavioral Therapy for Insomnia (CBT-I), the gold standard for sleep issues.
          It does not force sleep - it helps you change your habits and your relationship with rest.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white rounded-lg border border-primary/10 p-4 sm:p-5">
            <span className="text-orange font-heading font-medium text-sm uppercase tracking-wider block mb-2">Week 1</span>
            <h3 className="font-heading font-semibold text-primary mb-1">Building Your Foundation</h3>
            <p className="text-primary/80 text-sm leading-relaxed">Consistent wake time, sleep diary, and a sleep-friendly environment.</p>
          </div>
          <div className="bg-white rounded-lg border border-primary/10 p-4 sm:p-5">
            <span className="text-orange font-heading font-medium text-sm uppercase tracking-wider block mb-2">Week 2</span>
            <h3 className="font-heading font-semibold text-primary mb-1">Sleep-Bed Connection</h3>
            <p className="text-primary/80 text-sm leading-relaxed">Retrain your brain so your bed signals sleep, not wakefulness.</p>
          </div>
          <div className="bg-white rounded-lg border border-primary/10 p-4 sm:p-5">
            <span className="text-orange font-heading font-medium text-sm uppercase tracking-wider block mb-2">Week 3</span>
            <h3 className="font-heading font-semibold text-primary mb-1">Calming Your Mind</h3>
            <p className="text-primary/80 text-sm leading-relaxed">Manage worry and racing thoughts so you can wind down.</p>
          </div>
          <div className="bg-white rounded-lg border border-primary/10 p-4 sm:p-5">
            <span className="text-orange font-heading font-medium text-sm uppercase tracking-wider block mb-2">Week 4</span>
            <h3 className="font-heading font-semibold text-primary mb-1">Lock In Long-Term Success</h3>
            <p className="text-primary/80 text-sm leading-relaxed">Fine-tune your routine and build habits that last.</p>
          </div>
        </div>
      </section>

      {/* Calendar-style cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary mb-2">
          Your 30-day journey
        </h2>
        <p className="text-primary/80 font-aeonik mb-8">
          Start with the intro, then follow each day in order. You can revisit any day anytime.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {keys.map((slug, index) => {
            const entry = config[slug];
            if (!entry) return null;
            const href = `/30-day-sleep-plan/${slug}`;
            const label = slug === 'intro' ? 'Intro' : slug === 'conclusion' ? 'Done' : slug.replace('day-', 'Day ');
            const isLocked = !hasCapturedEmail && index > 3;
            const cardClass = 'group block bg-white rounded-lg border border-primary/10 overflow-hidden shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2';

            if (isLocked) {
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => handleLockedCardClick(href)}
                  className={`${cardClass} text-left relative`}
                >
                  <div className="aspect-[4/3] w-full relative bg-primary/5 overflow-hidden">
                    {entry.thumbnail ? (
                      <Image
                        src={entry.thumbnail}
                        alt=""
                        fill
                        className="object-cover blur-[2px] scale-[1.02]"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    ) : (
                      <div className="blur-[2px]">
                        <CardPlaceholder label={label} />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-heading font-medium px-2 py-0.5 rounded">
                      {label}
                    </span>
                  </div>
                  <div className="p-3 sm:p-4 blur-[2px]">
                    <h3 className="font-heading font-semibold text-primary text-sm sm:text-base leading-snug line-clamp-2">
                      {entry.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/35">
                    <span className="rounded-full bg-white px-3 py-1 text-xs sm:text-sm font-semibold text-primary font-aeonik">
                      Unlock to View
                    </span>
                  </div>
                </button>
              );
            }

            return (
              <Link key={slug} href={href} className={cardClass}>
                <div className="aspect-[4/3] w-full relative bg-primary/5 overflow-hidden">
                  {entry.thumbnail ? (
                    <Image
                      src={entry.thumbnail}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-200"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  ) : (
                    <CardPlaceholder label={label} />
                  )}
                  <span className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-heading font-medium px-2 py-0.5 rounded">
                    {label}
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-heading font-semibold text-primary text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-orange transition-colors">
                    {entry.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <PrimaryCTASection
        title="Think you might have sleep apnea?"
        subtitle="Dumbo Health offers at-home sleep testing, diagnosis, and ongoing care for sleep apnea-at a fraction of traditional clinic costs."
        ctaText="Start your assessment"
        ctaLink="/get-started"
      />
    </div>
  );
}

export default function SleepPlanIndexClient(props: SleepPlanIndexClientProps) {
  return (
    <EmailCaptureProvider
      defaults={{
        metadata: {
          page: '30-day-sleep-plan',
        },
      }}
    >
      <SleepPlanIndexContent {...props} />
    </EmailCaptureProvider>
  );
}
