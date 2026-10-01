"use client";

import React, { useState, useRef, useCallback, useEffect, forwardRef } from "react";
import gsap from "gsap";
import styles from "./WebCapabilities.module.css";
import {
  CheckCircle2,
  Sparkles,
  Lock,
  Star,
  ShieldCheck,
  Search,
  ShoppingCart,
  Users,
  Activity,
  Layers,
  Layout,
  TrendingUp,
} from "lucide-react";

export interface ProjectType {
  id: string;
  num: string;
  tabLabel: string;
  title: string;
  categoryTag: string;
  description: string;
  idealFor: string[];
  capabilities: string[];
  technologies: string[];
  clientBenefit: string;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: "business-websites",
    num: "01",
    tabLabel: "01 BUSINESS WEBSITES",
    title: "BUSINESS WEBSITES",
    categoryTag: "01 / CORPORATE & BRAND PLATFORMS",
    description:
      "Professional, conversion-focused websites designed to establish credibility, communicate your value, and turn visitors into customers.",
    idealFor: [
      "Agencies",
      "Local Businesses",
      "Professional Services",
      "Startups",
      "Corporate Brands",
    ],
    capabilities: [
      "Custom UI / UX",
      "Responsive Design",
      "CMS Integration",
      "SEO Foundations",
      "Lead Generation",
      "Analytics",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "CMS"],
    clientBenefit:
      "A digital presence that looks credible, communicates clearly, and gives your customers a reason to take action.",
  },
  {
    id: "landing-pages",
    num: "02",
    tabLabel: "02 LANDING PAGES",
    title: "LANDING PAGES",
    categoryTag: "02 / CAMPAIGN & CONVERSION ENGINES",
    description:
      "Focused digital experiences designed around a single goal — generating leads, driving sign-ups, promoting an offer, or converting campaign traffic.",
    idealFor: [
      "Marketing Campaigns",
      "Product Launches",
      "Lead Generation",
      "Paid Advertising",
      "Events",
      "Promotions",
    ],
    capabilities: [
      "Conversion-focused UX",
      "A/B Testing Ready",
      "Strong CTA Architecture",
      "Campaign Tracking",
      "Responsive Design",
      "Analytics Integration",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Analytics", "CMS"],
    clientBenefit:
      "A focused experience built around one clear action instead of distracting visitors with unnecessary complexity.",
  },
  {
    id: "e-commerce",
    num: "03",
    tabLabel: "03 E-COMMERCE",
    title: "E-COMMERCE EXPERIENCES",
    categoryTag: "03 / DIGITAL COMMERCE & RETAIL",
    description:
      "Online stores designed around product discovery, trust, frictionless checkout, and scalable commerce operations.",
    idealFor: ["DTC Brands", "Retail Businesses", "Product Companies", "Multi-product Stores"],
    capabilities: [
      "Product Catalog",
      "Shopping Cart",
      "Checkout",
      "Payments",
      "Inventory",
      "Customer Accounts",
      "Analytics",
    ],
    technologies: ["Shopify", "Next.js", "React", "Stripe", "Sanity / CMS"],
    clientBenefit:
      "A storefront designed to make discovering, trusting, and purchasing products feel effortless.",
  },
  {
    id: "web-applications",
    num: "04",
    tabLabel: "04 WEB APPLICATIONS",
    title: "WEB APPLICATIONS",
    categoryTag: "04 / WORKFLOW & OPERATIONAL TOOLS",
    description:
      "Custom web applications built around the workflows, data, and operational needs of your business.",
    idealFor: [
      "Customer Portals",
      "Booking Systems",
      "Dashboards",
      "Internal Tools",
      "Management Platforms",
    ],
    capabilities: [
      "Authentication",
      "User Roles",
      "Dashboards",
      "API Integration",
      "Business Logic",
      "Real-time Data",
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "APIs"],
    clientBenefit: "A custom digital tool designed around the way your business actually works.",
  },
  {
    id: "saas-platforms",
    num: "05",
    tabLabel: "05 SAAS / PLATFORMS",
    title: "SAAS & DIGITAL PLATFORMS",
    categoryTag: "05 / SUBSCRIPTION & B2B PRODUCTS",
    description:
      "Scalable digital products with authentication, subscriptions, dashboards, workflows, and the infrastructure required to serve growing user bases.",
    idealFor: [
      "SaaS Startups",
      "Subscription Products",
      "B2B Platforms",
      "Digital Products",
      "Membership Platforms",
    ],
    capabilities: [
      "Authentication",
      "User Management",
      "Subscription Billing",
      "Admin Dashboard",
      "Role-based Access",
      "Analytics",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Authentication"],
    clientBenefit:
      "A product foundation designed to launch quickly and evolve as your users and business grow.",
  },
  {
    id: "marketplaces",
    num: "06",
    tabLabel: "06 MARKETPLACES",
    title: "MARKETPLACES & MULTI-VENDOR PLATFORMS",
    categoryTag: "06 / MULTI-SIDED ECOSYSTEMS",
    description:
      "Multi-sided platforms that connect buyers, sellers, service providers, businesses, or communities through a single digital ecosystem.",
    idealFor: [
      "Service Marketplaces",
      "Freelancer Platforms",
      "Booking Marketplaces",
      "Multi-vendor Commerce",
      "B2B Marketplaces",
    ],
    capabilities: [
      "Multi-user Accounts",
      "Seller / Provider Profiles",
      "Search & Discovery",
      "Messaging",
      "Payments",
      "Reviews & Ratings",
      "Admin Management",
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    clientBenefit:
      "A digital marketplace designed around discovery, trust, transactions, and the relationships between multiple types of users.",
  },
];

export interface WebCapabilitiesProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const WebCapabilities = forwardRef<HTMLElement, WebCapabilitiesProps>(
  ({ headerRef: externalHeaderRef, canvasRef: externalCanvasRef }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const internalSectionRef = useRef<HTMLElement>(null);
    const internalHeaderRef = useRef<HTMLDivElement>(null);
    const internalCanvasRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const visualCardRef = useRef<HTMLDivElement>(null);
    const visualContainerRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    const sectionRef = (ref as React.RefObject<HTMLElement | null>) || internalSectionRef;
    const headerRef = externalHeaderRef || internalHeaderRef;
    const activePanelRef = externalCanvasRef || internalCanvasRef;

    const activeProject = PROJECT_TYPES[activeIndex];

    // ----------------------------------------------------
    // Tab Switching with smooth GSAP transition (250-450ms)
    // ----------------------------------------------------
    const handleSelectCategory = useCallback(
      (index: number) => {
        if (index === activeIndex) return;

        const visualEl = visualContainerRef.current;
        const contentEl = contentWrapperRef.current;

        const tl = gsap.timeline({
          defaults: { duration: 0.2, ease: "power2.inOut" },
        });

        if (visualEl && contentEl) {
          tl.to([visualEl, contentEl], {
            opacity: 0,
            y: 8,
            duration: 0.16,
          });
        }

        tl.call(() => {
          setActiveIndex(index);
        });

        if (visualEl && contentEl) {
          tl.fromTo(
            [visualEl, contentEl],
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" },
            "+=0.03",
          );
        }
      },
      [activeIndex],
    );

    // ----------------------------------------------------
    // Subtle Cursor Parallax Effect on Visual Canvas
    // ----------------------------------------------------
    useEffect(() => {
      const card = visualCardRef.current;
      if (!card) return;

      const xTo = gsap.quickTo(card, "x", { duration: 0.5, ease: "power2.out" });
      const yTo = gsap.quickTo(card, "y", { duration: 0.5, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        xTo(relativeX * 4);
        yTo(relativeY * 3);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <section ref={sectionRef} id="capabilities" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>02 / WHAT WE BUILD</span>
            </div>

            <div className={styles.headerContent}>
              <h2 className={styles.title}>
                FROM SIMPLE WEBSITES{" "}
                <span className={styles.goldText}>TO COMPLEX DIGITAL PRODUCTS.</span>
              </h2>
              <p className={styles.subtitle}>
                From high-converting business websites to scalable platforms and custom web
                applications, we build digital products around your business goals.
              </p>
            </div>
          </div>

          {/* Project Category Selector Tabs (Horizontal row on desktop, touch-scrollable on mobile) */}
          <div
            ref={navRef}
            className={styles.topNavPillRow}
            role="tablist"
            aria-label="Project Categories"
          >
            {PROJECT_TYPES.map((proj, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  id={`tab-${proj.id}`}
                  aria-controls={`panel-${proj.id}`}
                  aria-selected={isActive}
                  className={`${styles.topNavBtn} ${isActive ? styles.topNavBtnActive : ""}`}
                  onClick={() => handleSelectCategory(idx)}
                >
                  <span className={styles.topNavNum}>{proj.num}</span>
                  <span className={styles.topNavName}>{proj.title}</span>
                  {isActive && <span className={styles.activeDot} />}
                </button>
              );
            })}
          </div>

          {/* Main Showcase Panel Frame */}
          <div
            ref={activePanelRef}
            id={`panel-${activeProject.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeProject.id}`}
            className={styles.activePanel}
          >
            {/* Panel Top Bar: Category Scope & Type */}
            <div className={styles.panelTopBar}>
              <div className={styles.panelBadge}>
                <span className={styles.panelBadgeDot} />
                <span>{activeProject.categoryTag}</span>
              </div>
              <div className={styles.systemStatusTag}>
                <span className={styles.statusPulse} />
                <span className={styles.systemStatusText}>
                  DIGITAL PRODUCT SHOWCASE {"//"} {activeProject.num} OF 06
                </span>
              </div>
            </div>

            {/* 2 Primary Columns Split Grid */}
            <div className={styles.panelBodyGrid}>
              {/* LEFT COLUMN: VISUAL REPRESENTATION OF PROJECT TYPE */}
              <div ref={visualCardRef} className={styles.visualCard}>
                <div ref={visualContainerRef} className={styles.imageInner}>
                  {/* Browser/Product Chrome Header */}
                  <div className={styles.graphicHeaderBar}>
                    <div className={styles.macDots}>
                      <span className={styles.macRed} />
                      <span className={styles.macYellow} />
                      <span className={styles.macGreen} />
                    </div>
                    <div className={styles.graphicUrlPill}>
                      <Lock size={10} className={styles.urlLock} />
                      <span>https://client-product.preview/{activeProject.id}</span>
                    </div>
                    <span className={styles.liveTag}>LIVE INTERFACE</span>
                  </div>

                  {/* Subtle Grid Background */}
                  <div className={styles.graphicGridBg} />

                  {/* ----------------- 01: BUSINESS WEBSITES VISUAL ----------------- */}
                  {activeProject.id === "business-websites" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.businessWebsiteMockup}>
                        {/* Top Nav */}
                        <div className={styles.siteNav}>
                          <div className={styles.siteBrand}>
                            <span className={styles.brandDot} />
                            <span>VANGUARD // AGENCY</span>
                          </div>
                          <div className={styles.siteLinks}>
                            <span className={styles.siteLinkActive}>EXPERTISE</span>
                            <span className={styles.siteLink}>WORK</span>
                            <span className={styles.siteLink}>ABOUT</span>
                          </div>
                          <button type="button" className={styles.siteCtaBtn}>
                            BOOK BRIEFING
                          </button>
                        </div>

                        {/* Hero Section */}
                        <div className={styles.siteHero}>
                          <div className={styles.siteEyebrowBadge}>
                            <Sparkles size={10} className={styles.goldIcon} />
                            <span>STRATEGIC DIGITAL FLAGSHIP</span>
                          </div>
                          <h4 className={styles.siteHeroHeading}>
                            SCALING INFLUENCE &amp;{" "}
                            <span className={styles.goldTextInline}>AUTHORITY.</span>
                          </h4>
                          <p className={styles.siteHeroSub}>
                            Custom-crafted web experiences engineered to position your firm as an
                            industry leader and convert premium clients.
                          </p>
                          <div className={styles.siteActionRow}>
                            <button type="button" className={styles.sitePrimaryBtn}>
                              SCHEDULE CONSULTATION →
                            </button>
                            <span className={styles.siteSecondaryAction}>EXPLORE PORTFOLIO</span>
                          </div>
                        </div>

                        {/* Service Cards Grid */}
                        <div className={styles.siteCardsRow}>
                          <div className={styles.siteCard}>
                            <span className={styles.siteCardKicker}>01 / DIRECTION</span>
                            <span className={styles.siteCardTitle}>BRAND ARCHITECTURE</span>
                            <span className={styles.siteCardDesc}>
                              Bespoke visual identity and positioning systems.
                            </span>
                          </div>
                          <div className={`${styles.siteCard} ${styles.siteCardFeatured}`}>
                            <span className={styles.siteCardKickerGold}>02 / ENGINEERING</span>
                            <span className={styles.siteCardTitle}>CUSTOM PLATFORMS</span>
                            <span className={styles.siteCardDesc}>
                              High-speed Next.js code tailored to convert visitors.
                            </span>
                          </div>
                          <div className={styles.siteCard}>
                            <span className={styles.siteCardKicker}>03 / EXPANSION</span>
                            <span className={styles.siteCardTitle}>SEO &amp; ANALYTICS</span>
                            <span className={styles.siteCardDesc}>
                              Sub-second loading times that rank top on Google.
                            </span>
                          </div>
                        </div>

                        {/* Trust Bar */}
                        <div className={styles.siteTrustBar}>
                          <div className={styles.trustItem}>
                            <ShieldCheck size={12} className={styles.goldIcon} />
                            <span>TRUSTED BY 140+ INDUSTRY LEADERS</span>
                          </div>
                          <span className={styles.trustStat}>AVERAGE 3.8X PIPELINE LIFT</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- 02: LANDING PAGES VISUAL ----------------- */}
                  {activeProject.id === "landing-pages" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.landingPageMockup}>
                        {/* Campaign Banner */}
                        <div className={styles.campaignBanner}>
                          <span className={styles.campaignPulse} />
                          <span className={styles.campaignBannerText}>
                            LIMITED CAMPAIGN // EXCLUSIVE FOUNDER COHORT
                          </span>
                        </div>

                        {/* High-Impact Hero Headline & Single CTA */}
                        <div className={styles.landingHero}>
                          <div className={styles.landingPill}>CONVERSION-FOCUSED ARCHITECTURE</div>
                          <h4 className={styles.landingBigTitle}>
                            TURN CAMPAIGN TRAFFIC INTO{" "}
                            <span className={styles.goldTextInline}>REVENUE.</span>
                          </h4>
                          <p className={styles.landingSubtext}>
                            Engineered around a singular focus. Zero navigation distractions,
                            persuasive value framing, and instant action triggers.
                          </p>
                        </div>

                        {/* Prominent Conversion Action Box */}
                        <div className={styles.conversionBox}>
                          <div className={styles.inputMockRow}>
                            <div className={styles.mockInput}>
                              enter-your-work-email@company.com
                            </div>
                            <button type="button" className={styles.conversionBtn}>
                              CLAIM ACCESS NOW →
                            </button>
                          </div>
                          <div className={styles.conversionGuarantee}>
                            <span>✓ Instant Setup</span>
                            <span>✓ No Credit Card</span>
                            <span>✓ A/B Testing Enabled</span>
                          </div>
                        </div>

                        {/* Value Points & Social Proof */}
                        <div className={styles.landingSocialRow}>
                          <div className={styles.proofPill}>
                            <div className={styles.starsGroup}>
                              <Star size={11} className={styles.starIcon} />
                              <Star size={11} className={styles.starIcon} />
                              <Star size={11} className={styles.starIcon} />
                              <Star size={11} className={styles.starIcon} />
                              <Star size={11} className={styles.starIcon} />
                            </div>
                            <span className={styles.proofText}>
                              4.9/5 RATING FROM 850+ FOUNDERS
                            </span>
                          </div>
                          <div className={styles.metricCallout}>
                            <span className={styles.metricVal}>+64%</span>
                            <span className={styles.metricLabel}>AVERAGE CONVERSION RATE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- 03: E-COMMERCE VISUAL ----------------- */}
                  {activeProject.id === "e-commerce" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.ecommerceMockup}>
                        {/* E-Commerce Top Bar */}
                        <div className={styles.ecomNav}>
                          <div className={styles.ecomBrand}>ATELIER // STORE</div>
                          <div className={styles.ecomCategories}>
                            <span className={styles.ecomCatActive}>FEATURED</span>
                            <span className={styles.ecomCat}>APPAREL</span>
                            <span className={styles.ecomCat}>HARDWARE</span>
                          </div>
                          <div className={styles.ecomCartBadge}>
                            <ShoppingCart size={12} className={styles.goldIcon} />
                            <span>BAG (2)</span>
                          </div>
                        </div>

                        {/* Product Detail Layout */}
                        <div className={styles.ecomProductHero}>
                          {/* Product Image Frame */}
                          <div className={styles.ecomImageContainer}>
                            <div className={styles.productArtBox}>
                              <div className={styles.productSilhouette} />
                              <span className={styles.editionTag}>EDITION // 01</span>
                            </div>
                          </div>

                          {/* Product Info & Actions */}
                          <div className={styles.ecomProductDetails}>
                            <span className={styles.productStatusBadge}>
                              IN STOCK // SHIPS TODAY
                            </span>
                            <h5 className={styles.productTitle}>CHRONO TITANIUM ED.</h5>
                            <div className={styles.productPriceRow}>
                              <span className={styles.currentPrice}>$280.00</span>
                              <span className={styles.taxNote}>VAT INCL.</span>
                            </div>

                            {/* Color Selector */}
                            <div className={styles.colorSelectorRow}>
                              <span className={styles.colorLabel}>COLORWAY:</span>
                              <div className={styles.colorDots}>
                                <span
                                  className={`${styles.cDot} ${styles.cDotActive}`}
                                  style={{ background: "#e8a91a" }}
                                />
                                <span className={styles.cDot} style={{ background: "#222" }} />
                                <span className={styles.cDot} style={{ background: "#f5f5f5" }} />
                              </div>
                            </div>

                            {/* Add to Cart CTA */}
                            <button type="button" className={styles.addToCartBtn}>
                              ADD TO BAG — $280.00
                            </button>
                          </div>
                        </div>

                        {/* E-Commerce Trust Badges */}
                        <div className={styles.ecomTrustRow}>
                          <span>FREE EXPRESS SHIPPING</span>
                          <span>•</span>
                          <span>30-DAY GUARANTEE</span>
                          <span>•</span>
                          <span>STRIPE SECURE CHECKOUT</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- 04: WEB APPLICATIONS VISUAL ----------------- */}
                  {activeProject.id === "web-applications" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.webAppMockup}>
                        {/* Sidebar + Main Content Grid */}
                        <div className={styles.appShell}>
                          {/* App Sidebar */}
                          <div className={styles.appSidebar}>
                            <div className={styles.appLogo}>OPSGRID</div>
                            <div className={styles.sidebarLinks}>
                              <span className={`${styles.sLink} ${styles.sLinkActive}`}>
                                <Layout size={11} /> OVERVIEW
                              </span>
                              <span className={styles.sLink}>
                                <Activity size={11} /> WORKFLOWS
                              </span>
                              <span className={styles.sLink}>
                                <Users size={11} /> CLIENT ROLES
                              </span>
                              <span className={styles.sLink}>
                                <Layers size={11} /> API LOGS
                              </span>
                            </div>
                            <div className={styles.sidebarUser}>
                              <span className={styles.userDot} />
                              <span className={styles.userName}>ALEX V. (ADMIN)</span>
                            </div>
                          </div>

                          {/* App Main Work Area */}
                          <div className={styles.appMainArea}>
                            {/* App Header */}
                            <div className={styles.appHeaderRow}>
                              <div className={styles.appSearch}>
                                <Search size={10} className={styles.searchIcon} />
                                <span>Search operations, webhooks, users...</span>
                              </div>
                              <span className={styles.appLiveBadge}>SYSTEM 200 OK</span>
                            </div>

                            {/* Active Pipeline Table */}
                            <div className={styles.appTableWrapper}>
                              <div className={styles.tableHeaderRow}>
                                <span>PIPELINE JOB</span>
                                <span>TYPE</span>
                                <span>LATENCY</span>
                                <span>STATUS</span>
                              </div>
                              <div className={styles.tableBodyRow}>
                                <span className={styles.tableName}>Ingest_Order_Stream</span>
                                <span className={styles.tableType}>Webhook</span>
                                <span className={styles.tableLatency}>14ms</span>
                                <span className={styles.statusSuccess}>PROCESSED</span>
                              </div>
                              <div className={styles.tableBodyRow}>
                                <span className={styles.tableName}>Stripe_Payment_Sync</span>
                                <span className={styles.tableType}>Event</span>
                                <span className={styles.tableLatency}>28ms</span>
                                <span className={styles.statusSuccess}>SYNCED</span>
                              </div>
                              <div className={styles.tableBodyRow}>
                                <span className={styles.tableName}>Auth_MFA_Validation</span>
                                <span className={styles.tableType}>Security</span>
                                <span className={styles.tableLatency}>9ms</span>
                                <span className={styles.statusGold}>VERIFIED</span>
                              </div>
                            </div>

                            {/* Bottom App Metrics */}
                            <div className={styles.appStatsGrid}>
                              <div className={styles.appStatItem}>
                                <span className={styles.statLabel}>AVG LATENCY</span>
                                <span className={styles.statValGreen}>17ms</span>
                              </div>
                              <div className={styles.appStatItem}>
                                <span className={styles.statLabel}>QUEUE HEALTH</span>
                                <span className={styles.statVal}>99.98%</span>
                              </div>
                              <div className={styles.appStatItem}>
                                <span className={styles.statLabel}>ACTIVE WORKFLOWS</span>
                                <span className={styles.statValGold}>48 LIVE</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- 05: SAAS / PLATFORMS VISUAL ----------------- */}
                  {activeProject.id === "saas-platforms" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.saasMockup}>
                        {/* SaaS Workspace Header */}
                        <div className={styles.saasTopBar}>
                          <div className={styles.saasWorkspaceBadge}>
                            <span className={styles.workspaceDot} />
                            <span>ACME CORP // ENTERPRISE WORKSPACE</span>
                          </div>
                          <div className={styles.saasPlanBadge}>PRO TIER • ACTIVE</div>
                        </div>

                        {/* Core Subscription & Usage Metrics Grid */}
                        <div className={styles.saasMetricsRow}>
                          <div className={styles.saasMetricCard}>
                            <span className={styles.saasMetricLabel}>MONTHLY RECURRING (MRR)</span>
                            <div className={styles.saasMetricValGroup}>
                              <span className={styles.saasNumber}>$48,250</span>
                              <span className={styles.saasDelta}>+18.4%</span>
                            </div>
                            <span className={styles.saasSubtext}>Net billing run-rate</span>
                          </div>

                          <div className={styles.saasMetricCard}>
                            <span className={styles.saasMetricLabel}>ACTIVE SEATS</span>
                            <div className={styles.saasMetricValGroup}>
                              <span className={styles.saasNumber}>42 / 50</span>
                              <span className={styles.saasSeatStatus}>84% ALLOCATED</span>
                            </div>
                            <div className={styles.quotaBar}>
                              <div className={styles.quotaFill} style={{ width: "84%" }} />
                            </div>
                          </div>

                          <div className={styles.saasMetricCard}>
                            <span className={styles.saasMetricLabel}>API USAGE (THIS CYCLE)</span>
                            <div className={styles.saasMetricValGroup}>
                              <span className={styles.saasNumber}>1.2M</span>
                              <span className={styles.saasSubGreen}>HEALTHY</span>
                            </div>
                            <span className={styles.saasSubtext}>Rate limit: 2.0M/mo</span>
                          </div>
                        </div>

                        {/* Workspace Role & Billing Bar */}
                        <div className={styles.saasSettingsBar}>
                          <div className={styles.saasSettingLeft}>
                            <TrendingUp size={13} className={styles.goldIcon} />
                            <span>STRIPE SUBSCRIPTION CYCLE: BILLED MONTHLY</span>
                          </div>
                          <span className={styles.saasRolePill}>ADMIN PRIVILEGES</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- 06: MARKETPLACES VISUAL ----------------- */}
                  {activeProject.id === "marketplaces" && (
                    <div className={styles.canvasContainer}>
                      <div className={styles.marketplaceMockup}>
                        {/* Search & Category Filter Bar */}
                        <div className={styles.marketFilterRow}>
                          <div className={styles.marketSearchBox}>
                            <Search size={11} className={styles.searchIcon} />
                            <span>Find vetted studios, specialists &amp; engineers...</span>
                          </div>
                          <div className={styles.filterPills}>
                            <span className={styles.fPillActive}>ALL</span>
                            <span className={styles.fPill}>DEV</span>
                            <span className={styles.fPill}>DESIGN</span>
                            <span className={styles.fPill}>AI</span>
                          </div>
                        </div>

                        {/* 2 Vetted Specialist Marketplace Cards */}
                        <div className={styles.marketCardsGrid}>
                          {/* Specialist Card 1 */}
                          <div className={styles.specialistCard}>
                            <div className={styles.specHeader}>
                              <div className={styles.specAvatar}>M</div>
                              <div className={styles.specMeta}>
                                <div className={styles.specNameRow}>
                                  <span className={styles.specName}>MONOLITH LABS</span>
                                  <span className={styles.verifiedBadge}>✓ VETTED</span>
                                </div>
                                <span className={styles.specTitle}>Next.js &amp; Architecture</span>
                              </div>
                            </div>

                            <div className={styles.specSkills}>
                              <span className={styles.skillPill}>Full-Stack</span>
                              <span className={styles.skillPill}>Next.js 15</span>
                              <span className={styles.skillPill}>Prisma</span>
                            </div>

                            <div className={styles.specFooter}>
                              <div className={styles.ratingBox}>
                                <Star size={11} className={styles.starIcon} />
                                <span>4.9 (94 projects)</span>
                              </div>
                              <span className={styles.hourlyRate}>$145 / hr</span>
                            </div>

                            <button type="button" className={styles.bookSpecBtn}>
                              REQUEST BRIEFING →
                            </button>
                          </div>

                          {/* Specialist Card 2 */}
                          <div
                            className={`${styles.specialistCard} ${styles.specialistCardFeatured}`}
                          >
                            <div className={styles.specHeader}>
                              <div className={styles.specAvatarGold}>N</div>
                              <div className={styles.specMeta}>
                                <div className={styles.specNameRow}>
                                  <span className={styles.specName}>NEXUS CREATIVE</span>
                                  <span className={styles.featuredBadge}>★ TOP RATED</span>
                                </div>
                                <span className={styles.specTitle}>GSAP &amp; Spatial Motion</span>
                              </div>
                            </div>

                            <div className={styles.specSkills}>
                              <span className={styles.skillPill}>WebGL</span>
                              <span className={styles.skillPill}>GSAP</span>
                              <span className={styles.skillPill}>Design Systems</span>
                            </div>

                            <div className={styles.specFooter}>
                              <div className={styles.ratingBox}>
                                <Star size={11} className={styles.starIcon} />
                                <span>5.0 (126 projects)</span>
                              </div>
                              <span className={styles.hourlyRateGold}>$160 / hr</span>
                            </div>

                            <button type="button" className={styles.bookSpecBtnGold}>
                              REQUEST BRIEFING →
                            </button>
                          </div>
                        </div>

                        {/* Marketplace Escrow Protection Strip */}
                        <div className={styles.escrowBar}>
                          <ShieldCheck size={13} className={styles.goldIcon} />
                          <span>
                            STRIPE CONNECT ESCROW PROTECTION // MILESTONE-BASED DISBURSEMENT
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual Footer Caption */}
                  <div className={styles.visualMessageBanner}>
                    <Sparkles size={13} className={styles.bannerIcon} />
                    <span className={styles.bannerText}>
                      PROJECT TYPE 0{activeIndex + 1} {"//"} {activeProject.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: PROJECT INFORMATION & SPECIFICATION */}
              <div ref={contentWrapperRef} className={styles.contentWrapper}>
                {/* 1. Category Eyebrow & Title */}
                <div className={styles.serviceTextGroup}>
                  <div className={styles.specEyebrow}>
                    <span>{activeProject.categoryTag}</span>
                  </div>
                  <h3 className={styles.serviceTitle}>{activeProject.title}</h3>
                  <p className={styles.serviceDescription}>{activeProject.description}</p>
                </div>

                {/* 2. Ideal For Audience Tags */}
                <div className={styles.idealForBlock}>
                  <span className={styles.blockLabel}>IDEAL FOR</span>
                  <div className={styles.idealTags}>
                    {activeProject.idealFor.map((item, i) => (
                      <span key={i} className={styles.idealTag}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Capabilities (Compact 2-Column Layout) */}
                <div className={styles.capabilitiesBlock}>
                  <span className={styles.blockLabel}>WHAT WE DELIVER</span>
                  <div className={styles.capsGrid}>
                    {activeProject.capabilities.map((cap, i) => (
                      <div key={i} className={styles.capItem}>
                        <CheckCircle2 size={15} className={styles.checkIcon} />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Tech Stack (Visually Secondary, Compact Pills) */}
                <div className={styles.techStackBlock}>
                  <span className={styles.blockLabel}>TECHNOLOGY STACK</span>
                  <div className={styles.techPills}>
                    {activeProject.technologies.map((tech, i) => (
                      <span key={i} className={styles.techPill}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. Client Benefit Callout Box */}
                <div className={styles.outcomeCard}>
                  <div className={styles.outcomeHeader}>
                    <Sparkles size={15} className={styles.outcomeIcon} />
                    <span className={styles.outcomeTitle}>CLIENT BENEFIT</span>
                  </div>
                  <p className={styles.outcomeText}>&ldquo;{activeProject.clientBenefit}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

WebCapabilities.displayName = "WebCapabilities";
export default WebCapabilities;
