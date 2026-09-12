"use client";

import { useRef } from "react";
import styles from "./HeroSection.module.css";
import { Navbar } from "./elements/Navbar";
import { Button } from "@/shared/components/Button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Divider } from "@/shared/components/Divider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const renderAnimatedWord = (word: string, offset: number) => {
  return word.split("").map((char, i) => (
    <span key={i} className={styles.char} data-char-index={offset + i}>
      {char}
    </span>
  ));
};

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const navbarLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/#contact" },
  ];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 769px)",
          isMobile: "(max-width: 768px)",
        },
        (context) => {
          const { isMobile } = (context.conditions || {}) as { isMobile?: boolean };

          // Corner and Side Direction vector helper (Far Screen Corners & Off-screen Edges)
          const get4WayDirection = (index: number) => {
            const directions = [
              { x: -500, y: -400, rotation: -45 }, // Top-Left Corner
              { x: 500, y: -400, rotation: 45 },   // Top-Right Corner
              { x: -600, y: 0, rotation: -35 },    // Far Left Side
              { x: 600, y: 0, rotation: 35 },      // Far Right Side
              { x: -450, y: 400, rotation: 40 },   // Bottom-Left Corner
              { x: 450, y: 400, rotation: -40 },   // Bottom-Right Corner
              { x: 0, y: -450, rotation: -20 },    // Top Edge
              { x: 0, y: 450, rotation: 20 },      // Bottom Edge
            ];
            const dir = directions[index % directions.length];
            const mult = isMobile ? 0.4 : 1;
            return {
              x: dir.x * mult,
              y: dir.y * mult,
              rotation: dir.rotation,
            };
          };

          // 1. Page Load Animation Timeline
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          // Navbar
          tl.fromTo(
            "nav",
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
          )
            // Eyebrow label
            .fromTo(
              `.${styles.topLabel}`,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6 },
              "-=0.4"
            );

          // Far-Corner Letter Collision Assembly Animation for "INNOVATIVE / MARKETING / THEORY."
          const chars = gsap.utils.toArray<HTMLElement>(`.${styles.char}`);

          chars.forEach((char, i) => {
            const vec = get4WayDirection(i);
            tl.fromTo(
              char,
              {
                x: vec.x,
                y: vec.y,
                rotation: vec.rotation,
                scale: 0.2,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1.15,
                ease: "expo.out",
              },
              i === 0 ? "-=0.3" : `<+=${0.025}`
            );
          });

          // Description Paragraph
          tl.fromTo(
            `.${styles.description}`,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.5"
          )
            // CTA Buttons
            .fromTo(
              `.${styles.ctaBlock} > *`,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
              "-=0.6"
            )
            // Footer
            .fromTo(
              `.${styles.footer}`,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6 },
              "-=0.4"
            );

          // 2. ScrollTrigger Parallax & Fade-Out on Scroll
          gsap.to(`.${styles.content}`, {
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
            y: isMobile ? -30 : -70,
            opacity: 0,
            ease: "none",
          });

          gsap.to(`.${styles.backgroundGlow}`, {
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
            y: isMobile ? 40 : 100,
            scale: 1.25,
            opacity: 0.2,
            ease: "none",
          });

          // 3. Sleek 3D Cursor Parallax (Desktop only)
          if (!isTouchDevice && !isMobile) {
            const content = heroRef.current?.querySelector(`.${styles.content}`);
            const gridPattern = heroRef.current?.querySelector(`.${styles.gridPattern}`);

            const handlePointerMove = (e: MouseEvent) => {
              if (!heroRef.current) return;
              const rect = heroRef.current.getBoundingClientRect();
              
              if (
                e.clientY >= rect.top - 100 &&
                e.clientY <= rect.bottom + 100 &&
                e.clientX >= rect.left &&
                e.clientX <= rect.right
              ) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const normX = (x / rect.width - 0.5) * 2;
                const normY = (y / rect.height - 0.5) * 2;

                // Subtle 3D Card Tilt on Hero Content
                if (content) {
                  gsap.to(content, {
                    rotateY: normX * 4,
                    rotateX: -normY * 4,
                    x: normX * 8,
                    y: normY * 8,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }

                // Background Grid Shift
                if (gridPattern) {
                  gsap.to(gridPattern, {
                    x: normX * -12,
                    y: normY * -12,
                    duration: 1.0,
                    ease: "power1.out",
                    overwrite: "auto",
                  });
                }
              }
            };

            window.addEventListener("mousemove", handlePointerMove);

            return () => {
              window.removeEventListener("mousemove", handlePointerMove);
            };
          }
        }
      );
    },
    { scope: heroRef }
  );

  return (
    <section id="about" ref={heroRef} className={styles.section}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridPattern} />

      <Navbar links={navbarLinks} />

      <main className={styles.content}>
        <div className={styles.topLabel}>
          <span className={styles.labelLine} />
          <span>YOUR GROWTH PARTNER</span>
        </div>
        <div className={styles.heroHeading}>
          <span className={styles.headingLine}>
            {renderAnimatedWord("INNOVATIVE", 0)}
          </span>

          <span className={styles.headingLine}>
            <span className={styles.headingAccent}>
              {renderAnimatedWord("MARKETING", 10)}
            </span>
          </span>

          <span className={styles.headingLine}>
            {renderAnimatedWord("THEORY.", 19)}
          </span>
        </div>

        <div className={styles.bottomContent}>
          <div className={styles.descriptionBlock}>
            <p className={styles.description}>
              We are a full-service digital marketing agency built on precision, creativity, and
              execution. We don't just run campaigns — we build brand authority.
            </p>
          </div>

          <div className={styles.ctaBlock}>
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
              Let's Connect
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

      <div className={styles.footer}>
        <Divider size={2} />

        <div className={styles.footerContent}>
          <span>STRATEGY / CREATIVE / EXECUTION</span>

          <span className={styles.footerRight}>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
};
