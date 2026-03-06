import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@/content/team";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="relative aspect-square bg-sunlight">
        <Image
          src={member.image || "/images/team/doctor-1.jpg"}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-heading text-lg text-midnight mb-1">{member.name}</h3>
        <p className="font-mono text-tag text-peach mb-3">{member.title}</p>
        <p className="font-body text-sm text-midnight/70">{member.bio}</p>
      </CardContent>
    </Card>
  );
}
