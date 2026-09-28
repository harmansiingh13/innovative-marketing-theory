"use client";

import React, { useState, useEffect, useRef, useCallback, forwardRef } from "react";
import gsap from "gsap";
import styles from "./WebCapabilities.module.css";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Smartphone,
  Layout,
  Code2,
  Gauge,
  Activity,
  Monitor,
  Tablet,
  MousePointer,
  RefreshCw,
  Lock,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  num: string;
  name: string;
  tagline: string;
  overlayLabels: string[];
  visualMessage: string;
  description: string;
  techStack: string[];
  capabilities: string[];
  clientOutcome: string;
  outcomeMetric?: string;
  visualType: "design" | "frontend" | "responsive" | "interactive" | "performance" | "maintenance";
}

const SERVICES: ServiceItem[] = [
  {
    id: "01",
    num: "01",
    name: "WEBSITE DESIGN",
    tagline: "WE DESIGN HOW YOUR WEBSITE LOOKS",
    overlayLabels: ["UI / UX", "DESIGN SYSTEM", "VISUAL DIRECTION"],
    visualMessage: "WE DESIGN HOW YOUR WEBSITE LOOKS",
    description:
      "Custom UI/UX layouts crafted specifically for your brand personality. We build complete visual design systems, hero layouts, typography grids, and bespoke visual aesthetics.",
    techStack: ["FIGMA", "PHOTOSHOP", "ILLUSTRATOR", "DESIGN SYSTEMS", "PROTOTYPING"],
    capabilities: [
      "Custom UI/UX Layout Architecture",
      "Typography & Color System Design",
      "Interactive Component Wireframing",
      "High-Fidelity Figma Prototypes",
    ],
    clientOutcome:
      "A distinctive, custom visual identity that builds immediate brand trust and elevates your market positioning.",
    outcomeMetric: "100% Custom Visual Design",
    visualType: "design",
  },
  {
    id: "02",
    num: "02",
    name: "FRONTEND DEVELOPMENT",
    tagline: "WE TURN DESIGN INTO A REAL WORKING WEBSITE",
    overlayLabels: ["NEXT.JS 15", "REACT 19", "COMPONENT ARCHITECTURE"],
    visualMessage: "WE TURN DESIGN INTO A REAL WORKING WEBSITE",
    description:
      "Precision engineering that transforms design files into ultra-fast, interactive web software. Built with modern component architecture, clean code, and zero technical bloat.",
    techStack: ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "STATE MANAGEMENT"],
    capabilities: [
      "Pixel-Accurate Design Translation",
      "Modular React Component System",
      "Server-Side Rendering (SSR)",
      "Enterprise TypeScript Codebase",
    ],
    clientOutcome:
      "A fast, robust digital flagship that scales seamlessly and is easily maintainable by your team.",
    outcomeMetric: "99.9% Clean Code Standards",
    visualType: "frontend",
  },
  {
    id: "03",
    num: "03",
    name: "RESPONSIVE DEVELOPMENT",
    tagline: "YOUR WEBSITE WORKS ON EVERY DEVICE",
    overlayLabels: ["DESKTOP", "TABLET", "MOBILE"],
    visualMessage: "YOUR WEBSITE WORKS ON EVERY DEVICE",
    description:
      "Fluid layouts that automatically adapt to any screen size. Whether viewed on a 32-inch studio display or an iPhone, your content always looks perfectly proportioned.",
    techStack: ["FLUID GRID", "MEDIA QUERIES", "TOUCH OPTIMIZED", "VECTOR SCALING"],
    capabilities: [
      "Adaptive Multi-Column Layouts",
      "Touch-Optimized Mobile Navigation",
      "Retina Display Graphic Optimization",
      "Cross-Browser Pixel Consistency",
    ],
    clientOutcome:
      "Flawless user experience and maximum conversion across every desktop, laptop, tablet, and smartphone.",
    outcomeMetric: "100% Cross-Device Coverage",
    visualType: "responsive",
  },
  {
    id: "04",
    num: "04",
    name: "INTERACTIVE EXPERIENCES",
    tagline: "YOUR WEBSITE CAN FEEL ALIVE AND INTERACTIVE",
    overlayLabels: ["HOVER", "SCROLL", "INTERACTION"],
    visualMessage: "YOUR WEBSITE CAN FEEL ALIVE AND INTERACTIVE",
    description:
      "Engaging animations and scroll interactions that captivate your visitors. We bring static layouts to life with cursor triggers, smooth page transitions, and subtle micro-physics.",
    techStack: ["GSAP", "SCROLLTRIGGER", "THREE.JS / WEBGL", "CANVAS", "MICRO-ANIMATIONS"],
    capabilities: [
      "Scroll-Driven Timeline Animations",
      "Interactive Hover & Cursor FX",
      "Hardware-Accelerated 60 FPS Motion",
      "Seamless Page Transition Engine",
    ],
    clientOutcome:
      "Substantially higher visitor engagement and time-on-site that turns casual browsers into high-intent buyers.",
    outcomeMetric: "+3.8x Time On Site",
    visualType: "interactive",
  },
  {
    id: "05",
    num: "05",
    name: "PERFORMANCE OPTIMIZATION",
    tagline: "WE MAKE YOUR WEBSITE FASTER",
    overlayLabels: ["BEFORE: 2.8s", "OPTIMIZED", "AFTER: 0.8s"],
    visualMessage: "WE MAKE YOUR WEBSITE FASTER",
    description:
      "Sub-second page speeds engineered through advanced code splitting, next-gen image compression, and edge distribution. Fast websites rank higher on Google and convert more visitors.",
    techStack: ["LIGHTHOUSE 100", "IMAGE OPTIMIZATION", "CODE SPLITTING", "EDGE CACHING"],
    capabilities: [
      "Core Web Vitals Score Maxing",
      "Sub-Second Page Load Optimization",
      "Automated Next-Gen WebP Compression",
      "Global Edge Network CDN Caching",
    ],
    clientOutcome:
      "Higher Google SEO rankings, lower bounce rates, and immediate conversion improvements.",
    outcomeMetric: "<0.8s Average Load Time",
    visualType: "performance",
  },
  {
    id: "06",
    num: "06",
    name: "MAINTENANCE & SUPPORT",
    tagline: "WE KEEP YOUR WEBSITE HEALTHY AFTER LAUNCH",
    overlayLabels: ["MONITOR", "UPDATE", "PROTECT"],
    visualMessage: "WE KEEP YOUR WEBSITE HEALTHY AFTER LAUNCH",
    description:
      "Continuous monitoring, proactive security updates, automated backups, and content updates. We ensure your website stays fast, secure, and operational 24 hours a day.",
    techStack: ["24/7 MONITORING", "SECURITY PATCHES", "AUTOMATED BACKUPS", "UPTIME SLA"],
    capabilities: [
      "24/7 Real-Time Health & Uptime Monitoring",
      "Automated Cloud Daily Backups",
      "Security Patching & Malware Defense",
      "Priority Content & Tech Updates",
    ],
    clientOutcome:
      "Complete peace of mind knowing your digital asset remains secure, updated, and fast 24/7.",
    outcomeMetric: "99.99% Guaranteed Uptime",
    visualType: "maintenance",
  },
];

