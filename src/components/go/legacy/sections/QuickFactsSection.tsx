"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface QuickFact {
  label: string;
  value: string;
  detail?: string;
}

interface QuickFactsSectionProps {
  headline?: string;
  title: string;
  facts: QuickFact[];
}

export default function QuickFactsSection({
  headline,
  title,
  facts
}: QuickFactsSectionProps) {
  const headerSection = useScrollAnimation({ delay: 0 });
  const factsSection = useScrollAnimation({ delay: 200 });

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12 bg-cream">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div ref={headerSection.ref} className={`text-center mb-12 ${headerSection.animationClasses}`}>
          {headline && (
            <div className="text-sm font-medium text-primary uppercase tracking-wider font-headline mb-4">
              {headline}
            </div>
          )}
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-weight-500 text-primary leading-tight font-nohemi">
            {title}
          </h2>
        </div>

        {/* Facts Grid */}
        <div 
          ref={factsSection.ref} 
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${factsSection.animationClasses}`}
        >
          {facts.map((fact, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-xs font-medium text-primary/60 uppercase tracking-wider mb-2 font-headline">
                {fact.label}
              </div>
              <div className="text-xl lg:text-2xl font-bold text-orange mb-1 font-nohemi">
                {fact.value}
              </div>
              {fact.detail ? (
                <div className="text-xs text-primary/70 font-aeonik leading-tight">
                  {fact.detail}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
