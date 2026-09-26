"use client";

import { useState, useRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SocialSystems.module.css";
import {
  TrendingUp,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Repeat2,
  Send,
  ThumbsUp,
  Lightbulb,
  ArrowUpRight,
  Film,
  Sparkles,
  Grid3X3,
  Smartphone,
  ChevronLeft,
  Plus,
  Menu,
  X,
} from "lucide-react";

export type PlatformKey = "INSTAGRAM" | "REELS" | "LINKEDIN" | "TWITTER";

export interface InstagramPostItem {
  id: string;
  image: string;
  caption?: string;
  likes?: string;
  comments?: string;
  isReel?: boolean;
}

/**
 * DEFAULT INSTAGRAM POSTS:
 * Exact 9 brand assets arranged in the 3x3 Instagram post grid.
 */
export const defaultInstagramPosts: InstagramPostItem[] = [
  {
    id: "post-1",
    image: "/images/instagram/post-1.png",
    caption: "Think good content is just luck? First make a strategy. #HowToWin #StrategyFirst",
    likes: "24.8K",
    comments: "482",
    isReel: false,
  },
  {
    id: "post-2",
    image: "/images/instagram/post-2.png",
    caption: "Content without positioning is just noise. Visibility + Clarity. #BrandPositioning",
    likes: "38.2K",
    comments: "719",
    isReel: false,
  },
  {
    id: "post-3",
    image: "/images/instagram/post-3.png",
    caption: "Create the content. Grow the brand. The omnichannel conversion blueprint.",
    likes: "19.4K",
    comments: "310",
    isReel: false,
  },
  {
    id: "post-4",
    image: "/images/instagram/post-4.png",
    caption: "+ Create Brand Intelligence. Category dominance engineered by IMT.",
    likes: "42.1K",
    comments: "895",
    isReel: false,
  },
  {
    id: "post-5",
    image: "/images/instagram/post-5.png",
    caption: "No need to do it alone. Do it with IMT. Full-service social architecture.",
    likes: "56.4K",
    comments: "1,240",
    isReel: false,
  },
  {
    id: "post-6",
    image: "/images/instagram/post-6.png",
    caption: "The algorithm doesn't favor everyone. It favors the one that stands out.",
    likes: "31.9K",
    comments: "628",
    isReel: true,
  },
  {
    id: "post-7",
    image: "/images/instagram/post-7.png",
    caption: "Step out of the ordinary. Engineered conviction over hollow corporate noise.",
    likes: "27.5K",
    comments: "442",
    isReel: false,
  },
  {
    id: "post-8",
    image: "/images/instagram/post-8.png",
    caption: "Don't just exist. Be unmissable. Your brand deserves to be viral.",
    likes: "49.8K",
    comments: "986",
    isReel: false,
  },
  {
    id: "post-9",
    image: "/images/instagram/post-9.png",
    caption: "Reach dropping and you don't know why? 4 reasons your reels aren't reaching people.",
    likes: "64.2K",
    comments: "1,520",
    isReel: true,
  },
];

interface PlatformData {
  id: PlatformKey;
  tabLabel: string;
  client: string;
  title: string;
  tagline: string;
  synopsis: string;
  deliverables: string[];
  metricBig: string;
  metricLabel: string;
}

const platforms: Record<PlatformKey, PlatformData> = {
  INSTAGRAM: {
    id: "INSTAGRAM",
    tabLabel: "INSTAGRAM 3X3 GRID",
    client: "CHRONO COUTURE",
    title: "The Cult Aesthetic Grid",
    tagline:
      "High-fashion curation and narrative highlights that convert followers into customers.",
    synopsis:
      "Your Instagram profile is your digital flagship storefront. We curate an editorial 3x3 aesthetic grid, high-converting Story highlight funnels, and automated direct-message sales workflows that turn passive profile visits into devoted, high-LTV brand advocates.",
    deliverables: [
      "Editorial 3x3 Grid Architecture",
      "Story Highlight Sales Funnels",
      "DM Automation Sequences",
      "VIP Community Drops & Stories",
    ],
    metricBig: "48%",
    metricLabel: "Story Viewer to Direct Checkout Conversion Rate",
  },
  REELS: {
    id: "REELS",
    tabLabel: "TIKTOK & REELS",
    client: "HYPERION ATHLETICS",
    title: "The Hyper-Growth Sprint",
    tagline: "Short-form algorithmic momentum driving viral category domination.",
    synopsis:
      "We engineer short-form hooks that interrupt unconscious scrolling in the first 0.8 seconds. Paced with dynamic motion graphics, sound design, and relentless retention editing that triggers compounding algorithmic distribution across TikTok, Instagram Reels, and YouTube Shorts.",
    deliverables: [
      "Daily 9:16 Hook-Engine Reels",
      "Dynamic Motion Typography",
      "Retention Pacing & Jump Cuts",
      "Audio Trend Hijacking Strategy",
    ],
    metricBig: "12.4M",
    metricLabel: "Organic 9:16 Views Generated in 60-Day Sprint",
  },
  LINKEDIN: {
    id: "LINKEDIN",
    tabLabel: "LINKEDIN AUTHORITY",
    client: "VALENCE CAPITAL",
    title: "Executive Personal Brand Engine",
    tagline: "Transforming founder conviction into high-ticket inbound dealflow.",
    synopsis:
      "We ghostwrite contrarian, insight-dense essays and custom framework carousels that position C-suite executives and founders as the unmistakable authorities in their market. No generic corporate fluff—only battle-tested perspective that attracts tier-one clients and investors.",
    deliverables: [
      "Ghostwritten Founder Op-Eds",
      "Visual Intellectual Property Breakdowns",
      "Contrarian Market Thesis Posts",
      "High-Resonance Carousel Decks",
    ],
    metricBig: "+$1.4M",
    metricLabel: "Attributed Inbound Pipeline from Organic LinkedIn",
  },
  TWITTER: {
    id: "TWITTER",
    tabLabel: "X / TWITTER THREADS",
    client: "SYNDICATE LABS",
    title: "Category Culture & Viral Threads",
    tagline: "Contrarian takes that capture tech culture and founder mindshare.",
    synopsis:
      "X (Twitter) is where ideas originate before trickling down to the rest of the web. We craft razor-sharp single-sentence hooks, multi-part intellectual threads, and cultural commentaries that amass thousands of bookmarks and establish category-defining status.",
    deliverables: [
      "High-Retention Deep-Dive Threads",
      "Visual Diagram Infographics",
      "Real-Time Culture Pulse Commentary",
      "Newsletter Growth Funnel Architecture",
    ],
    metricBig: "2.4M",
    metricLabel: "Organic Thread Impressions & 4.9K Saves/Bookmarks",
  },
};

export interface SocialSystemsProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  instagramImages?: (string | InstagramPostItem)[];
}

