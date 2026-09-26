"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./EditingProcess.module.css";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { isReducedMotion } from "@/shared/animations";

export interface EditingMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  telemetry: string;
  caption: string;
}

export interface EditingProcessStage {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timecode: string;
  media: EditingMediaItem[];
}

export const editingStages: EditingProcessStage[] = [
  {
    id: "stage-01",
    number: "01",
    category: "INGESTION & SELECTS",
    title: "Footage Ingestion & Narrative Selects",
    subtitle: "STORY ARCHITECTURE & ASSEMBLY CUT",
    description:
      "Every great edit begins with ruthless organization. We log raw footage, curate the strongest emotional and narrative takes, synchronize multi-cam angles, and build a cohesive assembly cut that establishes tension and rhythm.",
    deliverables: [
      "Footage Ingestion & Proxy Transcode",
      "Emotional A-Roll Selects",
      "Multi-Cam Audio Synchronization",
      "Assembly Narrative Cut",
    ],
    timecode: "SEQ 01 // 00:00:00",
    media: [
      {
        id: "stage-01-media-1",
        type: "image",
        src: "/images/director_monitor_bts.jpg",
        alt: "NLE selects and footage logging interface",
        telemetry: "INGEST: PRORES 422 HQ // LOG ARCHIVE",
        caption: "FOOTAGE LOGGING & SELECTS CURATION",
      },
      {
        id: "stage-01-media-2",
        type: "image",
        src: "/images/cinema_production_graded.jpg",
        alt: "Assembly cut storyline timeline",
        telemetry: "MULTI-CAM: 3 ANGLES // TIME-LOCKED",
        caption: "MULTI-CAM TIMECODE SYNCHRONIZATION",
      },
      {
        id: "stage-01-media-3",
        type: "video",
        src: "/videos/cinema_production_graded.mp4",
        poster: "/images/cinematic_reel_portrait.jpg",
        alt: "Assembly cut pacing preview",
        telemetry: "ASSEMBLY: ROUGH TIMELINE CUT 24 FPS",
        caption: "NARRATIVE RHYTHM & PACING DRAFT",
      },
    ],
  },
  {
    id: "stage-02",
    number: "02",
    category: "RETENTION ARCHITECTURE",
    title: "Kinetic Micro-Pacing & Retention Hooks",
    subtitle: "PATTERN INTERRUPTS & VELOCITY",
    description:
      "Attention is won or lost in the first 3 seconds. We engineer visual hooks, rapid J/L audio transitions, kinetic zooms, and micro-cuts that eliminate dead air and keep viewer eyes locked on screen.",
    deliverables: [
      "3-Second Hook Velocity Engineering",
      "Dynamic Speed Ramps & J-Cuts",
      "Visual Pattern Interrupts",
      "Dead-Air & Filler Pruning",
    ],
    timecode: "SEQ 02 // 00:00:03",
    media: [
      {
        id: "stage-02-media-1",
        type: "video",
        src: "/videos/cinema_production_graded.mp4",
        poster: "/images/cinema_production_graded.jpg",
        alt: "Kinetic hook edit in video timeline",
        telemetry: "HOOK VELOCITY: 0.8S AVERAGE CUT INTERVAL",
        caption: "HIGH-RETENTION PATTERN INTERRUPTS",
      },
      {
        id: "stage-02-media-2",
        type: "image",
        src: "/images/cinematic_reel_portrait.jpg",
        alt: "Speed ramping and keyframe graphs",
        telemetry: "CURVES: BEZIER SPEED RAMP // J-CUT AUDIO",
        caption: "SEAMLESS J/L AUDIO TRANSITIONS",
      },
      {
        id: "stage-02-media-3",
        type: "image",
        src: "/images/director_monitor_bts.jpg",
        alt: "Visual pacing comparison readout",
        telemetry: "BENCHMARK: 85%+ VIEW DURATION RETENTION",
        caption: "ALGORITHMIC RETENTION TESTING",
      },
    ],
  },
  {
    id: "stage-03",
    number: "03",
    category: "MOTION & AUDIO DESIGN",
    title: "Bespoke Typography & Spatial Audio Foley",
    subtitle: "DYNAMIC CAPTIONS & MULTI-LAYER SFX",
    description:
      "Sound is 50% of the cinematic experience. We layer multi-channel spatial foley, risers, and impact hits matched to brand cadence, alongside bespoke kinetic subtitles and animated lower thirds.",
    deliverables: [
      "Bespoke Animated Brand Subtitles",
      "Spatial Sound FX (Whooshes, Risers, Impacts)",
      "Voiceover EQ, Compression & Denoise",
      "Dynamic Lower Thirds & Kinetic Overlays",
    ],
    timecode: "SEQ 03 // 00:00:18",
    media: [
      {
        id: "stage-03-media-1",
        type: "image",
        src: "/images/cinema_production_graded.jpg",
        alt: "Kinetic subtitle typography and motion graphics",
        telemetry: "GRAPHICS: CUSTOM VECTOR TITLES // 60 FPS",
        caption: "BRAND-ALIGNED KINETIC SUBTITLES",
      },
      {
        id: "stage-03-media-2",
        type: "video",
        src: "/videos/cinema_production_graded.mp4",
        poster: "/images/cinema_production_graded.jpg",
        alt: "Audio waveform synchronization with cut transitions",
        telemetry: "AUDIO: 18 STEMS // 32-BIT FLOAT STEREO",
        caption: "MULTI-LAYER SPATIAL SOUND DESIGN",
      },
      {
        id: "stage-03-media-3",
        type: "image",
        src: "/images/director_monitor_bts.jpg",
        alt: "Voiceover leveling and frequency master spectrum",
        telemetry: "VOICE: BROADCAST MASTER -14 LUFS TARGET",
        caption: "STUDIO ACOUSTIC LEVELING & EQ",
      },
    ],
  },
  {
    id: "stage-04",
    number: "04",
    category: "COLOR & FINAL EXPORT",
    title: "DaVinci Color Science & Master Multi-Export",
    subtitle: "COLOR SCULPTING & MULTI-PLATFORM DELIVERIES",
    description:
      "The final polish that separates amateur edits from prestigious brand media. We grade in DaVinci Wide Gamut, match camera color profiles, balance skin tones, and export platform-optimized masters.",
    deliverables: [
      "DaVinci Resolve Wide Gamut Grade",
      "Film Grain & Atmosphere Calibration",
      "9:16 Vertical & 16:9 4K Master Deliveries",
      "Clean & Subtitled High-Bitrate Exports",
    ],
    timecode: "SEQ 04 // 00:00:45",
    media: [
      {
        id: "stage-04-media-1",
        type: "image",
        src: "/images/cinematic_reel_portrait.jpg",
        alt: "DaVinci Resolve color wheels and node graph",
        telemetry: "COLOR: DAVINCI WIDE GAMUT // DCI-P3",
        caption: "NODE-BASED COLOR SCULPTING",
      },
      {
        id: "stage-04-media-2",
        type: "video",
        src: "/videos/cinema_production_graded.mp4",
        poster: "/images/cinema_production_graded.jpg",
        alt: "Multi-platform export verification",
        telemetry: "EXPORT: PRORES 4444 + H.265 MASTER",
        caption: "MULTI-FORMAT MASTER VERIFICATION",
      },
      {
        id: "stage-04-media-3",
        type: "image",
        src: "/images/director_monitor_bts.jpg",
        alt: "Final QC inspection readout",
        telemetry: "QC: ZERO ARTIFACTS // BROADCAST COMPLIANT",
        caption: "FRAME-BY-FRAME QUALITY CONTROL",
      },
    ],
  },
];

