"use client";

import Link from 'next/link';

interface Step {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  price?: string;
}

interface ArticleColumnProps {
  headline?: string;
  title: string;
  subtitle: string;
  steps: Step[];
  ctaText?: string;
  ctaLink?: string;
}

export default function ArticleColumn({
  headline,
  title,
  subtitle,
  steps,
  ctaText,
  ctaLink,
}: ArticleColumnProps) {
  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12 bg-light">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          {headline && (
            <div className="text-sm font-medium text-primary uppercase tracking-wider font-headline" dangerouslySetInnerHTML={{ __html: headline }} />
          )}

          <h2 className="text-xl lg:text-2xl xl:text-3xl font-weight-500 text-primary leading-tight font-nohemi" dangerouslySetInnerHTML={{ __html: title }} />

          <p className="text-lg text-primary opacity-75 leading-relaxed max-w-3xl mx-auto font-aeonik" dangerouslySetInnerHTML={{ __html: subtitle }} />
        </div>

        {/* Steps Grid */}
        <div className={`grid grid-cols-1 md:${steps.length == 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-8 mb-12`}>
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="h-full">
                {/* Image */}
                <div className="mb-6 relative">
                  <div className="bg-gradient-to-br from-light to-light-grey rounded-xl p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
                    <img
                      src={step.imageSrc ? (step.imageSrc.startsWith("http") ? step.imageSrc : "/go" + step.imageSrc) : ""}
                      alt={step.imageAlt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Step Number */}
                <div className={`ml-4 flex items-center justify-center w-14 h-14 rounded-lg text-white font-bold text-lg mb-6 font-aeonik-mono ${
                  index % 3 === 1 ? 'bg-orange' :
                  index % 3 === 2 ? 'bg-primary' :
                    'bg-teal-400'
                  }`}>
                  {step.number}
                </div>

                {/* Content */}
                <div className="space-y-4 p-4">
                  <h3 className="text-xl font-semibold text-primary leading-tight font-aeonik" dangerouslySetInnerHTML={{ __html: step.title }} />

                  <p className="text-primary opacity-75 leading-relaxed font-aeonik" dangerouslySetInnerHTML={{ __html: step.description }} />

                  {step.price && (
                    <div className="text-sm text-primary font-medium font-aeonik" dangerouslySetInnerHTML={{ __html: step.price }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {ctaText && ctaLink && (
          <div className="text-center">
            <Link
              href={ctaLink || "#"}
              className="inline-block bg-orange text-white hover:bg-dark transition-colors duration-200 font-medium px-8 py-3 rounded-lg text-lg shadow-lg hover:shadow-xl font-button text-center"
            >
              <span dangerouslySetInnerHTML={{ __html: ctaText }} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
