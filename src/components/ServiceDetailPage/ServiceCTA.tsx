"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/shared/components/Button";
import { ServiceData } from "@/data/servicesData";
import styles from "./ServiceCTA.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCTAProps {
  service: ServiceData;
}

export const ServiceCTA = ({ service }: ServiceCTAProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { cta } = service;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#contact");
    }
  };

  return (
    <section id="service-cta" ref={containerRef} className={styles.ctaSection}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div ref={cardRef} className={styles.ctaCard}>
          <div className={styles.topBadge}>
            <Sparkles className={styles.badgeIcon} />
            <span>LET&apos;S WORK TOGETHER</span>
          </div>

          <h2 className={styles.headline}>
            YOUR BRAND <br />
            <span className={styles.goldText}>DESERVES MORE.</span>
          </h2>

          <h3 className={styles.subHeadline}>
            {cta.title}{" "}
            {cta.highlightTitle && <span className={styles.goldText}>{cta.highlightTitle}</span>}
          </h3>

          <p className={styles.description}>{cta.description}</p>

          <div className={styles.buttonWrapper}>
            <Button
              type="button"
              variant="primary"
              size="lg"
              shape="pill"
              onClick={handleContactClick}
              rightIcon={<ArrowUpRight className={styles.btnIcon} />}
            >
              {cta.buttonText || "LET'S TALK ↗"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
