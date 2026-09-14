"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./HeroSection.module.css";
import { Navbar } from "./elements/Navbar";
import { GridPulseBackground } from "./elements/GridPulseBackground";
import { Button } from "@/shared/components/Button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Divider } from "@/shared/components/Divider";
import { getDirectionalVars } from "@/shared/animations";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const topLabelRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const headingLine3Ref = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const connectBtnRef = useRef<HTMLButtonElement>(null);
  const exploreBtnRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // 1. YOUR GROWTH PARTNER: LEFT -> RIGHT (horizontal only, noticeable travel)
      if (topLabelRef.current) {
        const topLabelVars = getDirectionalVars("left", {
          distance: 70,
          duration: 0.95,
        });
        tl.fromTo(topLabelRef.current, topLabelVars.from, topLabelVars.to, 0.1);
      }

      // 2. INNOVATIVE: TOP-LEFT -> FINAL (diagonal down-right)
      if (headingLine1Ref.current) {
        const h1Vars = getDirectionalVars("topLeft", {
          distance: 80,
          duration: 1.0,
        });
        tl.fromTo(headingLine1Ref.current, h1Vars.from, h1Vars.to, 0.22);
      }

      // 3. MARKETING: TOP-RIGHT -> FINAL (diagonal down-left)
      if (headingLine2Ref.current) {
        const h2Vars = getDirectionalVars("topRight", {
          distance: 80,
          duration: 1.0,
        });
        tl.fromTo(headingLine2Ref.current, h2Vars.from, h2Vars.to, 0.36);
      }

      // 4. THEORY.: TOP-LEFT -> FINAL (diagonal down-right)
      if (headingLine3Ref.current) {
        const h3Vars = getDirectionalVars("topLeft", {
          distance: 80,
          duration: 1.0,
        });
        tl.fromTo(headingLine3Ref.current, h3Vars.from, h3Vars.to, 0.5);
      }

      // 5. Paragraph: subtle LEFT -> FINAL
      if (paragraphRef.current) {
        const pVars = getDirectionalVars("left", {
          subtle: true,
          duration: 0.9,
        });
        tl.fromTo(paragraphRef.current, pVars.from, pVars.to, 0.64);
      }

      // 6. CTA buttons: subtle RIGHT -> FINAL (staggered)
      if (connectBtnRef.current) {
        const btn1Vars = getDirectionalVars("right", {
          subtle: true,
          duration: 0.85,
        });
        tl.fromTo(connectBtnRef.current, btn1Vars.from, btn1Vars.to, 0.78);
      }

      if (exploreBtnRef.current) {
        const btn2Vars = getDirectionalVars("right", {
          subtle: true,
          duration: 0.85,
        });
        tl.fromTo(exploreBtnRef.current, btn2Vars.from, btn2Vars.to, 0.88);
      }

      // 7. Footer: subtle bottom settling
      if (footerRef.current) {
        const footerVars = getDirectionalVars("bottom", {
          subtle: true,
          duration: 0.85,
        });
        tl.fromTo(footerRef.current, footerVars.from, footerVars.to, 1.0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const navbarLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridPattern} />
      <GridPulseBackground />

      <Navbar links={navbarLinks} />

      <main className={styles.content}>
        <div ref={topLabelRef} className={styles.topLabel}>
          <span className={styles.labelLine} />
          <span>YOUR GROWTH PARTNER</span>
        </div>

        <div className={styles.heroHeading}>
          <span ref={headingLine1Ref} className={styles.headingLine}>
            INNOVATIVE
          </span>

          <span ref={headingLine2Ref} className={styles.headingLine}>
            <span className={styles.headingAccent}>MARKETING</span>
          </span>

          <span ref={headingLine3Ref} className={styles.headingLine}>
            THEORY.
          </span>
        </div>

        <div className={styles.bottomContent}>
          <div className={styles.descriptionBlock}>
            <p ref={paragraphRef} className={styles.description}>
              We are a full-service digital marketing agency built on precision, creativity, and
              execution. We don&apos;t just run campaigns — we build brand authority.
            </p>
          </div>

          <div className={styles.ctaBlock}>
            <Button
              ref={connectBtnRef}
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
              ref={exploreBtnRef}
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
