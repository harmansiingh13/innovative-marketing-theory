"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/data/servicesData";
import styles from "./ServiceImpact.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceImpactProps {
  service: ServiceData;
}

export const ServiceImpact = ({ service }: ServiceImpactProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const pillars = service.impactStatements;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(`.${styles.pillarCard}`);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>06 / BUSINESS IMPACT</span>
          </div>

          <h2 className={styles.title}>
            THE VALUE WE <span className={styles.goldText}>CREATE.</span>
          </h2>
        </div>

        <div ref={gridRef} className={styles.pillarsGrid}>
          {pillars.map((pillar, idx) => (
            <div key={pillar.title} className={styles.pillarCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIndex}>0{idx + 1}</span>
                <span className={styles.cardSubtitle}>{pillar.subtitle}</span>
              </div>

              <h3 className={styles.cardTitle}>{pillar.title}</h3>

              <p className={styles.cardDesc}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
