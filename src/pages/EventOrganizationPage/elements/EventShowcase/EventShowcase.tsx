"use client";

import React, { useState, useRef, useCallback, useEffect, forwardRef } from "react";
import gsap from "gsap";
import styles from "./EventShowcase.module.css";
import {
  CheckCircle2,
  Sparkles,
  Camera,
  Film,
  Share2,
  TrendingUp,
  Activity,
} from "lucide-react";

export interface CapabilityData {
  id: string;
  number: string;
  tabLabel: string;
  stage: "CREATE" | "REFINE" | "DISTRIBUTE" | "AMPLIFY";
  label: string;
  title: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  clientBenefit: string;
  stageHighlight: string;
}

const CAPABILITIES: CapabilityData[] = [
  {
    id: "video-production",
    number: "01",
    tabLabel: "01 VIDEO PRODUCTION",
    stage: "CREATE",
    label: "01 / VIDEO PRODUCTION",
    title: "PROFESSIONAL VIDEO PRODUCTION",
    description:
      "From creative direction and production planning to professional filming, we create visual content designed around your brand, message, and campaign goals.",
    capabilities: [
      "Creative Direction",
      "Production Planning",
      "Professional Camera Work",
      "Lighting & Audio",
      "Brand-focused Storytelling",
    ],
    deliverables: [
      "Brand Films",
      "Promotional Videos",
      "Product Videos",
      "Social Content",
      "Event / Campaign Coverage",
    ],
    clientBenefit:
      "Professional visuals that give your brand the quality and attention it deserves.",
    stageHighlight: "RAW VISUAL ASSET GENERATION",
  },
  {
    id: "video-editing",
    number: "02",
    tabLabel: "02 VIDEO EDITING",
    stage: "REFINE",
    label: "02 / VIDEO EDITING",
    title: "VIDEO EDITING & POST-PRODUCTION",
    description:
      "Raw footage becomes content built for attention — from long-form productions to short-form social videos, reels, promotional edits, and advertising creatives.",
    capabilities: [
      "Video Editing",
      "Color Correction",
      "Sound Design",
      "Motion Graphics",
      "Short-form Adaptation",
    ],
    deliverables: [
      "Reels",
      "Shorts",
      "Promotional Videos",
      "Brand Films",
      "Ad Creatives",
    ],
    clientBenefit:
      "One production can become multiple pieces of content built for different platforms and audiences.",
    stageHighlight: "ATTENTION-TUNED POST-PRODUCTION",
  },
  {
    id: "social-media",
    number: "03",
    tabLabel: "03 SOCIAL MEDIA",
    stage: "DISTRIBUTE",
    label: "03 / SOCIAL MEDIA",
    title: "SOCIAL MEDIA MANAGEMENT",
    description:
      "We turn your content into a consistent social presence through content planning, publishing, creative adaptation, audience engagement, and ongoing platform management.",
    capabilities: [
      "Content Planning",
      "Content Calendar",
      "Platform Management",
      "Creative Adaptation",
      "Community Engagement",
      "Performance Monitoring",
    ],
    deliverables: [
      "Posts",
      "Reels",
      "Stories",
      "Campaign Content",
      "Content Calendars",
    ],
    clientBenefit:
      "A consistent social presence that keeps your brand active, recognizable, and connected to its audience.",
    stageHighlight: "OMNICHANNEL AUDIENCE ENGAGEMENT",
  },
  {
    id: "paid-advertising",
    number: "04",
    tabLabel: "04 PAID ADVERTISING",
    stage: "AMPLIFY",
    label: "04 / PAID ADVERTISING",
    title: "PAID ADVERTISING",
    description:
      "We turn creative into campaigns that reach the right audience through targeted paid advertising across relevant digital platforms.",
    capabilities: [
      "Campaign Strategy",
      "Audience Targeting",
      "Creative Testing",
      "Campaign Management",
      "Retargeting",
      "Performance Monitoring",
    ],
    deliverables: [
      "Campaign Setup",
      "Ad Creatives",
      "Audience Segmentation",
      "Retargeting Campaigns",
      "Performance Reporting",
    ],
    clientBenefit:
      "Your content doesn't stop at publishing — we help put it in front of the people most likely to take action.",
    stageHighlight: "TARGETED CAMPAIGN SCALE",
  },
];

