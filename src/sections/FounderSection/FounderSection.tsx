"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FounderSection.module.css";
import { getDirectionalVars } from "@/shared/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Editorial placeholder photograph matching the moody charcoal/gold visual language.
 * To use the real founder photograph, replace this URL or supply the `imageSrc` prop.
 */
export const DEFAULT_FOUNDER_IMAGE =
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80";

export interface FounderSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

export const FounderSection = ({
  imageSrc = DEFAULT_FOUNDER_IMAGE,
  imageAlt = "Founder of Innovative Marketing Theory",
}: FounderSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingLabelRef = useRef<HTMLDivElement>(null);
  const headingTitleRef = useRef<HTMLHeadingElement>(null);
  const headingAsideRef = useRef<HTMLDivElement>(null);

  // Left column visual elements
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const portraitAttributionRef = useRef<HTMLDivElement>(null);

  // Right column editorial flow elements
  const quoteBlockRef = useRef<HTMLDivElement>(null);
  const statBlockRef = useRef<HTMLDivElement>(null);
  const philosophyLeadRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      // 1. Heading Label: LEFT -> FINAL
      if (headingLabelRef.current) {
        const labelVars = getDirectionalVars("left", {
          distance: 50,
          duration: 0.85,
        });
        tl.fromTo(headingLabelRef.current, labelVars.from, labelVars.to, 0);
      }

      // 2. Main Title: TOP-LEFT -> FINAL
      if (headingTitleRef.current) {
        const titleVars = getDirectionalVars("topLeft", {
          distance: 65,
          duration: 0.95,
        });
        tl.fromTo(headingTitleRef.current, titleVars.from, titleVars.to, 0.1);
      }

      // 3. Header Aside: RIGHT -> FINAL (Balanced header row)
      if (headingAsideRef.current) {
        const asideVars = getDirectionalVars("right", {
          subtle: true,
          duration: 0.85,
        });
        tl.fromTo(headingAsideRef.current, asideVars.from, asideVars.to, 0.18);
      }

      // 4. Founder Portrait Frame: LEFT -> FINAL (Solid visual anchor)
      if (portraitFrameRef.current) {
        const frameVars = getDirectionalVars("left", {
          distance: 70,
          duration: 1.05,
        });
        tl.fromTo(portraitFrameRef.current, frameVars.from, frameVars.to, 0.22);
      }

      // 5. Portrait Attribution line: Subtle BOTTOM -> FINAL
      if (portraitAttributionRef.current) {
        const attrVars = getDirectionalVars("bottom", {
          subtle: true,
          distance: 20,
          duration: 0.8,
        });
        tl.fromTo(portraitAttributionRef.current, attrVars.from, attrVars.to, 0.35);
      }

      // 6. Monumental Editorial Quote: TOP-RIGHT -> FINAL
      if (quoteBlockRef.current) {
        const quoteVars = getDirectionalVars("topRight", {
          distance: 60,
          duration: 1.0,
        });
        tl.fromTo(quoteBlockRef.current, quoteVars.from, quoteVars.to, 0.28);
      }

      // 7. Experience 5+ Stat: RIGHT -> FINAL
      if (statBlockRef.current) {
        const statVars = getDirectionalVars("right", {
          distance: 45,
          duration: 0.9,
        });
        tl.fromTo(statBlockRef.current, statVars.from, statVars.to, 0.38);
      }

      // 8. Core Philosophy Lead: RIGHT -> FINAL (Staggered companion)
      if (philosophyLeadRef.current) {
        const leadVars = getDirectionalVars("right", {
          subtle: true,
          distance: 30,
          duration: 0.85,
        });
        tl.fromTo(philosophyLeadRef.current, leadVars.from, leadVars.to, 0.44);
      }

      // 9. Closing Manifesto: BOTTOM -> FINAL (Quiet resolution)
      if (manifestoRef.current) {
        const manVars = getDirectionalVars("bottom", {
          subtle: true,
          distance: 20,
          duration: 0.85,
        });
        tl.fromTo(manifestoRef.current, manVars.from, manVars.to, 0.72);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="founder" className={styles.section}>
      <div className={styles.backgroundGlowLeft} />
      <div className={styles.backgroundGlowRight} />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div ref={headingLabelRef} className={styles.headingLabel}>
            <span className={styles.headingLine} />
            <span>THE PHILOSOPHY</span>
          </div>

          <div className={styles.headingRow}>
            <h2 ref={headingTitleRef} className={styles.title}>
              The vision behind
              <br />
              <span>the theory.</span>
            </h2>

            <div ref={headingAsideRef} className={styles.headingAside}>
              <p className={styles.headingDescription}>
                We believe great marketing starts with understanding the vision behind a brand —
                turning ambitious ideas into sustained market momentum.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Composition Grid */}
        <div className={styles.editorialGrid}>
          {/* Left Column: Visual Portrait Anchor & Minimal Attribution */}
          <div className={styles.visualColumn}>
            <div ref={portraitFrameRef} className={styles.imageFrame}>
              <div className={styles.imageTopBar}>
                <div className={styles.imageTag}>
                  <span className={styles.tagPulseDot} />
                  <span>FOUNDER</span>
                </div>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt={imageAlt} />
              <div className={styles.imageVignette} />
            </div>
          </div>

          {/* Right Column: Unboxed Editorial Flow */}
          <div className={styles.narrativeColumn}>
            {/* 1. Monumental Editorial Quote */}
            <div ref={quoteBlockRef} className={styles.quoteBlock}>
              <blockquote className={styles.quoteText}>
                Success isn’t just about being seen today. It’s about building a brand people{" "}
                <span className={styles.quoteAccent}>remember tomorrow.</span>
              </blockquote>
            </div>

            {/* Subtle Divider */}
            <div className={styles.hairlineDivider} />

            {/* 2. Integrated 5+ Experience Stat & Core Belief Duo */}
            <div className={styles.experienceBeliefRow}>
              {/* Prominent 5+ Experience Statistic */}
              <div ref={statBlockRef} className={styles.statElement}>
                <div className={styles.statKicker}>TRACK RECORD</div>
                <div className={styles.statNumberRow}>
                  <span className={styles.statNumber}>5+</span>
                  <div className={styles.statLabelWrapper}>
                    <span className={styles.statLabelPrimary}>YEARS OF</span>
                    <span className={styles.statLabelSecondary}>EXPERIENCE</span>
                  </div>
                </div>
                <p className={styles.statSummary}>
                  Building meaningful brands & turning ambitious ideas into measurable growth.
                </p>
              </div>

              <div className={styles.verticalDivider} />

              {/* Core Philosophy Narrative */}
              <div ref={philosophyLeadRef} className={styles.philosophyLead}>
                <span className={styles.beliefKicker}>CORE BELIEF // TAILORED STRATEGY</span>
                <p className={styles.beliefText}>
                  At Innovative Marketing Theory, we believe great marketing starts with
                  understanding the vision behind a brand. That’s why we don’t believe in
                  one-size-fits-all strategies.
                </p>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className={styles.hairlineDivider} />

            {/* 4. Continuous Narrative Manifesto */}
            <div ref={manifestoRef} className={styles.manifestoBlock}>
              <p className={styles.manifestoParagraph}>
                From helping brands establish their presence from the ground up to creating the
                momentum that takes them to the next level, our focus remains the same —{" "}
                <span className={styles.manifestoHighlight}>
                  strategy that creates direction, creativity that creates impact, and execution
                  that creates growth.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
