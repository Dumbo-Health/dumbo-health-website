"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, TrendingUp, Newspaper } from "lucide-react";
import { useIntercom } from "@/lib/hooks/use-intercom";

export function ContactCards() {
  const { show } = useIntercom();

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
      {/* Help & Support — opens Intercom */}
      <Card className="border-sunlight">
        <CardContent className="p-6">
          <Mail className="h-8 w-8 text-peach mb-4" />
          <h3 className="font-heading text-xl font-medium text-midnight mb-2">Help &amp; Support</h3>
          <p className="font-body text-base text-midnight/70 mb-4">
            Need help with your treatment, device, or account? We&apos;re here to support you every step of the way.
          </p>
          <Button variant="outline" size="sm" onClick={show}>
            Get support
          </Button>
        </CardContent>
      </Card>

      {/* Investors */}
      <Card className="border-sunlight">
        <CardContent className="p-6">
          <TrendingUp className="h-8 w-8 text-peach mb-4" />
          <h3 className="font-heading text-xl font-medium text-midnight mb-2">Investors</h3>
          <p className="font-body text-base text-midnight/70 mb-4">
            Interested in backing a new era of sleep care? Reach out to learn more about investment opportunities.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:invest@dumbo.health?subject=I'm%20interested%20in%20investing.">Contact our team</a>
          </Button>
        </CardContent>
      </Card>

      {/* Media & Press */}
      <Card className="border-sunlight">
        <CardContent className="p-6">
          <Newspaper className="h-8 w-8 text-peach mb-4" />
          <h3 className="font-heading text-xl font-medium text-midnight mb-2">Media &amp; Press</h3>
          <p className="font-body text-base text-midnight/70 mb-4">
            Looking to feature Dumbo Health in your story? Access our press kit or reach out for interviews and insights.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:press@dumbo.health">Contact our team</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
