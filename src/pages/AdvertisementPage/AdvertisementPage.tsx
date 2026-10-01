"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AdvertisementPage.module.css";
import { getDirectionalVars } from "@/shared/animations";

// Navigation & Page Sub-Elements
import { Navbar } from "@/shared/components/Navbar";
import { AdHero } from "./elements/AdHero/AdHero";
import { AdCampaigns } from "./elements/AdCampaigns/AdCampaigns";
import { ServiceProcess } from "@/shared/components/ServiceProcess";
import { AdCTA } from "./elements/AdCTA/AdCTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AdvertisementPage = () => {
  const mainRef = useRef<HTMLElement>(null);

  // Section 1: Hero Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroKickerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroAsideRef = useRef<HTMLDivElement>(null);
  const heroCommandCenterRef = useRef<HTMLDivElement>(null);
  const heroValueLedgerRef = useRef<HTMLDivElement>(null);

  // Section 2: Campaigns Refs
  const campaignsSectionRef = useRef<HTMLElement>(null);
  const campaignsHeaderRef = useRef<HTMLDivElement>(null);
  const campaignsCanvasRef = useRef<HTMLDivElement>(null);

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

      // 2. Campaigns ScrollTrigger
      if (campaignsSectionRef.current) {
        const campTl = gsap.timeline({
          scrollTrigger: {
            trigger: campaignsSectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (campaignsHeaderRef.current) {
          const headVars = getDirectionalVars("left", { distance: 50, duration: 0.85 });
          campTl.fromTo(campaignsHeaderRef.current, headVars.from, headVars.to, 0);
        }

        if (campaignsCanvasRef.current) {
          const canvasVars = getDirectionalVars("bottom", { distance: 40, duration: 1.0 });
          campTl.fromTo(campaignsCanvasRef.current, canvasVars.from, canvasVars.to, 0.2);
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

  const adNavLinks = [
    { name: "About", href: "#about" },
    { name: "Campaigns", href: "#campaigns" },
    { name: "Process", href: "#process" },
    { name: "Inquire", href: "#inquire" },
  ];

  return (
    <main ref={mainRef} className={styles.main}>
      {/* Studio Navigation */}
      <Navbar links={adNavLinks} backLink={{ name: "Back", href: "/#services" }} fixed />

      {/* 1. Main Section 1: ABOUT (Hero, ROAS Manifesto & Live Command Center HUD) */}
      <AdHero
        ref={heroSectionRef}
        headingKickerRef={heroKickerRef}
        headingTitleRef={heroTitleRef}
        headingAsideRef={heroAsideRef}
        commandCenterRef={heroCommandCenterRef}
        valueLedgerRef={heroValueLedgerRef}
      />

      {/* 2. Main Section 2: CAMPAIGNS (Multi-Channel Simulator & Platform Case Studies) */}
      <AdCampaigns
        ref={campaignsSectionRef}
        headerRef={campaignsHeaderRef}
        canvasRef={campaignsCanvasRef}
      />

      {/* 3. Main Section 3: THE METHODOLOGY (Multi-Platform Ad Scaling) */}
      <ServiceProcess
        service="advertisement"
        ref={processSectionRef}
        headerRef={processHeaderRef}
        phasesListRef={processPhasesRef}
      />

      {/* 4. Main Section 4: FINAL CTA & AUDIT INQUIRY */}
      <AdCTA
        ref={ctaSectionRef}
        eyebrowRef={ctaEyebrowRef}
        headlineRef={ctaHeadlineRef}
        contentRef={ctaContentRef}
        actionsRef={ctaActionsRef}
      />
    </main>
  );
};

export default AdvertisementPage;
