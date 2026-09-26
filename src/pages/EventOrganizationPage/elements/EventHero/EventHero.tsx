"use client";

import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./EventHero.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/Button";

export interface EventHeroProps {
  headingKickerRef?: React.RefObject<HTMLDivElement | null>;
  headingTitleRef?: React.RefObject<HTMLHeadingElement | null>;
  headingAsideRef?: React.RefObject<HTMLDivElement | null>;
  commandCenterRef?: React.RefObject<HTMLDivElement | null>;
  valueLedgerRef?: React.RefObject<HTMLDivElement | null>;
}

export const EventHero = forwardRef<HTMLElement, EventHeroProps>(
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
          EXPERIENTIAL OP
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
                <span className={styles.kickerHash}>#</span>
                <span>HIGH-STAKES EXPERIENTIAL &amp; STAGE ARCHITECTURE</span>
              </div>

              <h1 ref={headingTitleRef} className={styles.headline}>
                <span className={styles.headlineLine}>WE DON&apos;T HOST PARTIES.</span>
                <span className={styles.headlineLine}>WE ARCHITECT HIGH-IMPACT</span>
                <span className={`${styles.headlineLine} ${styles.accentLine}`}>
                  EXPERIENTIAL MONUMENTS.
                </span>
              </h1>

              <div ref={headingAsideRef} className={styles.asideBlock}>
                <p className={styles.description}>
                  From global investor summits and enterprise product keynotes to immersive brand
                  galas and viral activations. We handle turnkey spatial design, multi-camera 4K
                  broadcast, DMX lighting choreography, and white-glove VIP security protocols.
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

            {/* Right Column: Live Stage Ops Control HUD */}
            <div ref={commandCenterRef} className={styles.rightColumn}>
              <div className={styles.commandCenterHud}>
                {/* HUD Header */}
                <div className={styles.hudHeader}>
                  <div className={styles.hudHeaderLeft}>
                    <span className={styles.pulseDot} />
                    <span className={styles.hudTitle}>STAGE OPS CONTROL // RUN-OF-SHOW</span>
                  </div>
                  <div className={styles.hudStatusBadge}>LIVE SHOW ACTIVE</div>
                </div>

                {/* Live Run-of-Show Cue Card */}
                <div className={styles.cueCardBlock}>
                  <div className={styles.cueHeader}>
                    <span className={styles.cueNumber}>CUE 14 // ACTIVE ON-STAGE</span>
                    <span className={styles.cueTimecode}>01:24:18:00</span>
                  </div>
                  <h3 className={styles.cueTitle}>KEYNOTE HARDWARE REVEAL // MAIN STAGE</h3>
                  <div className={styles.cueDetailRow}>
                    <span className={styles.cueTag}>SPATIAL AUDIO: 7.1 TRIGGERED</span>
                    <span className={styles.cueTag}>LASER VOLUMETRICS: SYNCED</span>
                    <span className={styles.cueTag}>LED CURTAIN: 0.0s BLACKOUT</span>
                  </div>
                </div>

                {/* Live Stage Telemetry Grid */}
                <div className={styles.telemetryGrid}>
                  <div className={styles.telemetryItem}>
                    <span className={styles.telemetryLabel}>BROADCAST</span>
                    <span className={styles.telemetryValue}>4K 60FPS</span>
                    <span className={styles.telemetryDesc}>Ultra-Low Latency</span>
                  </div>
                  <div className={styles.telemetryItem}>
                    <span className={styles.telemetryLabel}>ATTENDEES</span>
                    <span className={styles.telemetryValue}>1,400+</span>
                    <span className={styles.telemetryDesc}>VIP In-Venue Seated</span>
                  </div>
                  <div className={styles.telemetryItem}>
                    <span className={styles.telemetryLabel}>ACOUSTICS</span>
                    <span className={styles.telemetryValue}>92dB</span>
                    <span className={styles.telemetryDesc}>Calibrated Line Array</span>
                  </div>
                  <div className={styles.telemetryItem}>
                    <span className={styles.telemetryLabel}>DMX RIG</span>
                    <span className={styles.telemetryValue}>240 FIX</span>
                    <span className={styles.telemetryDesc}>Moving Heads Synced</span>
                  </div>
                </div>

                {/* Production Specifications Badges Strip */}
                <div className={styles.specsStrip}>
                  <span className={styles.specsLabel}>PRODUCTION CAPABILITY SPECIFICATIONS</span>
                  <div className={styles.specsPills}>
                    <span className={styles.specsPill}>4K MULTI-CAM FIBER SWITCHING</span>
                    <span className={styles.specsPill}>SPATIAL DMX RIGGING</span>
                    <span className={styles.specsPill}>LED VOLUME BACKDROPS</span>
                    <span className={styles.specsPill}>WHITE-GLOVE VIP PROTOCOLS</span>
                    <span className={styles.specsPill}>SAME-DAY SIZZLE EDIT</span>
                    <span className={styles.specsPill}>GLOBAL PR SYNDICATION</span>
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
                <span className={styles.valueTag}>SPATIAL DESIGN</span>
              </div>
              <h3 className={styles.valueTitle}>Bespoke Spatial &amp; Stage Engineering</h3>
              <p className={styles.valueDesc}>
                We transform raw physical venues into monumental architectural stages with custom
                scenography, LED curved volumes, kinetic rigs, and DMX lighting environments.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueCardHeader}>
                <span className={styles.valueNumber}>02</span>
                <span className={styles.valueTag}>BROADCAST</span>
              </div>
              <h3 className={styles.valueTitle}>Cinema-Grade 4K Live Broadcast</h3>
              <p className={styles.valueDesc}>
                Multi-camera cinema rigs on jibs, dollies, and wireless Steadicams feeding ultra-low
                latency global streams with television-grade audio mixing and redundant satellite
                links.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueCardHeader}>
                <span className={styles.valueNumber}>03</span>
                <span className={styles.valueTag}>HOSPITALITY</span>
              </div>
              <h3 className={styles.valueTitle}>White-Glove VIP Hospitality &amp; Security</h3>
              <p className={styles.valueDesc}>
                Flawless guest journeys from bespoke RFID credentialing and diplomatic-grade
                security to Michelin-caliber catering and private green room concierge management.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

EventHero.displayName = "EventHero";
export default EventHero;
