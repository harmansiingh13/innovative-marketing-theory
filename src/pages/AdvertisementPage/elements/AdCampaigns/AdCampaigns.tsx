"use client";

import { useState, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./AdCampaigns.module.css";
import { ArrowUpRight } from "lucide-react";

export type AdPlatformKey = "META" | "GOOGLE";

interface AdPlatformData {
  id: AdPlatformKey;
  tabLabel: string;
  client: string;
  title: string;
  tagline: string;
  synopsis: string;
  deliverables: string[];
  metricBig: string;
  metricLabel: string;
}

const adPlatforms: Record<AdPlatformKey, AdPlatformData> = {
  META: {
    id: "META",
    tabLabel: "META ADS (INSTAGRAM & FACEBOOK)",
    client: "HYPERION ATHLETICS",
    title: "Advantage+ Scaling & Direct-Response Hooks",
    tagline: "High-retention visual hooks driving direct-to-consumer scale.",
    synopsis:
      "We engineered an omni-funnel Meta acquisition architecture pairing high-cadence UGC video hooks with Advantage+ automated shopping campaigns. Combined with server-side CAPI modeling, we scaled monthly spend past $120K while maintaining 7.2X blended return on ad spend.",
    deliverables: [
      "20+ Direct-Response Video Hooks Weekly",
      "Custom CAPI Server-Side Data Modeling",
      "Dynamic Product Catalog Re-engagement",
      "Bid-Cap & Cost-Cap Scaling Rules",
    ],
    metricBig: "7.2X",
    metricLabel: "Blended Return on Ad Spend (ROAS) on $120K/Mo Spend",
  },
  GOOGLE: {
    id: "GOOGLE",
    tabLabel: "GOOGLE ADS (SEARCH & P-MAX)",
    client: "VALENCE CAPITAL",
    title: "High-Intent Search & Performance Max",
    tagline: "Dominating high-intent search queries and competitor keywords.",
    synopsis:
      "Captured active high-intent category demand using tightly structured single-theme ad groups (STAGs) and Performance Max campaigns backed by offline conversion uploads. Drove 420+ accredited investor inquiries with a 34% drop in customer acquisition cost.",
    deliverables: [
      "Negative Keyword Moats & Search Arbitrage",
      "Performance Max Asset Group Synthesis",
      "Offline Conversion Uploads (GCLID Sync)",
      "High-Converting CRO Sitelink Extensions",
    ],
    metricBig: "-34%",
    metricLabel: "Drop in CAC While 3.8Xing Inbound Dealflow",
  },
};

export interface AdCampaignsProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const AdCampaigns = forwardRef<HTMLElement, AdCampaignsProps>(
  ({ headerRef, canvasRef }, ref) => {
    const [activePlatform, setActivePlatform] = useState<AdPlatformKey>("META");

    const current = adPlatforms[activePlatform];

    return (
      <section ref={ref} id="campaigns" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>CAMPAIGN ARCHITECTURES {" // "} 02</span>
            </div>

            <div className={styles.headerRow}>
              <div className={styles.headingBlock}>
                <h2 className={styles.title}>
                  ALGORITHMIC SCALE ACROSS{" "}
                  <span className={styles.titleHighlight}>TIER-ONE AD NETWORKS.</span>
                </h2>
                <p className={styles.manifestoSubtitle}>
                  We don&apos;t gamble your budget on a single network. We construct diversified,
                  cross-platform acquisition engines engineered to outbid, out-convert, and
                  out-scale competitors.
                </p>
              </div>

              {/* Platform Selector Tabs */}
              <div className={styles.platformTabs} role="tablist" aria-label="Platform selection">
                {(Object.keys(adPlatforms) as AdPlatformKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activePlatform === key}
                    className={`${styles.tabBtn} ${
                      activePlatform === key ? styles.tabBtnActive : ""
                    }`}
                    onClick={() => setActivePlatform(key)}
                  >
                    {adPlatforms[key].tabLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Ad Simulator Canvas & Strategy */}
          <div ref={canvasRef} className={styles.simulatorGrid}>
            {/* Left Column: Simulated Ad Interface */}
            <div className={styles.adCanvas}>
              <div className={styles.canvasAmbientGlow} />

              {/* 1. META ADS PREVIEW */}
              {activePlatform === "META" && (
                <div className={styles.metaAdCard}>
                  <div className={styles.metaHeader}>
                    <div className={styles.metaAuthorGroup}>
                      <div className={styles.metaAvatar}>
                        <Image
                          src="/images/cinema_production_graded.jpg"
                          alt="Hyperion Athletics"
                          fill
                          sizes="38px"
                          className={styles.metaMediaImg}
                        />
                      </div>
                      <div className={styles.metaAuthorMeta}>
                        <span className={styles.metaBrandName}>
                          Hyperion Athletics
                          <span style={{ color: "var(--color-brand-primary, #e8a91a)" }}>✓</span>
                        </span>
                        <span className={styles.metaSponsoredTag}>Sponsored • 🌐</span>
                      </div>
                    </div>
                  </div>

                  <p className={styles.metaPrimaryText}>
                    The 1% don&apos;t train what looks good in photos. They train what compounds
                    under maximum pressure. Engineered for elite output. Claim your launch edition
                    kit.
                  </p>

                  <div className={styles.metaMediaWrap}>
                    <Image
                      src="/images/cinematic_reel_portrait.jpg"
                      alt="Meta Ad Creative"
                      fill
                      sizes="420px"
                      className={styles.metaMediaImg}
                    />
                  </div>

                  <div className={styles.metaCtaBar}>
                    <div className={styles.metaCtaMeta}>
                      <span className={styles.metaDomain}>HYPERIONATHLETICS.COM</span>
                      <span className={styles.metaHeadline}>
                        High-Performance Gear // Launch Drop
                      </span>
                    </div>
                    <button type="button" className={styles.metaActionBtn}>
                      Shop Now
                    </button>
                  </div>

                  <div className={styles.metaMetricsRibbon}>
                    <span>ROAS: 7.2X</span>
                    <span>CTR: 3.8%</span>
                    <span>CPA: $24.80</span>
                  </div>
                </div>
              )}

              {/* 2. GOOGLE ADS PREVIEW */}
              {activePlatform === "GOOGLE" && (
                <div className={styles.googleAdCard}>
                  <div className={styles.googleAdHeader}>
                    <div className={styles.googleFavicon}>G</div>
                    <div className={styles.googleUrlMeta}>
                      <span className={styles.googleSponsoredTag}>Sponsored</span>
                      <span className={styles.googleBreadcrumb}>
                        https://imt.agency/growth/performance-ads
                      </span>
                    </div>
                  </div>

                  <h3 className={styles.googleHeadline}>
                    Category Domination Marketing | Paid Ads That Scale 4X+ ROAS
                  </h3>

                  <p className={styles.googleSnippet}>
                    Stop burning media budget on low-intent clicks. High-velocity performance
                    acquisition systems across Meta, Google & TikTok. Transparent weekly war rooms.
                  </p>

                  <div className={styles.googleSitelinks}>
                    <div className={styles.sitelinkItem}>
                      <span className={styles.sitelinkTitle}>Verified Case Studies</span>
                      <span className={styles.sitelinkDesc}>
                        See how we scale brands to $100K+ monthly
                      </span>
                    </div>
                    <div className={styles.sitelinkItem}>
                      <span className={styles.sitelinkTitle}>Free Growth Audit</span>
                      <span className={styles.sitelinkDesc}>
                        Full audit of your ad account & CAPI health
                      </span>
                    </div>
                    <div className={styles.sitelinkItem}>
                      <span className={styles.sitelinkTitle}>CAPI Server Setup</span>
                      <span className={styles.sitelinkDesc}>
                        Bypass iOS privacy tracking degradation
                      </span>
                    </div>
                    <div className={styles.sitelinkItem}>
                      <span className={styles.sitelinkTitle}>ROAS Calculator</span>
                      <span className={styles.sitelinkDesc}>
                        Calculate expected returns on scaled spend
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Strategy & Deliverables */}
            <div className={styles.strategyColumn}>
              <div className={styles.strategyHeader}>
                <span className={styles.clientKicker}>
                  {current.client} {" // "} STRATEGY SPEC
                </span>
                <h3 className={styles.strategyTitle}>{current.title}</h3>
                <span className={styles.strategyTagline}>{current.tagline}</span>
                <p className={styles.strategySynopsis}>{current.synopsis}</p>
              </div>

              <div className={styles.deliverablesBlock}>
                <span className={styles.deliverablesHeading}>CAMPAIGN DELIVERABLES</span>
                <ul className={styles.deliverablesList}>
                  {current.deliverables.map((item, idx) => (
                    <li key={idx} className={styles.deliverableItem}>
                      <span className={styles.checkDot} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Big Metric Banner */}
              <div className={styles.metricsRibbon}>
                <span className={styles.metricBig}>{current.metricBig}</span>
                <span className={styles.metricLabel}>{current.metricLabel}</span>
              </div>

              <Link href="/#contact" className={styles.strategyCtaBtn}>
                <span>DEPLOY THIS CAMPAIGN SYSTEM</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Bottom Global Performance Strip */}
          <div className={styles.performanceStrip}>
            <div className={styles.stripItem}>
              <span className={`${styles.stripStat} ${styles.stripStatAccent}`}>$18.4M+</span>
              <span className={styles.stripLabel}>
                Profitable media spend deployed across Meta, Google, TikTok, and YouTube.
              </span>
            </div>

            <div className={styles.stripItem}>
              <span className={styles.stripStat}>4.4X</span>
              <span className={styles.stripLabel}>
                Average blended Return on Ad Spend (ROAS) across all active brand portfolios.
              </span>
            </div>

            <div className={styles.stripItem}>
              <span className={`${styles.stripStat} ${styles.stripStatAccent}`}>-38%</span>
              <span className={styles.stripLabel}>
                Average reduction in blended Customer Acquisition Cost within 60 days.
              </span>
            </div>

            <div className={styles.stripItem}>
              <span className={styles.stripStat}>99.4%</span>
              <span className={styles.stripLabel}>
                Conversion tracking accuracy verified via custom server-side CAPI infrastructure.
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

AdCampaigns.displayName = "AdCampaigns";
export default AdCampaigns;
