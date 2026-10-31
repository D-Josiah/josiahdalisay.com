"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { submitContactForm } from "@/lib/contact/actions";
import { initialContactState, type ContactInput } from "@/lib/contact/schema";

/**
 * Progressive-enhancement contact form: it posts to a Server Action, so it
 * still submits with JavaScript disabled, and `useActionState` surfaces
 * per-field validation coming back from the server.
 */

const field =
  "w-full rounded-[10px] border-2 border-ink bg-white px-[18px] py-3.5 text-[15px] transition-shadow outline-none focus:shadow-[4px_4px_0_var(--color-yellow)]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-orange mt-1 text-[13px] font-semibold">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full text-center">
      {pending ? "Sending…" : "Send Message →"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialContactState);
  const errorFor = (name: keyof ContactInput) =>
    state.status === "error" ? state.fieldErrors?.[name] : undefined;

  // React resets an uncontrolled form once the action resolves, so a failed
  // submit repopulates from the values the server echoed back.
  const valueFor = (name: keyof ContactInput) =>
    state.status === "error" ? state.values[name] : undefined;

  if (state.status === "success") {
    return (
      <p role="status" className="py-6 text-center text-[17px] font-semibold">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3.5 text-left" noValidate>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Your name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={valueFor("name")}
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={errorFor("name") ? "name-error" : undefined}
            className={field}
          />
          <FieldError id="name-error" message={errorFor("name")} />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Your email
          </label>
          <input
            id="email"
            name="email"
            defaultValue={valueFor("email")}
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={errorFor("email") ? "email-error" : undefined}
            className={field}
          />
          <FieldError id="email-error" message={errorFor("email")} />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="sr-only">
          What do you need help with?
        </label>
        <input
          id="topic"
          name="topic"
          defaultValue={valueFor("topic")}
          type="text"
          placeholder="What do you need help with?"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Tell me about your project
        </label>
        <textarea
          id="message"
          name="message"
          defaultValue={valueFor("message")}
          required
          rows={5}
          placeholder="Tell me a bit more about your project..."
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={errorFor("message") ? "message-error" : undefined}
          className={`${field} min-h-[120px] resize-y`}
        />
        <FieldError id="message-error" message={errorFor("message")} />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />

      {state.status === "error" && !state.fieldErrors ? (
        <p role="alert" className="text-orange text-[13px] font-semibold">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
