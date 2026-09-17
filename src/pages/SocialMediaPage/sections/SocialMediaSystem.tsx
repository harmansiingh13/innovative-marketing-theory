"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import styles from "./SocialMediaSystem.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SYSTEM_STEPS = [
  {
    number: "01",
    title: "RESEARCH",
    description: "Understand the audience, market, competitors and opportunities.",
    detail: "Data-driven audience mapping, competitor benchmark analysis, and trend discovery.",
  },
  {
    number: "02",
    title: "STRATEGY",
    description: "Define positioning, content pillars, messaging and direction.",
    detail: "Core brand voice positioning, channel strategy, content mix, and monthly roadmap.",
  },
  {
    number: "03",
    title: "CREATIVE",
    description: "Transform strategy into scroll-stopping visual content.",
    detail: "Cinematic short-form reels, high-end graphic design, and brand storytelling.",
  },
  {
    number: "04",
    title: "DISTRIBUTION",
    description: "Publish and promote content to reach the right audience.",
    detail: "Peak time scheduling, platform-specific optimization, and audience engagement.",
  },
  {
    number: "05",
    title: "OPTIMIZATION",
    description: "Measure performance, learn from data and continuously improve.",
    detail: "Weekly performance telemetry, retention analysis, and strategic iteration.",
  },
];

export const SocialMediaSystem = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Connecting line draws during scroll
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: journeyRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
              onUpdate: (self) => {
                const stepIdx = Math.min(
                  Math.floor(self.progress * SYSTEM_STEPS.length),
                  SYSTEM_STEPS.length - 1
                );
                setActiveStep(stepIdx);
              },
            },
          }
        );
      }

      // Staggered reveal of process steps
      if (journeyRef.current) {
        const steps = journeyRef.current.querySelectorAll(`.${styles.journeyStep}`);
        gsap.fromTo(
          steps,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.14,
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
    <section id="system" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>03 / THE METHODOLOGY</span>
          </div>

          <h2 className={styles.title}>
            THE SYSTEM BEHIND
            <br />
            <span className={styles.goldText}>EVERY POST.</span>
          </h2>
        </div>

        <div ref={journeyRef} className={styles.journeyWrapper}>
          <div className={styles.connectingLine}>
            <div ref={progressLineRef} className={styles.connectingProgress} />
          </div>

          <div className={styles.journeyGrid}>
            {SYSTEM_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  className={`${styles.journeyStep} ${isActive ? styles.activeStep : ""}`}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <div className={styles.stepNode}>
                      {isActive ? (
                        <CheckCircle2 className={styles.nodeActiveIcon} />
                      ) : (
                        <div className={styles.nodeDot} />
                      )}
                    </div>
                  </div>

                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.activeDetailCard}>
          <div className={styles.activeDetailHeader}>
            <span className={styles.activeNumber}>{SYSTEM_STEPS[activeStep].number}</span>
            <span className={styles.activeTitle}>{SYSTEM_STEPS[activeStep].title} PROCESS</span>
          </div>
          <p className={styles.activeDetailText}>{SYSTEM_STEPS[activeStep].detail}</p>
          <div className={styles.activeIndicator}>
            <span>STAGE {activeStep + 1} OF 5</span>
            <ArrowRight className={styles.arrowIcon} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSystem;
