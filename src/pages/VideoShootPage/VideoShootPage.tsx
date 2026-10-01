"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoShootPage.module.css";
import { getDirectionalVars } from "@/shared/animations";

// Navigation & Page Sub-Elements
import { Navbar } from "@/shared/components/Navbar";
import { VideoHero } from "./elements/VideoHero/VideoHero";
import { FeaturedReelVault } from "./elements/FeaturedReelVault/FeaturedReelVault";
import { ServiceProcess } from "@/shared/components/ServiceProcess";
import { VideoCTA } from "./elements/VideoCTA/VideoCTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const VideoShootPage = () => {
  const mainRef = useRef<HTMLElement>(null);

  // Section 1: About Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroKickerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroAsideRef = useRef<HTMLDivElement>(null);
  const heroLetterboxRef = useRef<HTMLDivElement>(null);
  const heroValueLedgerRef = useRef<HTMLDivElement>(null);

  // Additional Section: Capture To Cinema Refs
  const transformationSectionRef = useRef<HTMLElement>(null);
  const transformationHeaderRef = useRef<HTMLDivElement>(null);
  const transformationCanvasRef = useRef<HTMLDivElement>(null);

  // Section 2: Process Timeline Refs
  const processSectionRef = useRef<HTMLElement>(null);
  const processHeaderRef = useRef<HTMLDivElement>(null);
  const processActsRef = useRef<HTMLDivElement>(null);

  // Section 3: Final CTA Refs
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaEyebrowRef = useRef<HTMLDivElement>(null);
  const ctaHeadlineRef = useRef<HTMLHeadingElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const ctaActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // ---------------- 1. About / Hero Entrance Timeline ----------------
      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (heroKickerRef.current) {
        const kickerVars = getDirectionalVars("left", {
          distance: 50,
          duration: 0.85,
        });
        heroTl.fromTo(heroKickerRef.current, kickerVars.from, kickerVars.to, 0.1);
      }

      if (heroTitleRef.current) {
        const titleVars = getDirectionalVars("topLeft", {
          distance: 70,
          duration: 1.0,
        });
        heroTl.fromTo(heroTitleRef.current, titleVars.from, titleVars.to, 0.2);
      }

      if (heroAsideRef.current) {
        const asideVars = getDirectionalVars("right", {
          subtle: true,
          duration: 0.85,
        });
        heroTl.fromTo(heroAsideRef.current, asideVars.from, asideVars.to, 0.35);
      }

      if (heroLetterboxRef.current) {
        const children = heroLetterboxRef.current.children;
        const topCard = children[0];
        const centerCard = children[1];
        const bottomCard = children[2];
        const indexBadge = children[3];

        if (centerCard) {
          const centerVars = getDirectionalVars("bottom", { distance: 50, duration: 1.0 });
          heroTl.fromTo(centerCard, centerVars.from, centerVars.to, 0.4);
        }
        if (topCard) {
          const topVars = getDirectionalVars("topRight", { distance: 40, duration: 0.95 });
          heroTl.fromTo(topCard, topVars.from, topVars.to, 0.48);
        }
        if (bottomCard) {
          const bottomVars = getDirectionalVars("bottomLeft", { distance: 40, duration: 0.95 });
          heroTl.fromTo(bottomCard, bottomVars.from, bottomVars.to, 0.55);
        }
        if (indexBadge) {
          const badgeVars = getDirectionalVars("bottom", {
            distance: 20,
            subtle: true,
            duration: 0.8,
          });
          heroTl.fromTo(indexBadge, badgeVars.from, badgeVars.to, 0.62);
        }
      }

      if (heroValueLedgerRef.current && heroValueLedgerRef.current.children.length > 0) {
        const cards = Array.from(heroValueLedgerRef.current.children);
        cards.forEach((card, idx) => {
          const cardVars = getDirectionalVars("bottom", {
            distance: 35,
            duration: 0.85,
          });
          heroTl.fromTo(card, cardVars.from, cardVars.to, 0.55 + idx * 0.1);
        });
      }

      // ---------------- 2. Capture → To Cinema ScrollTrigger ----------------
      if (transformationSectionRef.current) {
        const transTl = gsap.timeline({
          scrollTrigger: {
            trigger: transformationSectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (transformationHeaderRef.current) {
          const headVars = getDirectionalVars("left", {
            distance: 50,
            duration: 0.85,
          });
          transTl.fromTo(transformationHeaderRef.current, headVars.from, headVars.to, 0);
        }

        if (transformationCanvasRef.current) {
          const canvasVars = getDirectionalVars("bottom", {
            distance: 40,
            duration: 1.0,
          });
          transTl.fromTo(transformationCanvasRef.current, canvasVars.from, canvasVars.to, 0.2);
        }
      }

      // ---------------- 3. Production Process ScrollTrigger ----------------
      if (processSectionRef.current) {
        const procTl = gsap.timeline({
          scrollTrigger: {
            trigger: processSectionRef.current,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (processHeaderRef.current) {
          const headVars = getDirectionalVars("left", {
            distance: 45,
            duration: 0.85,
          });
          procTl.fromTo(processHeaderRef.current, headVars.from, headVars.to, 0);
        }

        if (processActsRef.current) {
          const contentVars = getDirectionalVars("bottom", {
            distance: 35,
            duration: 0.9,
          });
          procTl.fromTo(processActsRef.current, contentVars.from, contentVars.to, 0.18);
        }
      }

      // ---------------- 4. Final CTA Directional Sequence ----------------
      if (ctaSectionRef.current) {
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (ctaEyebrowRef.current) {
          const eyeVars = getDirectionalVars("left", { distance: 40, duration: 0.85 });
          ctaTl.fromTo(ctaEyebrowRef.current, eyeVars.from, eyeVars.to, 0);
        }

        if (ctaHeadlineRef.current) {
          const headVars = getDirectionalVars("topLeft", { distance: 60, duration: 1.0 });
          ctaTl.fromTo(ctaHeadlineRef.current, headVars.from, headVars.to, 0.12);
        }

        if (ctaContentRef.current) {
          const contentVars = getDirectionalVars("right", { subtle: true, duration: 0.85 });
          ctaTl.fromTo(ctaContentRef.current, contentVars.from, contentVars.to, 0.26);
        }

        if (ctaActionsRef.current) {
          const actVars = getDirectionalVars("bottom", { distance: 35, duration: 0.9 });
          ctaTl.fromTo(ctaActionsRef.current, actVars.from, actVars.to, 0.36);
        }
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const videoShootNavLinks = [
    { name: "About", href: "#about" },
    { name: "Showreel", href: "#showreel" },
    { name: "Process", href: "#process" },
    { name: "Inquire", href: "#inquire" },
  ];

  return (
    <main ref={mainRef} className={styles.main}>
      {/* Studio Navigation with Back Button & Page Sections */}
      <Navbar links={videoShootNavLinks} backLink={{ name: "Back", href: "/#services" }} fixed />

      {/* 1. Main Section 1: ABOUT (Cinematic Intro, 4-Line Manifesto & Layered Cards) */}
      <VideoHero
        ref={heroSectionRef}
        headingKickerRef={heroKickerRef}
        headingTitleRef={heroTitleRef}
        headingAsideRef={heroAsideRef}
        letterboxRef={heroLetterboxRef}
        valueLedgerRef={heroValueLedgerRef}
      />

      {/* 2. Featured Showcase: THE SHOWREEL VAULT (Interactive Cinema Portfolio & Reel Archive) */}
      <FeaturedReelVault
        ref={transformationSectionRef}
        headerRef={transformationHeaderRef}
        canvasRef={transformationCanvasRef}
      />

      {/* 3. Main Section 2: OUR PROCESS (Cinematic Methodology) */}
      <ServiceProcess
        service="video-shoots"
        ref={processSectionRef}
        headerRef={processHeaderRef}
        actsListRef={processActsRef}
      />

      {/* 4. Main Section 3: FINAL CTA & STUDIO FOOTER (The Final Frame) */}
      <VideoCTA
        ref={ctaSectionRef}
        eyebrowRef={ctaEyebrowRef}
        headlineRef={ctaHeadlineRef}
        contentRef={ctaContentRef}
        actionsRef={ctaActionsRef}
      />
    </main>
  );
};

export default VideoShootPage;
