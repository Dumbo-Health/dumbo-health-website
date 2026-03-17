import Image from "next/image";

export interface EbookChapter {
  number: string;
  accentColor: string;
  title: string;
  description: string;
}

export interface EbookContentsProps {
  title: string;
  iconsSrc: string;
  iconsAlt?: string;
  intro: string;
  chapters: EbookChapter[];
  closing: string;
}

export default function EbookContents({
  title,
  iconsSrc,
  iconsAlt = "",
  intro,
  chapters,
  closing,
}: EbookContentsProps) {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        <h2
          className="font-nohemi font-weight-500 text-3xl sm:text-4xl lg:text-5xl text-center leading-tight"
          style={{ color: "#031F3D" }}
        >
          {title}
        </h2>

        <Image
          src={`/go${iconsSrc}`}
          alt={iconsAlt}
          width={220}
          height={72}
          className="h-14 w-auto object-contain"
        />

        <p
          className="text-center text-sm sm:text-base leading-relaxed max-w-2xl"
          style={{
            color: "#031F3D",
            fontFamily: "var(--font-aeonik)",
            opacity: 0.8,
          }}
        >
          {intro}
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          {chapters.map((chapter) => (
            <div
              key={chapter.number}
              className="rounded-2xl border p-6 flex flex-row gap-5 items-start"
              style={{
                borderColor: "rgba(3,31,61,0.15)",
                backgroundColor: "#F5E6D1",
              }}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: chapter.accentColor }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{
                    color:
                      chapter.accentColor === "#031F3D" ? "#FCF6ED" : "#031F3D",
                    fontFamily: "var(--font-aeonik-mono)",
                  }}
                >
                  {chapter.number}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3
                  className="text-base sm:text-lg font-bold leading-snug"
                  style={{ color: "#031F3D", fontFamily: "var(--font-aeonik)" }}
                >
                  {chapter.title}
                </h3>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{
                    color: "rgba(3,31,61,0.7)",
                    fontFamily: "var(--font-aeonik)",
                  }}
                >
                  {chapter.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center text-sm sm:text-base leading-relaxed max-w-2xl mt-2"
          style={{
            color: "#031F3D",
            fontFamily: "var(--font-aeonik)",
            opacity: 0.8,
          }}
        >
          {closing}
        </p>
      </div>
    </section>
  );
}
