"use client";

import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./VideoHero.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { LayeredCardsShowcase } from "@/shared/components/LayeredCardsShowcase";
import { Button } from "@/shared/components/Button";

export interface VideoHeroProps {
  headingKickerRef?: React.RefObject<HTMLDivElement | null>;
  headingTitleRef?: React.RefObject<HTMLHeadingElement | null>;
  headingAsideRef?: React.RefObject<HTMLDivElement | null>;
  letterboxRef?: React.RefObject<HTMLDivElement | null>;
  valueLedgerRef?: React.RefObject<HTMLDivElement | null>;
}

export const VideoHero = forwardRef<HTMLElement, VideoHeroProps>(
  ({ headingKickerRef, headingTitleRef, headingAsideRef, letterboxRef, valueLedgerRef }, ref) => {
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
          VIDEO SHOOTS
        </div>

        {/* Ambient Warm Golden Glow */}
        <div className={styles.backgroundGlowTop} />

        <div className={styles.container}>
          {/* Main Hero Showcase Row */}
          <div className={styles.heroMainRow}>
            {/* Left Column: Typography, Conviction & Actions */}
            <div className={styles.leftColumn}>

              {/* Monumental 4-Line Headline */}
              <h1 ref={headingTitleRef} className={styles.headline}>
                <span className={styles.headlineLine}>WE DON&apos;T JUST</span>
                <span className={styles.headlineLine}>SHOOT.</span>
                <span className={styles.headlineLine}>WE BUILD</span>
                <span className={`${styles.headlineLine} ${styles.accentLine}`}>PRESENCE.</span>
              </h1>

              {/* Aside Paragraph & Pill Buttons */}
              <div ref={headingAsideRef} className={styles.asideBlock}>
                <p className={styles.description}>
                  A calculated visual strategy that turns fleeting digital impressions into enduring
                  brand authority, undeniable prestige, and retention.
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

            {/* Right Column: Layered Multi-Card Composition */}
            <LayeredCardsShowcase ref={letterboxRef} service="video-shoots" />
          </div>

          {/* Integrated Value Narrative Ledger */}
          <div ref={valueLedgerRef} className={styles.valueLedger}>
            <div className={styles.valueCard}>
              <div className={styles.valueHeader}>
                <span className={styles.valueTag}>01 WHAT WE BRING</span>
              </div>
              <h2 className={styles.valueTitle}>Cinematic Direction & Controlled Optics</h2>
              <p className={styles.valueText}>
                We approach every shoot with intentional lighting, curated cinema lenses, and
                rigorous art direction to ensure your brand stands out with unmistakable calibre.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueHeader}>
                <span className={styles.valueTag}>02 WHY IT MATTERS</span>
              </div>
              <h2 className={styles.valueTitle}>First-Frame Perception & Retention</h2>
              <p className={styles.valueText}>
                Viewers judge brand credibility within milliseconds of playback. Cinematic visual
                craft commands instant respect, holds attention, and cuts cleanly through feed
                noise.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueHeader}>
                <span className={styles.valueTag}>03 BRAND IMPACT</span>
              </div>
              <h2 className={styles.valueTitle}>Prestige That Drives Conviction</h2>
              <p className={styles.valueText}>
                Elevating from generic video to premium cinematography builds enduring brand equity,
                transforming offerings into visual experiences that compel action.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

VideoHero.displayName = "VideoHero";
export default VideoHero;
