import { z } from "zod";

export const validationSchema = z.object({
  /* ---------------- Required fields ---------------- */

  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name")
    .max(50, "Full name is too long"),

  phoneNumber: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .min(10, "Please enter a valid phone number")
    .regex(/^[+]?[0-9\s()-]+$/, "Please enter a valid phone number"),

  companyName: z
    .string()
    .trim()
    .min(1, "Please enter your company name")
    .max(50, "Company name is too long"),

  designation: z
    .string()
    .trim()
    .min(1, "Please enter your profession or designation")
    .max(50, "Designation is too long"),

  /* ---------------- Optional fields ---------------- */

  workEmail: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .refine(
      (value) => value === undefined || z.string().email().safeParse(value).success,
      "Please enter a valid work email",
    ),

  consultationDate: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .refine((value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      const minimumDate = new Date();
      minimumDate.setHours(minimumDate.getHours() + 1);
      return selectedDate >= minimumDate;
    }, "Please select a time at least 1 hour ahead."),

  businessOverview: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
});

export type ContactFormData = z.infer<typeof validationSchema>;
