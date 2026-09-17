"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SocialMediaWorkflow.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORKFLOW_STAGES = [
  {
    id: "discover",
    num: "01",
    name: "DISCOVER",
    subtitle: "Audience & Competitor Intelligence",
    description:
      "We dive deep into your brand DNA, target demographics, historical analytics, and competitor positioning to establish a solid baseline.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    deliverables: ["Audience Persona Map", "Competitor Matrix", "Brand Audit Report"],
  },
  {
    id: "define",
    num: "02",
    name: "DEFINE",
    subtitle: "Pillars & Creative Blueprint",
    description:
      "We formulate core content pillars, establish visual style guides, tone of voice, and produce a 30-day content execution roadmap.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
    deliverables: ["Content Pillars Strategy", "Visual Style Guide", "Monthly Editorial Calendar"],
  },
  {
    id: "create",
    num: "03",
    name: "CREATE",
    subtitle: "Cinematic Content & Graphic Production",
    description:
      "Our creative team shoots cinematic short-form video reels, designs premium graphics, and crafts high-converting copy.",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1000&q=80",
    deliverables: ["Short-form Reels & Edits", "Custom Carousels & Graphics", "Psychology Copywriting"],
  },
  {
    id: "publish",
    num: "04",
    name: "PUBLISH",
    subtitle: "Algorithmic Scheduling & Community",
    description:
      "We publish content during peak activity hours, optimize hashtag & sound metadata, and actively manage community interactions.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
    deliverables: ["Peak-time Scheduling", "Metadata & SEO Tags", "Active Response Protocol"],
  },
  {
    id: "optimize",
    num: "05",
    name: "OPTIMIZE",
    subtitle: "Performance Telemetry & Iteration",
    description:
      "We analyze watch time, retention, engagement rate, and click-through metrics to continuously refine content performance.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    deliverables: ["Monthly Performance Dashboard", "Retention Deep-dive", "Iterative Strategy Update"],
  },
];

export const SocialMediaWorkflow = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  const currentStage = WORKFLOW_STAGES[activeIdx];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scroll-triggered active stage tracker as user scrolls through the section
      if (layoutRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 40%",
          end: "bottom 60%",
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * WORKFLOW_STAGES.length),
              WORKFLOW_STAGES.length - 1
            );
            setActiveIdx(idx);
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="workflow" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>08 / EXECUTION PROCESS</span>
          </div>

          <h2 className={styles.title}>
            HOW WE <span className={styles.goldText}>BUILD IT.</span>
          </h2>
        </div>

        <div ref={layoutRef} className={styles.workflowLayout}>
          <div className={styles.stageSelectorList}>
            {WORKFLOW_STAGES.map((stage, idx) => {
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
                  STAGE {currentStage.num} / {WORKFLOW_STAGES.length}
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

export default SocialMediaWorkflow;
