"use client";

import Link from "next/link";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface CityItem {
  text: string;
  image_src: string;
  image_alt: string;
  link: string;
}

interface CitiesServedSectionProps {
  headline?: string;
  title?: string;
  subtitle?: string;
  cities: CityItem[];
}

export default function CitiesServedSection({
  headline = "CITIES WE SERVE",
  title = "At-Home Sleep Testing Available in These Cities",
  subtitle,
  cities
}: CitiesServedSectionProps) {
  const headerSection = useScrollAnimation({ delay: 0 });
  const gridSection = useScrollAnimation({ delay: 200 });

  if (!cities || cities.length === 0) return null;

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div ref={headerSection.ref} className={`text-center mb-12 ${headerSection.animationClasses}`}>
          {headline && (
            <div className="text-sm font-medium text-primary uppercase tracking-wider font-headline mb-4">
              {headline}
            </div>
          )}
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-weight-500 text-primary leading-tight font-nohemi mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-primary/70 max-w-3xl mx-auto font-aeonik">
              {subtitle}
            </p>
          )}
        </div>

        {/* Cities Grid */}
        <div 
          ref={gridSection.ref} 
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${gridSection.animationClasses}`}
        >
          {cities.map((city, index) => (
            <Link 
              key={index} 
              href={city.link}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(/go${city.image_src})`,
                  backgroundColor: '#1a365d' 
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/80 transition-colors duration-300" />
              
              {/* City Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl md:text-2xl font-bold font-nohemi text-center px-4 drop-shadow-lg">
                  {city.text}
                </span>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
