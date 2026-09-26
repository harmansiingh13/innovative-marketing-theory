"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./EventProcess.module.css";

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
    id: "concept",
    number: "01",
    category: "CONCEPT & CAD",
    title: "Spatial Concept, Venue Scouting & 3D CAD Blueprinting",
    description:
      "We initiate every commission with precision spatial planning. We scout historic or industrial venues, model photorealistic 3D architectural CAD sets, simulate acoustic reflections, and map complete VIP pedestrian flows.",
    deliverables: [
      "Photorealistic 3D Spatial CAD Renders",
      "Acoustic Reflection & Dispersion Modeling",
      "VIP Pedestrian & Egress Flow Schematics",
      "Structural Load Permitting & Clearances",
    ],
    mediaType: "image",
    mediaSrc: "/images/director_monitor_bts.jpg",
    telemetry: "SPATIAL CAD: 0.0mm TOLERANCE",
    timecode: "PHASE 01 // ARCHITECTURE",
  },
  {
    id: "rigging",
    number: "02",
    category: "RIGGING & AV",
    title: "Concert-Grade Truss Rigging, LED Volume & DMX Lighting",
    description:
      "Deploying enterprise concert-grade truss rigging, synchronized DMX automated moving heads, high-nit curved MicroLED backdrop volumes, and acoustically tuned line-array sound systems backed by redundant power generators.",
    deliverables: [
      "Truss Rigging & Rigorous Load Calculations",
      "Synchronized DMX Moving Head Lighting",
      "MicroLED Video Wall Color Calibration",
      "Dual Secondary Generator Power Backup",
    ],
    mediaType: "video",
    mediaSrc: "/videos/cinema_production_graded.mp4",
    telemetry: "DMX RIG // 240 FIXTURES SYNCED",
    timecode: "PHASE 02 // RIGGING",
  },
  {
    id: "rehearsal",
    number: "03",
    category: "CHOREOGRAPHY",
    title: "Timecode-Synced Show Calling & Backstage Protocol",
    description:
      "Executing precision timecode-locked rehearsal passes with executive speakers, keynote teleprompter coaching, live wireless in-ear monitoring, stage cue calling, and white-glove VIP diplomatic security dry runs.",
    deliverables: [
      "Second-by-Second Run-of-Show Protocols",
      "Speaker Teleprompter Coaching Passes",
      "Wireless In-Ear Monitor (IEM) Tuning",
      "VIP Diplomatic Security Protocols",
    ],
    mediaType: "image",
    mediaSrc: "/images/cinema_production_graded.jpg",
    telemetry: "RUN-OF-SHOW // TIMECODE LOCKED",
    timecode: "PHASE 03 // REHEARSAL",
  },
  {
    id: "broadcast",
    number: "04",
    category: "BROADCAST & PR",
    title: "4K Multi-Camera Live Broadcast & Same-Day Sizzle Delivery",
    description:
      "Directing live multi-camera television broadcast with cinema glass, jib cranes, and wireless Steadicams. Same-day on-site editing suites cut and syndicate high-energy highlight sizzles to global press and media desks.",
    deliverables: [
      "Ultra-Low Latency 4K Global Broadcast",
      "Same-Day High-Impact Sizzle Reel Delivery",
      "Full Master Audio & Multi-Cam Archival",
      "Global PR Press Kit Asset Distribution",
    ],
    mediaType: "image",
    mediaSrc: "/images/cinematic_reel_portrait.jpg",
    telemetry: "BROADCAST // 4K 60FPS RECORDING",
    timecode: "PHASE 04 // LIVE SHOW",
  },
];

export interface EventProcessProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  phasesListRef?: React.RefObject<HTMLDivElement | null>;
}

export const EventProcess = React.forwardRef<HTMLElement, EventProcessProps>(
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
              <span>SYSTEMIZED STAGE OPS</span>
            </div>

            <div className={styles.headerRow}>
              <h2 className={styles.title}>
                THE 4-PHASE <span>PRODUCTION LIFECYCLE</span>
              </h2>
              <p className={styles.description}>
                Live experiential productions afford zero margin for error. Every stage is delivered
                through a rigorous, timecode-synchronized methodology that ensures flawless
                technical redundancy and unforgettable guest prestige.
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
                    <span>PRODUCTION VIEW</span>
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

EventProcess.displayName = "EventProcess";
export default EventProcess;
