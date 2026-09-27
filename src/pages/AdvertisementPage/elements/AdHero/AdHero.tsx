"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./AdHero.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/Button";

export interface AdHeroProps {
  headingKickerRef?: React.RefObject<HTMLDivElement | null>;
  headingTitleRef?: React.RefObject<HTMLHeadingElement | null>;
  headingAsideRef?: React.RefObject<HTMLDivElement | null>;
  commandCenterRef?: React.RefObject<HTMLDivElement | null>;
  valueLedgerRef?: React.RefObject<HTMLDivElement | null>;
}

export const AdHero = forwardRef<HTMLElement, AdHeroProps>(
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
          PROFITABLE SCALE
        </div>

        {/* Ambient Top Glow */}
        <div className={styles.backgroundGlowTop} />

        <div className={styles.container}>
          {/* Main Hero Showcase Row */}
          <div className={styles.heroMainRow}>
            {/* Left Column: Typography & Actions */}
            <div className={styles.leftColumn}>

              <h1 ref={headingTitleRef} className={styles.headline}>
                <span className={styles.headlineLine}>WE DON&apos;T BUY CLICKS.</span>
                <span className={styles.headlineLine}>WE ENGINEER</span>
                <span className={`${styles.headlineLine} ${styles.accentLine}`}>
                  PROFITABLE ROAS.
                </span>
              </h1>

              <div ref={headingAsideRef} className={styles.asideBlock}>
                <p className={styles.description}>
                  No vanity impressions. We architect high-converting media buying systems across
                  Meta, Google, TikTok, and YouTube that turn paid media dollars into predictable,
                  compounding customer acquisition and scalable enterprise pipeline.
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
                    Let&apos;s Connect
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
                    Explore Our Approach
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive ROAS Command Center Card */}
            <div ref={commandCenterRef} className={styles.terminalCard}>
              <div className={styles.cardHeader}>
                <div className={styles.windowControls}>
                  <span className={`${styles.controlDot} ${styles.controlDotRed}`} />
                  <span className={`${styles.controlDot} ${styles.controlDotYellow}`} />
                  <span className={`${styles.controlDot} ${styles.controlDotGreen}`} />
                </div>
                <span className={styles.headerTitle}>IMT_AD_ENGINE // LIVE HUD</span>
                <div className={styles.headerBadge}>
                  <span className={styles.badgePulse} />
                  <span>BLENDED ROAS: 4.82X</span>
                </div>
              </div>

              {/* Analytics Metric Boxes */}
              <div className={styles.metricsGrid}>
                <div className={styles.metricBox}>
                  <span className={styles.metricLabel}>MANAGED SPEND</span>
                  <span className={styles.metricValue}>$48.2K</span>
                  <span className={styles.metricDelta}>+18% MoM scaling</span>
                </div>

                <div className={styles.metricBox}>
                  <span className={styles.metricLabel}>ATTRIBUTED REV</span>
                  <span className={styles.metricValue}>$232.4K</span>
                  <span className={styles.metricDelta}>4.82X ROAS</span>
                </div>

                <div className={styles.metricBox}>
                  <span className={styles.metricLabel}>BLENDED CAC</span>
                  <span className={styles.metricValue}>$38.10</span>
                  <span className={styles.metricDelta}>-34% vs avg</span>
                </div>
              </div>

              {/* Scaled Top-Performing Ad Creative Showcase */}
              <div className={styles.creativeShowcase}>
                <div className={styles.creativeThumb}>
                  <Image
                    src="/images/cinema_production_graded.jpg"
                    alt="Top Performing Ad Creative"
                    fill
                    sizes="110px"
                    className={styles.thumbImg}
                  />
                  <span className={styles.thumbTag}>WINNER #01</span>
                </div>

                <div className={styles.creativeMeta}>
                  <span className={styles.creativeKicker}>CREATIVE FATIGUE IMMUNITY</span>
                  <span className={styles.creativeTitle}>
                    High-Contrast Dynamic Hook Cut // Direct Response
                  </span>
                  <div className={styles.creativeStatsRow}>
                    <span className={styles.creativeStatItem}>
                      CTR: <strong>3.8%</strong>
                    </span>
                    <span className={styles.creativeStatItem}>
                      Hook: <strong>48%</strong>
                    </span>
                    <span className={styles.creativeStatItem}>
                      Spend: <strong>$18.4K</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Value Ledger: 3 Value Pillars */}
          <div ref={valueLedgerRef} className={styles.valueLedger}>
            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>01 ALGORITHMIC BIDDING</span>
              </div>
              <h3 className={styles.ledgerTitle}>1st-Party Conversion Modeling</h3>
              <p className={styles.ledgerDesc}>
                We bypass privacy deprecation using custom CAPI server-side tracking, offline
                conversion integrations, and smart bidding algorithms that find your highest-LTV
                buyers.
              </p>
            </div>

            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>02 CREATIVE VELOCITY</span>
              </div>
              <h3 className={styles.ledgerTitle}>Rapid Direct-Response Testing</h3>
              <p className={styles.ledgerDesc}>
                Creative is the new targeting. We script, film, and test 15+ bespoke video hooks,
                motion typography variations, and static graphics weekly to scale winning campaigns.
              </p>
            </div>

            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>03 CONVERSION OPTIMIZATION</span>
              </div>
              <h3 className={styles.ledgerTitle}>Post-Click Revenue Funnels</h3>
              <p className={styles.ledgerDesc}>
                Great ads fail on bad pages. We build tailored direct-response landing pages,
                checkout friction eliminators, and AOV upsells that double your return on ad spend.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

AdHero.displayName = "AdHero";
export default AdHero;
