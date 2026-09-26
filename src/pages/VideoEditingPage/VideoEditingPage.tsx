"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoEditingPage.module.css";
import { getDirectionalVars } from "@/shared/animations";

// Navigation & Page Sub-Elements
import { Navbar } from "@/sections/HeroSection/elements/Navbar";
import { EditingHero } from "./elements/EditingHero/EditingHero";
import { EditingVault } from "./elements/EditingVault/EditingVault";
import { ServiceProcess } from "@/shared/components/ServiceProcess";
import { EditingCTA } from "./elements/EditingCTA/EditingCTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const VideoEditingPage = () => {
  const mainRef = useRef<HTMLElement>(null);

  // Section 1: Hero Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroKickerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroAsideRef = useRef<HTMLDivElement>(null);
  const heroTimelineRef = useRef<HTMLDivElement>(null);
  const heroValueLedgerRef = useRef<HTMLDivElement>(null);

  // Section 2: Vault Refs
  const vaultSectionRef = useRef<HTMLElement>(null);
  const vaultHeaderRef = useRef<HTMLDivElement>(null);
  const vaultCanvasRef = useRef<HTMLDivElement>(null);

  // Section 3: Process Refs
  const processSectionRef = useRef<HTMLElement>(null);
  const processHeaderRef = useRef<HTMLDivElement>(null);
  const processStagesRef = useRef<HTMLDivElement>(null);

  // Section 4: Final CTA Refs
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaEyebrowRef = useRef<HTMLDivElement>(null);
  const ctaHeadlineRef = useRef<HTMLHeadingElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const ctaActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroKickerRef.current) {
        const kickerVars = getDirectionalVars("left", { distance: 50, duration: 0.85 });
        heroTl.fromTo(heroKickerRef.current, kickerVars.from, kickerVars.to, 0.1);
      }

      if (heroTitleRef.current) {
        const titleVars = getDirectionalVars("topLeft", { distance: 70, duration: 1.0 });
        heroTl.fromTo(heroTitleRef.current, titleVars.from, titleVars.to, 0.2);
      }

      if (heroAsideRef.current) {
        const asideVars = getDirectionalVars("right", { subtle: true, duration: 0.85 });
        heroTl.fromTo(heroAsideRef.current, asideVars.from, asideVars.to, 0.35);
      }

      if (heroTimelineRef.current) {
        const cardVars = getDirectionalVars("bottom", { distance: 45, duration: 1.0 });
        heroTl.fromTo(heroTimelineRef.current, cardVars.from, cardVars.to, 0.45);
      }

      if (heroValueLedgerRef.current && heroValueLedgerRef.current.children.length > 0) {
        const cards = Array.from(heroValueLedgerRef.current.children);
        cards.forEach((card, idx) => {
          const cardVars = getDirectionalVars("bottom", { distance: 35, duration: 0.85 });
          heroTl.fromTo(card, cardVars.from, cardVars.to, 0.55 + idx * 0.1);
        });
      }

      // 2. Vault ScrollTrigger
      if (vaultSectionRef.current) {
        const vaultTl = gsap.timeline({
          scrollTrigger: {
            trigger: vaultSectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (vaultHeaderRef.current) {
          const headVars = getDirectionalVars("left", { distance: 50, duration: 0.85 });
          vaultTl.fromTo(vaultHeaderRef.current, headVars.from, headVars.to, 0);
        }

        if (vaultCanvasRef.current) {
          const canvasVars = getDirectionalVars("bottom", { distance: 40, duration: 1.0 });
          vaultTl.fromTo(vaultCanvasRef.current, canvasVars.from, canvasVars.to, 0.2);
        }
      }

      // 3. Process ScrollTrigger
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
          const headVars = getDirectionalVars("left", { distance: 45, duration: 0.85 });
          procTl.fromTo(processHeaderRef.current, headVars.from, headVars.to, 0);
        }

        if (processStagesRef.current) {
          const stagesVars = getDirectionalVars("bottom", { distance: 35, duration: 0.9 });
          procTl.fromTo(processStagesRef.current, stagesVars.from, stagesVars.to, 0.18);
        }
      }

      // 4. Final CTA ScrollTrigger
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

  const videoEditingNavLinks = [
    { name: "About", href: "#about" },
    { name: "Edits", href: "#edits" },
    { name: "Process", href: "#process" },
    { name: "Inquire", href: "#inquire" },
  ];

  return (
    <main ref={mainRef} className={styles.main}>
      {/* Studio Navigation */}
      <Navbar links={videoEditingNavLinks} backLink={{ name: "Back", href: "/#services" }} fixed />

      {/* 1. Main Section 1: ABOUT (Hero, Retention Manifesto & NLE Timeline Card) */}
      <EditingHero
        ref={heroSectionRef}
        headingKickerRef={heroKickerRef}
        headingTitleRef={heroTitleRef}
        headingAsideRef={heroAsideRef}
        timelineRef={heroTimelineRef}
        valueLedgerRef={heroValueLedgerRef}
      />

      {/* 2. Main Section 2: POST-PRODUCTION VAULT (Filterable Showcase & Dual-Format Player) */}
      <EditingVault ref={vaultSectionRef} headerRef={vaultHeaderRef} canvasRef={vaultCanvasRef} />

      {/* 3. Main Section 3: THE WORKFLOW (High-Retention Editorial Pipeline) */}
      <ServiceProcess
        service="video-editing"
        ref={processSectionRef}
        headerRef={processHeaderRef}
        stagesListRef={processStagesRef}
      />

      {/* 4. Main Section 4: FINAL CTA & SESSION WRAP */}
      <EditingCTA
        ref={ctaSectionRef}
        eyebrowRef={ctaEyebrowRef}
        headlineRef={ctaHeadlineRef}
        contentRef={ctaContentRef}
        actionsRef={ctaActionsRef}
      />
    </main>
  );
};

export default VideoEditingPage;
