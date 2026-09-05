"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactForm } from "./elements/ContactForm/ContactForm";

import styles from "./ContactSection.module.css";
import { ContactFormData, validationSchema } from "./elements/ContactForm/validationSchema";
import { Toast } from "@/shared/components/Toast";

export const ContactSection = () => {
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      workEmail: "",
      companyName: "",
      designation: "",
      businessOverview: "",
      consultationDate: "",
    },
  });

  const handleSubmit = async (values: ContactFormData) => {
    try {
    //   await onSubmit(values);

      Toast.success("Thank you! We’ll get back to you shortly.");
    } catch {
      Toast.error("We couldn’t send your message. Please try again later.");
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.headingLabel}>
          <span className={styles.headingLine} />
          <span>LET&apos;S CONNECT</span>
        </div>

        <div className={styles.headingRow}>
          <h2 className={styles.title}>
            Let&apos;s make
            <br />
            <span>something</span>
            <br />
            unmissable.
          </h2>

          <div className={styles.headingAside}>
            <p className={styles.description}>
              Tell us about your business, your goals, and where you want to go next. Let&apos;s
              explore how we can help you grow.
            </p>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.cardContent}>
            <div className={styles.cardHeading}>
              <h3>
                Ready when
                <br />
                <span>you are.</span>
              </h3>

              <p>
                Share a few details about your business and preferred consultation date. Our team
                will get back to you to discuss your goals.
              </p>
            </div>

            <ContactForm methods={methods} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};
