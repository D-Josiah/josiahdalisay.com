"use server";

import { headers } from "next/headers";
import { MailerNotConfiguredError, sendContactEmail } from "./mailer";
import { checkRateLimit, pruneRateLimit } from "./rate-limit";
import {
  contactSchema,
  type ContactInput,
  type ContactState,
  type ContactValues,
} from "./schema";

const GENERIC_ERROR = "Something went wrong sending that. Try again, or email me directly.";

/** Best-effort client identity for rate limiting. */
async function clientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
}

/** Pull the user's text back out of the payload so a failure can echo it. */
function readValues(formData: FormData): ContactValues {
  const read = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : undefined;
  };
  return {
    name: read("name"),
    email: read("email"),
    topic: read("topic"),
    message: read("message"),
  };
}

export async function submitContactForm(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = readValues(formData);

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const flattened = z_flatten(parsed.error);
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: flattened,
      values,
    };
  }

  // The honeypot is filled, so this is a bot. Report success and drop it.
  if (parsed.data.company) {
    return { status: "success", message: "Thanks! I'll get back to you soon." };
  }

  pruneRateLimit();
  const { allowed, retryAfterSeconds } = checkRateLimit(await clientKey());
  if (!allowed) {
    return {
      status: "error",
      message: `That's a few messages in a row. Try again in ${retryAfterSeconds}s.`,
      values,
    };
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    if (error instanceof MailerNotConfiguredError) {
      console.error("Contact form: RESEND_API_KEY is missing, enquiry was not sent.");
    } else {
      console.error("Contact form: send failed", error);
    }
    return { status: "error", message: GENERIC_ERROR, values };
  }

  return { status: "success", message: "Thanks! I'll get back to you soon." };
}

/** Narrow Zod's issue list to one message per field. */
function z_flatten(error: {
  issues: readonly { path: PropertyKey[]; message: string }[];
}): Partial<Record<keyof ContactInput, string>> {
  const result: Partial<Record<keyof ContactInput, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof ContactInput | undefined;
    if (field && !result[field]) result[field] = issue.message;
  }
  return result;
}
