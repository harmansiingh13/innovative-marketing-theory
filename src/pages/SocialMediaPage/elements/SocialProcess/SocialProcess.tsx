"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./SocialProcess.module.css";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { isReducedMotion } from "@/shared/animations";

export interface SocialMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  telemetry: string;
  caption: string;
}

export interface SocialProcessPhase {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timecode: string;
  media: SocialMediaItem[];
}

export const socialPhases: SocialProcessPhase[] = [
  {
    id: "phase-01",
    number: "01",
    category: "RESEARCH & POSITIONING",
    title: "Audience Audit & Narrative Thesis",
    subtitle: "COMPETITOR VOID & BRAND IP",
    description:
      "We dissect your current audience retention, audit top category players, and isolate the contrarian viewpoints and intellectual frameworks that establish your unique brand authority.",
    deliverables: [
      "Brand Voice & Tone Guide",
      "Competitor White-Space Analysis",
      "Core Content Pillar Matrix",
      "90-Day Algorithmic Roadmap",
    ],
    timecode: "PHASE 01 // DAY 01-07",
    media: [
      {
        id: "phase-01-media-1",
        type: "image",
        src: "/images/director_monitor_bts.jpg",
        alt: "Brand narrative architecture and positioning session",
        telemetry: "RESEARCH: COMPETITOR VOID AUDIT // 4 PLATFORMS",
        caption: "AUDIENCE DISCOVERY & CONTENT PILLARS",
      },
      {
        id: "phase-01-media-2",
        type: "image",
        src: "/images/cinema_production_graded.jpg",
        alt: "Brand identity and tone-of-voice matrix",
        telemetry: "THESIS: CONTRARIAN IP // BRAND VOICE BLUEPRINT",
        caption: "NARRATIVE POSITIONING & BRAND IDENTITY",
      },
      {
        id: "phase-01-media-3",
        type: "video",
        src: "/videos/cinema_production_graded.mp4",
        poster: "/images/cinematic_reel_portrait.jpg",
        alt: "Story framework testing and hook analysis",
        telemetry: "CADENCE: 90-DAY GROWTH ROADMAP // OMNICHANNEL",
        caption: "VIRAL SPRINT TIMELINE ARCHITECTURE",
      },
    ],
  },
  {
    id: "phase-02",
    number: "02",
    category: "CONTENT FORGE",
    title: "High-Volume Asset Batching & Scripting",
    subtitle: "HOOK VELOCITY & ASSET PRODUCTION",
    description:
      "Consistency is won through systematic batching. We script viral hooks, direct remote or studio film sessions, and edit high-volume visual assets ready for weekly scheduled drops.",
    deliverables: [
      "Hook-Engine Short-Form Scripts",
      "High-Volume Asset Batching",
      "Custom Motion Typography",
      "Clickpack Carousel Graphics",
    ],
    timecode: "PHASE 02 // DAY 08-18",
    media: [
      {
        id: "phase-02-media-1",
        type: "video",
        src: "/videos/cinema_production_graded.mp4",
        poster: "/images/cinema_production_graded.jpg",
        alt: "High-velocity short form video editing",
        telemetry: "VELOCITY: 30 ASSETS PRODUCED PER SPRINT",
        caption: "BATCH REEL PRODUCTION & MICRO-CUTS",
      },
      {
        id: "phase-02-media-2",
        type: "image",
        src: "/images/cinematic_reel_portrait.jpg",
        alt: "Typography design and carousel assets",
        telemetry: "DESIGN: CUSTOM VECTOR GRAPHICS // DUAL ASPECT",
        caption: "BESPOKE CAROUSEL GRAPHIC SUITE",
      },
      {
        id: "phase-02-media-3",
        type: "image",
        src: "/images/director_monitor_bts.jpg",
        alt: "Camera and lighting shoot session",
        telemetry: "STUDIO: 9:16 VERTICAL CAPTURE // LIGHTING MATRIX",
        caption: "EXECUTIVE VIDEO BATCH SHOOT",
      },
    ],
  },
  {
    id: "phase-03",
    number: "03",
    category: "ALGORITHMIC DEPLOYMENT",
    title: "Omnichannel Distribution & Timing",
    subtitle: "CROSS-PLATFORM SYNDICATION",
    description:
      "Deploying content at peak engagement windows across TikTok, Instagram, LinkedIn, and YouTube. We calibrate hashtags, sound trends, and SEO descriptions for maximum discoverability.",
    deliverables: [
      "Cross-Platform Scheduling & Publishing",
      "Platform-Native Sound & SEO Tags",
      "Active First-Hour Velocity Boost",
      "Omnichannel Repurposing Flow",
    ],
    timecode: "PHASE 03 // DAY 19-25",
    media: [
      {
        id: "phase-03-media-1",
        type: "image",
        src: "/images/cinema_production_graded.jpg",
        alt: "Omnichannel publishing schedule and timing grid",
        telemetry: "DEPLOYMENT: TIKTOK, REELS, LINKEDIN, SHORTS",
        caption: "PEAK VELOCITY TIMING CHOREOGRAPHY",
      },
      {
        id: "phase-03-media-2",
        type: "video",
        src: "/videos/cinema_production_graded.mp4",
        poster: "/images/cinema_production_graded.jpg",
        alt: "Multi-platform distribution reach surge",
        telemetry: "ALGORITHM: FIRST-HOUR MOMENTUM TRIGGER",
        caption: "ORGANIC DISCOVERY & REACH EXPANSION",
      },
      {
        id: "phase-03-media-3",
        type: "image",
        src: "/images/director_monitor_bts.jpg",
        alt: "SEO tagging and audio trend integration",
        telemetry: "SEO: SEARCH INTENT & TRENDING AUDIO SYNC",
        caption: "ALGORITHMIC DISCOVERABILITY STACK",
      },
    ],
  },
  {
    id: "phase-04",
    number: "04",
    category: "CONVERSION & RETENTION",
    title: "Community Cultivation & Inbound Funnels",
    subtitle: "FOLLOWER TO INBOUND CLIENT CONVERSION",
    description:
      "Turning vanity impressions into tangible enterprise value. We engage every comment, nurture top brand advocates, and route high-intent viewers through DM automations directly to sales.",
    deliverables: [
      "Daily Comment & DM Engagement",
      "Automated Inbound Lead Routing",
      "Weekly Analytics Optimization Loop",
      "Monthly ROI & Conversion Reporting",
    ],
    timecode: "PHASE 04 // DAY 26-30",
    media: [
      {
        id: "phase-04-media-1",
        type: "image",
        src: "/images/cinematic_reel_portrait.jpg",
        alt: "DM automation flow and lead generation metrics",
        telemetry: "FUNNEL: DM CONVERSION 14.8% BENCHMARK",
        caption: "INBOUND LEAD PIPELINE AUTOMATION",
      },
      {
        id: "phase-04-media-2",
        type: "video",
        src: "/videos/cinema_production_graded.mp4",
        poster: "/images/cinema_production_graded.jpg",
        alt: "Community retention and follower interaction",
        telemetry: "RETENTION: 84% RECURRING STORY VIEWERS",
        caption: "CULT COMMUNITY CULTIVATION & ENGAGEMENT",
      },
      {
        id: "phase-04-media-3",
        type: "image",
        src: "/images/director_monitor_bts.jpg",
        alt: "Weekly analytics dashboard and ROI breakdown",
        telemetry: "REPORTING: WEEKLY WAR ROOM ANALYTICS",
        caption: "DATA-DRIVEN ITERATION & ROI LOOPS",
      },
    ],
  },
];

