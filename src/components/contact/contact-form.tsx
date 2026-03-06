"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContact } from "@/app/actions/contact";

const topics = [
  "Help with my order or subscription",
  "Support with my sleep test or results",
  "CPAP or Oral appliance questions",
  "General questions about Dumbo Health",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      const result = await submitContact(formData);
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  if (status === "success") {
    return (
      <div className="bg-teal/10 rounded-xl p-8 text-center">
        <p className="font-body text-body-lg text-midnight">
          Thank you! Your submission has been received!
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="font-body">First name</Label>
          <Input id="firstName" name="firstName" required placeholder="First name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="font-body">Last name</Label>
          <Input id="lastName" name="lastName" required placeholder="Last name" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="font-body">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="your@email.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="font-body">Phone number</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="topic" className="font-body">Select your message topic</Label>
        <Select name="topic">
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>{topic}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="font-body">Message</Label>
        <Textarea id="message" name="message" rows={5} placeholder="Tell us how we can help..." />
      </div>
      {status === "error" && (
        <p className="font-body text-sm text-red-600">
          Oops! Something went wrong while submitting the form.
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
