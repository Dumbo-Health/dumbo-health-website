"use server";

import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  topic: z.string().optional(),
  message: z.string().optional(),
});

export async function submitContact(formData: FormData) {
  const parsed = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    topic: formData.get("topic"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  // TODO: Send email via Resend or other service
  // await resend.emails.send({ ... })

  return { success: true };
}
