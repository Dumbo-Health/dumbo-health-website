import type { Metadata } from "next";
import { SITE_URL } from "./constants";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "",
  ogImage = "/opengraph-image",
  type = "website",
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Dumbo Health",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