export interface WebCapabilitiesProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const WebCapabilities = forwardRef<HTMLElement, WebCapabilitiesProps>(
  ({ headerRef: externalHeaderRef, canvasRef: externalCanvasRef }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoRotating, setIsAutoRotating] = useState(true);

    const internalSectionRef = useRef<HTMLElement>(null);
    const internalHeaderRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const internalActivePanelRef = useRef<HTMLDivElement>(null);
    const visualCardRef = useRef<HTMLDivElement>(null);
    const visualImageRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);

    const sectionRef = (ref as React.RefObject<HTMLElement | null>) || internalSectionRef;
    const headerRef = externalHeaderRef || internalHeaderRef;
    const activePanelRef = externalCanvasRef || internalActivePanelRef;

    const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
    const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const progressTweenRef = useRef<gsap.core.Tween | null>(null);

    const activeService = SERVICES[activeIndex];

    // ----------------------------------------------------
    // Switch Active Service with Synced GSAP Timeline
    // ----------------------------------------------------
    const handleSelectService = useCallback(
      (index: number, manualClick = false) => {
        if (index === activeIndex && manualClick) return;

        if (manualClick) {
          setIsAutoRotating(false);
          if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
          resumeTimerRef.current = setTimeout(() => {
            setIsAutoRotating(true);
          }, 8000);
        }

        const imgEl = visualImageRef.current;
        const contentEl = contentWrapperRef.current;

        const tl = gsap.timeline({
          defaults: { duration: 0.5, ease: "power3.out" },
        });

        if (imgEl && contentEl) {
          tl.to(imgEl, { scale: 0.97, opacity: 0, duration: 0.25 }, 0);
          tl.to(contentEl, { opacity: 0, x: 20, duration: 0.25 }, 0);
        }

        tl.call(() => {
          setActiveIndex(index);
        });

        if (imgEl && contentEl) {
          tl.fromTo(
            imgEl,
            { scale: 1.03, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5 },
            0.3,
          );
          tl.fromTo(contentEl, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, 0.35);
        }
      },
      [activeIndex],
    );

    // ----------------------------------------------------
    // Progress Bar & Auto Rotation Loop
    // ----------------------------------------------------
    useEffect(() => {
      if (progressLineRef.current) {
        if (progressTweenRef.current) progressTweenRef.current.kill();

        if (isAutoRotating) {
          gsap.set(progressLineRef.current, { width: "0%" });
          progressTweenRef.current = gsap.to(progressLineRef.current, {
            width: "100%",
            duration: 5.5,
            ease: "none",
          });
        } else {
          gsap.set(progressLineRef.current, { width: "100%" });
        }
      }

      if (!isAutoRotating) {
        if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
        return;
      }

      autoRotateTimerRef.current = setTimeout(() => {
        const nextIndex = (activeIndex + 1) % SERVICES.length;
        handleSelectService(nextIndex, false);
      }, 5500);

      return () => {
        if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      };
    }, [activeIndex, isAutoRotating, handleSelectService]);

    useEffect(() => {
      return () => {
        if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        if (progressTweenRef.current) progressTweenRef.current.kill();
      };
    }, []);

    // ----------------------------------------------------
    // Subtle Cursor Parallax Effect (x: ±5px, y: ±3px)
    // ----------------------------------------------------
    useEffect(() => {
      const card = visualCardRef.current;
      if (!card) return;

      const xTo = gsap.quickTo(card, "x", { duration: 0.6, ease: "power2.out" });
      const yTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        xTo(relativeX * 5);
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

    // ----------------------------------------------------
    // ScrollTrigger Entrance Animation
    // ----------------------------------------------------
    useEffect(() => {
      if (typeof window === "undefined" || !sectionRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (headerRef.current) {
          tl.fromTo(
            headerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            0,
          );
        }

        if (navRef.current) {
          tl.fromTo(
            navRef.current.children,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
            0.2,
          );
        }

        if (activePanelRef.current) {
          tl.fromTo(
            activePanelRef.current,
            { opacity: 0, y: 35, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.85 },
            0.3,
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }, []);

    return (
      <section ref={sectionRef} id="capabilities" className={styles.section}>
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
                VISUAL DEMONSTRATION OF <span className={styles.goldText}>OUR SERVICES.</span>
              </h2>
              <p className={styles.subtitle}>
                See the direct impact before reading the terminology. Every service delivers a
                clear, measurable transformation for your digital presence.
              </p>
            </div>
          </div>

          {/* Top Horizontal Navigation Service Selector Pills */}
          <div ref={navRef} className={styles.topNavPillRow} role="tablist">
            {SERVICES.map((srv, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={srv.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.topNavBtn} ${isActive ? styles.topNavBtnActive : ""}`}
                  onClick={() => handleSelectService(idx, true)}
                >
                  <span className={styles.topNavNum}>{srv.num}</span>
                  <span className={styles.topNavName}>{srv.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main Showcase Split Card Frame */}
          <div ref={activePanelRef} className={styles.activePanel}>
            {/* Top Bar: Active Title + Progress Bar */}
            <div className={styles.panelTopBar}>
              <div className={styles.panelBadge}>
                <span className={styles.panelBadgeDot} />
                <span>
                  {activeService.num} / {activeService.name}
                </span>
              </div>

              {/* Progress Indicator */}
              <div className={styles.progressWrapper}>
                <span className={styles.progressText}>{activeService.num} / 06</span>
                <div className={styles.progressTrack}>
                  <div ref={progressLineRef} className={styles.progressFill} />
                </div>
              </div>
            </div>

            {/* 2 Equal Columns Split Body */}
            <div className={styles.panelBodyGrid}>
              {/* LEFT COLUMN: LARGE HIGH-IMPACT VISUAL GRAPHIC CANVAS */}
              <div
                ref={visualCardRef}
                className={styles.visualCard}
                onMouseEnter={() => setIsAutoRotating(false)}
              >
                <div ref={visualImageRef} className={styles.imageInner}>
                  {/* Visual Top macOS Bar */}
                  <div className={styles.graphicHeaderBar}>
                    <div className={styles.macDots}>
                      <span className={styles.macRed} />
                      <span className={styles.macYellow} />
                      <span className={styles.macGreen} />
                    </div>
                    <div className={styles.graphicUrlPill}>
                      <Lock size={10} className={styles.urlLock} />
                      <span>
                        https://your-brand-flagship.com/
                        {activeService.name.toLowerCase().replace(/\s+/g, "-")}
                      </span>
                    </div>
                    <span className={styles.liveTag}>LIVE SYSTEM PREVIEW</span>
                  </div>

                  {/* Background Grid Pattern */}
                  <div className={styles.graphicGridBg} />

                  {/* Subtle Overlay Tag Pills Top Left */}
                  <div className={styles.overlayLabelsWrapper}>
                    {activeService.overlayLabels.map((lbl, idx) => (
                      <span key={idx} className={styles.overlayTag}>
                        {lbl}
                      </span>
                    ))}
                  </div>

                  {/* ----------------- SERVICE 01: WEBSITE DESIGN ----------------- */}
                  {activeService.visualType === "design" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.designHeroMockup}>
                        <div className={styles.designNavRow}>
                          <div className={styles.brandLogoBox} />
                          <div className={styles.navLinksPills}>
                            <span className={styles.navPill} />
                            <span className={styles.navPill} />
                            <span className={styles.navPill} />
                          </div>
                          <div className={styles.ctaButtonBox}>BOOK CONSULTATION</div>
                        </div>

                        <div className={styles.designHeadlineGroup}>
                          <div className={styles.designTaglineBadge}>CREATIVE DIRECTED UI / UX</div>
                          <h4 className={styles.designBigTitle}>
                            WE DESIGN HOW YOUR{" "}
                            <span className={styles.goldTextInline}>WEBSITE LOOKS.</span>
                          </h4>
                          <p className={styles.designSubtext}>
                            Custom typography grids, brand color palettes, high-converting layouts,
                            and interactive visual design systems.
                          </p>
                        </div>

                        <div className={styles.designCardsRow}>
                          <div className={styles.designUiCard}>
                            <div className={styles.cardHeaderBox} />
                            <span className={styles.cardTitleLine} />
                            <span className={styles.cardDescLine} />
                          </div>
                          <div className={`${styles.designUiCard} ${styles.designCardFeatured}`}>
                            <div className={styles.cardHeaderBoxGold} />
                            <span className={styles.cardTitleLine} />
                            <span className={styles.cardDescLine} />
                          </div>
                          <div className={styles.designUiCard}>
                            <div className={styles.cardHeaderBox} />
                            <span className={styles.cardTitleLine} />
                            <span className={styles.cardDescLine} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- SERVICE 02: FRONTEND DEVELOPMENT ----------------- */}
                  {activeService.visualType === "frontend" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.frontendArchitectureMap}>
                        <div className={styles.archBoxTop}>
                          <div className={styles.archLabel}>
                            <Layout size={14} />
                            <span>NAVBAR COMPONENT</span>
                          </div>
                          <span className={styles.archStatus}>STATUS: READY</span>
                        </div>

                        <div className={styles.archBoxMiddle}>
                          <div className={styles.archMainLabel}>
                            <Code2 size={16} />
                            <span>HERO &amp; INTERACTIVE APPLICATION COMPONENT</span>
                          </div>
                          <div className={styles.archConnectors}>
                            <div className={styles.archChip}>REACT 19</div>
                            <div className={styles.archChip}>NEXT.JS 15</div>
                            <div className={styles.archChip}>TYPESCRIPT</div>
                          </div>
                        </div>

                        <div className={styles.archGridRow}>
                          <div className={styles.archCardItem}>
                            <span>PRODUCT CARD 01</span>
                          </div>
                          <div className={styles.archCardItem}>
                            <span>CTA BUTTON</span>
                          </div>
                          <div className={styles.archCardItem}>
                            <span>FOOTER SYSTEM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- SERVICE 03: RESPONSIVE DEVELOPMENT ----------------- */}
                  {activeService.visualType === "responsive" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.responsiveDeviceSuite}>
                        <div className={styles.deviceDesktop}>
                          <div className={styles.deviceHeader}>
                            <Monitor size={14} />
                            <span>DESKTOP (3-COLUMNS)</span>
                          </div>
                          <div className={styles.desktopGrid}>
                            <div className={styles.gridCol} />
                            <div className={styles.gridCol} />
                            <div className={styles.gridCol} />
                          </div>
                        </div>

                        <div className={styles.deviceTablet}>
                          <div className={styles.deviceHeader}>
                            <Tablet size={13} />
                            <span>TABLET (2-COL)</span>
                          </div>
                          <div className={styles.tabletGrid}>
                            <div className={styles.gridCol} />
                            <div className={styles.gridCol} />
                          </div>
                        </div>

                        <div className={styles.deviceMobile}>
                          <div className={styles.deviceHeader}>
                            <Smartphone size={13} />
                            <span>MOBILE (1-COL)</span>
                          </div>
                          <div className={styles.mobileGrid}>
                            <div className={styles.gridColFull} />
                            <div className={styles.gridColFull} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- SERVICE 04: INTERACTIVE EXPERIENCES ----------------- */}
                  {activeService.visualType === "interactive" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.interactiveMotionSuite}>
                        <div className={styles.stateCard}>
                          <span className={styles.stateLabel}>01 / NORMAL STATE</span>
                          <div className={styles.stateCardBox}>
                            <span>CARD ELEMENT</span>
                          </div>
                        </div>

                        <div className={styles.motionArrow}>→</div>

                        <div className={`${styles.stateCard} ${styles.stateCardHover}`}>
                          <span className={styles.stateLabelGold}>02 / HOVER STATE (GLOW)</span>
                          <div className={styles.stateCardBoxActive}>
                            <span>INTERACTIVE CARD</span>
                            <MousePointer size={16} className={styles.cursorIconGlow} />
                          </div>
                        </div>

                        <div className={styles.motionArrow}>→</div>

                        <div className={`${styles.stateCard} ${styles.stateCardActive}`}>
                          <span className={styles.stateLabelActive}>03 / ACTIVE ACTION</span>
                          <div className={styles.stateCardBoxTriggered}>
                            <span>TRIGGER ANIMATION</span>
                            <Zap size={14} className={styles.activeZapIcon} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- SERVICE 05: PERFORMANCE OPTIMIZATION ----------------- */}
                  {activeService.visualType === "performance" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.performanceComparisonGrid}>
                        <div className={styles.perfSideSlow}>
                          <div className={styles.perfHeader}>
                            <span className={styles.slowTag}>SLOW / UNOPTIMIZED</span>
                          </div>
                          <div className={styles.perfMetricBox}>
                            <span className={styles.perfBigNumberRed}>2.8s</span>
                            <span className={styles.perfSubtext}>SLOW PAGE LOAD</span>
                          </div>
                          <div className={styles.perfBarRed}>
                            <div className={styles.barFillRed} />
                          </div>
                        </div>

                        <div className={styles.perfVsDivider}>
                          <Sparkles size={20} className={styles.perfOptIcon} />
                          <span>OPTIMIZED</span>
                        </div>

                        <div className={styles.perfSideFast}>
                          <div className={styles.perfHeader}>
                            <span className={styles.fastTag}>⚡ ULTRA FAST</span>
                          </div>
                          <div className={styles.perfMetricBox}>
                            <span className={styles.perfBigNumberGreen}>0.8s</span>
                            <span className={styles.perfSubtext}>LIGHTHOUSE 100/100</span>
                          </div>
                          <div className={styles.perfBarGreen}>
                            <div className={styles.barFillGreen} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- SERVICE 06: MAINTENANCE & SUPPORT ----------------- */}
                  {activeService.visualType === "maintenance" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.maintenanceDashboardGrid}>
                        <div className={styles.maintCard}>
                          <Activity size={20} className={styles.maintGreenIcon} />
                          <div className={styles.maintInfo}>
                            <span className={styles.maintTitle}>SYSTEM HEALTH</span>
                            <span className={styles.maintValue}>100% ONLINE</span>
                          </div>
                        </div>

                        <div className={styles.maintCard}>
                          <ShieldCheck size={20} className={styles.maintGoldIcon} />
                          <div className={styles.maintInfo}>
                            <span className={styles.maintTitle}>SECURITY STATUS</span>
                            <span className={styles.maintValue}>PROTECTED 24/7</span>
                          </div>
                        </div>

                        <div className={styles.maintCard}>
                          <Gauge size={20} className={styles.maintBlueIcon} />
                          <div className={styles.maintInfo}>
                            <span className={styles.maintTitle}>SPEED MONITOR</span>
                            <span className={styles.maintValue}>0.8s OPTIMIZED</span>
                          </div>
                        </div>

                        <div className={styles.maintCard}>
                          <RefreshCw size={20} className={styles.maintGreenIcon} />
                          <div className={styles.maintInfo}>
                            <span className={styles.maintTitle}>CLOUD BACKUPS</span>
                            <span className={styles.maintValue}>AUTOMATED DAILY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service Concept Explainer Banner over image (Bottom Pill) */}
                  <div className={styles.visualMessageBanner}>
                    <Sparkles size={14} className={styles.bannerIcon} />
                    <span className={styles.bannerText}>{activeService.visualMessage}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SERVICE TEXT CONTENT WRAPPER */}
              <div ref={contentWrapperRef} className={styles.contentWrapper}>
                {/* Service Heading & Description */}
                <div className={styles.serviceTextGroup}>
                  <h3 className={styles.serviceTitle}>{activeService.name}</h3>
                  <p className={styles.serviceDescription}>{activeService.description}</p>
                </div>

                {/* Capabilities Checkpoints */}
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

                {/* Tech Stack Pills */}
                <div className={styles.techStackBlock}>
                  <span className={styles.blockLabel}>TECHNOLOGY STACK</span>
                  <div className={styles.techPills}>
                    {activeService.techStack.map((tech, i) => (
                      <span key={i} className={styles.techPill}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Outcome Highlight Box */}
                <div className={styles.outcomeCard}>
                  <div className={styles.outcomeHeader}>
                    <Code2 size={16} className={styles.outcomeIcon} />
                    <span className={styles.outcomeTitle}>CLIENT BENEFIT</span>
                    {activeService.outcomeMetric && (
                      <span className={styles.outcomeMetricBadge}>
                        {activeService.outcomeMetric}
                      </span>
                    )}
                  </div>
                  <p className={styles.outcomeText}>{activeService.clientOutcome}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

WebCapabilities.displayName = "WebCapabilities";
export default WebCapabilities;
