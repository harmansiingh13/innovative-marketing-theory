"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ContactForm } from "@/sections/ContactSection/elements/ContactForm/ContactForm";
import {
  ContactFormData,
  validationSchema,
} from "@/sections/ContactSection/elements/ContactForm/validationSchema";
import { Toast } from "@/shared/components/Toast";
import styles from "./SocialMediaCTA.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SocialMediaCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingGridRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingGridRef.current) {
        gsap.fromTo(
          headingGridRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formCardRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      Toast.success("Thank you! We’ll get back to you shortly to discuss your social media strategy.");
      methods.reset();
    } catch {
      Toast.error("We couldn’t send your message. Please try again later.");
    }
  };

  return (
    <section id="social-cta" ref={sectionRef} className={styles.section}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span>10 / START A CONVERSATION</span>
        </div>

        <div ref={headingGridRef} className={styles.headingGrid}>
          <h2 className={styles.mainTitle}>
            YOUR BRAND
            <br />
            <span>DESERVES MORE</span>
            <br />
            <span className={styles.goldText}>THAN POSTS.</span>
          </h2>

          <div className={styles.headingAside}>
            <p className={styles.secondStatement}>
              LET&apos;S BUILD SOMETHING <br />
              <span className={styles.goldText}>PEOPLE REMEMBER.</span>
            </p>
            <p className={styles.description}>
              Share a few details about your business and goals. Our strategists will review your
              brand presence and reach out with a tailored consultation.
            </p>
          </div>
        </div>

        <div ref={formCardRef} className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <h3>
              LET&apos;S TALK <ArrowUpRight className={styles.ctaArrowIcon} />
            </h3>
            <p>Fill out the strategic consultation form below.</p>
          </div>

          <ContactForm methods={methods} onSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default SocialMediaCTA;
