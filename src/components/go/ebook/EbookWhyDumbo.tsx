"use client";

import Image from "next/image";

export interface EbookWhyDumboProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: string;
  ctaText: string;
  ctaHref: string;
  tools: string[];
}

export default function EbookWhyDumbo({
  title,
  imageSrc,
  imageAlt,
  overlayText,
  ctaText,
  ctaHref,
  tools,
}: EbookWhyDumboProps) {
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
          <p
            className="font-nohemi font-weight-500 text-2xl leading-tight"
            style={{ color: "#031F3D" }}
          >
            {overlayText}
          </p>
          <a
            href={ctaHref}
            className="inline-block self-start text-sm font-medium tracking-widest uppercase px-6 py-4 rounded transition-colors duration-200"
            style={{
              backgroundColor: "#FF8361",
              color: "#FCF6ED",
              fontFamily: "var(--font-aeonik-mono)",
            }}
          >
            {ctaText}
          </a>
          <ul className="flex flex-col gap-3">
            {tools.map((tool) => (
              <li key={tool} className="flex items-center gap-2">
                <Image
                  src="/go/orange-x.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="flex-shrink-0"
                />
                <span
                  className="text-base font-medium"
                  style={{
                    color: "#031F3D",
                    fontFamily: "var(--font-aeonik)",
                  }}
                >
                  {tool}
                </span>
              </li>
            ))}
          </ul>
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
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(to top, rgba(3,31,61,0.65) 35%, transparent 65%)",
            }}
          />
          <div className="absolute top-6 right-6 flex flex-col items-end gap-4">
            <a
              href={ctaHref}
              className="inline-block text-sm font-medium tracking-widest uppercase px-6 py-4 rounded transition-colors duration-200"
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
            <ul className="flex flex-col gap-2 items-end">
              {tools.map((tool) => (
                <li key={tool} className="flex items-center gap-2">
                  <span
                    className="text-base font-medium"
                    style={{
                      color: "#031F3D",
                      fontFamily: "var(--font-aeonik)",
                    }}
                  >
                    {tool}
                  </span>
                  <Image
                    src="/go/orange-x.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute bottom-0 left-0 p-8 max-w-xl">
            <p
              className="font-nohemi font-weight-500 text-3xl lg:text-5xl leading-tight"
              style={{ color: "#FFFFFF" }}
            >
              {overlayText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
