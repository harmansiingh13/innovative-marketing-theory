"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./WebProcess.module.css";

interface ProcessPhase {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  deliverables: string[];
  mediaType: "video" | "image";
  mediaSrc: string;
  telemetry: string;
  timecode: string;
}

const PHASES: ProcessPhase[] = [
  {
    id: "architecture",
    number: "01",
    category: "SPECIFICATION",
    title: "System Architecture, Schema Design & High-Converting UX Blueprint",
    description:
      "We begin by modeling relational database schemas, state management diagrams, component hierarchies, and checkout user journeys to eliminate technical debt before writing a single line of production code.",
    deliverables: [
      "Relational Database Schemas (Prisma / SQL)",
      "Information Architecture & User Journeys",
      "Strict API Interface & Endpoint Contracts",
      "Interactive Low-Fi UX Wireframe Blueprints",
    ],
    mediaType: "image",
    mediaSrc: "/images/director_monitor_bts.jpg",
    telemetry: "BLUEPRINT: 0% ARCH DEBT // TYPESAFE",
    timecode: "PHASE 01 // ARCHITECTURE",
  },
  {
    id: "design",
    number: "02",
    category: "DESIGN SYSTEM",
    title: "Bespoke Dark Luxury Art Direction & Kinetic Micro-Interactions",
    description:
      "Developing bespoke responsive design systems with Figma tokens, dark luxury typography, custom iconographies, and interactive kinetic prototypes modeling every hover state, micro-interaction, and layout transition.",
    deliverables: [
      "Atomic Design System & Token Library",
      "Dark Luxury Editorial Art Direction",
      "Interactive Micro-Physics Prototypes",
      "Fluid Responsive Grid Breakpoints",
    ],
    mediaType: "video",
    mediaSrc: "/videos/cinema_production_graded.mp4",
    telemetry: "DESIGN SYSTEM // 60 FPS MOTION",
    timecode: "PHASE 02 // PROTOTYPING",
  },
  {
    id: "engineering",
    number: "03",
    category: "FULL-STACK BUILD",
    title: "Next.js 15 Server Components & Fluid GSAP Motion",
    description:
      "Writing clean, type-safe Next.js 15 App Router code with React Server Components, server actions, optimistic UI updates, and frictionless GSAP ScrollTrigger timeline animations engineered for zero-jank frame rates.",
    deliverables: [
      "Next.js 15 Server Components & Actions",
      "Strict TypeScript Type-Safety Across All APIs",
      "GSAP ScrollTrigger & Timeline Sequencing",
      "Zero-Jank Layout Shift (CLS: 0.000)",
    ],
    mediaType: "image",
    mediaSrc: "/images/cinema_production_graded.jpg",
    telemetry: "CODE QUALITY // 100% TESTED & TYPED",
    timecode: "PHASE 03 // FULL-STACK BUILD",
  },
  {
    id: "deployment",
    number: "04",
    category: "EDGE DEPLOYMENT",
    title: "100/100 Lighthouse Optimization & Global Edge CDN Handover",
    description:
      "Stress-testing across 50+ device viewport configurations, automated Lighthouse audits, edge cache rule tuning, enterprise security penetration checks, and a white-glove CMS handover with complete source code ownership.",
    deliverables: [
      "Automated 100/100 Lighthouse CI/CD Pipeline",
      "Edge Cache Caching & Geo-Routing",
      "Enterprise SSL & Security Hardening",
      "Full Source Code & Admin Handover",
    ],
    mediaType: "image",
    mediaSrc: "/images/cinematic_reel_portrait.jpg",
    telemetry: "DEPLOYMENT // 24ms GLOBAL TTFB",
    timecode: "PHASE 04 // EDGE DEPLOY",
  },
];

export interface WebProcessProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  phasesListRef?: React.RefObject<HTMLDivElement | null>;
}

