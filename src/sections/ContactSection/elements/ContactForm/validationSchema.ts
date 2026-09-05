import { z } from "zod";

export const validationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),

  phoneNumber: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^[+]?[0-9\s()-]+$/, "Please enter a valid phone number"),

  workEmail: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .refine(
      (value) => value === undefined || z.string().email().safeParse(value).success,
      "Please enter a valid work email",
    ),

  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),

  designation: z
    .string()
    .trim()
    .min(2, "Please enter your profession or designation")
    .max(100, "Designation is too long"),

  consultationDate: z.string().optional(),

  businessOverview: z.string().trim().max(1000, "Business overview is too long").optional(),
});

export type ContactFormData = z.infer<typeof validationSchema>;
