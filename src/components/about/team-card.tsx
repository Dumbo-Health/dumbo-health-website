import Image from "next/image";
import type { TeamMember } from "@/content/team";

interface TeamCardProps {
  member: TeamMember;
  variant?: "committee" | "medical";
}

export function TeamCard({ member, variant = "medical" }: TeamCardProps) {
  const isCommittee = variant === "committee";

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-md"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(3,31,61,0.07)",
      }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: isCommittee ? "4/3" : "1/1" }}
      >
        <Image
          src={member.image || "/images/team/doctor-1.jpg"}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p
          className="font-mono text-[11px] uppercase tracking-widest mb-2"
          style={{ color: isCommittee ? "#FF8361" : "#78BFBC" }}
        >
          {member.title}
        </p>
        <h3
          className="font-heading font-medium text-midnight mb-3 leading-snug"
          style={{ fontSize: "1.1rem" }}
        >
          {member.name}
        </h3>
        <p
          className="font-body leading-relaxed mt-auto"
          style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.6)" }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
}