export interface SocialProcessProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  phasesListRef?: React.RefObject<HTMLDivElement | null>;
}

export const SocialProcess = forwardRef<HTMLElement, SocialProcessProps>(
  ({ headerRef, phasesListRef }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const storyContainerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

    const activePhase = socialPhases[activeIndex];
    const currentMediaList = activePhase.media;
    const activeMediaItem = currentMediaList[currentSlide] || currentMediaList[0];

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

    const handleSelectPhase = useCallback(
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
              <span>THE GROWTH METHODOLOGY // HOW WE SCALE IT</span>
            </div>
            <div className={styles.headerRow}>
              <h2 className={styles.title}>
                How we scale it.
                <br />
                <span>From brand thesis to daily dominance.</span>
              </h2>
              <p className={styles.description}>
                Explore our 4-phase growth methodology. Designed to transform raw founder ideas into
                high-velocity organic distribution, cult community retention, and conversion.
              </p>
            </div>
          </div>

          {/* Two-Column Editorial Showcase */}
          <div ref={phasesListRef} className={styles.showcaseGrid}>
            {/* LEFT COLUMN: Phases Navigation */}
            <div className={styles.navColumn}>
              <div role="tablist" aria-label="Growth phases" className={styles.stepsList}>
                {socialPhases.map((phase, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={phase.id}
                      role="tab"
                      id={`tab-${phase.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${phase.id}`}
                      type="button"
                      onClick={() => handleSelectPhase(idx)}
                      className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ""}`}
                    >
                      <span className={styles.stepSpine} />

                      <div className={styles.stepMetaRow}>
                        <span className={styles.stepNumber}>{phase.number}</span>
                        <span className={styles.stepCategory}>{phase.category}</span>
                      </div>

                      <h3 className={styles.stepTitle}>{phase.title}</h3>

                      {isActive && (
                        <div
                          ref={storyContainerRef}
                          id={`panel-${phase.id}`}
                          role="tabpanel"
                          aria-labelledby={`tab-${phase.id}`}
                          className={styles.activeContent}
                        >
                          <p className={styles.activeDescription}>{phase.description}</p>

                          <div className={styles.deliverablesBlock}>
                            <span className={styles.deliverablesLabel}>
                              {"KEY DELIVERABLES //"}
                            </span>
                            <div className={styles.deliverablesPills}>
                              {phase.deliverables.map((item) => (
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
                {/* Top HUD */}
                <div className={styles.mediaHudTop}>
                  <div className={styles.hudBadge}>
                    <span className={styles.recordDot} />
                    <span>{`${activePhase.number} // ${activePhase.category}`}</span>
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
                        aria-label="Previous media"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={nextSlide}
                        className={`${styles.carouselNavBtn} ${styles.carouselNavNext}`}
                        aria-label="Next media"
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
                  <span className={styles.timecodeBadge}>{activePhase.timecode}</span>
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

SocialProcess.displayName = "SocialProcess";
export default SocialProcess;
