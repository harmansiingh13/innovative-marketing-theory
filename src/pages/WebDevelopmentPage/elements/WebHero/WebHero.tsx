"use client";

import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./WebHero.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { LayeredImageComposition } from "@/shared/components/LayeredImageComposition";
import { Button } from "@/shared/components/Button";

export interface WebHeroProps {
  headingTitleRef?: React.RefObject<HTMLHeadingElement | null>;
  headingAsideRef?: React.RefObject<HTMLDivElement | null>;
  showcaseRef?: React.RefObject<HTMLDivElement | null>;
  valueLedgerRef?: React.RefObject<HTMLDivElement | null>;
  commandCenterRef?: React.RefObject<HTMLDivElement | null>;
  letterboxRef?: React.RefObject<HTMLDivElement | null>;
}

const WEB_SHOWCASE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
    alt: "Strategic Digital Flagship & Architecture",
    badge: "CORE BUILD",
  },
  {
    src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
    alt: "Wireframes and Interface UX Blueprint",
    badge: "UX BLUEPRINT",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    alt: "Full Stack High-Performance Code",
    badge: "SUB-SECOND SPEED",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    alt: "Scalable Digital Ecosystem",
    badge: "EDGE SCALE",
  },
];

export const WebHero = forwardRef<HTMLElement, WebHeroProps>(
  (
    {
      headingTitleRef,
      headingAsideRef,
      showcaseRef,
      valueLedgerRef,
      commandCenterRef,
      letterboxRef,
    },
    ref
  ) => {
    const router = useRouter();

    const handleConnectClick = () => {
      const contactEl =
        document.getElementById("inquire") || document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        router.push("/#contact");
      }
    };

    const handleExploreClick = () => {
      const capabilitiesEl =
        document.getElementById("capabilities") || document.getElementById("process");
      if (capabilitiesEl) {
        capabilitiesEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const activeShowcaseRef = showcaseRef || commandCenterRef || letterboxRef;

    return (
      <section ref={ref} id="about" className={styles.heroSection}>
        {/* Subtle Architectural Blueprint Grid */}
        <div className={styles.gridPattern} />

        {/* Massive Ghost Watermark Typography */}
        <div className={styles.ghostWatermark} aria-hidden="true">
          WEB DEVELOPMENT
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
                <span className={styles.headlineLine}>BUILD WEBSITES.</span>
                <span className={styles.headlineLine}>WE BUILD</span>
                <span className={`${styles.headlineLine} ${styles.accentLine}`}>
                  DIGITAL EXPERIENCES.
                </span>
              </h1>

              {/* Aside Paragraph & Pill Buttons */}
              <div ref={headingAsideRef} className={styles.asideBlock}>
                <p className={styles.description}>
                  Fast, high-performance web applications and digital platforms engineered
                  to look exceptional, perform smoothly, and turn visitors into customers.
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
                    onClick={handleExploreClick}
                  >
                    Explore Our Approach
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Shared Layered Image Showcase Component */}
            <div className={styles.rightColumn}>
              <LayeredImageComposition
                ref={activeShowcaseRef}
                images={WEB_SHOWCASE_IMAGES}
                showGrid={false}
                showGlow={false}
                enableParallax={true}
              />
            </div>
          </div>

          {/* Integrated Value Narrative Ledger */}
          <div ref={valueLedgerRef} className={styles.valueLedger}>
            <div className={styles.valueCard}>
              <div className={styles.valueHeader}>
                <span className={styles.valueTag}>01 WHAT WE BRING</span>
              </div>
              <h2 className={styles.valueTitle}>Sub-Second Speed &amp; Clean Architecture</h2>
              <p className={styles.valueText}>
                We build with modern frameworks like Next.js and TypeScript, ensuring ultra-fast
                load times, seamless responsiveness, and future-proof code.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueHeader}>
                <span className={styles.valueTag}>02 WHY IT MATTERS</span>
              </div>
              <h2 className={styles.valueTitle}>First-Impression Authority &amp; Retention</h2>
              <p className={styles.valueText}>
                Visitors form an opinion of your brand within 50 milliseconds. Fluid motion and
                pristine UX convert casual clicks into high-value clients.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueHeader}>
                <span className={styles.valueTag}>03 BUSINESS IMPACT</span>
              </div>
              <h2 className={styles.valueTitle}>Platforms That Drive Real Conversions</h2>
              <p className={styles.valueText}>
                Moving beyond generic templates into custom digital architecture elevates your
                brand perception and turns your website into a revenue engine.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

WebHero.displayName = "WebHero";
export default WebHero;
