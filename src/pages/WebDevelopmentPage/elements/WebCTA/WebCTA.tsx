"use client";

import { forwardRef } from "react";
import styles from "./WebCTA.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useRouter } from "next/navigation";

export interface WebCTAProps {
  ctaRef?: React.RefObject<HTMLDivElement | null>;
  eyebrowRef?: React.RefObject<HTMLDivElement | null>;
  headlineRef?: React.RefObject<HTMLHeadingElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  actionsRef?: React.RefObject<HTMLDivElement | null>;
}

export const WebCTA = forwardRef<HTMLElement, WebCTAProps>(
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
              <span>CATEGORY DOMINANCE // DIGITAL EXPERIENCES</span>
            </div>

            <h2 ref={headlineRef} className={styles.headline}>
              <span className={styles.headlineRow}>READY TO REPLACE YOUR</span>
              <span className={styles.headlineRow}>OUTDATED WEBSITE</span>
              <span className={styles.headlineRow}>WITH A</span>
              <span className={styles.headlineRow}>HIGH-PERFORMING</span>
              <span className={`${styles.headlineRow} ${styles.accentHighlight}`}>
                DIGITAL EXPERIENCE?
              </span>
            </h2>

            <div ref={contentRef} className={styles.contentBlock}>
              <p className={styles.paragraph}>
                Let&apos;s turn your ideas into a fast, responsive and conversion-focused digital
                experience built around your business.
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
                LET&apos;S CONNECT
              </Button>

              <Button
                variant="outline"
                shape="pill"
                type="button"
                size="lg"
                rightIcon={<ArrowDown className={styles.secondaryArrow} />}
                onClick={handleServicesClick}
              >
                EXPLORE OTHER SERVICES
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

WebCTA.displayName = "WebCTA";
export default WebCTA;
