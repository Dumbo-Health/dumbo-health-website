"use client";

import Image from "next/image";

export interface BlogLink {
  label: string;
  href?: string;
}

export interface EbookBlogProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  links: BlogLink[];
  closingText: string;
  ctaText: string;
  ctaHref: string;
}

export default function EbookBlog({
  title,
  imageSrc,
  imageAlt,
  links,
  closingText,
  ctaText,
  ctaHref,
}: EbookBlogProps) {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h2
          className="font-nohemi font-weight-500 text-3xl sm:text-4xl lg:text-5xl text-center leading-tight"
          style={{ color: "#031F3D" }}
        >
          {title}
        </h2>

        <div className="flex flex-col gap-5 sm:hidden">
          <Image
            src={`/go${imageSrc}`}
            alt={imageAlt}
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
            priority
          />
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href ?? "#"}
                className="flex items-center gap-3 group"
              >
                <Image
                  src="/go/orange-x.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="flex-shrink-0"
                />
                <span
                  className="text-base font-medium group-hover:underline"
                  style={{
                    color: "#031F3D",
                    fontFamily: "var(--font-aeonik)",
                  }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <p
              className="text-xl font-medium"
              style={{
                color: "#031F3D",
                fontFamily: "var(--font-aeonik)",
              }}
            >
              {closingText}
            </p>
            <a
              href={ctaHref}
              className="inline-block self-start text-base font-medium tracking-widest uppercase px-8 py-4 rounded"
              style={{
                backgroundColor: "#FF8361",
                color: "#FCF6ED",
                fontFamily: "var(--font-aeonik-mono)",
              }}
            >
              {ctaText}
            </a>
          </div>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden hidden sm:block">
          <Image
            src={`/go${imageSrc}`}
            alt={imageAlt}
            width={1200}
            height={800}
            className="w-full h-auto block"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(3,31,61,0.55) 0%, transparent 60%), linear-gradient(to top, rgba(3,31,61,0.55) 20%, transparent 55%)",
            }}
          />
          <div className="absolute top-8 left-8 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href ?? "#"}
                className="flex items-center gap-3 group"
              >
                <Image
                  src="/go/orange-x.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="flex-shrink-0"
                />
                <span
                  className="text-xl font-medium group-hover:underline"
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "var(--font-aeonik)",
                  }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </div>
          <div className="absolute bottom-8 right-8 flex flex-col items-end gap-4">
            <p
              className="text-2xl font-medium"
              style={{
                color: "#FFFFFF",
                fontFamily: "var(--font-aeonik)",
              }}
            >
              {closingText}
            </p>
            <a
              href={ctaHref}
              className="inline-block text-base font-medium tracking-widest uppercase px-8 py-4 rounded transition-opacity duration-200 hover:opacity-90"
              style={{
                backgroundColor: "#FF8361",
                color: "#FCF6ED",
                fontFamily: "var(--font-aeonik-mono)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#e06e4f";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#FF8361";
              }}
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
