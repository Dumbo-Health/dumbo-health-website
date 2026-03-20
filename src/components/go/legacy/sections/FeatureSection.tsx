"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface FeatureSectionProps {
  headline?: string;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  imageSrc: string;
  imageAlt?: string;
  reverseFlex?: boolean;
}

export default function FeatureSection({
  headline,
  title,
  subtitle,
  bulletPoints,
  imageSrc,
  imageAlt = "Feature image",
  reverseFlex = false
}: FeatureSectionProps) {
  const contentSection = useScrollAnimation({ delay: 0 });
  const imageSection = useScrollAnimation({ delay: 200 });
  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverseFlex ? 'lg:flex-row-reverse' : ''
          }`}>
          {/* Content */}
          <div ref={contentSection.ref} className={`space-y-6 ${reverseFlex ? 'lg:order-2 lg:pl-12' : 'lg:pr-12'
            } ${contentSection.animationClasses}`}>
            {/* Headline */}
            {headline && (
              <div className="text-sm font-medium text-primary uppercase tracking-wider font-headline">
                {headline}
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-weight-500 text-primary leading-tight font-nohemi">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-primary opacity-75 leading-relaxed font-aeonik" dangerouslySetInnerHTML={{ __html: subtitle }} />

            {/* Bullet Points */}
            <div className="space-y-4 pt-4">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange rounded-full flex items-center justify-center mt-1">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-primary leading-relaxed font-aeonik"
                    dangerouslySetInnerHTML={{ __html: point }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageSection.ref} className={`relative ${reverseFlex ? 'lg:order-1 lg:pr-12' : 'lg:pl-12'
            } ${imageSection.animationClasses}`}>
            <div className="relative">
              <img
                src={"/go" + imageSrc}
                alt={imageAlt}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-teal-400 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
