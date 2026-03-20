"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";
import LeafletMapComponent from "../components/LeafletMapComponent";

interface LocationBoundingBox {
  min_lat: string | number;
  max_lat: string | number;
  min_lon: string | number;
  max_lon: string | number;
  center_lat?: string | number;
  center_lon?: string | number;
  zoom?: string | number;
}

interface MapSectionProps {
  title: string;
  subtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  phoneNumber: string;
  phoneLabel: string;
  features: string[];
  scheduleText: string;
  lat?: number;
  lng?: number;
  boundingBox?: LocationBoundingBox | null;
  zoom?: number;
}

export default function MapSection({
  title,
  subtitle,
  ctaTitle,
  ctaSubtitle,
  phoneNumber,
  phoneLabel,
  features,
  scheduleText,
  lat,
  lng,
  boundingBox,
  zoom,
}: MapSectionProps) {
  const contentSection = useScrollAnimation({ delay: 0 });
  const mapSection = useScrollAnimation({ delay: 200 });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentSection.ref} className={`text-center mb-12 ${contentSection.animationClasses}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-nohemi" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-aeonik" dangerouslySetInnerHTML={{ __html: subtitle }} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map on the left */}
          <div ref={mapSection.ref} className={`order-2 lg:order-1 ${mapSection.animationClasses}`}>
            <LeafletMapComponent lat={lat} lng={lng} boundingBox={boundingBox} zoom={zoom} className="w-full h-96 rounded-lg shadow-lg" />
          </div>
          
          {/* CTA on the right */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-nohemi" dangerouslySetInnerHTML={{ __html: ctaTitle }} />
              <p className="text-gray-600 mb-6 text-lg font-aeonik" dangerouslySetInnerHTML={{ __html: ctaSubtitle }} />
              
              <div className="mb-6">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange rounded-full">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1" dangerouslySetInnerHTML={{ __html: phoneLabel }} />
                    <a 
                      href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                      className="text-3xl font-bold text-gray-900 hover:text-orange transition-colors duration-200"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center lg:justify-start">
                    <svg className="w-4 h-4 text-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span dangerouslySetInnerHTML={{ __html: feature }} />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: scheduleText }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
