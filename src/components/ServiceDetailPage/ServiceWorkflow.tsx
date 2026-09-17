"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/data/servicesData";
import styles from "./ServiceWorkflow.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceWorkflowProps {
  service: ServiceData;
}

export const ServiceWorkflow = ({ service }: ServiceWorkflowProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  const stages = service.workflow;
  const currentStage = stages[activeIdx] || stages[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !stages || stages.length === 0) return;

    const ctx = gsap.context(() => {
      if (layoutRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 40%",
          end: "bottom 60%",
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * stages.length),
              stages.length - 1
            );
            setActiveIdx(idx);
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [stages]);

  if (!stages || stages.length === 0) return null;

  return (
    <section id="workflow" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>05 / EXECUTION WORKFLOW</span>
          </div>

          <h2 className={styles.title}>
            HOW WE <span className={styles.goldText}>EXECUTE.</span>
          </h2>
        </div>

        <div ref={layoutRef} className={styles.workflowLayout}>
          <div className={styles.stageSelectorList}>
            {stages.map((stage, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={stage.id}
                  type="button"
                  className={`${styles.stageTab} ${isActive ? styles.activeTab : ""}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <span className={styles.tabNum}>{stage.num}</span>
                  <div className={styles.tabTextGroup}>
                    <span className={styles.tabName}>{stage.name}</span>
                    <span className={styles.tabSubtitle}>{stage.subtitle}</span>
                  </div>
                  <ArrowRight className={styles.tabArrow} />
                </button>
              );
            })}
          </div>

          <div className={styles.showcaseCard}>
            <div className={styles.showcaseImageWrapper}>
              <Image
                src={currentStage.image}
                alt={currentStage.name}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={styles.showcaseImage}
                priority
              />
              <div className={styles.imageBadge}>
                <span>
                  STAGE {currentStage.num} / {stages.length}
                </span>
              </div>
            </div>

            <div className={styles.showcaseContent}>
              <div className={styles.showcaseHeader}>
                <span className={styles.showcaseNum}>{currentStage.num}</span>
                <h3 className={styles.showcaseTitle}>{currentStage.name}</h3>
              </div>

              <p className={styles.showcaseDesc}>{currentStage.description}</p>

              <div className={styles.deliverablesList}>
                <span className={styles.deliverablesLabel}>KEY DELIVERABLES:</span>
                {currentStage.deliverables.map((item) => (
                  <div key={item} className={styles.deliverableItem}>
                    <Check className={styles.checkIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
