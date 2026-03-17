import { notFound, redirect } from "next/navigation";
import { getAllFindSlugs } from "@/lib/go/find-pages";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllFindSlugs().map((slug) => ({ slug }));
}

export default async function GoFindRedirectPage({ params }: PageProps) {
  const resolved = await params;

  if (resolved.slug.startsWith("sleep-doctor-")) {
    redirect(`/go/at-home-sleep-test/${resolved.slug.replace(/^sleep-doctor-/, "")}`);
  }

  notFound();
}
