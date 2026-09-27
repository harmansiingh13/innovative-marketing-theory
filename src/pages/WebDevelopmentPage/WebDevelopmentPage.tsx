"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WebDevelopmentPage.module.css";
import { getDirectionalVars } from "@/shared/animations";

// Navigation & Page Sub-Elements
import { Navbar } from "@/sections/HeroSection/elements/Navbar";
import { WebHero } from "./elements/WebHero/WebHero";
import { WebCapabilities } from "./elements/WebCapabilities/WebCapabilities";
import { ServiceProcess } from "@/shared/components/ServiceProcess";
import { WebCTA } from "./elements/WebCTA/WebCTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const WebDevelopmentPage = () => {
  const mainRef = useRef<HTMLElement>(null);

  // Section 1: Hero Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroKickerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroAsideRef = useRef<HTMLDivElement>(null);
  const heroCommandCenterRef = useRef<HTMLDivElement>(null);
  const heroValueLedgerRef = useRef<HTMLDivElement>(null);

  // Section 2: Capabilities Refs
  const capabilitiesSectionRef = useRef<HTMLElement>(null);
  const capabilitiesHeaderRef = useRef<HTMLDivElement>(null);
  const capabilitiesCanvasRef = useRef<HTMLDivElement>(null);

  // Section 3: Process Refs
  const processSectionRef = useRef<HTMLElement>(null);
  const processHeaderRef = useRef<HTMLDivElement>(null);
  const processPhasesRef = useRef<HTMLDivElement>(null);

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

      if (heroCommandCenterRef.current) {
        const cardVars = getDirectionalVars("bottom", { distance: 45, duration: 1.0 });
        heroTl.fromTo(heroCommandCenterRef.current, cardVars.from, cardVars.to, 0.45);
      }

      if (heroValueLedgerRef.current && heroValueLedgerRef.current.children.length > 0) {
        const cards = Array.from(heroValueLedgerRef.current.children);
        cards.forEach((card, idx) => {
          const cardVars = getDirectionalVars("bottom", { distance: 35, duration: 0.85 });
          heroTl.fromTo(card, cardVars.from, cardVars.to, 0.55 + idx * 0.1);
        });
      }

      // 2. Capabilities ScrollTrigger
      if (capabilitiesSectionRef.current) {
        const capTl = gsap.timeline({
          scrollTrigger: {
            trigger: capabilitiesSectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (capabilitiesHeaderRef.current) {
          const headVars = getDirectionalVars("left", { distance: 50, duration: 0.85 });
          capTl.fromTo(capabilitiesHeaderRef.current, headVars.from, headVars.to, 0);
        }

        if (capabilitiesCanvasRef.current) {
          const canvasVars = getDirectionalVars("bottom", { distance: 40, duration: 1.0 });
          capTl.fromTo(capabilitiesCanvasRef.current, canvasVars.from, canvasVars.to, 0.2);
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

        if (processPhasesRef.current) {
          const phasesVars = getDirectionalVars("bottom", { distance: 35, duration: 0.9 });
          procTl.fromTo(processPhasesRef.current, phasesVars.from, phasesVars.to, 0.18);
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

  const webNavLinks = [
    { name: "About", href: "#about" },
    { name: "Capabilities", href: "#capabilities" },
    { name: "Process", href: "#process" },
    { name: "Inquire", href: "#inquire" },
  ];

  return (
    <main ref={mainRef} className={styles.main}>
      {/* Studio Navigation */}
      <Navbar links={webNavLinks} backLink={{ name: "Back", href: "/#services" }} fixed />

      {/* 1. Main Section 1: ABOUT (Hero, Manifesto & Lighthouse 100 Command Center HUD) */}
      <WebHero
        ref={heroSectionRef}
        headingKickerRef={heroKickerRef}
        headingTitleRef={heroTitleRef}
        headingAsideRef={heroAsideRef}
        commandCenterRef={heroCommandCenterRef}
        valueLedgerRef={heroValueLedgerRef}
      />

      {/* 2. Main Section 2: CAPABILITIES (Interactive Browser Frame & Archetype Switcher) */}
      <WebCapabilities
        ref={capabilitiesSectionRef}
        headerRef={capabilitiesHeaderRef}
        canvasRef={capabilitiesCanvasRef}
      />

      {/* 3. Main Section 3: THE METHODOLOGY (Engineering Pipeline) */}
      <ServiceProcess
        service="web-development"
        ref={processSectionRef}
        headerRef={processHeaderRef}
        phasesListRef={processPhasesRef}
      />

      {/* 4. Main Section 4: FINAL CTA & TECHNICAL AUDIT */}
      <WebCTA
        ref={ctaSectionRef}
        eyebrowRef={ctaEyebrowRef}
        headlineRef={ctaHeadlineRef}
        contentRef={ctaContentRef}
        actionsRef={ctaActionsRef}
      />
    </main>
  );
};

export default WebDevelopmentPage;
