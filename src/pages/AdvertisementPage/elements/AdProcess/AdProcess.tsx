"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./AdProcess.module.css";

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
    id: "tracking",
    number: "01",
    category: "FOUNDATION",
    title: "Server-Side Tracking & First-Party Infrastructure",
    description:
      "We eliminate signal loss from iOS and ad-blockers by engineering first-party server-side tracking (Meta Conversions API, Google Enhanced Conversions, GA4 event pipelines) and syncing offline CRM purchase revenue for uncompromised ROAS clarity.",
    deliverables: [
      "Meta Conversions API (CAPI)",
      "Google Enhanced Conversions",
      "Triple Whale & Northbeam Setup",
      "CRM Lifetime Value Pipeline",
    ],
    mediaType: "image",
    mediaSrc: "/images/director_monitor_bts.jpg",
    telemetry: "SIGNAL MATCH: 98.4% // 0% LOSS",
    timecode: "PHASE 01 // DATA SYNC",
  },
  {
    id: "creative",
    number: "02",
    category: "CREATIVE ENGINE",
    title: "High-Velocity Creative & Hook Architecture",
    description:
      "Creative is modern targeting. We write, produce, and iterate 15+ custom angle variations per sprint—ranging from direct-response creator UGC and cinematic macro product reels to high-converting statics and problem-agitate-solve hooks.",
    deliverables: [
      "15+ Weekly Angle & Hook Tests",
      "Direct Response Storyboarding",
      "3-Second Hook Retention Matrix",
      "Dynamic Native Motion Design",
    ],
    mediaType: "video",
    mediaSrc: "/videos/cinema_production_graded.mp4",
    telemetry: "CREATIVE FORGE // 4K LOG MASTER",
    timecode: "PHASE 02 // ITERATION",
  },
  {
    id: "scaling",
    number: "03",
    category: "MEDIA BUYING",
    title: "Algorithmic Media Buying & Bid Management",
    description:
      "Leveraging Advantage+ and Performance Max frameworks governed by cost-cap safeguards, custom audience segmentation, and algorithmic dayparting. We scale winning spend exponentially while cutting fatigue before CAC can rise.",
    deliverables: [
      "Advantage+ & P-Max Architecture",
      "Cost-Cap & Target ROAS Guardrails",
      "Dynamic Budget Escalation Pacing",
      "Cross-Channel Cannibalization Checks",
    ],
    mediaType: "image",
    mediaSrc: "/images/cinema_production_graded.jpg",
    telemetry: "ALGO BIDDER // $10K/DAY PACING",
    timecode: "PHASE 03 // SCALING",
  },
  {
    id: "cro",
    number: "04",
    category: "CONVERSION & LTV",
    title: "Post-Click Funnel & Lifetime Value Optimization",
    description:
      "Media spend is useless without ruthless conversion mechanics. We deploy sub-second custom advertorial landing pages, 1-click checkout order bumps, and post-purchase lifecycle workflows to maximize Average Order Value and 60-day repeat purchase rate.",
    deliverables: [
      "Sub-Second Advertorial Landing Pages",
      "Dynamic 1-Click Order Bumps",
      "Cart Friction Elimination",
      "Post-Purchase Klaviyo Sequences",
    ],
    mediaType: "image",
    mediaSrc: "/images/cinematic_reel_portrait.jpg",
    telemetry: "LANDING PAGE // 4.9% CONV RATE",
    timecode: "PHASE 04 // RETENTION",
  },
];

export interface AdProcessProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  phasesListRef?: React.RefObject<HTMLDivElement | null>;
}

export const AdProcess = React.forwardRef<HTMLElement, AdProcessProps>(
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
      // Synchronize video play state when slide changes
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
              <span className={styles.kickerLine}></span>
              <span>SYSTEMIZED EXECUTION</span>
            </div>

            <div className={styles.headerRow}>
              <h2 className={styles.title}>
                THE 4-PHASE <span>GROWTH ENGINE</span>
              </h2>
              <p className={styles.description}>
                We don&apos;t rely on luck or uncalibrated ad boosts. Every dollar of capital is
                channeled through a verified 4-phase growth infrastructure engineered to maximize
                ROAS and customer lifetime value.
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
                    <span>PROCESS VIEW</span>
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
                  aria-label="Previous step"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles.carouselNavBtn} ${styles.carouselNavNext}`}
                  onClick={handleNext}
                  aria-label="Next step"
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

AdProcess.displayName = "AdProcess";
export default AdProcess;
