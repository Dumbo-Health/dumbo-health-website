import Link from "next/link";
import fs from "fs";
import path from "path";

interface InterlinkSectionProps {
  pageData: {
    city_slug?: string;
    state_slug: string;
    solution_slug?: string;
    city?: string;
    state?: string;
    interlink_heading?: {
      city_level?: string;
    };
  };
  pageType: "at-home-sleep-test";
}

function loadCities() {
  const citiesPath = path.join(
    process.cwd(),
    "src",
    "content",
    "go",
    "at-home-sleep-test",
    "data",
    "cities.json"
  );
  return JSON.parse(fs.readFileSync(citiesPath, "utf8")) as Array<{
    name: string;
    slug: string;
    state_slug: string;
  }>;
}

export default function AtHomeSleepTestInterlinkSection({
  pageData,
  pageType,
}: InterlinkSectionProps) {
  const cities = loadCities();
  const city_slug = pageData.city_slug ?? "";
  const state_slug = pageData.state_slug;
  const solution_slug = pageData.solution_slug ?? "";
  const state = pageData.state ?? "";

  const isCityPage = city_slug.length > 0;
  let cityLinks: Array<{ href: string; title: string }> = [];
  let heading = "";

  if (isCityPage) {
    heading = pageData.interlink_heading?.city_level || "At-home sleep studies in nearby cities";
    const citiesInState = cities.filter(
      (city) => city.state_slug === state_slug && city.slug !== city_slug
    );
    cityLinks = citiesInState.map((city) => ({
      href: `/go/${pageType}/${solution_slug ? `${solution_slug}-` : ""}${city.slug}-${state_slug}`,
      title: `At-Home Sleep Test in ${city.name}, ${state}`,
    }));
  } else {
    heading = pageData.interlink_heading?.city_level
      ? `${pageData.interlink_heading.city_level} ${state}`
      : `At-home sleep studies in other cities in ${state}`;
    const citiesInState = cities.filter((city) => city.state_slug === state_slug);
    cityLinks = citiesInState.map((city) => ({
      href: `/go/${pageType}/${solution_slug ? `${solution_slug}-` : ""}${city.slug}-${state_slug}`,
      title: `At-Home Sleep Test in ${city.name}, ${state}`,
    }));
  }

  if (!cityLinks.length) return null;

  return (
    <section className="bg-light py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="mb-6 text-2xl font-bold text-dark" dangerouslySetInnerHTML={{ __html: heading }} />
          <div className="text-sm leading-relaxed">
            {cityLinks.map((link, index) => (
              <span key={link.href}>
                <Link href={link.href} className="text-dark underline hover:text-gray-600">
                  <span dangerouslySetInnerHTML={{ __html: link.title }} />
                </Link>
                {index < cityLinks.length - 1 ? <span className="text-gray-500"> | </span> : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