export interface EventShowcaseProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const EventShowcase = forwardRef<HTMLElement, EventShowcaseProps>(
  ({ headerRef: externalHeaderRef, canvasRef: externalCanvasRef }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const internalSectionRef = useRef<HTMLElement>(null);
    const internalHeaderRef = useRef<HTMLDivElement>(null);
    const internalCanvasRef = useRef<HTMLDivElement>(null);
    const visualCardRef = useRef<HTMLDivElement>(null);
    const visualContainerRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    const sectionRef = (ref as React.RefObject<HTMLElement | null>) || internalSectionRef;
    const headerRef = externalHeaderRef || internalHeaderRef;
    const activePanelRef = externalCanvasRef || internalCanvasRef;

    const activeService = CAPABILITIES[activeIndex];

    // ----------------------------------------------------
    // Smooth GSAP Tab Switching (250–350ms)
    // ----------------------------------------------------
    const handleSelectTab = useCallback(
      (index: number) => {
        if (index === activeIndex) return;

        const visualEl = visualContainerRef.current;
        const contentEl = contentWrapperRef.current;

        const tl = gsap.timeline({
          defaults: { duration: 0.18, ease: "power2.inOut" },
        });

        if (visualEl && contentEl) {
          tl.to([visualEl, contentEl], {
            opacity: 0,
            y: 8,
            duration: 0.16,
          });
        }

        tl.call(() => {
          setActiveIndex(index);
        });

        if (visualEl && contentEl) {
          tl.fromTo(
            [visualEl, contentEl],
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" },
            "+=0.03"
          );
        }
      },
      [activeIndex]
    );

    // ----------------------------------------------------
    // Subtle Mouse Parallax Effect on Visual Canvas
    // ----------------------------------------------------
    useEffect(() => {
      const card = visualCardRef.current;
      if (!card) return;

      const xTo = gsap.quickTo(card, "x", { duration: 0.5, ease: "power2.out" });
      const yTo = gsap.quickTo(card, "y", { duration: 0.5, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        xTo(relativeX * 4);
        yTo(relativeY * 3);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <section ref={sectionRef} id="productions" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>02 / WHAT WE DELIVER</span>
            </div>

            <div className={styles.headerContent}>
              <h2 className={styles.title}>
                FROM CAMERA{" "}
                <span className={styles.goldText}>TO CAMPAIGN.</span>
              </h2>
              <p className={styles.subtitle}>
                One team to create the content, shape the story, build your social presence,
                and put your brand in front of the right audience.
              </p>
            </div>
          </div>

          {/* Interactive Ecosystem Flow Bar */}
          <div className={styles.ecosystemFlowBar}>
            <div className={styles.ecosystemLabel}>
              <Activity size={12} className={styles.goldIcon} />
              <span>CAMPAIGN SYSTEM:</span>
            </div>
            <div className={styles.flowStages}>
              {CAPABILITIES.map((cap, idx) => {
                const isCurrent = idx === activeIndex;
                const isPast = idx < activeIndex;
                return (
                  <React.Fragment key={cap.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectTab(idx)}
                      className={`${styles.flowStage} ${
                        isCurrent ? styles.flowStageActive : ""
                      } ${isPast ? styles.flowStagePast : ""}`}
                    >
                      <span className={styles.flowStageNum}>0{idx + 1}</span>
                      <span className={styles.flowStageName}>{cap.stage}</span>
                      {isCurrent && <span className={styles.flowStageDot} />}
                    </button>
                    {idx < CAPABILITIES.length - 1 && (
                      <span className={styles.flowArrow}>→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Four Interactive Service Selector Tabs */}
          <div
            className={styles.topNavPillRow}
            role="tablist"
            aria-label="Capabilities Selector"
          >
            {CAPABILITIES.map((cap, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={cap.id}
                  type="button"
                  role="tab"
                  id={`tab-${cap.id}`}
                  aria-controls={`panel-${cap.id}`}
                  aria-selected={isActive}
                  className={`${styles.topNavBtn} ${
                    isActive ? styles.topNavBtnActive : ""
                  }`}
                  onClick={() => handleSelectTab(idx)}
                >
                  <span className={styles.topNavNum}>{cap.number}</span>
                  <span className={styles.topNavName}>{cap.tabLabel.replace(/^\d+\s*/, "")}</span>
                  {isActive && <span className={styles.activeDot} />}
                </button>
              );
            })}
          </div>

          {/* Main Campaign Showcase Panel Frame */}
          <div
            ref={activePanelRef}
            id={`panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeService.id}`}
            className={styles.activePanel}
          >
            {/* Panel Top Bar: Capability Scope & Stage */}
            <div className={styles.panelTopBar}>
              <div className={styles.panelBadge}>
                <span className={styles.panelBadgeDot} />
                <span>{activeService.label}</span>
                <span className={styles.panelBadgeDivider}>{"//"}</span>
                <span className={styles.panelStageTag}>STAGE: {activeService.stage}</span>
              </div>
              <div className={styles.systemStatusTag}>
                <span className={styles.statusPulse} />
                <span className={styles.systemStatusText}>
                  {activeService.stageHighlight}
                </span>
              </div>
            </div>

            {/* Split Grid: Left Visual + Right Details */}
            <div className={styles.panelBodyGrid}>
              {/* LEFT COLUMN: INTERACTIVE VISUAL DEMONSTRATION */}
              <div ref={visualCardRef} className={styles.visualCard}>
                <div ref={visualContainerRef} className={styles.imageInner}>
                  {/* Subtle Grid Background */}
                  <div className={styles.graphicGridBg} />

                  {/* ---------------- 01: VIDEO PRODUCTION VISUAL ---------------- */}
                  {activeService.id === "video-production" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.cameraMonitorWrapper}>
                        {/* Camera Monitor Chrome Header */}
                        <div className={styles.monitorHeaderBar}>
                          <div className={styles.recordGroup}>
                            <span className={styles.recDot} />
                            <span className={styles.recText}>REC ●</span>
                          </div>
                          <div className={styles.timecodeDisplay}>01:24:18:00</div>
                          <div className={styles.batteryGroup}>
                            <span className={styles.batteryVal}>BAT 98%</span>
                            <span className={styles.mediaVal}>CFast 128GB</span>
                          </div>
                        </div>

                        {/* Viewfinder Main Video Frame */}
                        <div className={styles.viewfinderFrame}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/cinema_production_graded.jpg"
                            alt="Cinema production camera rig on set"
                            className={styles.viewfinderImg}
                          />
                          <div className={styles.viewfinderVignette} />

                          {/* Optical Framing Brackets */}
                          <div className={`${styles.cornerBracket} ${styles.cornerTL}`} />
                          <div className={`${styles.cornerBracket} ${styles.cornerTR}`} />
                          <div className={`${styles.cornerBracket} ${styles.cornerBL}`} />
                          <div className={`${styles.cornerBracket} ${styles.cornerBR}`} />
                          <div className={styles.centerReticle}>+</div>

                          {/* Live Focus Telemetry Badge */}
                          <div className={styles.focusPill}>
                            <Camera size={10} className={styles.goldIcon} />
                            <span>EYE-AF LOCK // ANAMORPHIC 50MM</span>
                          </div>
                        </div>

                        {/* Camera Metadata Telemetry Bottom Bar */}
                        <div className={styles.cameraFooterStrip}>
                          <div className={styles.camMetaItem}>
                            <span className={styles.metaLabel}>CAMERA</span>
                            <span className={styles.metaVal}>A-CAM // ARRI</span>
                          </div>
                          <div className={styles.camMetaItem}>
                            <span className={styles.metaLabel}>FPS</span>
                            <span className={styles.metaValGold}>24.000 DCI</span>
                          </div>
                          <div className={styles.camMetaItem}>
                            <span className={styles.metaLabel}>SHUTTER</span>
                            <span className={styles.metaVal}>180° (1/48)</span>
                          </div>
                          <div className={styles.camMetaItem}>
                            <span className={styles.metaLabel}>EXPOSURE</span>
                            <span className={styles.metaVal}>ISO 800 // 5600K</span>
                          </div>
                          <div className={styles.camMetaItem}>
                            <span className={styles.metaLabel}>AUDIO</span>
                            <span className={styles.metaValGreen}>-12dB PEAK OK</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ---------------- 02: VIDEO EDITING VISUAL ---------------- */}
                  {activeService.id === "video-editing" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.editingTimelineWrapper}>
                        {/* NLE Window Controls & Preview Header */}
                        <div className={styles.nleHeaderBar}>
                          <div className={styles.nleTitleGroup}>
                            <Film size={11} className={styles.goldIcon} />
                            <span>IMT_HERO_TIMELINE_v4.PRORES</span>
                          </div>
                          <div className={styles.nleToolsGroup}>
                            <span className={`${styles.nleTool} ${styles.nleToolActive}`}>
                              COLOR
                            </span>
                            <span className={styles.nleTool}>AUDIO</span>
                            <span className={styles.nleTool}>MOTION</span>
                            <span className={styles.nleToolExport}>EXPORT</span>
                          </div>
                        </div>

                        {/* Video Monitor Preview + Timecode */}
                        <div className={styles.nleMonitorBox}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/director_monitor_bts.jpg"
                            alt="Footage review in editing suite"
                            className={styles.nleMonitorImg}
                          />
                          <div className={styles.nlePlayheadBadge}>
                            <span className={styles.playDot} />
                            <span>PLAYHEAD: 00:42 / 01:32</span>
                          </div>
                        </div>

                        {/* Multitrack NLE Timeline Grid */}
                        <div className={styles.timelineArea}>
                          {/* Timeline Ruler */}
                          <div className={styles.timelineRuler}>
                            <span>00:00</span>
                            <span>00:15</span>
                            <span>00:30</span>
                            <span>00:45</span>
                            <span>01:00</span>
                            <span>01:15</span>
                            <span>01:30</span>
                          </div>

                          {/* Tracks Container with Playhead Needle */}
                          <div className={styles.tracksStack}>
                            <div className={styles.playheadNeedle} style={{ left: "46%" }} />

                            {/* V1: A-CAM */}
                            <div className={styles.timelineTrack}>
                              <span className={styles.trackLabel}>V1 A-CAM</span>
                              <div className={styles.trackClips}>
                                <div className={`${styles.clipBlock} ${styles.clipGold}`} style={{ width: "42%" }}>
                                  SC04_HERO_TAK02
                                </div>
                                <div className={`${styles.clipBlock} ${styles.clipGold}`} style={{ width: "32%" }}>
                                  SC04_TAK03
                                </div>
                              </div>
                            </div>

                            {/* V2: B-CAM */}
                            <div className={styles.timelineTrack}>
                              <span className={styles.trackLabel}>V2 B-CAM</span>
                              <div className={styles.trackClips}>
                                <div className={`${styles.clipBlock} ${styles.clipCyan}`} style={{ width: "24%", marginLeft: "28%" }}>
                                  BROLL_PRODUCT_4K
                                </div>
                                <div className={`${styles.clipBlock} ${styles.clipCyan}`} style={{ width: "20%", marginLeft: "4%" }}>
                                  MACRO_LENS
                                </div>
                              </div>
                            </div>

                            {/* A1: AUDIO / SFX */}
                            <div className={styles.timelineTrack}>
                              <span className={styles.trackLabel}>A1 AUDIO</span>
                              <div className={styles.trackClips}>
                                <div className={`${styles.clipBlock} ${styles.clipGreen}`} style={{ width: "78%" }}>
                                  DIALOGUE_BOOM_DENOISED_48KHZ
                                </div>
                              </div>
                            </div>

                            {/* A2: MUSIC STEMS */}
                            <div className={styles.timelineTrack}>
                              <span className={styles.trackLabel}>A2 MUSIC</span>
                              <div className={styles.trackClips}>
                                <div className={`${styles.clipBlock} ${styles.clipPurple}`} style={{ width: "88%" }}>
                                  CINEMATIC_NARRATIVE_SCORE_FINAL
                                </div>
                              </div>
                            </div>

                            {/* FX: COLOR & TITLES */}
                            <div className={styles.timelineTrack}>
                              <span className={styles.trackLabel}>FX GRADE</span>
                              <div className={styles.trackClips}>
                                <div className={`${styles.clipBlock} ${styles.clipYellow}`} style={{ width: "95%" }}>
                                  LUT // DAVINCI WIDE GAMUT FILM EMULATION
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Render Status Footer */}
                        <div className={styles.nleFooterStrip}>
                          <span className={styles.renderReadyDot} />
                          <span>RENDER STATUS: 4K PRORES 422 HQ READY FOR RETENTION PACKAGING</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ---------------- 03: SOCIAL MEDIA VISUAL ---------------- */}
                  {activeService.id === "social-media" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.socialCalendarWrapper}>
                        {/* Workspace Header */}
                        <div className={styles.socialHeaderBar}>
                          <div className={styles.socialTitleGroup}>
                            <Share2 size={11} className={styles.goldIcon} />
                            <span>CONTENT CALENDAR // MULTI-PLATFORM DISTRIBUTION</span>
                          </div>
                          <div className={styles.weekPill}>WEEK 42 • ACTIVE</div>
                        </div>

                        {/* Platform Filters */}
                        <div className={styles.platformTabs}>
                          <span className={`${styles.pTab} ${styles.pTabActive}`}>ALL PLATFORMS</span>
                          <span className={styles.pTab}>INSTAGRAM</span>
                          <span className={styles.pTab}>YOUTUBE</span>
                          <span className={styles.pTab}>LINKEDIN</span>
                          <span className={styles.pTab}>FACEBOOK</span>
                        </div>

                        {/* Content Calendar Week Grid */}
                        <div className={styles.calendarGrid}>
                          {/* Day 1: MON */}
                          <div className={styles.calendarDayCard}>
                            <div className={styles.dayHeader}>
                              <span className={styles.dayName}>MON</span>
                              <span className={styles.statusLive}>PUBLISHED</span>
                            </div>
                            <div className={styles.cardThumbBox}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/instagram/post-1.png" alt="Reel visual" className={styles.thumbImg} />
                              <span className={styles.formatTag}>REEL</span>
                            </div>
                            <span className={styles.cardContentTitle}>Brand Manifesto Hook</span>
                            <span className={styles.metricNotice}>48.2K Reach</span>
                          </div>

                          {/* Day 2: TUE */}
                          <div className={styles.calendarDayCard}>
                            <div className={styles.dayHeader}>
                              <span className={styles.dayName}>TUE</span>
                              <span className={styles.statusLive}>PUBLISHED</span>
                            </div>
                            <div className={styles.cardThumbBox}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/instagram/post-2.png" alt="Carousel visual" className={styles.thumbImg} />
                              <span className={styles.formatTag}>POST</span>
                            </div>
                            <span className={styles.cardContentTitle}>Product Story Insight</span>
                            <span className={styles.metricNotice}>1.8K Engaged</span>
                          </div>

                          {/* Day 3: WED */}
                          <div className={`${styles.calendarDayCard} ${styles.cardFeatured}`}>
                            <div className={styles.dayHeader}>
                              <span className={styles.dayNameGold}>WED</span>
                              <span className={styles.statusSched}>SCHEDULED</span>
                            </div>
                            <div className={styles.cardThumbBox}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/instagram/post-3.png" alt="BTS visual" className={styles.thumbImg} />
                              <span className={styles.formatTagGold}>REEL</span>
                            </div>
                            <span className={styles.cardContentTitle}>Behind The Camera BTS</span>
                            <span className={styles.schedTime}>18:00 GMT</span>
                          </div>

                          {/* Day 4: THU */}
                          <div className={styles.calendarDayCard}>
                            <div className={styles.dayHeader}>
                              <span className={styles.dayName}>THU</span>
                              <span className={styles.statusSched}>SCHEDULED</span>
                            </div>
                            <div className={styles.cardThumbBox}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/instagram/post-4.png" alt="Short visual" className={styles.thumbImg} />
                              <span className={styles.formatTag}>SHORT</span>
                            </div>
                            <span className={styles.cardContentTitle}>High-Retention Cut</span>
                            <span className={styles.schedTime}>14:30 GMT</span>
                          </div>

                          {/* Day 5: FRI */}
                          <div className={styles.calendarDayCard}>
                            <div className={styles.dayHeader}>
                              <span className={styles.dayName}>FRI</span>
                              <span className={styles.statusReview}>REVIEW</span>
                            </div>
                            <div className={styles.cardThumbBox}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/instagram/post-5.png" alt="Campaign visual" className={styles.thumbImg} />
                              <span className={styles.formatTag}>STORY</span>
                            </div>
                            <span className={styles.cardContentTitle}>Weekend Campaign Reveal</span>
                            <span className={styles.schedTime}>Pending Sign-off</span>
                          </div>
                        </div>

                        {/* Calendar Footer Strip */}
                        <div className={styles.socialFooterStrip}>
                          <span>COMMUNITY ENGAGEMENT: ACTIVE</span>
                          <span>•</span>
                          <span>CADENCE: 5 POSTS / WEEK</span>
                          <span>•</span>
                          <span>AUTO-PUBLISHING ENABLED</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ---------------- 04: PAID ADVERTISING VISUAL ---------------- */}
                  {activeService.id === "paid-advertising" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.paidAdsWrapper}>
                        {/* Ads Dashboard Top Bar */}
                        <div className={styles.adsHeaderBar}>
                          <div className={styles.adsTitleGroup}>
                            <TrendingUp size={11} className={styles.goldIcon} />
                            <span>CAMPAIGN CONTROL // PAID ADVERTISING ENGINE</span>
                          </div>
                          <div className={styles.campaignActiveBadge}>
                            <span className={styles.activePulseDot} />
                            <span>CAMPAIGN ACTIVE</span>
                          </div>
                        </div>

                        {/* 4 Connected Campaign Control Blocks */}
                        <div className={styles.adsMatrixGrid}>
                          {/* Module 1: Creative Formats */}
                          <div className={styles.adMatrixCard}>
                            <div className={styles.adCardHeader}>
                              <span className={styles.matrixKicker}>01 / CREATIVE ASSETS</span>
                              <span className={styles.matrixStatusGreen}>APPROVED</span>
                            </div>
                            <span className={styles.matrixTitle}>Dynamic Multivariate Creatives</span>
                            <div className={styles.matrixDetails}>
                              <span className={styles.matrixTag}>9:16 Vertical Reel</span>
                              <span className={styles.matrixTag}>1:1 Feed Asset</span>
                              <span className={styles.matrixTag}>16:9 In-Stream</span>
                            </div>
                            <span className={styles.matrixSub}>Creative fatigue immunity rotation</span>
                          </div>

                          {/* Module 2: Audience Architecture */}
                          <div className={styles.adMatrixCard}>
                            <div className={styles.adCardHeader}>
                              <span className={styles.matrixKicker}>02 / AUDIENCE TARGETING</span>
                              <span className={styles.matrixStatusGreen}>AUDIENCE READY</span>
                            </div>
                            <span className={styles.matrixTitle}>Segmented High-Intent Tiers</span>
                            <div className={styles.matrixDetails}>
                              <span className={styles.matrixTag}>Top-of-Funnel</span>
                              <span className={styles.matrixTag}>Retargeting Pool</span>
                              <span className={styles.matrixTag}>Customer Exclusions</span>
                            </div>
                            <span className={styles.matrixSub}>Algorithmic intent matching</span>
                          </div>

                          {/* Module 3: Placements & Delivery */}
                          <div className={styles.adMatrixCard}>
                            <div className={styles.adCardHeader}>
                              <span className={styles.matrixKicker}>03 / PLACEMENTS</span>
                              <span className={styles.matrixStatusGold}>DELIVERY OPTIMIZED</span>
                            </div>
                            <span className={styles.matrixTitle}>Omnichannel Sync</span>
                            <div className={styles.matrixDetails}>
                              <span className={styles.matrixTag}>Meta Ads</span>
                              <span className={styles.matrixTag}>YouTube Discovery</span>
                              <span className={styles.matrixTag}>Google Search</span>
                            </div>
                            <span className={styles.matrixSub}>Cross-channel frequency capped</span>
                          </div>

                          {/* Module 4: Delivery Pacing */}
                          <div className={styles.adMatrixCard}>
                            <div className={styles.adCardHeader}>
                              <span className={styles.matrixKicker}>04 / PACING &amp; HEALTH</span>
                              <span className={styles.matrixStatusGreen}>100% OPTIMAL</span>
                            </div>
                            <span className={styles.matrixTitle}>Automated Budget Pacing</span>
                            <div className={styles.pacingBar}>
                              <div className={styles.pacingFill} style={{ width: "92%" }} />
                            </div>
                            <div className={styles.pacingMetaRow}>
                              <span>Frequency: 1.4x (Balanced)</span>
                              <span>Pacing: Even</span>
                            </div>
                          </div>
                        </div>

                        {/* Ads Optimization Strip */}
                        <div className={styles.adsFooterStrip}>
                          <Sparkles size={11} className={styles.goldIcon} />
                          <span>CONTINUOUS AUDIENCE REFINEMENT &amp; CREATIVE ASSET OPTIMIZATION</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual Footer Caption */}
                  <div className={styles.visualMessageBanner}>
                    <Sparkles size={13} className={styles.bannerIcon} />
                    <span className={styles.bannerText}>
                      CAPABILITY 0{activeIndex + 1} {"//"} {activeService.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: DETAILED CAPABILITY SPECIFICATION */}
              <div ref={contentWrapperRef} className={styles.contentWrapper}>
                {/* 1. Category Eyebrow & Title */}
                <div className={styles.serviceTextGroup}>
                  <div className={styles.specEyebrow}>
                    <span>{activeService.label}</span>
                    <span className={styles.specEyebrowDivider}>•</span>
                    <span className={styles.specStageHighlight}>STAGE: {activeService.stage}</span>
                  </div>
                  <h3 className={styles.serviceTitle}>{activeService.title}</h3>
                  <p className={styles.serviceDescription}>{activeService.description}</p>
                </div>

                {/* 2. Core Capabilities (2-Column Check Grid) */}
                <div className={styles.capabilitiesBlock}>
                  <span className={styles.blockLabel}>CORE CAPABILITIES</span>
                  <div className={styles.capsGrid}>
                    {activeService.capabilities.map((cap, i) => (
                      <div key={i} className={styles.capItem}>
                        <CheckCircle2 size={15} className={styles.checkIcon} />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Deliverables (Compact Pill Cluster) */}
                <div className={styles.deliverablesBlock}>
                  <span className={styles.blockLabel}>DELIVERABLES</span>
                  <div className={styles.deliverablePills}>
                    {activeService.deliverables.map((item, i) => (
                      <span key={i} className={styles.deliverablePill}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Client Benefit Callout Box */}
                <div className={styles.outcomeCard}>
                  <div className={styles.outcomeHeader}>
                    <Sparkles size={15} className={styles.outcomeIcon} />
                    <span className={styles.outcomeTitle}>CLIENT BENEFIT</span>
                  </div>
                  <p className={styles.outcomeText}>&ldquo;{activeService.clientBenefit}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

EventShowcase.displayName = "EventShowcase";
export default EventShowcase;
