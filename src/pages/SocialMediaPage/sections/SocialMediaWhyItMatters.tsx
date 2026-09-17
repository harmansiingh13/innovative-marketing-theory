"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SocialMediaWhyItMatters.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATEMENTS = [
  { id: "01", text: "STRATEGIC CONTENT", desc: "Built with intent, grounded in market intelligence" },
  { id: "02", text: "CONSISTENT BRANDING", desc: "Unwavering visual & narrative excellence" },
  { id: "03", text: "MEANINGFUL CONNECTION", desc: "Deep audience resonance over superficial reach" },
  { id: "04", text: "SUSTAINABLE GROWTH", desc: "Compounding ROI that strengthens brand authority" },
];

export const SocialMediaWhyItMatters = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (listRef.current) {
        const items = listRef.current.querySelectorAll(`.${styles.statementRow}`);
        gsap.fromTo(
          items,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-it-matters" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>09 / WHY IT MATTERS</span>
          </div>
        </div>

        {/* Oversized Statements */}
        <div ref={listRef} className={styles.statementsList}>
          {STATEMENTS.map((item) => (
            <div key={item.id} className={styles.statementRow}>
              <span className={styles.statementNumber}>{item.id}</span>
              <div className={styles.statementTextGroup}>
                <h3 className={styles.statementText}>{item.text}</h3>
                <span className={styles.statementDesc}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaWhyItMatters;
