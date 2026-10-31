import "server-only";
import { Resend } from "resend";
import { site } from "@/content/site";
import type { ContactInput } from "./schema";

/**
 * Sends enquiries through Resend.
 *
 * The client is created lazily so a missing key is a runtime problem for
 * the contact form alone, never a build failure for the whole site.
 */

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!,
  );

export class MailerNotConfiguredError extends Error {
  constructor() {
    super("RESEND_API_KEY is not set");
    this.name = "MailerNotConfiguredError";
  }
}

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new MailerNotConfiguredError();

  const from = process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const topic = input.topic?.trim() || "New enquiry";

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `${topic} from ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Topic: ${topic}`,
      "",
      input.message,
    ].join("\n"),
    html: `
      <h2>${escapeHtml(topic)}</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <hr />
      <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) throw new Error(error.message);
}
