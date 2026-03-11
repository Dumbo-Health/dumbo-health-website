import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparisons = [
  { category: "Diagnostic Process", traditional: "Lab-based, long waits", dumbo: "Fast, easy at-home testing" },
  { category: "Convenience", traditional: "In-person appointments", dumbo: "100% online and accessible" },
  { category: "Price Transparency", traditional: "Hidden fees, unclear pricing", dumbo: "Clear, all-inclusive pricing" },
  { category: "Device Acquisition", traditional: "High upfront cost", dumbo: "No upfront cost on plans" },
  { category: "Accessories Included", traditional: "Additional, frequent fees", dumbo: "Always included" },
  { category: "Device Maintenance & Upgrades", traditional: "Additional fees", dumbo: "Included in subscription" },
  { category: "Telehealth Access", traditional: "Limited or extra costs", dumbo: "Unlimited and always included" },
  { category: "Insurance Complexity", traditional: "Frequent paperwork and denials", dumbo: "Zero paperwork needed" },
  { category: "Care Continuity", traditional: "Multiple providers", dumbo: "One dedicated, accessible team" },
];

export function WhySwitch() {
  return (
    <section className="bg-daylight py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          className="font-heading font-medium text-midnight text-center mb-4"
          style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
        >
          Most people pay too much for sleep apnea treatment
        </h2>
        <div className="overflow-x-auto mt-12">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body font-bold text-midnight">Category</TableHead>
                <TableHead className="font-body font-bold text-midnight">Traditional Sleep Care</TableHead>
                <TableHead className="font-body font-bold text-teal">Dumbo Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisons.map((row) => (
                <TableRow key={row.category}>
                  <TableCell className="font-body text-sm text-midnight font-medium">{row.category}</TableCell>
                  <TableCell className="font-body text-sm text-midnight/60">{row.traditional}</TableCell>
                  <TableCell className="font-body text-sm text-teal font-medium">{row.dumbo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
