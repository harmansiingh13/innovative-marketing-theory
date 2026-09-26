"use client";

import React, { useState, forwardRef } from "react";
import Image from "next/image";
import styles from "./EventShowcase.module.css";

export type EventArchetypeKey = "KEYNOTE" | "SUMMIT" | "GALA" | "POPUP";

interface EventArchetypeData {
  id: EventArchetypeKey;
  tabLabel: string;
  client: string;
  title: string;
  synopsis: string;
  features: string[];
  productionSpecs: string[];
  metricBig: string;
  metricLabel: string;
  imageSrc: string;
}

const archetypes: Record<EventArchetypeKey, EventArchetypeData> = {
  KEYNOTE: {
    id: "KEYNOTE",
    tabLabel: "KEYNOTES & PRODUCT UNVEILS",
    client: "VALENCE NEURAL // GLOBAL LAUNCH",
    title: "Apple-Grade Keynote Presentation & Hardware Unveil",
    synopsis:
      "Orchestrated a 1,500-attendee live product reveal featuring an 80-foot 8K curved LED backdrop, synchronized timecode laser reveal, 6-camera 4K broadcast, and live audience interaction triggers.",
    features: [
      "80ft 8K Curved MicroLED Volume",
      "Timecode Synced DMX & Laser Unveil",
      "6-Camera 4K Live Broadcast Switching",
      "Real-Time Interactive Audience Telemetry",
    ],
    productionSpecs: [
      "4K Multi-Cam Broadcast",
      "Line Array Audio",
      "DMX Lighting",
      "Same-Day Sizzle Edit",
      "Media Press Room",
    ],
    metricBig: "450K+",
    metricLabel: "Live Streamers Across 84 Countries with $12M+ Press Reach",
    imageSrc: "/images/director_monitor_bts.jpg",
  },
  SUMMIT: {
    id: "SUMMIT",
    tabLabel: "INVESTOR & VIP SUMMITS",
    client: "APEX SOVEREIGN RETREAT",
    title: "Confidential UHNW Investor Summit & Gala",
    synopsis:
      "Produced an ultra-exclusive three-day private summit for 120 global sovereign wealth fund managers and tech founders. Complete biometric security protocols, private acoustic zoning, and luxury banquet staging.",
    features: [
      "Biometric VIP Credentialing & Access",
      "Confidential Acoustic Zoning & Sweeps",
      "Michelin-Star Bespoke Culinary Staging",
      "Private High-Security Lounge Suites",
    ],
    productionSpecs: [
      "Discreet AV Rigging",
      "Private Fiber Tunnels",
      "Diplomatic Security",
      "Custom Bespoke Sets",
    ],
    metricBig: "$1.8B+",
    metricLabel: "Confidential Transactional Deal Flow Facilitated Over 72 Hours",
    imageSrc: "/images/cinema_production_graded.jpg",
  },
  GALA: {
    id: "GALA",
    tabLabel: "IMMERSIVE BRAND GALAS",
    client: "MAISON LUMIÈRE // HAUTE JOAILLERIE",
    title: "Sensory Luxury Exhibition & Immersive Dinner Gala",
    synopsis:
      "Transformed an architectural cathedral into a multi-sensory luxury atelier. Projection-mapped banquet tables with synchronized gastronomic storytelling, live orchestral accompaniment, and bespoke scent design.",
    features: [
      "360° Architectural Projection Mapping",
      "Synchronized Gastronomic Video Art",
      "Custom Spatial Olfactory Engineering",
      "Live Chamber Orchestra AV Integration",
    ],
    productionSpecs: [
      "Projection Mapping",
      "Spatial Scent Diffusers",
      "Acoustic Tuning",
      "VIP Concierge Protocol",
    ],
    metricBig: "98.6%",
    metricLabel: "Post-Event Guest Satisfaction Score Across 400 Luxury VIPs",
    imageSrc: "/images/cinematic_reel_portrait.jpg",
  },
  POPUP: {
    id: "POPUP",
    tabLabel: "EXPERIENTIAL POP-UPS",
    client: "CHRONO LABS // TIMELESS ACTIVATION",
    title: "Viral Architectural Pop-Up & Experiential Booth",
    synopsis:
      "Constructed a high-traffic kinetic pavilion in central Manhattan. Interactive infinity mirror chambers, responsive touch surfaces, and instant social reel capture stations creating massive social media virality.",
    features: [
      "Kinetic Architectural Pavilion Frame",
      "Interactive Infinity LED Mirrors",
      "Automated Social Video Kiosks",
      "Real-Time Footfall Heatmap Tracking",
    ],
    productionSpecs: [
      "Rapid Modular Build",
      "Self-Contained Power",
      "Touch Sensors",
      "Social Kiosks",
    ],
    metricBig: "48K+",
    metricLabel: "Total Verified Footfall & +320% Compounding Social Reach",
    imageSrc: "/images/instagram/post-5.png",
  },
};

