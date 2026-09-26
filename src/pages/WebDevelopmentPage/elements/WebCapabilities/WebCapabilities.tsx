"use client";

import React, { useState, forwardRef } from "react";
import Image from "next/image";
import styles from "./WebCapabilities.module.css";
import { Lock } from "lucide-react";

export type ArchetypeKey = "COMMERCE" | "SAAS" | "FLAGSHIP" | "MARKETING";

interface ArchetypeData {
  id: ArchetypeKey;
  tabLabel: string;
  client: string;
  url: string;
  title: string;
  synopsis: string;
  features: string[];
  techSpecs: string[];
  metricBig: string;
  metricLabel: string;
  imageSrc: string;
}

const archetypes: Record<ArchetypeKey, ArchetypeData> = {
  COMMERCE: {
    id: "COMMERCE",
    tabLabel: "HEADLESS COMMERCE",
    client: "AURELIA LUXURY ATELIER",
    url: "https://flagship.imt.agency/systems/headless-commerce",
    title: "Sub-Second Headless Commerce & Checkout Architecture",
    synopsis:
      "Engineered on Shopify Plus Storefront GraphQL API and Next.js 15 App Router. Zero page-reload product transitions, instantaneous slide-out cart drawer, dynamic multi-currency geolocation, and automated order upsells.",
    features: [
      "Shopify Plus Storefront GraphQL API",
      "Sub-Second Global Cart Drawer",
      "Dynamic Multi-Currency Geolocation",
      "1-Click Accelerated Checkout CRO",
    ],
    techSpecs: ["Next.js 15", "Shopify Plus", "Tailwind CSS", "Zustand State", "Stripe"],
    metricBig: "+184%",
    metricLabel: "Increase in Mobile Checkout Completion on $4.2M GMV",
    imageSrc: "/images/cinematic_reel_portrait.jpg",
  },
  SAAS: {
    id: "SAAS",
    tabLabel: "ENTERPRISE SAAS & APPS",
    client: "NEXUS QUANT SYSTEMS",
    url: "https://flagship.imt.agency/systems/enterprise-saas",
    title: "High-Density Real-Time SaaS Applications & Portals",
    synopsis:
      "High-density real-time quantitative trading analytics dashboard. WebSocket live price feeds, sub-millisecond client state management, enterprise RBAC authentication, and customizable data workspaces.",
    features: [
      "Real-Time WebSocket Data Streams",
      "Role-Based Access Control (RBAC)",
      "Custom SVG & Canvas Data Visualizations",
      "High-Concurrency Edge API Routes",
    ],
    techSpecs: ["React 19", "PostgreSQL", "Prisma ORM", "WebSockets", "TanStack Query"],
    metricBig: "99.99%",
    metricLabel: "Production Uptime Across 12,000+ Concurrent Enterprise Users",
    imageSrc: "/images/director_monitor_bts.jpg",
  },
  FLAGSHIP: {
    id: "FLAGSHIP",
    tabLabel: "INTERACTIVE 3D & BRAND",
    client: "KINESIS AEROSPACE",
    url: "https://flagship.imt.agency/systems/interactive-flagship",
    title: "Award-Winning 3D WebGL & Spatial Flagships",
    synopsis:
      "Award-winning interactive brand experience combining Three.js 3D model disassembly, GSAP timeline scrubbing, spatial sound design, and custom WebGL fragment shader fluid distortions.",
    features: [
      "Three.js / WebGL Spatial Storytelling",
      "GSAP ScrollTrigger Timeline Scrubbing",
      "Custom GLSL Shader Micro-Physics",
      "60 FPS Render Loop on Mobile",
    ],
    techSpecs: ["Three.js", "GSAP ScrollTrigger", "GLSL Shaders", "Web Audio API"],
    metricBig: "3.8X",
    metricLabel: "Average Time-on-Site Lift // Featured on Awwwards & FWA",
    imageSrc: "/images/cinema_production_graded.jpg",
  },
  MARKETING: {
    id: "MARKETING",
    tabLabel: "HIGH-VELOCITY CMS",
    client: "STRATA VENTURE LABS",
    url: "https://flagship.imt.agency/systems/marketing-engine",
    title: "Composable Headless CMS & Marketing Engine",
    synopsis:
      "Composable marketing engine built on Sanity CMS and Vercel Incremental Static Regeneration (ISR). Empowers marketing teams to deploy sub-second landing pages in minutes without developer dependencies.",
    features: [
      "Sanity Headless CMS Visual Editing",
      "On-Demand Incremental Static Regeneration",
      "Automated A/B Conversion Split Testing",
      "Edge-Cached Sub-40ms TTFB Globally",
    ],
    techSpecs: ["Sanity.io", "Vercel ISR", "TypeScript", "Next/Image Edge Optimization"],
    metricBig: "28ms",
    metricLabel: "Global Time to First Byte (TTFB) on 100/100 Lighthouse",
    imageSrc: "/images/instagram/post-4.png",
  },
};

