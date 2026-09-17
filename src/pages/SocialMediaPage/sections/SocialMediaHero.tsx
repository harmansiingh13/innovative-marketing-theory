"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Play, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/shared/components/Button";
import styles from "./SocialMediaHero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_ARTWORKS = [
  {
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    alt: "Social media visual composition",
    badge: "01 / BRAND STRATEGY",
  },
  {
    src: "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1000&q=80",
    alt: "Cinematic reel production",
    badge: "02 / SHORT-FORM REELS",
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    alt: "Data analytics telemetry",
    badge: "03 / TELEMETRY & METRICS",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    alt: "Editorial portrait shoot",
    badge: "04 / CREATIVE DIRECTION",
  },
];

export const SocialMediaHero = () => {
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

      // Watermark reveal
      tl.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 0.12, scale: 1, duration: 1.4 }
      );

      // Masked title lines reveal
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(`.${styles.titleLineInner}`);
        tl.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          "-=1.1"
        );
      }

      // Subtitle & CTAs fade/slide in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.7"
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      );

      // Directional entrance for collage frames
      if (compositionRef.current) {
        const fMain = compositionRef.current.querySelector(`.${styles.frameMain}`);
        const fReel = compositionRef.current.querySelector(`.${styles.frameReel}`);
        const fTop = compositionRef.current.querySelector(`.${styles.frameTop}`);
        const fBg = compositionRef.current.querySelector(`.${styles.frameBackground}`);

        tl.fromTo(
          fMain,
          { opacity: 0, y: 80, scale: 0.88 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          "-=1.0"
        );

        tl.fromTo(
          fReel,
          { opacity: 0, x: -60, y: 40 },
          { opacity: 1, x: 0, y: 0, duration: 1.1 },
          "-=0.9"
        );

        tl.fromTo(
          fTop,
          { opacity: 0, x: 60, y: -40 },
          { opacity: 1, x: 0, y: 0, duration: 1.1 },
          "-=0.9"
        );

        tl.fromTo(
          fBg,
          { opacity: 0, scale: 0.8 },
          { opacity: 0.7, scale: 1, duration: 1 },
          "-=0.8"
        );
      }

      // Parallax scroll effect on collage composition
      if (compositionRef.current) {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={containerRef} className={styles.heroSection}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridOverlay} />

      <div ref={watermarkRef} className={styles.backgroundWatermark}>
        <span>ATTENTION / SYSTEM</span>
      </div>

      <div className={styles.heroLayout}>
        <div className={styles.textColumn}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>
              <Sparkles className={styles.sparkleIcon} />
              SOCIAL MEDIA MANAGEMENT
            </span>
          </div>

          <h1 ref={titleRef} className={styles.mainTitle}>
            <span className={styles.titleLineWrapper}>
              <span className={styles.titleLineInner}>WE DON&apos;T JUST POST.</span>
            </span>
            <span className={styles.titleLineWrapper}>
              <span className={styles.titleLineInner}>
                WE BUILD <span className={styles.goldText}>ATTENTION.</span>
              </span>
            </span>
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            We build strategic social media systems that turn attention into brand authority,
            meaningful engagement, and growth.
          </p>

          <div ref={ctaRef} className={styles.buttonGroup}>
            <Button
              type="button"
              variant="primary"
              size="lg"
              shape="pill"
              onClick={() => scrollToSection("social-cta")}
              rightIcon={<ArrowUpRight className={styles.btnIcon} />}
            >
              START A CONVERSATION
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              shape="pill"
              onClick={() => scrollToSection("idea")}
              rightIcon={<ArrowDown className={styles.btnIcon} />}
            >
              EXPLORE OUR APPROACH
            </Button>
          </div>
        </div>

        <div ref={compositionRef} className={styles.compositionColumn}>
          <div className={`${styles.artFrame} ${styles.frameBackground}`}>
            <Image
              src={HERO_ARTWORKS[3].src}
              alt={HERO_ARTWORKS[3].alt}
              fill
              sizes="30vw"
              className={styles.frameImage}
            />
            <div className={styles.frameOverlay} />
            <span className={styles.frameBadge}>{HERO_ARTWORKS[3].badge}</span>
          </div>

          <div className={`${styles.artFrame} ${styles.frameMain}`}>
            <Image
              src={HERO_ARTWORKS[0].src}
              alt={HERO_ARTWORKS[0].alt}
              fill
              sizes="45vw"
              className={styles.frameImage}
              priority
            />
            <div className={styles.frameOverlay} />
            <span className={styles.frameBadge}>{HERO_ARTWORKS[0].badge}</span>
          </div>

          <div className={`${styles.artFrame} ${styles.frameReel}`}>
            <Image
              src={HERO_ARTWORKS[1].src}
              alt={HERO_ARTWORKS[1].alt}
              fill
              sizes="30vw"
              className={styles.frameImage}
            />
            <div className={styles.reelPlayButton}>
              <Play className={styles.playIcon} />
            </div>
            <span className={styles.frameBadge}>{HERO_ARTWORKS[1].badge}</span>
          </div>

          <div className={`${styles.artFrame} ${styles.frameTop}`}>
            <Image
              src={HERO_ARTWORKS[2].src}
              alt={HERO_ARTWORKS[2].alt}
              fill
              sizes="25vw"
              className={styles.frameImage}
            />
            <span className={styles.frameBadge}>{HERO_ARTWORKS[2].badge}</span>
          </div>

          <div className={styles.editorialStamp}>
            <span className={styles.stampNumber}>01</span>
            <span className={styles.stampLabel}>ATTENTION ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaHero;
