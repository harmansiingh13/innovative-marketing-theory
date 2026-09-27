"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { ReusableServiceHeroProps } from "./types";
import styles from "./ServiceHero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ReusableServiceHero: React.FC<ReusableServiceHeroProps> = ({
  eyebrow,
  titleLine1,
  titleLine2Prefix = "",
  titleHighlight,
  titleLine2Suffix = "",
  description,
  watermarkText,
  images = [],
  primaryCtaText = "START A CONVERSATION",
  primaryCtaTargetId = "service-cta",
  onPrimaryCtaClick,
  secondaryCtaText = "EXPLORE OUR APPROACH",
  secondaryCtaTargetId = "deliverables",
  onSecondaryCtaClick,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (watermarkRef.current) {
        tl.fromTo(
          watermarkRef.current,
          { opacity: 0, scale: 1.08 },
          { opacity: 0.04, scale: 1, duration: 1.4 }
        );
      }

      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(`.${styles.titleLineInner}`);
        tl.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          "-=1.1"
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.7"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.7"
        );
      }

      if (compositionRef.current) {
        const frames = compositionRef.current.querySelectorAll(`.${styles.artFrame}`);
        tl.fromTo(
          frames,
          { opacity: 0, y: 60, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.15 },
          "-=1.0"
        );

        gsap.to(compositionRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePrimaryClick = () => {
    if (onPrimaryCtaClick) {
      onPrimaryCtaClick();
    } else if (primaryCtaTargetId) {
      const el = document.getElementById(primaryCtaTargetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryCtaClick) {
      onSecondaryCtaClick();
    } else if (secondaryCtaTargetId) {
      const el = document.getElementById(secondaryCtaTargetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={containerRef} className={`${styles.heroSection} ${className}`}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridOverlay} />

      {watermarkText && (
        <div ref={watermarkRef} className={styles.backgroundWatermark}>
          <span>{watermarkText.toUpperCase()}</span>
        </div>
      )}

      <div className={styles.heroLayout}>
        {/* Left Column: Text Content */}
        <div className={styles.textColumn}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>
              <Sparkles className={styles.sparkleIcon} />
              {eyebrow}
            </span>
          </div>

          <h1 ref={titleRef} className={styles.mainTitle}>
            <span className={styles.titleLineWrapper}>
              <span className={styles.titleLineInner}>{titleLine1}</span>
            </span>
            <span className={styles.titleLineWrapper}>
              <span className={styles.titleLineInner}>
                {titleLine2Prefix}
                <span className={styles.goldText}>{titleHighlight}</span>
                {titleLine2Suffix}
              </span>
            </span>
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            {description}
          </p>

          <div ref={ctaRef} className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={handlePrimaryClick}
            >
              <span>{primaryCtaText}</span>
              <ArrowUpRight className={styles.btnIcon} />
            </button>

            <button
              type="button"
              className={styles.btnOutline}
              onClick={handleSecondaryClick}
            >
              <span>{secondaryCtaText}</span>
              <ArrowDown className={styles.btnIcon} />
            </button>
          </div>
        </div>

        {/* Right Column: Overlapping Frame Composition */}
        <div ref={compositionRef} className={styles.compositionColumn}>
          {images.map((img, idx) => {
            const frameClasses = [
              styles.frameMain,
              styles.frameReel,
              styles.frameTop,
              styles.frameBackground,
            ];
            const currentClass = frameClasses[idx % frameClasses.length];

            return (
              <div key={idx} className={`${styles.artFrame} ${currentClass}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={styles.frameImage}
                />
                <div className={styles.frameOverlay} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReusableServiceHero;
