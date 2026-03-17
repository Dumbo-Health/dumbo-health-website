import Image from "next/image";

export interface SneakPeekPage {
  caption: string;
  src: string;
  alt: string;
}

export interface EbookSneakPeekProps {
  title: string;
  pages: SneakPeekPage[];
  iconsSrc?: string;
  iconsAlt?: string;
}

export default function EbookSneakPeek({
  title,
  pages,
  iconsSrc,
  iconsAlt = "",
}: EbookSneakPeekProps) {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#031F3D" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        <h2
          className="font-nohemi font-weight-500 text-3xl sm:text-4xl lg:text-5xl text-center leading-tight"
          style={{ color: "#FCF6ED" }}
        >
          {title}
        </h2>

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pages.map((page) => (
            <div key={page.src} className="flex flex-col gap-3">
              <p
                className="text-xs sm:text-sm leading-snug"
                style={{ color: "#FFFFFF", fontFamily: "var(--font-aeonik)" }}
              >
                {page.caption}
              </p>

              <div className="rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={`/go${page.src}`}
                  alt={page.alt}
                  width={400}
                  height={560}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>

        {iconsSrc && (
          <Image
            src={`/go${iconsSrc}`}
            alt={iconsAlt}
            width={180}
            height={60}
            className="h-10 w-auto object-contain mt-2"
          />
        )}
      </div>
    </section>
  );
}
