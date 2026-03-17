import Image from "next/image";

export interface Expert {
  name: string;
  role: string;
  bio: string;
  photoSrc: string;
  photoAlt: string;
  accentColor: string;
}

export interface EbookExpertsProps {
  title: string;
  experts: Expert[];
}

export default function EbookExperts({ title, experts }: EbookExpertsProps) {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
        <h2
          className="font-nohemi font-weight-500 text-3xl sm:text-4xl lg:text-5xl text-center leading-tight"
          style={{ color: "#031F3D" }}
        >
          {title}
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
          {experts.map((expert) => {
            const isDark = expert.accentColor === "#031F3D";
            const textPrimary = isDark ? "#FCF6ED" : "#031F3D";
            const textSecondary = isDark
              ? "rgba(252,246,237,0.75)"
              : "rgba(3,31,61,0.7)";

            return (
              <div
                key={expert.name}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ backgroundColor: expert.accentColor }}
              >
                <div className="flex flex-row items-start gap-4 px-5 pt-6 pb-0">
                  <div className="flex-shrink-0 w-28 h-36 relative rounded-xl overflow-hidden self-end">
                    <Image
                      src={`/go${expert.photoSrc}`}
                      alt={expert.photoAlt}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p
                      className="font-nohemi text-sm font-bold leading-snug"
                      style={{ color: textPrimary }}
                    >
                      {expert.name}
                    </p>
                    <p
                      className="text-xs leading-snug"
                      style={{
                        color: textSecondary,
                        fontFamily: "var(--font-aeonik)",
                      }}
                    >
                      {expert.role}
                    </p>
                  </div>
                </div>

                <div className="flex-1 px-5 py-6">
                  <p
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{
                      color: textSecondary,
                      fontFamily: "var(--font-aeonik)",
                    }}
                  >
                    {expert.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