export interface EditingProcessProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  stagesListRef?: React.RefObject<HTMLDivElement | null>;
}

export const EditingProcess = forwardRef<HTMLElement, EditingProcessProps>(
  ({ headerRef, stagesListRef }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const storyContainerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

    const activeStage = editingStages[activeIndex];
    const currentMediaList = activeStage.media;
    const activeMediaItem = currentMediaList[currentSlide] || currentMediaList[0];

    // Manage video playback on stage or slide change
    useEffect(() => {
      videoRefs.current.forEach((video) => {
        if (video) video.pause();
      });

      if (activeMediaItem && activeMediaItem.type === "video") {
        const videoKey = `${activeIndex}-${currentSlide}`;
        const currentVideo = videoRefs.current.get(videoKey);
        if (currentVideo) {
          currentVideo.currentTime = 0;
          currentVideo.play().catch(() => {});
          setIsVideoPlaying(true);
        }
      }
    }, [activeIndex, currentSlide, activeMediaItem]);

    const prevSlide = useCallback(() => {
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : currentMediaList.length - 1));
    }, [currentMediaList.length]);

    const nextSlide = useCallback(() => {
      setCurrentSlide((prev) => (prev < currentMediaList.length - 1 ? prev + 1 : 0));
    }, [currentMediaList.length]);

    const handleSelectStage = useCallback(
      (newIndex: number) => {
        if (newIndex === activeIndex || isTransitioning) return;

        setIsTransitioning(true);
        const reduced = isReducedMotion();

        if (reduced || !mediaContainerRef.current) {
          setActiveIndex(newIndex);
          setCurrentSlide(0);
          setIsTransitioning(false);
          return;
        }

        const mediaEl = mediaContainerRef.current;
        const storyEl = storyContainerRef.current;

        const tl = gsap.timeline({
          onComplete: () => {
            setActiveIndex(newIndex);
            setCurrentSlide(0);

            requestAnimationFrame(() => {
              const enterTl = gsap.timeline({
                onComplete: () => setIsTransitioning(false),
              });

              if (mediaContainerRef.current) {
                enterTl.fromTo(
                  mediaContainerRef.current,
                  { opacity: 0, scale: 1.04, clipPath: "inset(0% 100% 0% 0%)" },
                  {
                    opacity: 1,
                    scale: 1,
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.65,
                    ease: "power3.out",
                  },
                  0,
                );
              }

              if (storyContainerRef.current) {
                enterTl.fromTo(
                  storyContainerRef.current,
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                  0.1,
                );
              }
            });
          },
        });

        tl.to(mediaEl, {
          opacity: 0.2,
          scale: 0.98,
          clipPath: "inset(0% 0% 0% 100%)",
          duration: 0.45,
          ease: "power2.in",
        });

        if (storyEl) {
          tl.to(storyEl, { opacity: 0.3, y: -8, duration: 0.35, ease: "power2.in" }, 0);
        }
      },
      [activeIndex, isTransitioning],
    );

    const toggleVideo = () => {
      const videoKey = `${activeIndex}-${currentSlide}`;
      const currentVideo = videoRefs.current.get(videoKey);
      if (!currentVideo) return;

      if (currentVideo.paused) {
        currentVideo.play().catch(() => {});
        setIsVideoPlaying(true);
      } else {
        currentVideo.pause();
        setIsVideoPlaying(false);
      }
    };

    return (
      <section ref={ref} id="process" className={styles.section}>
        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>THE POST-PRODUCTION WORKFLOW // HOW WE CRAFT IT</span>
            </div>
            <div className={styles.headerRow}>
              <h2 className={styles.title}>
                How we craft it.
                <br />
                <span>From assembly cut to final export.</span>
              </h2>
              <p className={styles.description}>
                Explore our 4-stage post-production pipeline. Every frame is engineered with
                retention micro-pacing, bespoke typography, and cinema-grade color science.
              </p>
            </div>
          </div>

          {/* Two-Column Editorial Showcase */}
          <div ref={stagesListRef} className={styles.showcaseGrid}>
            {/* LEFT COLUMN: Stages Navigation */}
            <div className={styles.navColumn}>
              <div role="tablist" aria-label="Post-production stages" className={styles.stepsList}>
                {editingStages.map((stage, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={stage.id}
                      role="tab"
                      id={`tab-${stage.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${stage.id}`}
                      type="button"
                      onClick={() => handleSelectStage(idx)}
                      className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ""}`}
                    >
                      <span className={styles.stepSpine} />

                      <div className={styles.stepMetaRow}>
                        <span className={styles.stepNumber}>{stage.number}</span>
                        <span className={styles.stepCategory}>{stage.category}</span>
                      </div>

                      <h3 className={styles.stepTitle}>{stage.title}</h3>

                      {isActive && (
                        <div
                          ref={storyContainerRef}
                          id={`panel-${stage.id}`}
                          role="tabpanel"
                          aria-labelledby={`tab-${stage.id}`}
                          className={styles.activeContent}
                        >
                          <p className={styles.activeDescription}>{stage.description}</p>

                          <div className={styles.deliverablesBlock}>
                            <span className={styles.deliverablesLabel}>
                              {"KEY DELIVERABLES //"}
                            </span>
                            <div className={styles.deliverablesPills}>
                              {stage.deliverables.map((item) => (
                                <span key={item} className={styles.deliverablePill}>
                                  <span className={styles.pillDot} />
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Media Showcase Carousel */}
            <div className={styles.mediaColumn}>
              <div className={styles.mediaFrame}>
                {/* Crop Marks */}
                <div className={styles.cropMarkTL}>⌜</div>
                <div className={styles.cropMarkTR}>⌝</div>
                <div className={styles.cropMarkBL}>⌞</div>
                <div className={styles.cropMarkBR}>⌟</div>

                {/* Top HUD */}
                <div className={styles.mediaHudTop}>
                  <div className={styles.hudBadge}>
                    <span className={styles.recordDot} />
                    <span>{`${activeStage.number} // ${activeStage.category}`}</span>
                  </div>
                  <span className={styles.hudTelemetry}>{activeMediaItem?.telemetry}</span>
                </div>

                {/* Video Play/Pause Toggle if current slide is video */}
                {activeMediaItem?.type === "video" && (
                  <button
                    type="button"
                    onClick={toggleVideo}
                    className={styles.videoControlBtn}
                    aria-label={isVideoPlaying ? "Pause video feed" : "Play video feed"}
                  >
                    {isVideoPlaying ? <Pause size={12} /> : <Play size={12} />}
                    <span>{isVideoPlaying ? "PAUSE FEED" : "PLAY FEED"}</span>
                  </button>
                )}

                {/* Carousel Container */}
                <div ref={mediaContainerRef} className={styles.mediaViewport}>
                  <div
                    className={styles.carouselTrack}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {currentMediaList.map((item, idx) => {
                      const videoKey = `${activeIndex}-${idx}`;
                      return (
                        <div key={item.id || idx} className={styles.carouselSlide}>
                          {item.type === "video" ? (
                            <div className={styles.videoWrapper}>
                              <video
                                ref={(el) => {
                                  if (el) videoRefs.current.set(videoKey, el);
                                  else videoRefs.current.delete(videoKey);
                                }}
                                src={item.src}
                                poster={item.poster}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={styles.mediaAsset}
                              />
                            </div>
                          ) : (
                            <div className={styles.imageWrapper}>
                              <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 760px"
                                priority={idx === 0}
                                className={styles.mediaAsset}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles.vignetteOverlay} />

                  {/* Carousel Prev/Next Buttons */}
                  {currentMediaList.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevSlide}
                        className={`${styles.carouselNavBtn} ${styles.carouselNavPrev}`}
                        aria-label="Previous edit media"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={nextSlide}
                        className={`${styles.carouselNavBtn} ${styles.carouselNavNext}`}
                        aria-label="Next edit media"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Carousel Pagination HUD */}
                  {currentMediaList.length > 1 && (
                    <div className={styles.carouselPagination}>
                      <div className={styles.paginationDots}>
                        {currentMediaList.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentSlide(idx)}
                            className={`${styles.paginationDot} ${
                              idx === currentSlide ? styles.paginationDotActive : ""
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                      <span className={styles.counterBadge}>
                        {String(currentSlide + 1).padStart(2, "0")} /{" "}
                        {String(currentMediaList.length).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Telemetry Bar */}
                <div className={styles.mediaHudBottom}>
                  <span className={styles.timecodeBadge}>{activeStage.timecode}</span>
                  <span className={styles.subtitleBadge}>{activeMediaItem?.caption}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

EditingProcess.displayName = "EditingProcess";
export default EditingProcess;
