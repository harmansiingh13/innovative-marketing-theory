"use client";

import React, { useState, forwardRef } from "react";
import Image from "next/image";
import styles from "./WebProcess.module.css";
import { ArrowRight, Check } from "lucide-react";

export interface ProcessStage {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
}

const STAGES: ProcessStage[] = [
  {
    id: "discover",
    num: "01",
    title: "DISCOVER",
    subtitle: "Research & Scope",
    description:
      "Initial technical audit, audience research, project scope definition, and strategic roadmap planning.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Research & Discovery Phase",
    deliverables: [
      "Technical Audit & Scope",
      "Competitive Analysis",
      "Project Scope & Roadmap",
    ],
  },
  {
    id: "plan",
    num: "02",
    title: "PLAN",
    subtitle: "User Journeys",
    description:
      "Structuring site architecture, conversion funnels, wireframes, and interactive user journeys.",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Planning & Wireframing Phase",
    deliverables: [
      "Sitemap & Information Architecture",
      "User Flow Diagrams",
      "UX Wireframe Blueprints",
    ],
  },
  {
    id: "design",
    num: "03",
    title: "DESIGN",
    subtitle: "UI & Style Tokens",
    description:
      "Crafting dark-mode layout designs, typography tokens, custom UI components, and kinetic prototypes.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "UI & Style Tokens Design Phase",
    deliverables: [
      "UI Design System",
      "High-Fidelity Mockups",
      "Responsive Layout Specs",
    ],
  },
  {
    id: "develop",
    num: "04",
    title: "DEVELOP",
    subtitle: "Frontend Build",
    description:
      "Writing clean, type-safe Next.js code, React server components, and GSAP scroll timeline animations.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Frontend Development Phase",
    deliverables: [
      "Next.js 15 & React 19 Build",
      "Strict TypeScript Type-Safety",
      "GSAP ScrollTrigger Animations",
    ],
  },
  {
    id: "launch",
    num: "05",
    title: "LAUNCH",
    subtitle: "Testing & Go-Live",
    description:
      "Performance optimization, 100/100 Lighthouse auditing, cross-browser testing, and global edge deployment.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Testing & Go-Live Launch Phase",
    deliverables: [
      "100/100 Lighthouse Optimization",
      "Cross-Browser & Device Testing",
      "Global Edge CDN Handover",
    ],
  },
];

export interface WebProcessProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  phasesListRef?: React.RefObject<HTMLDivElement | null>;
}

export const WebProcess = forwardRef<HTMLElement, WebProcessProps>(
  ({ headerRef, phasesListRef }, ref) => {
    const [activeStageIndex, setActiveStageIndex] = useState(2); // Stage 03 DESIGN default as in screenshot
    const currentStage = STAGES[activeStageIndex];

    return (
      <section ref={ref} id="process" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>— 05 / EXECUTION WORKFLOW</span>
            </div>

            <div className={styles.headerRow}>
              <h2 className={styles.title}>
                HOW WE <span className={styles.goldText}>EXECUTE.</span>
              </h2>
              <p className={styles.description}>
                Select a stage to explore our full-stack engineering workflow. Every project is
                engineered for zero-jank frame rates, 100/100 Lighthouse performance, and category dominance.
              </p>
            </div>
          </div>

          {/* 2-Column Split: Stage Navigation + Active Stage Panel */}
          <div ref={phasesListRef} className={styles.showcaseGrid}>
            {/* Left Column: Vertical Stages List */}
            <div className={styles.leftNav} role="tablist">
              {STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                    onClick={() => setActiveStageIndex(idx)}
                  >
                    <div className={styles.navLeftGroup}>
                      <span className={styles.navNumber}>{stage.num}</span>
                      <div className={styles.navTextGroup}>
                        <span className={styles.navTitle}>{stage.title}</span>
                        <span className={styles.navSubtitle}>{stage.subtitle}</span>
                      </div>
                    </div>
                    <ArrowRight className={styles.navArrow} size={16} />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Stage Showcase Panel */}
            <div className={styles.activePanel}>
              {/* Image Container */}
              <div className={styles.imageCard}>
                <div className={styles.imageInner}>
                  <Image
                    src={currentStage.image}
                    alt={currentStage.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 760px"
                    priority={activeStageIndex === 2}
                    className={styles.stageImage}
                  />
                  <div className={styles.imageOverlay} />
                </div>
              </div>

              {/* Stage Content Below Image */}
              <div className={styles.panelContent}>
                <div className={styles.titleGroup}>
                  <h3 className={styles.stageTitle}>
                    <span className={styles.stageNumGold}>{currentStage.num}</span> {currentStage.title}
                  </h3>
                  <p className={styles.stageDescription}>{currentStage.description}</p>
                </div>

                <div className={styles.dividerLine} />

                {/* Key Deliverables Block */}
                <div className={styles.deliverablesBlock}>
                  <span className={styles.deliverablesLabel}>KEY DELIVERABLES:</span>
                  <div className={styles.deliverablesList}>
                    {currentStage.deliverables.map((item, i) => (
                      <div key={i} className={styles.deliverableItem}>
                        <Check size={14} className={styles.checkIcon} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

WebProcess.displayName = "WebProcess";
export default WebProcess;
