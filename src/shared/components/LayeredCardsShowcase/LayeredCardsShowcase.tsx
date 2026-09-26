"use client";

import { forwardRef } from "react";
import styles from "./LayeredCardsShowcase.module.css";
import { defaultLayeredCardsData, CardMediaItem, LayeredCardsSet } from "./layeredCardsData";
import { ServiceType } from "@/shared/components/ServiceProcess";

export interface LayeredCardsShowcaseProps {
  /** Service preset to load images and watermark text from (defaults to "video-shoots") */
  service?: ServiceType;
  /** Center card media override */
  center?: CardMediaItem;
  /** Top-right card media override */
  topRight?: CardMediaItem;
  /** Bottom-left card media override */
  bottomLeft?: CardMediaItem;
  /** Custom watermark text behind cards */
  watermarkText?: string;
  /** Whether to render the large watermark text */
  showWatermark?: boolean;
  /** Whether to render the blueprint grid pattern */
  showGrid?: boolean;
  /** Whether to render the ambient warm glow behind cards */
  showGlow?: boolean;
  /** Additional container CSS class */
  className?: string;
  /** Optional container element ID */
  id?: string;
}

/**
 * LayeredCardsShowcase
 *
 * Cinematic 3-card floating composition.
 * The root element receives `ref` and its direct children are strictly:
 * - children[0]: cardTopRight (animates from top-right)
 * - children[1]: cardCenter   (animates from bottom)
 * - children[2]: cardBottomLeft (animates from bottom-left)
 *
 * This guarantees 100% compatibility with parent GSAP timeline entrance animations.
 */
export const LayeredCardsShowcase = forwardRef<HTMLDivElement, LayeredCardsShowcaseProps>(
  (
    {
      service = "video-shoots",
      center: centerOverride,
      topRight: topRightOverride,
      bottomLeft: bottomLeftOverride,
      watermarkText: watermarkOverride,
      showWatermark = false,
      showGrid = false,
      showGlow = false,
      className,
      id,
    },
    ref,
  ) => {
    const preset: LayeredCardsSet =
      defaultLayeredCardsData[service] || defaultLayeredCardsData["video-shoots"];

    const centerCard = centerOverride || preset.center;
    const topRightCard = topRightOverride || preset.topRight;
    const bottomLeftCard = bottomLeftOverride || preset.bottomLeft;
    const activeWatermark =
      watermarkOverride !== undefined ? watermarkOverride : preset.watermarkText;

    return (
      <div
        ref={ref}
        id={id}
        data-watermark={showWatermark && activeWatermark ? activeWatermark : undefined}
        data-grid={showGrid ? "true" : undefined}
        data-glow={showGlow ? "true" : undefined}
        className={`${styles.cardsComposition} ${className || ""}`.trim()}
      >
        {/* Child 0 for GSAP: Top-Right BTS Frame */}
        <div className={styles.cardTopRight}>
          <div className={styles.cardMediaWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={topRightCard.src} alt={topRightCard.alt} className={styles.cardImage} />
            <div className={styles.cardShade} />
          </div>
        </div>

        {/* Child 1 for GSAP: Center Main Hero Cine Frame */}
        <div className={styles.cardCenter}>
          <div className={styles.cardMediaWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={centerCard.src} alt={centerCard.alt} className={styles.cardImage} />
            <div className={styles.cardShade} />
            <div className={styles.centerCardGlow} />
          </div>
        </div>

        {/* Child 2 for GSAP: Bottom-Left Foreground Frame */}
        <div className={styles.cardBottomLeft}>
          <div className={styles.cardMediaWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bottomLeftCard.src} alt={bottomLeftCard.alt} className={styles.cardImage} />
            <div className={styles.cardShade} />
          </div>
        </div>
      </div>
    );
  },
);

LayeredCardsShowcase.displayName = "LayeredCardsShowcase";
export default LayeredCardsShowcase;