export const WebProcess = React.forwardRef<HTMLElement, WebProcessProps>(
  ({ headerRef, phasesListRef }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const activePhase = PHASES[activeIndex];

    const handleNext = () => {
      setActiveIndex((prev) => (prev + 1) % PHASES.length);
    };

    const handlePrev = () => {
      setActiveIndex((prev) => (prev - 1 + PHASES.length) % PHASES.length);
    };

    const toggleVideoPlayback = () => {
      const currentVideo = videoRefs.current[activeIndex];
      if (currentVideo) {
        if (currentVideo.paused) {
          currentVideo.play().catch(() => {});
          setIsPlaying(true);
        } else {
          currentVideo.pause();
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(!isPlaying);
      }
    };

    useEffect(() => {
      const currentVideo = videoRefs.current[activeIndex];
      if (currentVideo) {
        if (isPlaying) {
          currentVideo.play().catch(() => {});
        } else {
          currentVideo.pause();
        }
      }
    }, [activeIndex, isPlaying]);

    return (
      <section ref={ref} className={styles.section} id="process">
        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>SYSTEMIZED ARCHITECTURE</span>
            </div>

            <div className={styles.headerRow}>
              <h2 className={styles.title}>
                THE 4-PHASE <span>ENGINEERING PIPELINE</span>
              </h2>
              <p className={styles.description}>
                We do not build ad-hoc. Every digital flagship is delivered through a proven
                four-phase engineering lifecycle that guarantees flawless execution, sub-second
                speed, and zero technical compromises.
              </p>
            </div>
          </div>

          {/* Showcase Grid */}
          <div ref={phasesListRef} className={styles.showcaseGrid}>
            {/* Left Column: Interactive Steps */}
            <div className={styles.navColumn}>
              <div className={styles.stepsList}>
                {PHASES.map((phase, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      className={`${styles.stepItem} ${isActive ? styles.stepActive : ""}`}
                      onClick={() => setActiveIndex(idx)}
                      aria-pressed={isActive}
                    >
                      {isActive && <div className={styles.activeIndicatorLine} />}

                      <div className={styles.stepTopRow}>
                        <div className={styles.stepNumberGroup}>
                          <span className={styles.stepIndex}>{phase.number}</span>
                          <span className={styles.stepCategoryBadge}>{phase.category}</span>
                        </div>
                        <div className={styles.stepStatusDot} />
                      </div>

                      <h3 className={styles.stepTitle}>{phase.title}</h3>

                      {isActive && (
                        <div className={styles.stepStoryExpanded}>
                          <p className={styles.stepStoryDesc}>{phase.description}</p>
                          <div className={styles.deliverablesWrapper}>
                            <span className={styles.deliverablesLabel}>KEY DELIVERABLES</span>
                            <ul className={styles.deliverablesList}>
                              {phase.deliverables.map((item, dIdx) => (
                                <li key={dIdx} className={styles.deliverableItem}>
                                  <span className={styles.checkMark}>✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Media Carousel / HUD */}
            <div className={styles.mediaColumn}>
              <div className={styles.mediaFrame}>
                {/* HUD Top Bar */}
                <div className={styles.mediaHudTop}>
                  <div className={styles.hudBadge}>
                    <span className={styles.recordDot} />
                    <span>ENGINEERING VIEW</span>
                  </div>
                  <div className={styles.hudTelemetry}>{activePhase.telemetry}</div>
                </div>

                {/* Video control button if active slide has video */}
                {activePhase.mediaType === "video" && (
                  <button
                    type="button"
                    className={styles.videoControlBtn}
                    onClick={toggleVideoPlayback}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? "❚❚ PAUSE" : "▶ PLAY"}
                  </button>
                )}

                {/* Viewport & Carousel Track */}
                <div className={styles.mediaViewport}>
                  <div
                    className={styles.carouselTrack}
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                  >
                    {PHASES.map((phase, idx) => (
                      <div key={phase.id} className={styles.carouselSlide}>
                        {phase.mediaType === "video" ? (
                          <div className={styles.videoWrapper}>
                            <video
                              ref={(el) => {
                                videoRefs.current[idx] = el;
                              }}
                              src={phase.mediaSrc}
                              className={styles.mediaAsset}
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                            <div className={styles.vignetteOverlay} />
                          </div>
                        ) : (
                          <div className={styles.imageWrapper}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={phase.mediaSrc}
                              alt={phase.title}
                              className={styles.mediaAsset}
                              loading="lazy"
                            />
                            <div className={styles.vignetteOverlay} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nav Arrows */}
                <button
                  type="button"
                  className={`${styles.carouselNavBtn} ${styles.carouselNavPrev}`}
                  onClick={handlePrev}
                  aria-label="Previous phase"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles.carouselNavBtn} ${styles.carouselNavNext}`}
                  onClick={handleNext}
                  aria-label="Next phase"
                >
                  ›
                </button>

                {/* Pagination HUD */}
                <div className={styles.carouselPagination}>
                  <div className={styles.paginationDots}>
                    {PHASES.map((phase, idx) => (
                      <button
                        key={phase.id}
                        type="button"
                        className={`${styles.paginationDot} ${
                          idx === activeIndex ? styles.paginationDotActive : ""
                        }`}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <span className={styles.counterBadge}>
                    0{activeIndex + 1} / 0{PHASES.length}
                  </span>
                </div>

                {/* HUD Bottom */}
                <div className={styles.mediaHudBottom}>
                  <span className={styles.timecodeBadge}>{activePhase.timecode}</span>
                  <span className={styles.subtitleBadge}>{activePhase.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

WebProcess.displayName = "WebProcess";
export default WebProcess;
