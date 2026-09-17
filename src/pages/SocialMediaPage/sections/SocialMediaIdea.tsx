"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SocialMediaIdea.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SocialMediaIdea = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll(`.${styles.statementLine}`);
        gsap.fromTo(
          lines,
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

        const supportingCopy = textRef.current.querySelector(`.${styles.supportingCopy}`);
        if (supportingCopy) {
          gsap.fromTo(
            supportingCopy,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: supportingCopy,
                start: "top 85%",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="idea" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div ref={textRef} className={styles.content}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>THE IDEA</span>
          </div>

          <h2 className={styles.statement}>
            <span className={styles.statementLine}>YOUR SOCIAL PRESENCE</span>
            <span className={styles.statementLine}>
              <span className={styles.highlightText}>SHOULD BE A SYSTEM,</span>
            </span>
            <span className={styles.statementLine}>NOT A COLLECTION OF POSTS.</span>
          </h2>

          <div className={styles.dividerLine} />

          <p className={styles.supportingCopy}>
            &ldquo;Successful social media is more than publishing content. It requires research,
            strategy, storytelling, creative direction, distribution and continuous
            optimization.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaIdea;
