"use client";

import { useState, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./AdCampaigns.module.css";
import MobileEmulator from "@/shared/components/MobileEmulator";
import {
  ArrowUpRight,
  Layers,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ChevronRight,
  Search,
} from "lucide-react";

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
              <span>CAMPAIGN ARCHITECTURES</span>
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
            </div>
          </div>

          {/* Interactive Ad Simulator Canvas & Strategy */}
          <div ref={canvasRef} className={styles.simulatorGrid}>
            {/* Left Column: Interactive Smartphone Emulator */}
            <div className={styles.adCanvas}>
              <div className={styles.canvasAmbientGlow} />

              {/* Reusable Mobile Emulator Component */}
              <MobileEmulator>
                {/* Contextual App Top Bar */}
                {activePlatform === "META" ? (
                  <div className={styles.igAppHeader}>
                    <span className={styles.igLogoText}>Instagram</span>
                    <div className={styles.igHeaderIcons}>
                      <Heart size={18} strokeWidth={1.8} />
                      <Send size={18} strokeWidth={1.8} />
                    </div>
                  </div>
                ) : (
                  <div className={styles.browserHeader}>
                    <div className={styles.browserUrlPill}>
                      <span className={styles.browserLockIcon}>🔒</span>
                      <span className={styles.browserUrlText}>google.com</span>
                    </div>
                  </div>
                )}

                {/* Screen Content: No vertical scroll for Instagram */}
                <div
                  className={`${styles.phoneScreenContent} ${
                    activePlatform === "META"
                      ? styles.phoneScreenNoScroll
                      : styles.phoneScreenScrollable
                  }`}
                >
                  {/* 1. META ADS (INSTAGRAM) PREVIEW */}
                  {activePlatform === "META" && (
                    <div className={styles.metaAdCard}>
                      {/* Post Header */}
                      <div className={styles.metaPostHeader}>
                        <div className={styles.metaUserGroup}>
                          <div className={styles.metaAvatarRing}>
                            <div className={styles.metaAvatar}>
                              <Image
                                src="/images/cinema_production_graded.jpg"
                                alt="Hyperion Athletics"
                                fill
                                sizes="32px"
                                className={styles.metaMediaImg}
                              />
                            </div>
                          </div>
                          <div className={styles.metaUserMeta}>
                            <div className={styles.metaHandleRow}>
                              <span className={styles.metaHandle}>hyperionathletics</span>
                              <span className={styles.metaVerifiedBadge}>✓</span>
                            </div>
                            <span className={styles.metaSponsoredLabel}>Sponsored</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className={styles.metaOptionsBtn}
                          aria-label="Ad options"
                        >
                          <MoreHorizontal size={15} />
                        </button>
                      </div>

                      {/* Post Media (1:1 Full Bleed) */}
                      <div className={styles.metaMediaWrap}>
                        <Image
                          src="/images/cinematic_reel_portrait.jpg"
                          alt="Hyperion Athletics Apparel"
                          fill
                          sizes="330px"
                          priority
                          className={styles.metaMediaImg}
                        />
                      </div>

                      {/* Instagram Native Sponsored CTA Bar */}
                      <div className={styles.igCtaBar}>
                        <span className={styles.igCtaText}>Shop now</span>
                        <ChevronRight size={14} className={styles.igCtaChevron} />
                      </div>

                      {/* Engagement Actions Row */}
                      <div className={styles.igActionRow}>
                        <div className={styles.igActionLeft}>
                          <Heart size={18} strokeWidth={1.8} />
                          <MessageCircle size={18} strokeWidth={1.8} />
                          <Send size={18} strokeWidth={1.8} />
                        </div>
                        <Bookmark size={18} strokeWidth={1.8} />
                      </div>

                      {/* Post Details: Likes, Caption, Comments */}
                      <div className={styles.igCaptionBlock}>
                        <span className={styles.igLikesCount}>14,820 likes</span>
                        <p className={styles.igCaptionText}>
                          <span className={styles.igCaptionHandle}>hyperionathletics</span> The 1%
                          don&apos;t train what looks good in photos.
                        </p>
                        <span className={styles.igCommentsLink}>View all 142 comments</span>
                        <span className={styles.igTimestamp}>SPONSORED • 2 HOURS AGO</span>
                      </div>
                    </div>
                  )}

                  {/* 2. GOOGLE ADS (SEARCH) PREVIEW */}
                  {activePlatform === "GOOGLE" && (
                    <div className={styles.googleSearchContainer}>
                      {/* Google Search Header with Logo & Query */}
                      <div className={styles.googleSearchHeader}>
                        <div className={styles.googleBrandRow}>
                          <span className={styles.googleLogo}>
                            <span style={{ color: "#4285F4" }}>G</span>
                            <span style={{ color: "#EA4335" }}>o</span>
                            <span style={{ color: "#FBBC05" }}>o</span>
                            <span style={{ color: "#4285F4" }}>g</span>
                            <span style={{ color: "#34A853" }}>l</span>
                            <span style={{ color: "#EA4335" }}>e</span>
                          </span>
                        </div>

                        <div className={styles.googleSearchInputBar}>
                          <Search size={13} className={styles.googleSearchIcon} />
                          <span className={styles.googleSearchQueryText}>
                            performance marketing agency
                          </span>
                        </div>

                        {/* Search Navigation Tabs */}
                        <div className={styles.googleNavTabs}>
                          <span className={styles.googleNavTabActive}>All</span>
                          <span className={styles.googleNavTab}>Images</span>
                          <span className={styles.googleNavTab}>News</span>
                          <span className={styles.googleNavTab}>Videos</span>
                        </div>
                      </div>

                      {/* The Sponsored Ad Result */}
                      <div className={styles.googleResultCard}>
                        <div className={styles.googleAdMetaLine}>
                          <div className={styles.googleFavicon}>G</div>
                          <div className={styles.googleAdSource}>
                            <span className={styles.googleAdSiteName}>IMT Agency</span>
                            <span className={styles.googleAdUrl}>
                              https://imt.agency › ads › performance
                            </span>
                          </div>
                          <span className={styles.googleSponsoredPill}>Sponsored</span>
                        </div>

                        <h3 className={styles.googleAdHeadline}>
                          Category Domination Marketing | Paid Ads That Scale 4X+ ROAS
                        </h3>

                        <p className={styles.googleAdSnippet}>
                          Stop burning media budget on low-intent clicks. High-velocity performance
                          acquisition systems across Meta, Google & TikTok. Transparent weekly war
                          rooms.
                        </p>

                        <div className={styles.googleSitelinksGrid}>
                          <div className={styles.sitelinkItem}>
                            <span className={styles.sitelinkTitle}>Verified Case Studies</span>
                            <span className={styles.sitelinkDesc}>Scale brands to $100K+/Mo</span>
                          </div>
                          <div className={styles.sitelinkItem}>
                            <span className={styles.sitelinkTitle}>Free Growth Audit</span>
                            <span className={styles.sitelinkDesc}>
                              Full audit of ad account & CAPI
                            </span>
                          </div>
                          <div className={styles.sitelinkItem}>
                            <span className={styles.sitelinkTitle}>CAPI Server Setup</span>
                            <span className={styles.sitelinkDesc}>
                              Bypass iOS tracking degradation
                            </span>
                          </div>
                          <div className={styles.sitelinkItem}>
                            <span className={styles.sitelinkTitle}>ROAS Calculator</span>
                            <span className={styles.sitelinkDesc}>Calculate scaling returns</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </MobileEmulator>
            </div>

            {/* Right Column: Strategy Card with Tabs on Top */}
            <div className={styles.strategyColumn}>
              {/* Platform Selector Header Area (Matching Vault Tabs UI) */}
              <div className={styles.campaignSelectorHeader}>
                <div className={styles.vaultTitleRow}>
                  <div className={styles.vaultTitleGroup}>
                    <span className={styles.vaultKickerBullet} />
                    <h3 className={styles.vaultTitleKicker}>
                      SELECT CAMPAIGN BLUEPRINT TO PREVIEW
                    </h3>
                  </div>
                  {/* <span className={styles.vaultFormatBadge}>
                    <Layers size={11} />
                    <span>
                      {Object.keys(adPlatforms).length} PLATFORMS // FULL-FUNNEL MASTER
                    </span>
                  </span> */}
                </div>

                {/* Platform Selector Tabs */}
                <div
                  className={styles.cardPlatformTabs}
                  role="tablist"
                  aria-label="Platform selection"
                >
                  {(Object.keys(adPlatforms) as AdPlatformKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={activePlatform === key}
                      className={`${styles.cardTabBtn} ${
                        activePlatform === key ? styles.cardTabBtnActive : ""
                      }`}
                      onClick={() => setActivePlatform(key)}
                    >
                      {adPlatforms[key].tabLabel}
                    </button>
                  ))}
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </section>
    );
  },
);

AdCampaigns.displayName = "AdCampaigns";
export default AdCampaigns;
