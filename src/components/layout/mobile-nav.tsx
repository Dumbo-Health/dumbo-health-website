"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_URL } from "@/lib/constants";

const mobileLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Sleep test", href: "/at-home-sleep-test" },
  { label: "CPAP Therapy", href: "/cpap" },
  { label: "CPAP Care", href: "/cpap-care" },
  { label: "CPAP Resupply", href: "/resupply" },
  { label: "Sleep Hub", href: "/go/sleep-hub" },
  { label: "Sleep Toolbox", href: "/go/tools" },
  { label: "Sleep Protocol", href: "/go/sleep-protocol" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-daylight">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/logos/wordmark-midnight.svg"
              alt="Dumbo Health"
              width={130}
              height={26}
            />
          </Link>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-1">
          {mobileLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rounded-md px-4 py-3 text-base font-medium text-midnight transition-colors hover:bg-sunlight"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 px-4">
          <Button variant="outline" asChild className="w-full">
            <a href={`${APP_URL}/login`}>Login</a>
          </Button>
          <Button asChild className="w-full">
            <a href={APP_URL}>Get Started</a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
