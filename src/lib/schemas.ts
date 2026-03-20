import { SITE_URL, CONTACT, SOCIAL } from "./constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Dumbo Health",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    medicalSpecialty: "Sleep Medicine",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.state,
      postalCode: CONTACT.address.zip,
      addressCountry: CONTACT.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "Customer Support",
    },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "At-Home Sleep Apnea Test",
    description:
      "FDA-approved at-home sleep test kit with doctor interpretation and telehealth consultation.",
    brand: { "@type": "Brand", name: "Dumbo Health" },
    offers: {
      "@type": "Offer",
      price: "149.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/at-home-sleep-test`,
    },
  };
}

export function blogPostSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.featuredImage
      ? `${SITE_URL}${post.featuredImage}`
      : `${SITE_URL}/og/blog.jpg`,
    author: {
      "@type": "Person",
      name: post.author || "Dumbo Health",
    },
    publisher: {
      "@type": "Organization",
      name: "Dumbo Health",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
  };
}

export function webPageSchema(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Dumbo Health" },
  };
}

export function medicalWebPageSchema(
  title: string,
  description: string,
  path: string,
  specialty = "Sleep Medicine"
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    medicalAudience: { "@type": "Patient" },
    about: { "@type": "MedicalCondition", name: "Sleep Apnea", relevantSpecialty: specialty },
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Dumbo Health" },
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Dumbo Health",
    description:
      "Meet the founders and medical team behind Dumbo Health — a mission-driven telehealth company making sleep apnea diagnosis and treatment simple, affordable, and stigma-free.",
    url: `${SITE_URL}/about-us`,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Dumbo Health" },
    about: {
      "@type": "MedicalOrganization",
      name: "Dumbo Health",
      url: SITE_URL,
      foundingDate: "2023",
      medicalSpecialty: "Sleep Medicine",
      founder: [
        { "@type": "Person", name: "Mo Sherif", jobTitle: "Co-Founder & CEO" },
        { "@type": "Person", name: "Nico Aoun", jobTitle: "Co-Founder & CTO" },
      ],
    },
  };
}

export function collectionPageSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Dumbo Health" },
  };
}

export function personSchema(person: {
  name: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  sameAs?: (string | undefined | null)[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.description && { description: person.description }),
    ...(person.url && { url: person.url }),
    worksFor: { "@type": "Organization", name: "Dumbo Health" },
    ...(person.sameAs?.filter(Boolean).length && {
      sameAs: person.sameAs.filter(Boolean),
    }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
