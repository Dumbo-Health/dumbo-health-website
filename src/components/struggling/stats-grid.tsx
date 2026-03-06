import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "$3,000+", label: "Upfront Cost Before Treatment Begins" },
  { value: "6 Months", label: "Average Wait for Diagnosis and Setup" },
  { value: "40%+", label: "Stop Treatment Within the First Year" },
];

export function StatsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.value} className="border-0 shadow-sm text-center">
          <CardContent className="p-8">
            <p className="font-heading text-hero text-peach mb-2">{stat.value}</p>
            <p className="font-body text-body text-midnight/70">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
