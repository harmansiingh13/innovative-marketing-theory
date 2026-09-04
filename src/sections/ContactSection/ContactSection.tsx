"use client";

import { FormEvent, useState } from "react";
import styles from "./ContactSection.module.css";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect your API or email service here.
    console.log(formData);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.headingLabel}>
          <span className={styles.headingLine} />
          <span>LET'S CONNECT</span>
        </div>

        <div className={styles.headingRow}>
          <h2 className={styles.title}>
            Let's make
            <br />
            <span>something</span>
            <br />
            unmissable.
          </h2>

          <div className={styles.headingAside}>
            {/* <span className={styles.headingNumber}>06 / 06</span> */}

            <p className={styles.description}>
              Have a project in mind, or just want to explore what's possible?
              We'd love to hear from you.
            </p>
          </div>
        </div>

        <div className={styles.contactCard}>
          {/* <div className={styles.cardTop}>
            <span>START A CONVERSATION</span>
            <span className={styles.cardArrow}>↗</span>
          </div> */}

          <div className={styles.cardContent}>
            <div className={styles.cardHeading}>
              <h3>
                Ready when
                <br />
                <span>you are.</span>
              </h3>

              <p>
                Tell us a little about your project. We'll get back to you and
                explore what we can build together.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">YOUR NAME</label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">YOUR EMAIL</label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">SUBJECT</label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">YOUR MESSAGE</label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                <span>SEND MESSAGE</span>
                <span className={styles.submitArrow}>↗</span>
              </button>
            </form>
          </div>
{/* 
          <div className={styles.cardBottom}>
            <span>STRATEGY / CREATIVE / EXECUTION</span>
            <span>LET'S BUILD SOMETHING GREAT.</span>
          </div> */}
        </div>
      </div>
    </section>
  );
};
