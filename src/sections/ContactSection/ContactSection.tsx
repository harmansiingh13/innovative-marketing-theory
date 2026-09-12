"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactForm } from "./elements/ContactForm/ContactForm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styles from "./ContactSection.module.css";
import { ContactFormData, validationSchema } from "./elements/ContactForm/validationSchema";
import { Toast } from "@/shared/components/Toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const renderAnimatedWord = (word: string, offset: number, isGold = false) => {
  return word.split("").map((char, i) => (
    <span
      key={i}
      className={styles.char}
      data-char-index={offset + i}
      style={isGold ? { color: "var(--gold)" } : undefined}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export const ContactSection = () => {
  const contactRef = useRef<HTMLDivElement>(null);

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

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 769px)",
          isMobile: "(max-width: 768px)",
        },
        (context) => {
          const { isMobile } = (context.conditions || {}) as { isMobile?: boolean };

          // 1. Heading Far-Corner & Side Letter Collision Assembly Animation
          const get4WayDirection = (index: number) => {
            const directions = [
              { x: -500, y: -400, rotation: -45 }, // Top-Left Corner
              { x: 500, y: -400, rotation: 45 },   // Top-Right Corner
              { x: -600, y: 0, rotation: -35 },    // Far Left Side
              { x: 600, y: 0, rotation: 35 },      // Far Right Side
              { x: -450, y: 400, rotation: 40 },   // Bottom-Left Corner
              { x: 450, y: 400, rotation: -40 },   // Bottom-Right Corner
              { x: 0, y: -450, rotation: -20 },    // Top Edge
              { x: 0, y: 450, rotation: 20 },      // Bottom Edge
            ];
            const dir = directions[index % directions.length];
            const mult = isMobile ? 0.4 : 1;
            return {
              x: dir.x * mult,
              y: dir.y * mult,
              rotation: dir.rotation,
            };
          };

          const headingTl = gsap.timeline({
            scrollTrigger: {
              trigger: `.${styles.headingRow}`,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });

          // Label
          headingTl.fromTo(
            `.${styles.headingLabel}`,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 }
          );

          // Letters Collision Assembly
          const chars = gsap.utils.toArray<HTMLElement>(`.${styles.char}`);

          chars.forEach((char, i) => {
            const vec = get4WayDirection(i);
            headingTl.fromTo(
              char,
              {
                x: vec.x,
                y: vec.y,
                rotation: vec.rotation,
                scale: 0.2,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1.1,
                ease: "expo.out",
              },
              i === 0 ? "-=0.3" : `<+=${0.022}`
            );
          });

          // Description Aside
          headingTl.fromTo(
            `.${styles.headingAside}`,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.5"
          );

          // 2. Contact Card Flying Entry & Internal Element Cascade
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: `.${styles.contactCard}`,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });

          // Card Container reveal
          cardTl.fromTo(
            `.${styles.contactCard}`,
            {
              y: 70,
              scale: 0.95,
              opacity: 0,
              rotateX: 5,
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              rotateX: 0,
              duration: 1.0,
              ease: "expo.out",
            }
          );

          // Card Left Heading text
          cardTl.fromTo(
            `.${styles.cardHeading} h3, .${styles.cardHeading} p`,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
            "-=0.6"
          );

          // Form input groups cascade from bottom
          const formInputs = gsap.utils.toArray<HTMLElement>(
            `.${styles.contactCard} input, .${styles.contactCard} textarea, .${styles.contactCard} label`
          );

          cardTl.fromTo(
            formInputs,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.5"
          );

          // Submit Button snap
          cardTl.fromTo(
            `.${styles.contactCard} button[type="submit"]`,
            { y: 20, scale: 0.95, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" },
            "-=0.3"
          );
        }
      );
    },
    { scope: contactRef }
  );

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
    <section id="contact" ref={contactRef} className={styles.section}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.headingLabel}>
          <span className={styles.headingLine} />
          <span>LET&apos;S CONNECT</span>
        </div>

        <div className={styles.headingRow}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>{renderAnimatedWord("Let's make", 0)}</span>
            <span className={styles.titleLine}>{renderAnimatedWord("something", 11, true)}</span>
            <span className={styles.titleLine}>{renderAnimatedWord("unmissable.", 21)}</span>
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