export const SocialSystems = forwardRef<HTMLElement, SocialSystemsProps>(
  ({ headerRef, canvasRef, instagramImages }, ref) => {
    const [activePlatform, setActivePlatform] = useState<PlatformKey>("INSTAGRAM");
    const [viewMode, setViewMode] = useState<"phone" | "expanded">("expanded");
    const [selectedPost, setSelectedPost] = useState<InstagramPostItem | null>(null);
    const [lightboxPost, setLightboxPost] = useState<InstagramPostItem | null>(null);
    const [reelsLiked, setReelsLiked] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Normalize input images to InstagramPostItem array
    const posts: InstagramPostItem[] = (instagramImages || defaultInstagramPosts).map(
      (item, idx) => {
        if (typeof item === "string") {
          return {
            id: `custom-post-${idx}`,
            image: item,
            caption: `IMT Visual Architecture // Asset 0${idx + 1}`,
            likes: `${(10 + idx * 3.4).toFixed(1)}K`,
            comments: `${120 + idx * 45}`,
            isReel: idx % 3 === 0,
          };
        }
        return item;
      },
    );

    const current = platforms[activePlatform];

    return (
      <section ref={ref} id="systems" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>DISTRIBUTION SYSTEMS // 02</span>
            </div>

            <div className={styles.headerRow}>
              <div className={styles.headingBlock}>
                <h2 className={styles.title}>
                  FEEDS DESIGNED FOR CONVERSION.{" "}
                  <span className={styles.titleHighlight}>
                    ENGINEERED FOR ALGORITHMIC DOMINATION.
                  </span>
                </h2>
                <p className={styles.manifestoSubtitle}>
                  We don&apos;t cross-post generic links. We build bespoke content native to the
                  psychology, consumption formats, and algorithmic incentives of each ecosystem.
                </p>
              </div>

              {/* Platform Selector Tabs */}
              <div className={styles.platformTabs} role="tablist" aria-label="Platform selection">
                {(Object.keys(platforms) as PlatformKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activePlatform === key}
                    className={`${styles.tabBtn} ${
                      activePlatform === key ? styles.tabBtnActive : ""
                    }`}
                    onClick={() => {
                      setActivePlatform(key);
                      setSelectedPost(null);
                    }}
                  >
                    {platforms[key].tabLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Showcase Simulator Grid */}
          <div ref={canvasRef} className={styles.simulatorGrid}>
            {/* Left Column: Platform UI Simulator */}
            <div className={styles.feedCanvas}>
              <div className={styles.canvasAmbientGlow} />

              {/* 1. INSTAGRAM POST GRID (DEFAULT & PRIMARY) */}
              {activePlatform === "INSTAGRAM" && (
                <>
                  {/* View Mode Switcher Toggle */}
                  <div className={styles.canvasViewToggle}>
                    <button
                      type="button"
                      className={`${styles.toggleBtn} ${
                        viewMode === "phone" ? styles.toggleBtnActive : ""
                      }`}
                      onClick={() => setViewMode("phone")}
                    >
                      <Smartphone size={13} />
                      <span>PHONE APP</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.toggleBtn} ${
                        viewMode === "expanded" ? styles.toggleBtnActive : ""
                      }`}
                      onClick={() => setViewMode("expanded")}
                    >
                      <Grid3X3 size={13} />
                      <span>EXPANDED GRID</span>
                    </button>
                  </div>

                  {/* A: PHONE APP VIEW */}
                  {viewMode === "phone" ? (
                    <div className={styles.phoneFrame}>
                      {/* Dynamic Island */}
                      <div className={styles.phoneDynamicIsland}>
                        <span className={styles.islandDot} />
                        <span className={styles.islandPill} />
                      </div>

                      {/* Phone Status Bar */}
                      <div className={styles.phoneStatusBar}>
                        <span>9:41</span>
                        <span>5G 100%</span>
                      </div>

                      {/* Instagram App Header */}
                      <div className={styles.igAppHeader}>
                        <div className={styles.igAppHandleGroup}>
                          <span>@imt.agency</span>
                          <span className={styles.igVerifiedBadge}>✓</span>
                        </div>
                        <div className={styles.igAppHeaderIcons}>
                          <Plus size={16} />
                          <Menu size={16} />
                        </div>
                      </div>

                      {/* Scrollable Screen Content */}
                      <div className={styles.phoneScrollArea}>
                        {/* If a post is clicked, display detail view */}
                        {selectedPost ? (
                          <div className={styles.postDetailView}>
                            <div className={styles.detailBackBar}>
                              <button
                                type="button"
                                className={styles.backBtn}
                                onClick={() => setSelectedPost(null)}
                              >
                                <ChevronLeft size={16} />
                                <span>BACK TO GRID</span>
                              </button>
                            </div>

                            <div className={styles.detailPostHeader}>
                              <div className={styles.detailAvatar}>
                                <Image
                                  src="/images/instagram/post-5.png"
                                  alt="IMT Agency"
                                  fill
                                  sizes="32px"
                                  className={styles.igSquareImg}
                                />
                              </div>
                              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                                imt.agency
                              </span>
                            </div>

                            <div className={styles.detailPostMedia}>
                              <Image
                                src={selectedPost.image}
                                alt={selectedPost.caption || "Post Preview"}
                                fill
                                sizes="320px"
                                className={styles.igSquareImg}
                              />
                            </div>

                            <div className={styles.detailActionRail}>
                              <div className={styles.detailLeftActions}>
                                <button type="button" className={styles.detailBtn}>
                                  <Heart size={18} fill="#ff4136" color="#ff4136" />
                                </button>
                                <button type="button" className={styles.detailBtn}>
                                  <MessageCircle size={18} />
                                </button>
                                <button type="button" className={styles.detailBtn}>
                                  <Send size={18} />
                                </button>
                              </div>
                              <button type="button" className={styles.detailBtn}>
                                <Bookmark size={18} />
                              </button>
                            </div>

                            <div className={styles.detailLikesCount}>
                              {selectedPost.likes || "14.2K"} likes
                            </div>

                            <div className={styles.detailCaptionBlock}>
                              <strong style={{ color: "#fff", marginRight: 6 }}>imt.agency</strong>
                              {selectedPost.caption}
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Profile Details Block */}
                            <div className={styles.igProfileBlock}>
                              <div className={styles.igProfileRow}>
                                <div className={styles.igAvatarWrapper}>
                                  <Image
                                    src="/images/instagram/post-5.png"
                                    alt="Profile Avatar"
                                    width={58}
                                    height={58}
                                    className={styles.igAvatarImg}
                                  />
                                </div>
                                <div className={styles.igStatsLedger}>
                                  <div className={styles.igStatCol}>
                                    <span className={styles.igStatVal}>{posts.length}</span>
                                    <span className={styles.igStatLbl}>Posts</span>
                                  </div>
                                  <div className={styles.igStatCol}>
                                    <span className={styles.igStatVal}>218K</span>
                                    <span className={styles.igStatLbl}>Followers</span>
                                  </div>
                                  <div className={styles.igStatCol}>
                                    <span className={styles.igStatVal}>14</span>
                                    <span className={styles.igStatLbl}>Following</span>
                                  </div>
                                </div>
                              </div>

                              <div className={styles.igBioBlock}>
                                <span className={styles.igBioTitle}>
                                  IMT // Social Architecture
                                </span>
                                <span className={styles.igBioTagline}>
                                  Turning attention into compounding pipeline revenue. 🚀
                                </span>
                                <span className={styles.igBioLink}>🔗 imt.agency/audit</span>
                              </div>
                            </div>

                            {/* Story Highlights */}
                            <div className={styles.igHighlightsBar}>
                              {["DROPS", "PROOF", "ATELIER", "VIP"].map((h) => (
                                <div key={h} className={styles.highlightItem}>
                                  <div className={styles.highlightCircle}>{h}</div>
                                  <span className={styles.highlightTitle}>{h}</span>
                                </div>
                              ))}
                            </div>

                            {/* Grid Feed Tabs */}
                            <div className={styles.igTabRow}>
                              <button
                                type="button"
                                className={`${styles.igTabItem} ${styles.igTabActive}`}
                                aria-label="Posts grid tab"
                              >
                                <Grid3X3 size={15} />
                              </button>
                              <button
                                type="button"
                                className={styles.igTabItem}
                                aria-label="Reels tab"
                              >
                                <Film size={15} />
                              </button>
                              <button
                                type="button"
                                className={styles.igTabItem}
                                aria-label="Tagged tab"
                              >
                                <Bookmark size={15} />
                              </button>
                            </div>

                            {/* THE 3-COLUMN INSTAGRAM POST GRID */}
                            <div className={styles.igPostGrid}>
                              {posts.map((post) => (
                                <div
                                  key={post.id}
                                  className={styles.igGridSquare}
                                  onClick={() => setSelectedPost(post)}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => e.key === "Enter" && setSelectedPost(post)}
                                  aria-label="View post"
                                >
                                  <Image
                                    src={post.image}
                                    alt={post.caption || "Instagram grid post"}
                                    fill
                                    sizes="110px"
                                    className={styles.igSquareImg}
                                  />

                                  {post.isReel && (
                                    <div className={styles.igReelBadge}>
                                      <Film size={11} />
                                    </div>
                                  )}

                                  {/* Hover Overlay with Likes & Comments */}
                                  <div className={styles.igSquareOverlay}>
                                    <div className={styles.overlayStat}>
                                      <Heart size={12} fill="#fff" />
                                      <span>{post.likes}</span>
                                    </div>
                                    <div className={styles.overlayStat}>
                                      <MessageCircle size={12} fill="#fff" />
                                      <span>{post.comments}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* B: EXPANDED DESKTOP GRID VIEW (Clean 3x3 Aesthetic Grid) */
                    <div className={styles.expandedGridWrapper}>
                      <div className={styles.expandedGridHeader}>
                        <span className={styles.expandedTitle}>
                          CURATED INSTAGRAM 3X3 GRID REPOSITORY
                        </span>
                        <span className={styles.expandedCount}>
                          {posts.length} ASSETS ARCHITECTED
                        </span>
                      </div>

                      {/* Clean 3x3 Image Grid matching user brand assets */}
                      <div className={styles.expandedPostGrid}>
                        {posts.map((post) => (
                          <div
                            key={post.id}
                            className={styles.expandedGridTile}
                            onClick={() => setLightboxPost(post)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") setLightboxPost(post);
                            }}
                            aria-label={`View ${post.caption || "Instagram post"}`}
                          >
                            <Image
                              src={post.image}
                              alt={post.caption || "Instagram brand asset"}
                              fill
                              sizes="(max-width: 768px) 30vw, 175px"
                              className={styles.expandedTileImg}
                            />

                            {/* Hover Overlay with Likes & Comments */}
                            <div className={styles.expandedTileOverlay}>
                              <div className={styles.overlayStat}>
                                <Heart size={13} fill="#fff" />
                                <span>{post.likes}</span>
                              </div>
                              <div className={styles.overlayStat}>
                                <MessageCircle size={13} fill="#fff" />
                                <span>{post.comments}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Lightbox Modal */}
                  {lightboxPost && (
                    <div
                      className={styles.modalBackdrop}
                      onClick={() => setLightboxPost(null)}
                      role="dialog"
                      aria-modal="true"
                    >
                      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className={styles.modalCloseBtn}
                          onClick={() => setLightboxPost(null)}
                          aria-label="Close modal"
                        >
                          <X size={16} />
                        </button>

                        <div className={styles.modalMedia}>
                          <Image
                            src={lightboxPost.image}
                            alt={lightboxPost.caption || "Instagram post"}
                            fill
                            sizes="(max-width: 768px) 90vw, 480px"
                            className={styles.expandedTileImg}
                          />
                        </div>

                        <div className={styles.modalInfo}>
                          <div className={styles.modalHeader}>
                            <div className={styles.cardAvatar}>
                              <Image
                                src="/images/instagram/post-5.png"
                                alt="IMT Agency"
                                fill
                                sizes="26px"
                                className={styles.expandedTileImg}
                              />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                              imt.agency
                              <span className={styles.cardVerified}>✓</span>
                            </span>
                          </div>

                          <div className={styles.modalCaption}>
                            <strong style={{ color: "#fff", marginRight: 6 }}>imt.agency</strong>
                            {lightboxPost.caption}
                          </div>

                          <div className={styles.modalFooter}>
                            <div className={styles.modalStatsRow}>
                              <span>{lightboxPost.likes} likes</span>
                              <span>{lightboxPost.comments} comments</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 2. TIKTOK & REELS PREVIEW */}
              {activePlatform === "REELS" && (
                <div className={styles.reelsContainer}>
                  <video
                    ref={videoRef}
                    src="/videos/cinema_production_graded.mp4"
                    poster="/images/cinematic_reel_portrait.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.reelsVideo}
                  />

                  <div className={styles.reelsOverlay} />

                  <div className={styles.reelsTopTag}>
                    <TrendingUp size={11} />
                    <span>HOOK RETENTION: 88% AT 3s</span>
                  </div>

                  <div className={styles.reelsSideActions}>
                    <button
                      type="button"
                      className={styles.reelsActionBtn}
                      onClick={() => setReelsLiked((prev) => !prev)}
                      aria-label="Like reel"
                    >
                      <div
                        className={styles.reelsActionIcon}
                        style={{
                          background: reelsLiked ? "rgba(255, 65, 54, 0.25)" : undefined,
                          borderColor: reelsLiked ? "#ff4136" : undefined,
                        }}
                      >
                        <Heart
                          size={17}
                          fill={reelsLiked ? "#ff4136" : "none"}
                          color={reelsLiked ? "#ff4136" : "#fff"}
                        />
                      </div>
                      <span className={styles.reelsActionCount}>
                        {reelsLiked ? "142.5K" : "142.4K"}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={styles.reelsActionBtn}
                      aria-label="View comments"
                    >
                      <div className={styles.reelsActionIcon}>
                        <MessageCircle size={17} />
                      </div>
                      <span className={styles.reelsActionCount}>1,290</span>
                    </button>

                    <button type="button" className={styles.reelsActionBtn} aria-label="Save reel">
                      <div className={styles.reelsActionIcon}>
                        <Bookmark size={17} />
                      </div>
                      <span className={styles.reelsActionCount}>34.8K</span>
                    </button>

                    <button type="button" className={styles.reelsActionBtn} aria-label="Share reel">
                      <div className={styles.reelsActionIcon}>
                        <Share2 size={17} />
                      </div>
                      <span className={styles.reelsActionCount}>18.1K</span>
                    </button>
                  </div>

                  <div className={styles.reelsBottomMeta}>
                    <div className={styles.reelsAuthor}>
                      <span>@hyperion.athletics</span>
                      <span style={{ color: "var(--color-brand-primary, #e8a91a)" }}>✓</span>
                    </div>
                    <p className={styles.reelsCaption}>
                      Most athletes train what looks good in photos. The 1% train what compounds
                      under pressure. #PerformanceArchitecture #HighGrowth
                    </p>
                  </div>
                </div>
              )}

              {/* 3. LINKEDIN AUTHORITY POST */}
              {activePlatform === "LINKEDIN" && (
                <div className={styles.linkedInCard}>
                  <div className={styles.linkedInHeader}>
                    <div className={styles.linkedInAvatar}>
                      <Image
                        src="/images/director_monitor_bts.jpg"
                        alt="Founder Avatar"
                        fill
                        sizes="52px"
                        className={styles.igSquareImg}
                      />
                    </div>
                    <div className={styles.linkedInAuthorInfo}>
                      <span className={styles.linkedInName}>
                        Julian Vance <span style={{ color: "#0077b5" }}>• 1st</span>
                      </span>
                      <span className={styles.linkedInHeadline}>
                        Managing Partner @ Valence Capital | Climate Tech & Category Leaders
                      </span>
                      <span className={styles.linkedInTime}>1d • 🌐 Edited</span>
                    </div>
                  </div>

                  <div className={styles.linkedInBody}>
                    <p className={styles.linkedInHook}>
                      Most venture firms spend millions on PR firms that produce zero qualified
                      inbound dealflow.
                    </p>
                    <p>
                      Here is the 3-step intellectual property framework we used to generate $1.4M
                      in qualified deals without spending a single dollar on paid advertising:
                    </p>
                    <p>
                      1. Never post corporate announcements. Post polarizing conviction.
                      <br />
                      2. Break down complex market mechanics into digestible visual schematics.
                      <br />
                      3. Answer the unspoken questions your tier-one prospects debate in private.
                    </p>

                    <div className={styles.linkedInAssetCard}>
                      <div className={styles.assetCardLeft}>
                        <span className={styles.assetCardTitle}>
                          THE CATEGORY DESIGN MATRIX [PDF DECK]
                        </span>
                        <span className={styles.assetCardSub}>
                          14 Slides • Curated by IMT Growth Systems
                        </span>
                      </div>
                      <Sparkles size={18} color="var(--color-brand-primary, #e8a91a)" />
                    </div>
                  </div>

                  <div className={styles.linkedInStats}>
                    <div className={styles.reactionIcons}>
                      <ThumbsUp size={14} color="#0077b5" />
                      <Lightbulb size={14} color="var(--color-brand-primary, #e8a91a)" />
                      <span>1,842 reactions</span>
                    </div>
                    <span>214 comments • 86 reposts</span>
                  </div>

                  <div className={styles.linkedInActions}>
                    <button type="button" className={styles.linkedInActionBtn}>
                      <ThumbsUp size={15} />
                      <span>Like</span>
                    </button>
                    <button type="button" className={styles.linkedInActionBtn}>
                      <MessageCircle size={15} />
                      <span>Comment</span>
                    </button>
                    <button type="button" className={styles.linkedInActionBtn}>
                      <Repeat2 size={15} />
                      <span>Repost</span>
                    </button>
                    <button type="button" className={styles.linkedInActionBtn}>
                      <Send size={15} />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 4. X / TWITTER THREAD */}
              {activePlatform === "TWITTER" && (
                <div className={styles.xThreadCard}>
                  <div className={styles.xPostHeader}>
                    <div className={styles.xAvatar}>
                      <Image
                        src="/images/director_monitor_bts.jpg"
                        alt="Syndicate Labs"
                        fill
                        sizes="42px"
                        className={styles.igSquareImg}
                      />
                    </div>
                    <div className={styles.xPostMeta}>
                      <div className={styles.xPostNameRow}>
                        <span className={styles.xPostName}>Syndicate Labs</span>
                        <span style={{ color: "var(--color-brand-primary, #e8a91a)" }}>✓</span>
                      </div>
                      <span className={styles.xPostHandle}>@syndicatelabs</span>
                    </div>
                  </div>

                  <p className={styles.xPostText}>
                    The companies winning in 2025 aren&apos;t spending more on ad inventory.
                    <br />
                    <br />
                    They are turning their executive founders into cultural media properties. Here
                    is the exact algorithmic blueprint: 🧵👇
                  </p>

                  <div className={styles.xThreadConnector} />

                  <div className={styles.xPostHeader}>
                    <div className={styles.xAvatar}>
                      <Image
                        src="/images/director_monitor_bts.jpg"
                        alt="Syndicate Labs"
                        fill
                        sizes="42px"
                        className={styles.igSquareImg}
                      />
                    </div>
                    <div className={styles.xPostMeta}>
                      <div className={styles.xPostNameRow}>
                        <span className={styles.xPostName}>Syndicate Labs</span>
                        <span style={{ color: "var(--color-brand-primary, #e8a91a)" }}>✓</span>
                      </div>
                      <span className={styles.xPostHandle}>@syndicatelabs</span>
                    </div>
                  </div>

                  <p className={styles.xPostText}>
                    1/ Algorithmic retention is a solved game.
                    <br />
                    <br />
                    If your opening statement doesn&apos;t create high cognitive dissonance in under
                    140 characters, 94% of readers abandon before the second sentence.
                  </p>

                  <div className={styles.xMetricsRow}>
                    <span>2.4K Reposts</span>
                    <span>412 Quotes</span>
                    <span>18.6K Likes</span>
                    <span>4.9K Bookmarks</span>
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
                <span className={styles.deliverablesHeading}>SYSTEM DELIVERABLES</span>
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
                <span>DEPLOY THIS ENGINE FOR YOUR BRAND</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Bottom Global Performance Strip */}
          <div className={styles.performanceStrip}>
            <div className={styles.stripItem}>
              <span className={`${styles.stripStat} ${styles.stripStatAccent}`}>140M+</span>
              <span className={styles.stripLabel}>
                Total organic video impressions engineered across client channels.
              </span>
            </div>

            <div className={styles.stripItem}>
              <span className={styles.stripStat}>18.4%</span>
              <span className={styles.stripLabel}>
                Average hook retention benchmark (comfortably in top 1% algorithmic tier).
              </span>
            </div>

            <div className={styles.stripItem}>
              <span className={`${styles.stripStat} ${styles.stripStatAccent}`}>4.2x</span>
              <span className={styles.stripLabel}>
                Average increase in qualified inbound leads within 90 days of onboarding.
              </span>
            </div>

            <div className={styles.stripItem}>
              <span className={styles.stripStat}>99.2%</span>
              <span className={styles.stripLabel}>
                Founder voice alignment rating across all ghostwritten content and video scripts.
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

SocialSystems.displayName = "SocialSystems";
export default SocialSystems;