export interface EventShowcaseProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const EventShowcase = forwardRef<HTMLElement, EventShowcaseProps>(
  ({ headerRef, canvasRef }, ref) => {
    const [activeTab, setActiveTab] = useState<EventArchetypeKey>("KEYNOTE");
    const current = archetypes[activeTab];

    return (
      <section ref={ref} id="productions" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>EXPERIENTIAL ARCHITECTURES {" // "} 02</span>
            </div>

            <div className={styles.headerRow}>
              <div className={styles.headingBlock}>
                <h2 className={styles.title}>
                  PRODUCTIONS ACROSS{" "}
                  <span className={styles.titleHighlight}>HIGH-STAKES TIERS.</span>
                </h2>
                <p className={styles.subtitle}>
                  Whether staging a globally streamed keynote unveil, a confidential sovereign
                  wealth retreat, or a sensory luxury gala, we engineer physical experiences that
                  elevate brands into cultural legends.
                </p>
              </div>

              {/* Archetype Selector Tabs */}
              <div
                className={styles.archetypeTabs}
                role="tablist"
                aria-label="Event capabilities selection"
              >
                {(Object.keys(archetypes) as EventArchetypeKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === key}
                    className={`${styles.tabBtn} ${activeTab === key ? styles.tabBtnActive : ""}`}
                    onClick={() => setActiveTab(key)}
                  >
                    {archetypes[key].tabLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Stage Theater Frame */}
          <div ref={canvasRef} className={styles.theaterFrame}>
            {/* Stage Theater Header */}
            <div className={styles.theaterHeader}>
              <div className={styles.theaterHeaderLeft}>
                <span className={styles.theaterDot} />
                <span className={styles.theaterHeaderTitle}>LIVE PRODUCTION THEATER</span>
              </div>

              <div className={styles.theaterMeta}>
                <span>RUN-OF-SHOW // SYNCHRONIZED</span>
              </div>
            </div>

            {/* Theater Body Content Grid */}
            <div className={styles.theaterContent}>
              {/* Left Column: Archetype Details */}
              <div className={styles.archetypeDetail}>
                <div className={styles.archetypeTopMeta}>
                  <span className={styles.clientBadge}>{current.client}</span>
                  <div className={styles.statusIndicator}>
                    <span className={styles.liveDot} />
                    <span>PRODUCTION VERIFIED</span>
                  </div>
                </div>

                <h3 className={styles.archetypeTitle}>{current.title}</h3>
                <p className={styles.archetypeSynopsis}>{current.synopsis}</p>

                {/* Feature Checkpoints */}
                <ul className={styles.featureList}>
                  {current.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.featureCheck}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Production Specs */}
                <div className={styles.productionSpecsWrapper}>
                  <span className={styles.productionSpecsLabel}>PRODUCTION SPECIFICATIONS</span>
                  <div className={styles.productionSpecsPills}>
                    {current.productionSpecs.map((spec, idx) => (
                      <span key={idx} className={styles.productionSpecPill}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Viewport Preview & Impact Metric */}
              <div className={styles.archetypeVisual}>
                <div className={styles.previewCanvas}>
                  <Image
                    src={current.imageSrc}
                    alt={current.title}
                    width={800}
                    height={500}
                    className={styles.previewImage}
                    priority={false}
                  />
                  <div className={styles.previewOverlay}>
                    <span className={styles.previewTag}>STAGE PRODUCTION PREVIEW</span>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricBig}>{current.metricBig}</span>
                  <span className={styles.metricLabel}>{current.metricLabel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Global Proof Ledger Strip */}
          <div className={styles.proofLedger}>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>50+</span>
              <span className={styles.proofLabel}>MONUMENTAL PRODUCTIONS</span>
            </div>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>99.98%</span>
              <span className={styles.proofLabel}>BROADCAST REDUNDANCY SLA</span>
            </div>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>100%</span>
              <span className={styles.proofLabel}>VIP CONFIDENTIALITY</span>
            </div>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>$45M+</span>
              <span className={styles.proofLabel}>CLIENT VALUE GENERATED</span>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

EventShowcase.displayName = "EventShowcase";
export default EventShowcase;