export interface WebCapabilitiesProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const WebCapabilities = forwardRef<HTMLElement, WebCapabilitiesProps>(
  ({ headerRef, canvasRef }, ref) => {
    const [activeTab, setActiveTab] = useState<ArchetypeKey>("COMMERCE");
    const current = archetypes[activeTab];

    return (
      <section ref={ref} id="capabilities" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>CAPABILITIES &amp; ARCHITECTURES {" // "} 02</span>
            </div>

            <div className={styles.headerRow}>
              <div className={styles.headingBlock}>
                <h2 className={styles.title}>
                  ENGINEERING ACROSS{" "}
                  <span className={styles.titleHighlight}>TIER-ONE PARADIGMS.</span>
                </h2>
                <p className={styles.subtitle}>
                  Whether you need a high-converting headless storefront, a high-concurrency SaaS
                  portal, or an award-winning 3D brand flagship, we architect systems designed to
                  dominate your category.
                </p>
              </div>

              {/* Archetype Selector Tabs */}
              <div
                className={styles.archetypeTabs}
                role="tablist"
                aria-label="Capabilities selection"
              >
                {(Object.keys(archetypes) as ArchetypeKey[]).map((key) => (
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

          {/* Interactive Browser Chrome Frame */}
          <div ref={canvasRef} className={styles.browserFrame}>
            {/* macOS Browser Header */}
            <div className={styles.browserHeader}>
              <div className={styles.trafficLights}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>

              <div className={styles.urlBar}>
                <Lock size={11} className={styles.lockIcon} />
                <span>{current.url}</span>
              </div>

              <div className={styles.browserMeta}>
                <span>STATUS: 200 OK</span>
              </div>
            </div>

            {/* Browser Body Content Grid */}
            <div className={styles.browserContent}>
              {/* Left Column: Archetype Details */}
              <div className={styles.archetypeDetail}>
                <div className={styles.archetypeTopMeta}>
                  <span className={styles.clientBadge}>{current.client}</span>
                  <div className={styles.statusIndicator}>
                    <span className={styles.liveDot} />
                    <span>PRODUCTION ACTIVE</span>
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

                {/* Tech Specs */}
                <div className={styles.techSpecsWrapper}>
                  <span className={styles.techSpecsLabel}>TECHNOLOGY STACK</span>
                  <div className={styles.techSpecsPills}>
                    {current.techSpecs.map((spec, idx) => (
                      <span key={idx} className={styles.techSpecPill}>
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
                    <span className={styles.previewTag}>INTERACTIVE SYSTEM PREVIEW</span>
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
              <span className={styles.proofValue}>99.99%</span>
              <span className={styles.proofLabel}>PRODUCTION UPTIME SLA</span>
            </div>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>0.38s</span>
              <span className={styles.proofLabel}>AVG GLOBAL LOAD TIME</span>
            </div>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>100%</span>
              <span className={styles.proofLabel}>TYPESCRIPT ENTERPRISE CODE</span>
            </div>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>4.8X</span>
              <span className={styles.proofLabel}>AVG CONVERSION RATE LIFT</span>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

WebCapabilities.displayName = "WebCapabilities";
export default WebCapabilities;
