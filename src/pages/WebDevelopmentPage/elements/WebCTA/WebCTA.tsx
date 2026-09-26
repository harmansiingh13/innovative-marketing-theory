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
              <span>CATEGORY DOMINANCE // DIGITAL FLAGSHIPS</span>
            </div>

            <h2 ref={headlineRef} className={styles.headline}>
              <span className={styles.headlineRow}>Ready to replace your outdated website</span>
              <span className={styles.headlineRow}>with an industry-dominating</span>
              <span className={`${styles.headlineRow} ${styles.accentHighlight}`}>
                digital flagship?
              </span>
            </h2>

            <div ref={contentRef} className={styles.contentBlock}>
              <p className={styles.paragraph}>
                Claim a comprehensive Technical &amp; UX Performance Audit. We inspect your current
                site architecture, Core Web Vitals bottlenecks, mobile checkout friction, and
                conversion rate leaks to blueprint an immediate path to category dominance.
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

WebCTA.displayName = "WebCTA";
export default WebCTA;
