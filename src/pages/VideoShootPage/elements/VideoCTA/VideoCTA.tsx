"use client";

import { forwardRef } from "react";
import styles from "./VideoCTA.module.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useRouter } from "next/navigation";

export interface VideoCTAProps {
  ctaRef?: React.RefObject<HTMLDivElement | null>;
  eyebrowRef?: React.RefObject<HTMLDivElement | null>;
  headlineRef?: React.RefObject<HTMLHeadingElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  actionsRef?: React.RefObject<HTMLDivElement | null>;
}

export const VideoCTA = forwardRef<HTMLElement, VideoCTAProps>(
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
      <section ref={ref} id="inquire" className={styles.finalFrameSection}>
        <div className={styles.cinemaGlow} />
        <div className={styles.gridOverlay} />

        <div className={styles.container}>
          {/* Main Monumental Composition Block */}
          <div ref={ctaRef} className={styles.compositionBlock}>
            <div ref={eyebrowRef} className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>INITIATE PRODUCTION // SESSION WRAP</span>
            </div>

            <h2 ref={headlineRef} className={styles.headline}>
              <span className={styles.headlineRow}>Ready to give your brand</span>
              <span className={styles.headlineRow}>uncompromising</span>
              <span className={`${styles.headlineRow} ${styles.accentHighlight}`}>
                visual presence?
              </span>
            </h2>

            <div ref={contentRef} className={styles.contentBlock}>
              <p className={styles.paragraph}>
                Every production begins with a conversation about your strategic objectives, desired
                aesthetic, and distribution channels. Let&apos;s create visual content that commands
                attention and builds lasting brand authority.
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

VideoCTA.displayName = "VideoCTA";
export default VideoCTA;
