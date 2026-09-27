"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./ProductionProcess.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ProcessMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  deliverables: string[];
  timecode: string;
  optics: string;
  sceneTag: string;
  media: ProcessMediaItem;
}

export const processSteps: ProcessStep[] = [
  {
    id: "step-01",
    number: "01",
    category: "PRE-PRODUCTION & STRATEGY",
    title: "Concept & Strategic Blueprint",
    description:
      "Every iconic frame begins with strategic clarity. We immerse ourselves in your brand identity, architect scene storyboards, scout location and lighting, and script every camera movement before power is switched on.",
    deliverables: [
      "Creative Treatment Deck",
      "Detailed Shot Architecture",
      "Lighting & Mood Blueprint",
      "Talent & Location Curation",
    ],
    timecode: "SEQ 01 // 00:00:00",
    optics: "OPTICS: 35MM T1.5 // SCRIPT BLOCKING",
    sceneTag: "OPTICAL BLOCKING & SCENE FRAMING",
    media: {
      id: "step-01-media",
      type: "image",
      src: "/images/director_monitor_bts.jpg",
      alt: "Director monitor displaying scene framing and camera telemetry",
    },
  },
  {
    id: "step-02",
    number: "02",
    category: "PRINCIPAL PHOTOGRAPHY",
    title: "Cinematic On-Set Execution",
    description:
      "On set, precision is paramount. We build controlled lighting architecture, deploy high-dynamic-range cinema sensors, record pristine multi-track studio audio, and direct scenes with relentless visual discipline.",
    deliverables: [
      "4K DCI Raw Cinema Capture",
      "Controlled Key & Rim Lighting",
      "Gimbal & Dolly Camera Rigs",
      "Studio Multi-Track Audio",
    ],
    timecode: "SEQ 02 // 00:15:30",
    optics: "SENSOR: 4K DCI // SHUTTER: 180° // 5600K",
    sceneTag: "4K DCI SENSOR LIVE CAPTURE",
    media: {
      id: "step-02-media",
      type: "video",
      src: "/videos/cinema_production_graded.mp4",
      poster: "/images/cinema_production_graded.jpg",
      alt: "Cinema camera shoot on set with dynamic lighting",
    },
  },
  {
    id: "step-03",
    number: "03",
    category: "POST-PRODUCTION & CRAFT",
    title: "From Raw Footage to Final Frame",
    description:
      "Raw footage transforms into brand prestige. We craft kinetic editorial pacing for viewer retention, sculpt bespoke color grades matched to your brand palette, and engineer immersive spatial sound.",
    deliverables: [
      "Bespoke Brand Color Grade",
      "Spatial Sound Design & Foley",
      "High-Retention Narrative Cut",
      "Multi-Platform Master Delivery",
    ],
    timecode: "SEQ 03 // 00:45:00",
    optics: "GRADE: DCI-P3 // PRORES 4444 XQ MASTER",
    sceneTag: "DAVINCI WIDE GAMUT COLOR SCULPTING",
    media: {
      id: "step-03-media",
      type: "image",
      src: "/images/cinematic_reel_portrait.jpg",
      alt: "Cinematic color grading and editorial suite",
    },
  },
];

export interface ProductionProcessProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  actsListRef?: React.RefObject<HTMLDivElement | null>;
}

