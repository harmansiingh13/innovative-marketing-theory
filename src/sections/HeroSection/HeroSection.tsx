"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./HeroSection.module.css";
import { Navbar } from "./elements/Navbar";
import { GridPulseBackground } from "./elements/GridPulseBackground";
import { Button } from "@/shared/components/Button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Divider } from "@/shared/components/Divider";
import { FlyInText } from "@/shared/animations";

export const HeroSection = () => {
  const ctaBlockRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const buttons = ctaBlockRef.current?.children;
      if (buttons) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            delay: 0.95,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
      }

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.15,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const navbarLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/#contact" },
  ];
  return (
    <section id="about" className={styles.section}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridPattern} />
      <GridPulseBackground />

      <Navbar links={navbarLinks} />

      <main className={styles.content}>
        <div className={styles.topLabel}>
          <span className={styles.labelLine} />
          <span>
            <FlyInText delay={0.2} distance={25}>
              YOUR GROWTH PARTNER
            </FlyInText>
          </span>
        </div>
        <div className={styles.heroHeading}>
          <span className={styles.headingLine}>
            <FlyInText delay={0.35} distance={32}>
              INNOVATIVE
            </FlyInText>
          </span>

          <span className={styles.headingLine}>
            <span className={styles.headingAccent}>
              <FlyInText delay={0.5} distance={32} seed={40}>
                MARKETING
              </FlyInText>
            </span>
          </span>

          <span className={styles.headingLine}>
            <FlyInText delay={0.65} distance={32} seed={80}>
              THEORY.
            </FlyInText>
          </span>
        </div>

        <div className={styles.bottomContent}>
          <div className={styles.descriptionBlock}>
            <p className={styles.description}>
              <FlyInText delay={0.8} distance={30} seed={120}>
                We are a full-service digital marketing agency built on precision, creativity, and
                execution. We don&apos;t just run campaigns — we build brand authority.
              </FlyInText>
            </p>
          </div>

          <div ref={ctaBlockRef} className={styles.ctaBlock}>
            <Button
              type="button"
              variant="primary"
              size="lg"
              shape="pill"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              rightIcon={<ArrowUpRight className={styles.ctaArrow} />}
            >
              Let&apos;s Connect
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              shape="pill"
              onClick={() => {
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              rightIcon={<ArrowDown className={styles.secondaryArrow} />}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </main>

      <div ref={footerRef} className={styles.footer}>
        <Divider size={2} />

        <div className={styles.footerContent}>
          <span className={styles.footerLeft}>STRATEGY / CREATIVE / EXECUTION</span>

          <button
            type="button"
            className={styles.footerRight}
            onClick={() => {
              document.getElementById("services")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            aria-label="Scroll to services"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className={styles.scrollArrow}>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};
