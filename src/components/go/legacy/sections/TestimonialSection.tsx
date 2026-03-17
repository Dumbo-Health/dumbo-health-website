"use client";

import Link from "next/link";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  rating: number;
}

interface TestimonialSectionProps {
  title: string;
  testimonials: Testimonial[];
  bottomTagline?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function TestimonialSection({
  title,
  testimonials,
  bottomTagline,
  ctaText,
  ctaLink
}: TestimonialSectionProps) {
  const titleSection = useScrollAnimation({ delay: 0 });
  const testimonialsGrid = useScrollAnimation({ delay: 200 });
  const bottomSection = useScrollAnimation({ delay: 400 });
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-orange' : 'text-gray-300'
          }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#ffd6ad' }}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div ref={titleSection.ref} className={`text-center mb-16 ${titleSection.animationClasses}`}>
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-weight-500 text-primary leading-tight max-w-4xl mx-auto font-nohemi" dangerouslySetInnerHTML={{ __html: title }} />
        </div>

        {/* Testimonials Grid */}
        <div ref={testimonialsGrid.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 ${testimonialsGrid.animationClasses}`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-light rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-primary leading-relaxed mb-6 font-aeonik">
                "<span dangerouslySetInnerHTML={{ __html: testimonial.quote }} />"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-weight-500 text-primary text-md font-aeonik" dangerouslySetInnerHTML={{ __html: testimonial.name }} />
                  <div className="text-primary opacity-60 text-sm font-aeonik" dangerouslySetInnerHTML={{ __html: testimonial.title }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div ref={bottomSection.ref} className={`text-center space-y-8 ${bottomSection.animationClasses}`}>
          {/* Icons */}
          <div className="flex justify-center items-center space-x-6">
            <img
              src="/go/sun.svg"
              alt="Sun icon"
              className="w-8 h-8 opacity-80 filter brightness-75"
            />
            <img
              src="/go/moon.svg"
              alt="Moon icon"
              className="w-8 h-8 opacity-80 filter brightness-75"
            />
            <img
              src="/go/cloud-x.svg"
              alt="Cloud icon"
              className="w-8 h-8 opacity-80 filter brightness-75"
            />
          </div>

          {/* CTA Button */}
          {ctaText && ctaLink && (
            <div className="pt-4">
              <Link
                href={ctaLink}
                className="inline-block bg-orange text-white hover:bg-orange-dark transition-colors duration-200 font-medium px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl font-button"
              >
                {ctaText.toUpperCase()}
              </Link>
            </div>
          )}

          {/* Bottom Tagline */}
          {bottomTagline && (
            <p className="text-xl lg:text-2xl font-weight-500 text-primary max-w-4xl mx-auto leading-relaxed font-aeonik" dangerouslySetInnerHTML={{ __html: bottomTagline }} />
          )}
        </div>
      </div>
    </section>
  );
}
