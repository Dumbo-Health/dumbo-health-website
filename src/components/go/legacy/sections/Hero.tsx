"use client";

import Link from "next/link";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface HeroProps {
  category?: string;
  headline: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  primaryCtaLink?: string;
  secondaryCtaLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  showStatsCard?: boolean;
}

export default function Hero({
  category,
  headline,
  title,
  subtitle,
  primaryCtaText,
  secondaryCtaText,
  primaryCtaLink,
  secondaryCtaLink,
  imageSrc = "/find-hero.aviv",
  imageAlt = "Healthcare service",
  showStatsCard = true
}: HeroProps) {
  const leftContent = useScrollAnimation({ delay: 0 });
  const rightContent = useScrollAnimation({ delay: 200 });
  const statsCard = useScrollAnimation({ delay: 400 });
  return (
    <section className="relative min-h-[700px] flex items-center py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={leftContent.ref} className={`space-y-8 lg:pr-12 ${leftContent.animationClasses}`}>
            {/* Category Tag */}
            {headline && (
              <div className="text-sm font-medium text-primary uppercase tracking-wider font-headline" dangerouslySetInnerHTML={{ __html: headline }} />
            )}

            {/* Main title */}
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-weight-500 text-primary leading-tight font-nohemi" dangerouslySetInnerHTML={{ __html: title }} />

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-primary opacity-75 max-w-2xl leading-relaxed font-aeonik" dangerouslySetInnerHTML={{ __html: subtitle }} />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={primaryCtaLink || "#"}
                className="bg-orange text-white hover:bg-dark transition-colors duration-200 font-medium px-4 py-2 rounded-lg text-lg shadow-lg hover:shadow-xl font-button whitespace-nowrap text-center"
              >
                {primaryCtaText.toUpperCase()}
              </Link>
              {secondaryCtaLink && secondaryCtaText && (
              <Link
                href={secondaryCtaLink || "#"}
                className="text-primary border-2 border-orange hover:border-primary transition-all duration-200 font-medium px-4 py-2 rounded-lg text-lg hover:shadow-md font-button whitespace-nowrap text-center"
              >
                {secondaryCtaText.toUpperCase()}
              </Link>)}
            </div>
          </div>

          {/* Right Image */}
          <div ref={rightContent.ref} className={`relative lg:pl-12 ${rightContent.animationClasses}`}>
            <div className="relative">
              <img
                src={imageSrc.startsWith("http") ? imageSrc : "/go" + imageSrc}
                alt={imageAlt}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Floating Stats Card */}
              {showStatsCard && (
                <div ref={statsCard.ref} className={`absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-xl max-w-xs ${statsCard.animationClasses}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary font-nohemi">6:30</div>
                      <div className="text-sm text-primary opacity-60 font-nohemi">hrs/mins</div>
                      <div className="text-sm font-medium text-primary mt-1 font-nohemi">
                        Continuous<br />Sleep Time
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Top Right Icon */}
              <div className="absolute top-8 right-8 w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center shadow-lg animate-bounce-slow">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
