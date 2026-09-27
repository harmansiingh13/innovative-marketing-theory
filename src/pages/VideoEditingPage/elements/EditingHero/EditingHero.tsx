"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./EditingHero.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/Button";

export interface EditingHeroProps {
  headingKickerRef?: React.RefObject<HTMLDivElement | null>;
  headingTitleRef?: React.RefObject<HTMLHeadingElement | null>;
  headingAsideRef?: React.RefObject<HTMLDivElement | null>;
  timelineRef?: React.RefObject<HTMLDivElement | null>;
  valueLedgerRef?: React.RefObject<HTMLDivElement | null>;
}

export const EditingHero = forwardRef<HTMLElement, EditingHeroProps>(
  ({ headingKickerRef, headingTitleRef, headingAsideRef, timelineRef, valueLedgerRef }, ref) => {
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
        {/* Subtle Architectural Grid */}
        <div className={styles.gridPattern} />

        {/* Massive Ghost Watermark Typography */}
        <div className={styles.ghostWatermark} aria-hidden="true">
          VIDEO EDITING
        </div>

        {/* Ambient Top Glow */}
        <div className={styles.backgroundGlowTop} />

        <div className={styles.container}>
          {/* Main Hero Showcase Row */}
          <div className={styles.heroMainRow}>
            {/* Left Column: Typography & Actions */}
            <div className={styles.leftColumn}>

              <h1 ref={headingTitleRef} className={styles.headline}>
                <span className={styles.headlineLine}>RAW FOOTAGE IN.</span>
                <span className={styles.headlineLine}>HIGH-RETENTION</span>
                <span className={`${styles.headlineLine} ${styles.accentLine}`}>CRAFT OUT.</span>
              </h1>

              <div ref={headingAsideRef} className={styles.asideBlock}>
                <p className={styles.description}>
                  We transform unpolished raw footage into razor-sharp, high-retention visual
                  assets. Engineered with kinetic pacing, spatial sound design, and bespoke color
                  grading to dominate modern digital feeds.
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

            {/* Right Column: NLE Timeline Mockup Card */}
            <div ref={timelineRef} className={styles.timelineCard}>
              <div className={styles.timelineCardHeader}>
                <div className={styles.windowControls}>
                  <span className={`${styles.controlDot} ${styles.controlDotRed}`} />
                  <span className={`${styles.controlDot} ${styles.controlDotYellow}`} />
                  <span className={`${styles.controlDot} ${styles.controlDotGreen}`} />
                </div>
                <span className={styles.timelineTitleBadge}>IMT_RETENTION_TIMELINE_v4.NLE</span>
                <span className={styles.timelineStatus}>4K DCI // 60 FPS</span>
              </div>

              {/* Monitor Screen Preview */}
              <div className={styles.monitorView}>
                <Image
                  src="/images/cinema_production_graded.jpg"
                  alt="Post-production NLE workspace"
                  width={640}
                  height={360}
                  priority
                  className={styles.monitorImage}
                />
                <div className={styles.monitorOverlay} />

                <div className={styles.monitorHudTop}>
                  <span className={`${styles.hudChip} ${styles.hudChipAccent}`}>
                    PLAYHEAD: 00:01:24:18
                  </span>
                  <span className={styles.hudChip}>DAVINCI WIDE GAMUT</span>
                </div>

                <div className={styles.monitorHudBottom}>
                  <span className={styles.hudChip}>RETENTION PACING: OPTIMAL</span>
                  <span className={`${styles.hudChip} ${styles.hudChipAccent}`}>24 FPS MASTER</span>
                </div>
              </div>

              {/* Multi-Track NLE Timeline */}
              <div className={styles.tracksContainer}>
                {/* Playhead */}
                <div className={styles.playheadLine} />

                {/* Video Track 2 */}
                <div className={styles.trackRow}>
                  <span className={styles.trackLabel}>V2 GRAPHICS</span>
                  <div className={styles.trackLane}>
                    <div className={`${styles.clipBlock} ${styles.clipV2}`}>
                      KINETIC_CAPTIONS_01
                    </div>
                  </div>
                </div>

                {/* Video Track 1 */}
                <div className={styles.trackRow}>
                  <span className={styles.trackLabel}>V1 A-ROLL</span>
                  <div className={styles.trackLane}>
                    <div className={`${styles.clipBlock} ${styles.clipV1}`}>
                      A_ROLL_MASTER_GRADE.MOV
                    </div>
                  </div>
                </div>

                {/* Audio Track 1 */}
                <div className={styles.trackRow}>
                  <span className={styles.trackLabel}>A1 VOICEOVER</span>
                  <div className={styles.trackLane}>
                    <div className={`${styles.clipBlock} ${styles.clipA1}`}>
                      VO_DIALOGUE_EQ_CLEAN.WAV
                    </div>
                  </div>
                </div>

                {/* Audio Track 2 */}
                <div className={styles.trackRow}>
                  <span className={styles.trackLabel}>A2 SFX & RISERS</span>
                  <div className={styles.trackLane}>
                    <div className={`${styles.clipBlock} ${styles.clipA2}`}>
                      SWOOSH_RISER_DROP.WAV
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Value Ledger: 3 Value Pillars */}
          <div ref={valueLedgerRef} className={styles.valueLedger}>
            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>01 RETENTION ENGINEERING</span>
              </div>
              <h3 className={styles.ledgerTitle}>Engineered for Watch Time</h3>
              <p className={styles.ledgerDesc}>
                Micro-pacing, hook velocity, dynamic pattern interrupts, and seamless zooms
                calibrated to hold 80%+ audience completion across digital algorithms.
              </p>
            </div>

            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>02 COLOR SCIENCE & MOOD</span>
              </div>
              <h3 className={styles.ledgerTitle}>Bespoke DaVinci Color Grading</h3>
              <p className={styles.ledgerDesc}>
                We sculpt raw logarithmic profiles into rich, cinematic grades with pristine skin
                tones and distinct atmospheric palettes matched to your brand identity.
              </p>
            </div>

            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>03 MULTI-PLATFORM MASTERS</span>
              </div>
              <h3 className={styles.ledgerTitle}>Native Format Delivery</h3>
              <p className={styles.ledgerDesc}>
                Single source shoots turned into bespoke 9:16 vertical reels, 16:9 widescreen
                YouTube features, and high-converting 1:1 paid social cutdowns with kinetic
                subtitles.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

EditingHero.displayName = "EditingHero";
export default EditingHero;
