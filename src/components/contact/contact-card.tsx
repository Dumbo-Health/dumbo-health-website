import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, TrendingUp, Newspaper } from "lucide-react";

const contactCards = [
  {
    icon: Mail,
    heading: "Help & Support",
    body: "Need help with your treatment, device, or account? We're here to support you every step of the way.",
    cta: "Get support",
    href: "mailto:contact@dumbo.health",
  },
  {
    icon: TrendingUp,
    heading: "Investors",
    body: "Interested in backing a new era of sleep care? Reach out to learn more about investment opportunities.",
    cta: "Contact our team",
    href: "mailto:invest@dumbo.health?subject=I'm%20interested%20in%20investing.",
  },
  {
    icon: Newspaper,
    heading: "Media & Press",
    body: "Looking to feature Dumbo Health in your story? Access our press kit or reach out for interviews and insights.",
    cta: "Contact our team",
    href: "mailto:press@dumbo.health",
  },
  {
    icon: Phone,
    heading: "Call us",
    body: "Looking for help or reassurance? Call us anytime. We'll listen, answer your questions, and make your path to better sleep feel simple.",
    cta: "Call us +1 (786) 348 2820",
    href: "tel:+17863482820",
  },
];

export function ContactCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {contactCards.map((card) => (
        <Card key={card.heading} className="border-sunlight">
          <CardContent className="p-6">
            <card.icon className="h-8 w-8 text-peach mb-4" />
            <h3 className="font-heading text-xl text-midnight mb-2">{card.heading}</h3>
            <p className="font-body text-body text-midnight/70 mb-4">{card.body}</p>
            <Button variant="outline" size="sm" asChild>
              <a href={card.href}>{card.cta}</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
