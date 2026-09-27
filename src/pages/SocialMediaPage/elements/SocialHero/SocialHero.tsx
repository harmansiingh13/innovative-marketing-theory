"use client";

import { forwardRef, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./SocialHero.module.css";
import {
  ArrowDown,
  ArrowUpRight,
  TrendingUp,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Music,
} from "lucide-react";
import { Button } from "@/shared/components/Button";

export interface SocialHeroProps {
  headingKickerRef?: React.RefObject<HTMLDivElement | null>;
  headingTitleRef?: React.RefObject<HTMLHeadingElement | null>;
  headingAsideRef?: React.RefObject<HTMLDivElement | null>;
  commandCenterRef?: React.RefObject<HTMLDivElement | null>;
  valueLedgerRef?: React.RefObject<HTMLDivElement | null>;
}

export const SocialHero = forwardRef<HTMLElement, SocialHeroProps>(
  (
    { headingKickerRef, headingTitleRef, headingAsideRef, commandCenterRef, valueLedgerRef },
    ref,
  ) => {
    const router = useRouter();

    const handleConnectClick = () => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        router.push("/#contact");
      }
    };

    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
      if (!videoRef.current) return;
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleLikeToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsLiked((prev) => !prev);
    };

    return (
      <section ref={ref} id="about" className={styles.heroSection}>
        {/* Subtle Architectural Blueprint Grid */}
        <div className={styles.gridPattern} />

        {/* Massive Ghost Watermark Typography */}
        <div className={styles.ghostWatermark} aria-hidden="true">
          SOCIAL ARCHITECTURE
        </div>

        {/* Ambient Top Glow */}
        <div className={styles.backgroundGlowTop} />

        <div className={styles.container}>
          {/* Main Hero Showcase Row */}
          <div className={styles.heroMainRow}>
            {/* Left Column: Typography & Actions */}
            <div className={styles.leftColumn}>

              <h1 ref={headingTitleRef} className={styles.headline}>
                <span className={styles.headlineLine}>WE DON&apos;T POST.</span>
                <span className={styles.headlineLine}>WE BUILD</span>
                <span className={`${styles.headlineLine} ${styles.accentLine}`}>
                  CULT FOLLOWINGS.
                </span>
              </h1>

              <div ref={headingAsideRef} className={styles.asideBlock}>
                <p className={styles.description}>
                  Beyond vanity likes. We engineer algorithmic authority, high-cadence narrative
                  distribution, and deep community retention that turns casual scrollers into
                  diehard brand evangelists and compounding pipeline revenue.
                </p>

                <div className={styles.actionsRow}>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    shape="pill"
                    rightIcon={<ArrowUpRight className={styles.ctaArrow} />}
                    onClick={handleConnectClick}
                  >
                    Let&apos;s Connect
                  </Button>

                  <Button
                    variant="outline"
                    shape="pill"
                    type="button"
                    size="lg"
                    rightIcon={<ArrowDown className={styles.secondaryArrow} />}
                    onClick={() => {
                      document.getElementById("process")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Explore Our Approach
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Smartphone Mockup */}
            <div ref={commandCenterRef} className={styles.phoneWrapper}>
              <div className={styles.phoneFloatingGlow} />

              <div className={styles.phoneFrame}>
                {/* Dynamic Island */}
                <div className={styles.dynamicIsland}>
                  <span className={styles.islandDot} />
                  <span className={styles.islandWave} />
                </div>

                {/* Status Bar */}
                <div className={styles.phoneStatusBar}>
                  <span>9:41</span>
                  <span>5G 100%</span>
                </div>

                {/* Interactive Phone Screen */}
                <div
                  className={styles.phoneScreen}
                  onClick={togglePlay}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && togglePlay()}
                  aria-label={isPlaying ? "Pause reel playback" : "Play reel playback"}
                >
                  <video
                    ref={videoRef}
                    src="/videos/cinema_production_graded.mp4"
                    poster="/images/cinematic_reel_portrait.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.reelVideo}
                  />

                  {/* Gradient Screen Vignette */}
                  <div className={styles.screenOverlay} />

                  {/* Viral Metric Badge */}
                  <div className={styles.viralBadge}>
                    <TrendingUp size={11} />
                    <span>+412% 90-DAY REACH</span>
                  </div>

                  {/* Social Actions Rail */}
                  <div className={styles.socialActionsRail} onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className={`${styles.actionBtn} ${isLiked ? styles.actionLiked : ""}`}
                      onClick={handleLikeToggle}
                      aria-label="Like reel"
                    >
                      <div className={styles.actionIconWrap}>
                        <Heart
                          size={18}
                          fill={isLiked ? "#ff4136" : "none"}
                          color={isLiked ? "#ff4136" : "#fff"}
                        />
                      </div>
                      <span className={styles.actionCount}>{isLiked ? "1.4M" : "1.39M"}</span>
                    </button>

                    <button type="button" className={styles.actionBtn} aria-label="View comments">
                      <div className={styles.actionIconWrap}>
                        <MessageCircle size={18} />
                      </div>
                      <span className={styles.actionCount}>3,480</span>
                    </button>

                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => setIsSaved((prev) => !prev)}
                      aria-label="Save reel"
                    >
                      <div className={styles.actionIconWrap}>
                        <Bookmark
                          size={18}
                          fill={isSaved ? "var(--color-brand-primary, #e8a91a)" : "none"}
                          color={isSaved ? "var(--color-brand-primary, #e8a91a)" : "#fff"}
                        />
                      </div>
                      <span className={styles.actionCount}>{isSaved ? "89.1K" : "89K"}</span>
                    </button>

                    <button type="button" className={styles.actionBtn} aria-label="Share reel">
                      <div className={styles.actionIconWrap}>
                        <Share2 size={18} />
                      </div>
                      <span className={styles.actionCount}>24.5K</span>
                    </button>
                  </div>

                  {/* Reel Info Bottom */}
                  <div className={styles.reelInfoBottom}>
                    <div className={styles.creatorTag}>
                      <span>@imt.agency</span>
                      <span className={styles.verifiedBadge}>✓</span>
                    </div>

                    <p className={styles.reelCaption}>
                      Organic distribution isn&apos;t luck. It&apos;s mathematical hook engineering
                      and contrarian brand narrative. #SocialArchitecture
                    </p>

                    <div className={styles.audioTrackBar}>
                      <Music size={11} />
                      <span>Original Sound — IMT Growth Lab</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Value Ledger: 3 Value Pillars */}
          <div ref={valueLedgerRef} className={styles.valueLedger}>
            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>01 ALGORITHMIC VELOCITY</span>
              </div>
              <h3 className={styles.ledgerTitle}>Multi-Channel Daily Choreography</h3>
              <p className={styles.ledgerDesc}>
                We tailor your message to the exact algorithmic incentives of TikTok, Instagram
                Reels, LinkedIn, and YouTube Shorts to trigger organic compounding distribution.
              </p>
            </div>

            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>02 CULT BRAND NARRATIVE</span>
              </div>
              <h3 className={styles.ledgerTitle}>Polarizing Intellectual IP</h3>
              <p className={styles.ledgerDesc}>
                No hollow corporate jargon. We distill your founder conviction into an unmistakable
                brand voice, contrarian perspectives, and frameworks that define the category.
              </p>
            </div>

            <div className={styles.ledgerCard}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerNumber}>03 CONVERSION ARCHITECTURE</span>
              </div>
              <h3 className={styles.ledgerTitle}>Attention into Pipeline</h3>
              <p className={styles.ledgerDesc}>
                Viral impressions without business results are useless. We construct organic
                funnels, lead magnets, and DM automation that turn viewers into paying clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

SocialHero.displayName = "SocialHero";
export default SocialHero;
