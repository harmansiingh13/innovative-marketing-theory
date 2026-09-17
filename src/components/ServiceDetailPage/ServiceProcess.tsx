"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/data/servicesData";
import styles from "./ServiceProcess.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceProcessProps {
  service: ServiceData;
}

export const ServiceProcess = ({ service }: ServiceProcessProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { process } = service;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * process.length),
              process.length - 1
            );
            setActiveStep(idx);
            if (lineProgressRef.current) {
              lineProgressRef.current.style.height = `${self.progress * 100}%`;
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [process.length]);

  return (
    <section id="process" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>03 / METHODOLOGY</span>
          </div>

          <h2 className={styles.title}>
            OUR STEP-BY-STEP <span className={styles.goldText}>PROCESS.</span>
          </h2>
        </div>

        <div className={styles.processLayout}>
          <div className={styles.trackColumn}>
            <div className={styles.connectingLine}>
              <div ref={lineProgressRef} className={styles.connectingLineProgress} />
            </div>
          </div>

          <div className={styles.stepsList}>
            {process.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={item.step}
                  className={`${styles.stepCard} ${isActive ? styles.activeCard : ""}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>{item.step}</span>
                    <div className={styles.stepTitleGroup}>
                      <h3 className={styles.stepTitle}>{item.title}</h3>
                      <span className={styles.stepSubtitle}>{item.subtitle}</span>
                    </div>
                  </div>

                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
