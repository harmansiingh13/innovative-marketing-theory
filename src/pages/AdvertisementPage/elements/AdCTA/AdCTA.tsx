"use client";

import { forwardRef } from "react";
import styles from "./AdCTA.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useRouter } from "next/navigation";

export interface AdCTAProps {
  ctaRef?: React.RefObject<HTMLDivElement | null>;
  eyebrowRef?: React.RefObject<HTMLDivElement | null>;
  headlineRef?: React.RefObject<HTMLHeadingElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  actionsRef?: React.RefObject<HTMLDivElement | null>;
}

export const AdCTA = forwardRef<HTMLElement, AdCTAProps>(
  ({ ctaRef, eyebrowRef, headlineRef, contentRef, actionsRef }, ref) => {
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

    const handleServicesClick = () => {
      const servicesEl = document.getElementById("services");
      if (servicesEl) {
        servicesEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        router.push("/#services");
      }
    };
    return (
      <section ref={ref} id="inquire" className={styles.section}>
        <div className={styles.glow} />
        <div className={styles.gridOverlay} />

        <div className={styles.container}>
          {/* Main Monumental Composition Block */}
          <div ref={ctaRef} className={styles.compositionBlock}>
            <div ref={eyebrowRef} className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>SCALE YOUR PROFIT MARGINS // CAPITAL ALLOCATION</span>
            </div>

            <h2 ref={headlineRef} className={styles.headline}>
              <span className={styles.headlineRow}>Ready to turn wasted ad spend</span>
              <span className={styles.headlineRow}>into aggressive,</span>
              <span className={`${styles.headlineRow} ${styles.accentHighlight}`}>
                profitable ROAS?
              </span>
            </h2>

            <div ref={contentRef} className={styles.contentBlock}>
              <p className={styles.paragraph}>
                Claim a comprehensive Paid Media &amp; Conversion Funnel Audit. We inspect your ad
                account architecture, pixel match rate, creative hook decay, and post-click checkout
                funnel to unlock immediate profit lift opportunities.
              </p>
            </div>

            <div ref={actionsRef} className={styles.actionsBlock}>
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
                onClick={handleServicesClick}
              >
                Explore Other Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

AdCTA.displayName = "AdCTA";
export default AdCTA;
