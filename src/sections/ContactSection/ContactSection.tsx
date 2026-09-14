"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactForm } from "./elements/ContactForm/ContactForm";

import styles from "./ContactSection.module.css";
import { ContactFormData, validationSchema } from "./elements/ContactForm/validationSchema";
import { Toast } from "@/shared/components/Toast";
import { FlyInText } from "@/shared/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactSection = () => {
  const contactCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !contactCardRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(contactCardRef);
      const isMobile = window.innerWidth < 768;
      const xLeft = isMobile ? 0 : -35;
      const xRight = isMobile ? 0 : 30;
      const yOffset = isMobile ? 22 : 15;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactCardRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // 1. Contact card container base entrance
      tl.fromTo(
        contactCardRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
        0,
      );

      // 2. Left column heading slides in
      const headingH3 = q(`.${styles.cardHeading} h3`);
      if (headingH3.length) {
        tl.fromTo(
          headingH3,
          { opacity: 0, x: xLeft, y: isMobile ? 15 : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.1,
        );
      }

      // 3. Left column paragraph fades in
      const headingP = q(`.${styles.cardHeading} p`);
      if (headingP.length) {
        tl.fromTo(
          headingP,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.2,
        );
      }

      // 4. Right column form rows stagger in from the right
      const formItems = q("form > *");
      if (formItems.length) {
        tl.fromTo(
          formItems,
          { opacity: 0, x: xRight, y: yOffset },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.22,
        );
      }
    }, contactCardRef);

    return () => ctx.revert();
  }, []);

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form");
      }
      Toast.success("Thank you! We’ll get back to you shortly.");
      methods.reset();
    } catch (error) {
      Toast.error("We couldn’t send your message. Please try again later.");
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.headingLabel}>
          <span className={styles.headingLine} />
          <FlyInText as="span" distance={25}>
            LET&apos;S CONNECT
          </FlyInText>
        </div>

        <div className={styles.headingRow}>
          <h2 className={styles.title}>
            <FlyInText distance={32} delay={0.1}>
              Let&apos;s make
              <br />
              <span>something</span>
              <br />
              unmissable.
            </FlyInText>
          </h2>

          <div className={styles.headingAside}>
            <p className={styles.description}>
              <FlyInText distance={30} delay={0.25} seed={60}>
                Tell us about your business, your goals, and where you want to go next. Let&apos;s
                explore how we can help you grow.
              </FlyInText>
            </p>
          </div>
        </div>

        <div ref={contactCardRef} className={styles.contactCard}>
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
