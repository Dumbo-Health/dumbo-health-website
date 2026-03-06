"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { label: "All", href: "/blog" },
  { label: "Sleep Tracking", href: "/blog-category/sleep-tracking" },
  { label: "Sleep Apnea", href: "/blog-category/sleep-apnea" },
  { label: "Sleep Disorders", href: "/blog-category/sleep-disorders" },
  { label: "CPAP", href: "/blog-category/cpap" },
];

export function CategoryFilter() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {categories.map((cat) => {
        const isActive = pathname === cat.href || (cat.href === "/blog" && pathname === "/blog");
        return (
          <Link
            key={cat.label}
            href={cat.href}
            className={`px-4 py-2 rounded-full font-mono text-tag transition-colors ${
              isActive
                ? "bg-midnight text-white"
                : "bg-sunlight text-midnight hover:bg-light-peach"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
