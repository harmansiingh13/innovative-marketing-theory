"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/shared/components/Button";
import { ServiceData } from "@/data/servicesData";
import styles from "./ServiceHero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceHeroProps {
  service: ServiceData;
}

export const ServiceHero = ({ service }: ServiceHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);

  const images = service.heroImages;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (watermarkRef.current) {
        tl.fromTo(
          watermarkRef.current,
          { opacity: 0, scale: 1.08 },
          { opacity: 0.12, scale: 1, duration: 1.4 }
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
        <span>{service.title.toUpperCase()}</span>
      </div>

      <div className={styles.heroLayout}>
        <div className={styles.textColumn}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>
              <Sparkles className={styles.sparkleIcon} />
              {service.eyebrow}
            </span>
          </div>

          <h1 ref={titleRef} className={styles.mainTitle}>
            <span className={styles.titleLineWrapper}>
              <span className={styles.titleLineInner}>{service.headline.line1}</span>
            </span>
            <span className={styles.titleLineWrapper}>
              <span className={styles.titleLineInner}>
                {service.headline.line2Prefix}
                <span className={styles.goldText}>{service.headline.highlight}</span>
                {service.headline.line2Suffix}
              </span>
            </span>
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            {service.description}
          </p>

          <div ref={ctaRef} className={styles.buttonGroup}>
            <Button
              type="button"
              variant="primary"
              size="lg"
              shape="pill"
              onClick={() => scrollToSection("service-cta")}
              rightIcon={<ArrowUpRight className={styles.btnIcon} />}
            >
              START A CONVERSATION
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              shape="pill"
              onClick={() => scrollToSection("intro")}
              rightIcon={<ArrowDown className={styles.btnIcon} />}
            >
              EXPLORE OUR APPROACH
            </Button>
          </div>
        </div>

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
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={styles.frameImage}
                  priority={idx === 0}
                />
                <div className={styles.frameOverlay} />
                {img.badge && <span className={styles.frameBadge}>{img.badge}</span>}
              </div>
            );
          })}

          <div className={styles.editorialStamp}>
            <span className={styles.stampNumber}>01</span>
            <span className={styles.stampLabel}>{service.title.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
