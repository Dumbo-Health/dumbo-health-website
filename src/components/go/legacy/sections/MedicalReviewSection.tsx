"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Link from "next/link";
import Image from "next/image";

interface TeamMember {
  name: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface MedicalReviewSectionProps {
  headline?: string;
  badgeText: string;
  lastUpdated: string;
  medicalTeam?: TeamMember[];
  scientificTeam?: TeamMember[];
  certifications: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function MedicalReviewSection({
  headline,
  badgeText,
  lastUpdated,
  medicalTeam = [],
  scientificTeam = [],
  certifications,
  ctaText = "Learn more about our team",
  ctaLink = "https://www.dumbo.health/about-us"
}: MedicalReviewSectionProps) {
  const contentSection = useScrollAnimation({ delay: 0 });
  const teamSection = useScrollAnimation({ delay: 200 });

  return (
    <section className="py-12 px-6 sm:px-8 lg:px-12 bg-primary/5">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Badge and Certifications */}
          <div ref={contentSection.ref} className={`space-y-6 ${contentSection.animationClasses}`}>
            {headline && (
              <div className="text-sm font-medium text-primary uppercase tracking-wider font-headline">
                {headline}
              </div>
            )}
            
            {/* FDA-Style Badge */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-green-500/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg text-primary font-nohemi">{badgeText}</div>
                  <div className="text-xs text-primary/60 font-aeonik">Last updated: {lastUpdated}</div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-primary/80 font-aeonik">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Team Photos Grid */}
          <div ref={teamSection.ref} className={`space-y-6 ${teamSection.animationClasses}`}>
            {/* Medical Team */}
            {medicalTeam.length > 0 && (
              <div>
                <div className="text-sm font-medium text-primary uppercase tracking-wider font-headline mb-4">
                  Medical Team
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {medicalTeam.map((member, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {member.imageSrc ? (
                        <div className="relative mb-2 w-full">
                          <Image
                            src={"/go" + member.imageSrc}
                            alt={member.imageAlt || member.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover w-full aspect-square"
                          />
                        </div>
                      ) : (
                        <div className="mb-2 w-full aspect-square rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary/60 font-nohemi">
                            {(member.name || "?").charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="text-xs font-medium text-primary text-center font-nohemi leading-tight px-1">
                        {member.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scientific Committee */}
            {scientificTeam.length > 0 && (
              <div>
                <div className="text-sm font-medium text-primary uppercase tracking-wider font-headline mb-4">
                  Scientific Committee
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {scientificTeam.map((member, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {member.imageSrc ? (
                        <div className="relative mb-2 w-full">
                          <Image
                            src={"/go" + member.imageSrc}
                            alt={member.imageAlt || member.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover w-full aspect-square"
                          />
                        </div>
                      ) : (
                        <div className="mb-2 w-full aspect-square rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary/60 font-nohemi">
                            {(member.name || "?").charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="text-xs font-medium text-primary text-center font-nohemi leading-tight px-1">
                        {member.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ctaLink && (
              <div className="pt-4">
                <Link
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-medium transition-colors font-headline"
                >
                  {ctaText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
