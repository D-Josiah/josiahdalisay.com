import { z } from "zod";

/** Shared between the Server Action and the client form's field names. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(100),
  email: z.email("That email doesn't look right.").max(200),
  topic: z.string().trim().max(200).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail helps. 10 characters minimum.")
    .max(5000),
  /** Honeypot: real people leave this empty. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** What the form echoes back after a failed submit, so nothing is lost. */
export type ContactValues = Partial<Record<keyof ContactInput, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: ContactValues;
      /** Repopulates the inputs React would otherwise reset. */
      values: ContactValues;
    };

export const initialContactState: ContactState = { status: "idle" };
