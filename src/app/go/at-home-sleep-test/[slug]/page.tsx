import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import {
  getAllAtHomeSleepTestSlugs,
  getAtHomeSleepTestPage,
} from "@/lib/go/at-home-sleep-test";
import Hero from "@/components/go/legacy/sections/Hero";
import Breadcrumb from "@/components/go/legacy/sections/Breadcrumb";
import QuickFactsSection from "@/components/go/legacy/sections/QuickFactsSection";
import CitiesServedSection from "@/components/go/legacy/sections/CitiesServedSection";
import MedicalReviewSection from "@/components/go/legacy/sections/MedicalReviewSection";
import FeatureSection from "@/components/go/legacy/sections/FeatureSection";
import ComparisonSection from "@/components/go/legacy/sections/ComparisonSection";
import MapSection from "@/components/go/legacy/sections/MapSection";
import ArticleColumn from "@/components/go/legacy/sections/ArticleColumnSection";
import PrimaryCTASection from "@/components/go/legacy/sections/PrimaryCTASection";
import TestimonialSection from "@/components/go/legacy/sections/TestimonialSection";
import FAQSection from "@/components/go/legacy/sections/FAQSection";
import AtHomeSleepTestInterlinkSection from "@/components/go/at-home-sleep-test-interlink";

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllAtHomeSleepTestSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const pageData = await getAtHomeSleepTestPage(resolved.slug);

  if (!pageData) {
    return {
      title: "At-Home Sleep Test | Dumbo Health",
    };
  }

  const title = pageData.meta_title || pageData.hero_title || "At-Home Sleep Test";
  const description =
    pageData.meta_description || pageData.hero_subtitle || "At-home sleep apnea testing";
  const canonicalPath = `/go/at-home-sleep-test/${resolved.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AtHomeSleepTestPage({ params }: PageProps) {
  const resolved = await params;
  const pageData = await getAtHomeSleepTestPage(resolved.slug);

  if (!pageData) {
    notFound();
  }

  const formattedLocation = str(pageData.formatted_location) || str(pageData.state) || str(pageData.city) || "";
  const phoneNumber =
    (pageData.city_data as { phone_number?: string } | undefined)?.phone_number ||
    (pageData.state_data as { phone_number?: string } | undefined)?.phone_number ||
    "+1 (786) 348-2820";
  const boundingBox = pageData.bounding_box as
    | {
        min_lat: string;
        max_lat: string;
        min_lon: string;
        max_lon: string;
        center_lat?: string;
        center_lon?: string;
        zoom?: string;
      }
    | undefined;
  const lat = (pageData.city_data as { latitude?: number } | undefined)?.latitude ??
    (pageData.state_data as { latitude?: number } | undefined)?.latitude;
  const lng = (pageData.city_data as { longitude?: number } | undefined)?.longitude ??
    (pageData.state_data as { longitude?: number } | undefined)?.longitude;
  const zoom = (pageData.city_data as { zoom?: number } | undefined)?.zoom ??
    (pageData.state_data as { zoom?: number } | undefined)?.zoom;

  return (
    <div className="min-h-screen bg-light">
      <Hero
        category={str(pageData.hero_headline) || undefined}
        headline={str(pageData.hero_headline)}
        title={str(pageData.hero_title)}
        subtitle={str(pageData.hero_subtitle)}
        primaryCtaText={str(pageData.hero_primary_cta_anchor)}
        secondaryCtaText={str(pageData.hero_secondary_cta_anchor)}
        primaryCtaLink={str(pageData.hero_primary_cta_link) || undefined}
        secondaryCtaLink={str(pageData.hero_secondary_cta_link) || undefined}
        imageSrc={str(pageData.hero_image_src) || "/at-home-sleep-study-hero.png"}
        imageAlt={str(pageData.hero_image_alt) || "At-home sleep study"}
        showStatsCard={true}
      />

      {pageData.location_type === "city" && str(pageData.state) && str(pageData.city) ? (
        <Breadcrumb
          items={[
            { label: "Home", href: "https://www.dumbo.health" },
            { label: `At-Home Sleep Test in ${str(pageData.state)}`, href: `/go/at-home-sleep-test/${str(pageData.state_slug)}` },
            { label: `${str(pageData.city)}, ${str(pageData.state)}` },
          ]}
        />
      ) : null}

      {pageData.quick_facts ? (
        <QuickFactsSection
          headline={str(pageData.quick_facts.headline) || undefined}
          title={str(pageData.quick_facts.title)}
          facts={pageData.quick_facts.facts || []}
        />
      ) : null}

      {pageData.location_type === "state" && pageData.cities_served ? (
        <CitiesServedSection
          headline="CITIES WE SERVE"
          title={`At-Home Sleep Testing in ${formattedLocation}`}
          subtitle={`Get your FDA-approved sleep test delivered to any of these cities in ${formattedLocation}`}
          cities={((pageData.cities_served as Array<{ text: string; image_src: string; image_alt: string; link: string }>) || []).map((city) => ({
            ...city,
            link: city.link.startsWith("/go/") ? city.link : `/go${city.link}`,
          }))}
        />
      ) : null}

      {str(pageData.local_relevance_title) ? (
        <FeatureSection
          headline={str(pageData.local_relevance_headline) || undefined}
          title={str(pageData.local_relevance_title)}
          subtitle={str(pageData.local_relevance_subtitle)}
          bulletPoints={[
            pageData.local_relevance_check_1,
            pageData.local_relevance_check_2,
            pageData.local_relevance_check_3,
          ].filter(Boolean) as string[]}
          imageSrc={str(pageData.local_relevance_image_src)}
          imageAlt={str(pageData.local_relevance_image_alt)}
          reverseFlex={Boolean(pageData.local_relevance_reverse_flex)}
        />
      ) : null}

      {pageData.comparison_title && pageData.comparison_data ? (
        <ComparisonSection
          title={str(pageData.comparison_title)}
          subtitleTop={str(pageData.comparison_subtitle_1)}
          subtitleBottom={str(pageData.comparison_subtitle_2)}
          tableHeader={str(pageData.comparison_table_header)}
          location={formattedLocation}
          comparisonData={pageData.comparison_data as Array<{ category: string; traditional: string | boolean; dumbo: string | boolean }>}
          smallNote={pageData.comparison_small_note as string | undefined}
          textFooter={pageData.comparison_text_footer as string | undefined}
          ctaText={pageData.comparison_cta_text as string | undefined}
          ctaLink={pageData.comparison_cta_link as string | undefined}
          addTimeToTreatmentStart={true}
        />
      ) : null}

      <MapSection
        title={str(pageData.map_title)}
        subtitle={str(pageData.map_subtitle)}
        ctaTitle={str(pageData.map_cta_title)}
        ctaSubtitle={str(pageData.map_cta_subtitle)}
        phoneNumber={phoneNumber}
        phoneLabel={str(pageData.map_phone_label)}
        features={(pageData.map_features as string[] | undefined) || []}
        scheduleText={str(pageData.map_schedule_text)}
        boundingBox={boundingBox || null}
        lat={lat}
        lng={lng}
        zoom={zoom}
      />

      <ArticleColumn
        headline={str(pageData.how_it_works_headline) || undefined}
        title={str(pageData.how_it_works_title)}
        subtitle={str(pageData.how_it_works_subtitle)}
        steps={(pageData.how_it_works_steps as Array<{
          number: string;
          title: string;
          description: string;
          imageSrc: string;
          imageAlt: string;
          price?: string;
        }> | undefined) || []}
        ctaText={pageData.how_it_works_cta_text as string | undefined}
        ctaLink={pageData.how_it_works_cta_link as string | undefined}
      />

      {str(pageData.price_transparency_title) ? (
        <FeatureSection
          headline={str(pageData.price_transparency_headline) || undefined}
          title={str(pageData.price_transparency_title)}
          subtitle={str(pageData.price_transparency_subtitle)}
          bulletPoints={[
            pageData.price_transparency_check_1,
            pageData.price_transparency_check_2,
            pageData.price_transparency_check_3,
          ].filter(Boolean) as string[]}
          imageSrc={str(pageData.price_transparency_image_src)}
          imageAlt={str(pageData.price_transparency_image_alt)}
          reverseFlex={Boolean(pageData.price_transparency_reverse_flex)}
        />
      ) : null}

      {str(pageData.trust_badges_title) ? (
        <FeatureSection
          headline={str(pageData.trust_badges_headline) || undefined}
          title={str(pageData.trust_badges_title)}
          subtitle={str(pageData.trust_badges_subtitle)}
          bulletPoints={[
            pageData.trust_badges_check_1,
            pageData.trust_badges_check_2,
            pageData.trust_badges_check_3,
            pageData.trust_badges_check_4,
            pageData.trust_badges_check_5,
          ].filter(Boolean) as string[]}
          imageSrc={str(pageData.trust_badges_image_src)}
          imageAlt={str(pageData.trust_badges_image_alt)}
          reverseFlex={Boolean(pageData.trust_badges_reverse_flex)}
        />
      ) : null}

      {pageData.medical_review ? (
        <MedicalReviewSection
          headline={str(pageData.medical_review.headline) || undefined}
          badgeText={str(pageData.medical_review.badge_text)}
          lastUpdated={str(pageData.medical_review.last_updated)}
          medicalTeam={pageData.medical_review.medical_team || []}
          scientificTeam={pageData.medical_review.scientific_team || []}
          certifications={pageData.medical_review.certifications || []}
          ctaText={str(pageData.medical_review.cta_text)}
          ctaLink={str(pageData.medical_review.cta_link)}
        />
      ) : null}

      <PrimaryCTASection
        title={str(pageData.final_cta_title)}
        subtitle={str(pageData.final_cta_subtitle)}
        ctaText={str(pageData.final_cta_button_anchor)}
        ctaLink={str(pageData.final_cta_button_link) || "#"}
      />

      {pageData.testimonials ? (
        <TestimonialSection
          title={pageData.testimonial_title || ""}
          testimonials={pageData.testimonials as Array<{ quote: string; name: string; title: string; rating: number }>}
          bottomTagline={pageData.testimonial_bottom_tagline as string | undefined}
        />
      ) : null}

      {pageData.faqs ? (
        <FAQSection
          title={str(pageData.faq_title) || "FAQs"}
          subtitle={str(pageData.faq_subtitle)}
          faqs={pageData.faqs as Array<{ question: string; answer: string }>}
        />
      ) : null}

      <AtHomeSleepTestInterlinkSection
        pageData={{
          city_slug: pageData.city_slug as string | undefined,
          state_slug: pageData.state_slug as string,
          solution_slug: str(pageData.solution_slug) || undefined,
          city: str(pageData.city) || undefined,
          state: str(pageData.state) || undefined,
          interlink_heading: pageData.interlink_heading as { city_level?: string } | undefined,
        }}
        pageType="at-home-sleep-test"
      />
    </div>
  );
}
