"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./ContactSection.module.css";

type ContactFormData = {
  fullName: string;
  phoneNumber: string;
  workEmail: string;
  companyName: string;
  designation: string;
  businessOverview: string;
  consultationDate: string;
};

export const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phoneNumber: "",
    workEmail: "",
    companyName: "",
    designation: "",
    businessOverview: "",
    consultationDate: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect your API or email service here.
    console.log("Consultation request:", formData);
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
              <span className={styles.cardEyebrow}>START A CONVERSATION</span>

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

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">FULL NAME</label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phoneNumber">PHONE NUMBER</label>

                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="workEmail">WORK EMAIL</label>

                  <input
                    id="workEmail"
                    name="workEmail"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.workEmail}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="companyName">COMPANY NAME</label>

                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    autoComplete="organization"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="designation">PROFESSION / DESIGNATION</label>

                <input
                  id="designation"
                  name="designation"
                  type="text"
                  placeholder="Founder, CEO, Marketing Manager..."
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="businessOverview">BUSINESS OVERVIEW &amp; CORE OBJECTIVE</label>

                <textarea
                  id="businessOverview"
                  name="businessOverview"
                  placeholder="Tell us about your business, current challenges, and what you want to achieve..."
                  value={formData.businessOverview}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="consultationDate">PREFERRED CONSULTATION DATE</label>

                <input
                  id="consultationDate"
                  name="consultationDate"
                  type="date"
                  value={formData.consultationDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                <span>Get in touch</span>
                <span className={styles.submitArrow}>↗</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