export const ProductionProcess = forwardRef<HTMLElement, ProductionProcessProps>(
  ({ headerRef, actsListRef }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

    const activeStep = processSteps[activeIndex];

    // Manage video playback when active step changes
    useEffect(() => {
      videoRefs.current.forEach((video, idx) => {
        if (!video) return;
        if (idx === activeIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, [activeIndex]);

    const handlePrevStep = useCallback(() => {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : processSteps.length - 1));
    }, []);

    const handleNextStep = useCallback(() => {
      setActiveIndex((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0));
    }, []);

    return (
      <section ref={ref} id="process" className={styles.section}>
        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>THE PRODUCTION METHODOLOGY</span>
            </div>
            <div className={styles.headerRow}>
              <h2 className={styles.title}>
                How we make it.
                <br />
                <span>From blueprint to final frame.</span>
              </h2>
              <p className={styles.description}>
                Select a stage to explore our cinematic methodology. Every phase is an
                uncompromising convergence of brand strategy, lighting architecture, and master
                post-production.
              </p>
            </div>
          </div>

          {/* Two-Column Editorial Layout */}
          <div ref={actsListRef} className={styles.showcaseGrid}>
            {/* LEFT COLUMN: Interactive Steps List */}
            <div className={styles.navColumn}>
              <div role="tablist" aria-label="Production stages" className={styles.stepsList}>
                {processSteps.map((step, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={step.id}
                      role="tab"
                      id={`tab-${step.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${step.id}`}
                      tabIndex={0}
                      onClick={() => setActiveIndex(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveIndex(idx);
                        }
                      }}
                      className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ""}`}
                    >
                      <div className={styles.stepMetaRow}>
                        <span className={styles.stepNumber}>{step.number}</span>
                        <span className={styles.stepCategory}>{step.category}</span>
                      </div>

                      <h3 className={styles.stepTitle}>{step.title}</h3>

                      {/* Smooth Accordion Expansion */}
                      <div
                        className={`${styles.accordionWrapper} ${
                          isActive ? styles.accordionWrapperOpen : ""
                        }`}
                      >
                        <div className={styles.accordionInner}>
                          <div
                            id={`panel-${step.id}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${step.id}`}
                            className={styles.activeContent}
                          >
                            <p className={styles.activeDescription}>{step.description}</p>

                            <div className={styles.deliverablesBlock}>
                              <span className={styles.deliverablesLabel}>
                                {"KEY EXECUTION DELIVERABLES //"}
                              </span>
                              <div className={styles.deliverablesPills}>
                                {step.deliverables.map((item) => (
                                  <span key={item} className={styles.deliverablePill}>
                                    <span className={styles.pillDot} />
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Media Showcase */}
            <div className={styles.mediaColumn}>
              <div className={styles.mediaFrame}>
                {/* Viewfinder Corner Crop Marks */}
                <span className={styles.cropMarkTL} aria-hidden="true">
                  ⌜
                </span>
                <span className={styles.cropMarkTR} aria-hidden="true">
                  ⌝
                </span>
                <span className={styles.cropMarkBL} aria-hidden="true">
                  ⌞
                </span>
                <span className={styles.cropMarkBR} aria-hidden="true">
                  ⌟
                </span>

                {/* Top Telemetry HUD */}
                <div className={styles.mediaHudTop}>
                  <div className={styles.hudBadge}>
                    <span className={styles.recordDot} />
                    <span>{`${activeStep.number} // ${activeStep.category}`}</span>
                  </div>
                  <span className={styles.hudTelemetry}>{activeStep.optics}</span>
                </div>

                {/* Full-Bleed Media Layers with Seamless Crossfade */}
                <div className={styles.mediaViewport}>
                  {processSteps.map((step, idx) => {
                    const isLayerActive = idx === activeIndex;
                    return (
                      <div
                        key={step.id}
                        className={`${styles.mediaLayer} ${
                          isLayerActive ? styles.mediaLayerActive : ""
                        }`}
                      >
                        {step.media.type === "video" ? (
                          <video
                            ref={(el) => {
                              if (el) videoRefs.current.set(idx, el);
                              else videoRefs.current.delete(idx);
                            }}
                            src={step.media.src}
                            poster={step.media.poster}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={styles.mediaAsset}
                          />
                        ) : (
                          <Image
                            src={step.media.src}
                            alt={step.media.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 760px"
                            priority={idx === 0}
                            className={styles.mediaAsset}
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Cinematic Vignette */}
                  <div className={styles.vignetteOverlay} />

                  {/* Minimal Circular Prev / Next Controls */}
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className={`${styles.mediaNavBtn} ${styles.mediaNavPrev}`}
                    aria-label="Previous step"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`${styles.mediaNavBtn} ${styles.mediaNavNext}`}
                    aria-label="Next step"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Bottom Telemetry HUD */}
                <div className={styles.mediaHudBottom}>
                  <div className={styles.hudSequence}>
                    <span className={styles.timecodeText}>{activeStep.timecode}</span>
                    <span className={styles.sceneTagText}>{activeStep.sceneTag}</span>
                  </div>

                  {/* Segmented Step Progress Indicator */}
                  <div className={styles.hudPagination}>
                    <div className={styles.stepProgressBars}>
                      {processSteps.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className={`${styles.progressBar} ${
                            idx === activeIndex ? styles.progressBarActive : ""
                          }`}
                          aria-label={`Jump to step ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <span className={styles.stepCounterText}>
                      {`${activeStep.number} / ${String(processSteps.length).padStart(2, "0")}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

ProductionProcess.displayName = "ProductionProcess";
export default ProductionProcess;
