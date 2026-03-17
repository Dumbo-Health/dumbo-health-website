"use client";

import Link from 'next/link';
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface PrimaryCTASectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function PrimaryCTASection({
  title,
  subtitle,
  ctaText,
  ctaLink
}: PrimaryCTASectionProps) {
  const ctaSection = useScrollAnimation({ delay: 0 });
  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12 bg-light">
      <div className="max-w-7xl mx-auto w-full">
        <div ref={ctaSection.ref} className={`bg-orange rounded-2xl p-8 lg:p-12 ${ctaSection.animationClasses}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-weight-500 text-white leading-tight font-nohemi" dangerouslySetInnerHTML={{ __html: title }} />

              <p className="text-lg lg:text-xl text-white opacity-90 leading-relaxed max-w-4xl font-aeonik" dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>

            {/* Right CTA Button */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href={ctaLink}
                className="inline-block bg-white text-primary hover:bg-gray-50 transition-colors duration-200 font-medium px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl font-button text-center"
              >
                {ctaText.toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
