"use client";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/shared/components/Button";
import { Form } from "@/shared/components/Form/Form";

import type { UseFormReturn } from "react-hook-form";

import styles from "./ContactForm.module.css";
import { ContactFormData } from "./validationSchema";
import { InputField, TextareaField } from "@/shared/components/Form";

type ContactFormProps = {
  methods: UseFormReturn<ContactFormData>;
  onSubmit: (values: ContactFormData) => void | Promise<void>;
};

export const ContactForm = ({ methods, onSubmit }: ContactFormProps) => {
  const today = new Date().toISOString().slice(0, 16);
  return (
    <Form methods={methods} onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <InputField<ContactFormData>
          name="fullName"
          label="FULL NAME"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
          required
        />

        <InputField<ContactFormData>
          name="phoneNumber"
          label="PHONE NUMBER"
          type="number"
          placeholder="Enter your phone number"
          autoComplete="tel"
          required
        />
      </div>

      <div className={styles.formRow}>
        <InputField<ContactFormData>
          name="workEmail"
          label="WORK EMAIL"
          type="email"
          placeholder="Enter your work email"
          autoComplete="email"
        />

        <InputField<ContactFormData>
          name="companyName"
          label="COMPANY NAME"
          type="text"
          placeholder="Enter your company name"
          autoComplete="organization"
          required
        />
      </div>

      <div className={styles.formRow}>
        <InputField<ContactFormData>
          name="designation"
          label="PROFESSION / DESIGNATION"
          type="text"
          placeholder="Enter your designation"
          required
        />

        <InputField<ContactFormData>
          name="consultationDate"
          label="PREFERRED CONSULTATION DATE"
          type="datetime-local"
          min={today}
        />
      </div>

      <TextareaField<ContactFormData>
        name="businessOverview"
        label="BUSINESS OVERVIEW & CORE OBJECTIVE"
        placeholder="Tell us about your business and goals"
        minRows={6}
        maxRows={12}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        rightIcon={<ArrowUpRight className={styles.submitArrow} />}
      >
        Get in touch
      </Button>
    </Form>
  );
};
