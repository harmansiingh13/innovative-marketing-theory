"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/data/servicesData";
import styles from "./ServiceIntro.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceIntroProps {
  service: ServiceData;
}

export const ServiceIntro = ({ service }: ServiceIntroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const { intro } = service;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8 }
        );
      }

      if (statementRef.current) {
        tl.fromTo(
          statementRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.5"
        );
      }

      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" ref={sectionRef} className={styles.introSection}>
      <div className={styles.container}>
        <div ref={labelRef} className={styles.labelGroup}>
          <span className={styles.labelLine} />
          <span className={styles.label}>{intro.label}</span>
        </div>

        <div className={styles.contentLayout}>
          <h2 ref={statementRef} className={styles.statement}>
            &ldquo;{intro.statement}&rdquo;
          </h2>

          <div className={styles.divider} />

          <p ref={paragraphRef} className={styles.paragraph}>
            {intro.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
};
