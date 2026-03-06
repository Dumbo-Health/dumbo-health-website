"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { featureComparison } from "@/content/plans";

function FeatureValue({ value }: { value: string }) {
  if (value === "Included" || value === "Included (free)" || value === "No usage minimums") {
    return <Check className="h-5 w-5 text-teal mx-auto" />;
  }
  if (value === "Not included" || value === "Not required") {
    return <X className="h-5 w-5 text-midnight/20 mx-auto" />;
  }
  return (
    <span className="font-body text-sm text-midnight/70 leading-snug">
      {value}
    </span>
  );
}

export function FeatureComparison() {
  const [expanded, setExpanded] = useState(false);
  const visibleFeatures = expanded
    ? featureComparison
    : featureComparison.slice(0, 6);

  return (
    <section className="bg-daylight py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-h2 text-midnight mb-4">
            Compare Features
          </h2>
          <p className="font-body text-body-lg text-midnight/70 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re starting CPAP for the first time or continuing
            treatment, our plans give you the right equipment, support, and care
            at every stage.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-sunlight bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-sunlight">
                <TableHead className="font-body font-bold text-midnight w-[30%] py-4 px-5">
                  Feature
                </TableHead>
                <TableHead className="font-body font-bold text-midnight text-center py-4 w-[23%]">
                  Essentials
                </TableHead>
                <TableHead className="font-body font-bold text-midnight text-center py-4 w-[23%] bg-peach/5">
                  <span className="flex flex-col items-center gap-0.5">
                    Premium
                    <span className="text-xs font-mono text-peach font-normal">
                      Popular
                    </span>
                  </span>
                </TableHead>
                <TableHead className="font-body font-bold text-midnight text-center py-4 w-[23%]">
                  Elite
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleFeatures.map((feature, i) => (
                <TableRow
                  key={feature.name}
                  className={`border-b border-sunlight/60 ${
                    i % 2 === 0 ? "bg-white" : "bg-daylight/40"
                  }`}
                >
                  <TableCell className="font-body text-sm text-midnight font-medium py-4 px-5">
                    {feature.name}
                    {feature.note && (
                      <p className="text-xs text-midnight/40 mt-1 leading-relaxed">
                        {feature.note}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <FeatureValue value={feature.essentials} />
                  </TableCell>
                  <TableCell className="text-center py-4 bg-peach/5">
                    <FeatureValue value={feature.premium} />
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <FeatureValue value={feature.elite} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Toggle button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="rounded-[12px] px-8 py-5 font-body font-bold border-2 border-midnight/15 text-midnight hover:bg-midnight hover:text-white transition-all"
          >
            {expanded ? (
              <>
                Show fewer features
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Compare all features
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
