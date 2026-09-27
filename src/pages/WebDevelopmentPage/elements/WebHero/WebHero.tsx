"use client";

import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./WebHero.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/Button";

export interface WebHeroProps {
  headingKickerRef?: React.RefObject<HTMLDivElement | null>;
  headingTitleRef?: React.RefObject<HTMLHeadingElement | null>;
  headingAsideRef?: React.RefObject<HTMLDivElement | null>;
  commandCenterRef?: React.RefObject<HTMLDivElement | null>;
  valueLedgerRef?: React.RefObject<HTMLDivElement | null>;
}

export const WebHero = forwardRef<HTMLElement, WebHeroProps>(
  (
    { headingKickerRef, headingTitleRef, headingAsideRef, commandCenterRef, valueLedgerRef },
    ref,
  ) => {
    const router = useRouter();

    const handleConnectClick = () => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        router.push("/#contact");
      }
    };
    return (
      <section ref={ref} id="about" className={styles.heroSection}>
        {/* Subtle Architectural Blueprint Grid */}
        <div className={styles.gridPattern} />

        {/* Massive Ghost Watermark Typography */}
        <div className={styles.ghostWatermark} aria-hidden="true">
          WEB DEVELOPMENT
        </div>

        {/* Ambient Top Glow */}
        <div className={styles.backgroundGlowTop} />

        <div className={styles.container}>
          {/* Main Hero Showcase Row */}
          <div className={styles.heroMainRow}>
            {/* Left Column: Typography & Actions */}
            <div className={styles.leftColumn}>
              <div ref={headingKickerRef} className={styles.kicker}>
                <span className={styles.kickerDash}>—</span>
                <span>01 / WEB DEVELOPMENT</span>
              </div>

              <h1 ref={headingTitleRef} className={styles.headline}>
                <span className={styles.headlineLine}>WE DON&apos;T JUST</span>
                <span className={styles.headlineLine}>BUILD WEBSITES.</span>
                <span className={styles.headlineLine}>WE BUILD</span>
                <span className={`${styles.headlineLine} ${styles.accentLine}`}>
                  DIGITAL EXPERIENCES.
                </span>
              </h1>

              <div ref={headingAsideRef} className={styles.asideBlock}>
                <p className={styles.description}>
                  Fast, responsive websites designed to look exceptional, perform smoothly, and turn
                  visitors into customers.
                </p>

                <div className={styles.actionsRow}>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    shape="pill"
                    rightIcon={<ArrowUpRight className={styles.ctaArrow} />}
                    onClick={handleConnectClick}
                  >
                    START A CONVERSATION
                  </Button>

                  <Button
                    variant="outline"
                    shape="pill"
                    type="button"
                    size="lg"
                    rightIcon={<ArrowDown className={styles.secondaryArrow} />}
                    onClick={() => {
                      document.getElementById("process")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    EXPLORE OUR APPROACH
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Lighthouse 100 Command Center HUD */}
            <div ref={commandCenterRef} className={styles.rightColumn}>
              <div className={styles.commandCenterHud}>
                {/* HUD Header */}
                <div className={styles.hudHeader}>
                  <div className={styles.hudHeaderLeft}>
                    <span className={styles.pulseDot} />
                    <span className={styles.hudTitle}>GOOGLE LIGHTHOUSE AUDIT</span>
                  </div>
                  <div className={styles.hudScoreOverall}>100% PERFECT SCORE</div>
                </div>

                {/* 4 Circular Lighthouse Score Rings */}
                <div className={styles.scoresRow}>
                  <div className={styles.scoreItem}>
                    <div className={styles.ringWrapper}>
                      <svg className={styles.scoreRingSvg} viewBox="0 0 36 36">
                        <path
                          className={styles.scoreRingBg}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={styles.scoreRingProgress}
                          strokeDasharray="100, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className={styles.scoreNumber}>100</span>
                    </div>
                    <span className={styles.scoreLabel}>PERF</span>
                  </div>

                  <div className={styles.scoreItem}>
                    <div className={styles.ringWrapper}>
                      <svg className={styles.scoreRingSvg} viewBox="0 0 36 36">
                        <path
                          className={styles.scoreRingBg}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={styles.scoreRingProgress}
                          strokeDasharray="100, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className={styles.scoreNumber}>100</span>
                    </div>
                    <span className={styles.scoreLabel}>A11Y</span>
                  </div>

                  <div className={styles.scoreItem}>
                    <div className={styles.ringWrapper}>
                      <svg className={styles.scoreRingSvg} viewBox="0 0 36 36">
                        <path
                          className={styles.scoreRingBg}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={styles.scoreRingProgress}
                          strokeDasharray="100, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className={styles.scoreNumber}>100</span>
                    </div>
                    <span className={styles.scoreLabel}>PRACTICES</span>
                  </div>

                  <div className={styles.scoreItem}>
                    <div className={styles.ringWrapper}>
                      <svg className={styles.scoreRingSvg} viewBox="0 0 36 36">
                        <path
                          className={styles.scoreRingBg}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={styles.scoreRingProgress}
                          strokeDasharray="100, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className={styles.scoreNumber}>100</span>
                    </div>
                    <span className={styles.scoreLabel}>SEO</span>
                  </div>
                </div>

                {/* Core Web Vitals Telemetry Strip */}
                <div className={styles.vitalsGrid}>
                  <div className={styles.vitalItem}>
                    <span className={styles.vitalLabel}>TTFB</span>
                    <span className={styles.vitalValue}>24ms</span>
                    <span className={styles.vitalDesc}>Edge Server Response</span>
                  </div>
                  <div className={styles.vitalItem}>
                    <span className={styles.vitalLabel}>LCP</span>
                    <span className={styles.vitalValue}>0.42s</span>
                    <span className={styles.vitalDesc}>Largest Content Paint</span>
                  </div>
                  <div className={styles.vitalItem}>
                    <span className={styles.vitalLabel}>CLS</span>
                    <span className={styles.vitalValue}>0.000</span>
                    <span className={styles.vitalDesc}>Cumulative Layout Shift</span>
                  </div>
                  <div className={styles.vitalItem}>
                    <span className={styles.vitalLabel}>INP</span>
                    <span className={styles.vitalValue}>18ms</span>
                    <span className={styles.vitalDesc}>Interaction to Next Paint</span>
                  </div>
                </div>

                {/* Tech Stack Badges Strip */}
                <div className={styles.stackStrip}>
                  <span className={styles.stackLabel}>CORE ARCHITECTURAL STACK</span>
                  <div className={styles.stackPills}>
                    <span className={styles.stackPill}>NEXT.JS 15 APP ROUTER</span>
                    <span className={styles.stackPill}>REACT 19</span>
                    <span className={styles.stackPill}>TYPESCRIPT 5.5</span>
                    <span className={styles.stackPill}>GSAP MOTION &amp; WEBGL</span>
                    <span className={styles.stackPill}>POSTGRESQL &amp; PRISMA</span>
                    <span className={styles.stackPill}>GLOBAL EDGE CDN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Value Ledger (3 Columns) */}
          <div ref={valueLedgerRef} className={styles.valueLedger}>
            <div className={styles.valueCard}>
              <div className={styles.valueCardHeader}>
                <span className={styles.valueNumber}>01</span>
                <span className={styles.valueTag}>PERFORMANCE</span>
              </div>
              <h3 className={styles.valueTitle}>Sub-Second Core Web Vitals</h3>
              <p className={styles.valueDesc}>
                We achieve sub-50ms TTFB and perfect 100/100 Lighthouse ratings with server-side
                rendering, optimized font hydration, and aggressive global edge network caching.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueCardHeader}>
                <span className={styles.valueNumber}>02</span>
                <span className={styles.valueTag}>EXPERIENCE</span>
              </div>
              <h3 className={styles.valueTitle}>Bespoke GSAP &amp; Spatial Motion</h3>
              <p className={styles.valueDesc}>
                From cinematic scroll-driven storytelling and 3D WebGL interactions to tactile
                micro-physics, we engineer unforgettable interactive luxury experiences without
                frame drops.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueCardHeader}>
                <span className={styles.valueNumber}>03</span>
                <span className={styles.valueTag}>CONVERSION</span>
              </div>
              <h3 className={styles.valueTitle}>Headless Commerce &amp; CRO Funnels</h3>
              <p className={styles.valueDesc}>
                High-converting headless checkout pipelines built on Shopify Plus, Stripe, and
                Sanity CMS that eliminate friction and scale revenue across global markets.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

WebHero.displayName = "WebHero";
export default WebHero;
