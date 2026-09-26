"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ServiceProcess.module.css";
import {
  serviceProcessData,
  ServiceType,
  ServiceProcessData,
  ServiceProcessStep,
} from "./serviceProcessData";

export interface ServiceProcessProps {
  /** The service key to render predefined content for */
  service?: ServiceType;
  /** Optional custom data override if not using predefined data */
  data?: ServiceProcessData;
  /** Optional header element ref for GSAP scroll animations */
  headerRef?: React.RefObject<HTMLDivElement | null>;
  /** Optional process acts ref for VideoShoots page GSAP scroll animations */
  actsListRef?: React.RefObject<HTMLDivElement | null>;
  /** Optional process stages ref for VideoEditing page GSAP scroll animations */
  stagesListRef?: React.RefObject<HTMLDivElement | null>;
  /** Optional process phases ref for Social/Ad/Web/Event pages GSAP scroll animations */
  phasesListRef?: React.RefObject<HTMLDivElement | null>;
  /** Generic list ref alias */
  listRef?: React.RefObject<HTMLDivElement | null>;
  /** Optional extra CSS class */
  className?: string;
  /** Optional section ID (defaults to "process") */
  id?: string;
}

export const ServiceProcess = forwardRef<HTMLElement, ServiceProcessProps>(
  (
    {
      service = "video-shoots",
      data: customData,
      headerRef,
      actsListRef,
      stagesListRef,
      phasesListRef,
      listRef,
      className,
      id = "process",
    },
    ref,
  ) => {
    const data: ServiceProcessData =
      customData || serviceProcessData[service] || serviceProcessData["video-shoots"];
    const steps: ServiceProcessStep[] = data.steps;

    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

    // Fallback if steps length changes
    const safeActiveIndex = Math.min(activeIndex, steps.length - 1);
    const activeStep = steps[safeActiveIndex] || steps[0];

    // Manage video playback when active step changes
    useEffect(() => {
      videoRefs.current.forEach((video, idx) => {
        if (!video) return;
        if (idx === safeActiveIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, [safeActiveIndex]);

    const handlePrevStep = useCallback(() => {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
    }, [steps.length]);

    const handleNextStep = useCallback(() => {
      setActiveIndex((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
    }, [steps.length]);

    // Consolidate the list container ref for GSAP timelines across any service page
    const resolvedListRef = actsListRef || stagesListRef || phasesListRef || listRef;

    return (
      <section ref={ref} id={id} className={`${styles.section} ${className || ""}`.trim()}>
        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>{data.kicker}</span>
            </div>
            <div className={styles.headerRow}>
              <h2 className={styles.title}>
                {data.title}
                <br />
                <span>{data.titleHighlight}</span>
              </h2>
              <p className={styles.description}>{data.description}</p>
            </div>
          </div>

          {/* Two-Column Editorial Layout */}
          <div ref={resolvedListRef} className={styles.showcaseGrid}>
            {/* LEFT COLUMN: Interactive Steps List */}
            <div className={styles.navColumn}>
              <div role="tablist" aria-label={`${data.title} steps`} className={styles.stepsList}>
                {steps.map((step, idx) => {
                  const isActive = idx === safeActiveIndex;
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
                  {steps.map((step, idx) => {
                    const isLayerActive = idx === safeActiveIndex;
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
                      {steps.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className={`${styles.progressBar} ${
                            idx === safeActiveIndex ? styles.progressBarActive : ""
                          }`}
                          aria-label={`Jump to step ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <span className={styles.stepCounterText}>
                      {`${activeStep.number} / ${String(steps.length).padStart(2, "0")}`}
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

ServiceProcess.displayName = "ServiceProcess";
export default ServiceProcess;
