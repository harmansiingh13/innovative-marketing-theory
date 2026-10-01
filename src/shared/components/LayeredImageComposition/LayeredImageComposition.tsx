"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./LayeredImageComposition.module.css";
import { LayeredImageCompositionProps, CompositionImage, CompositionImageInput } from "./types";

/**
 * High-quality curated default images matching the 4-frame showcase:
 * 0: Retro Tech Workstation (Center Main Frame)
 * 1: Wireframe Sketches & UI Architecture (Bottom-Left Foreground)
 * 2: Code Editor & Engineering (Top-Right Secondary)
 * 3: Modern Architecture & Space (Bottom-Right Background)
 */
export const DEFAULT_COMPOSITION_IMAGES: CompositionImage[] = [
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
    alt: "Strategic Digital Flagship & Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
    alt: "Wireframes and Interface UX Blueprint",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    alt: "Full Stack High-Performance Code",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    alt: "Scalable Digital Ecosystem",
  },
];

function normalizeImage(
  input: CompositionImageInput | undefined,
  fallback: CompositionImage,
): CompositionImage {
  if (!input) return fallback;
  if (typeof input === "string") {
    return { src: input, alt: fallback.alt, badge: fallback.badge };
  }
  return {
    src: input.src || fallback.src,
    alt: input.alt || fallback.alt,
    badge: input.badge !== undefined ? input.badge : fallback.badge,
  };
}

/**
 * LayeredImageComposition
 *
 * A reusable, cinematic 4-card overlapping photo composition with
 * interactive hover elevation, optional blueprint grid, ambient glow,
 * faint watermark text, and mouse parallax.
 */
export const LayeredImageComposition = forwardRef<HTMLDivElement, LayeredImageCompositionProps>(
  (
    {
      images,
      mainImage,
      bottomLeftImage,
      topRightImage,
      bottomRightImage,
      watermarkText,
      showGrid = true,
      showGlow = true,
      enableParallax = true,
      className,
      id,
      style,
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const containerRef = (ref as React.RefObject<HTMLDivElement | null>) || internalRef;
    const framesRef = useRef<HTMLDivElement>(null);

    // Resolve the 4 frames using direct overrides, array items, or fallbacks
    const frame0 = normalizeImage(
      mainImage || (images && images[0]),
      DEFAULT_COMPOSITION_IMAGES[0],
    );
    const frame1 = normalizeImage(
      bottomLeftImage || (images && images[1]),
      DEFAULT_COMPOSITION_IMAGES[1],
    );
    const frame2 = normalizeImage(
      topRightImage || (images && images[2]),
      DEFAULT_COMPOSITION_IMAGES[2],
    );
    const frame3 = normalizeImage(
      bottomRightImage || (images && images[3]),
      DEFAULT_COMPOSITION_IMAGES[3],
    );

    const resolvedFrames = [
      { item: frame0, className: styles.frameMain, key: "main" },
      { item: frame1, className: styles.frameReel, key: "reel" },
      { item: frame2, className: styles.frameTop, key: "top" },
      { item: frame3, className: styles.frameBackground, key: "bg" },
    ];

    // Subtle Parallax Effect on Hover
    useEffect(() => {
      if (!enableParallax) return;
      const container = containerRef.current;
      const stage = framesRef.current;
      if (!container || !stage) return;

      const xTo = gsap.quickTo(stage, "x", { duration: 0.6, ease: "power2.out" });
      const yTo = gsap.quickTo(stage, "y", { duration: 0.6, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        xTo(relX * 6);
        yTo(relY * 4);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [enableParallax, containerRef]);

    return (
      <div
        ref={containerRef}
        id={id}
        className={`${styles.compositionWrapper} ${className || ""}`.trim()}
        style={style}
      >
        {/* Optional Ambient Glow */}
        {showGlow && <div className={styles.backgroundGlow} />}

        {/* Optional Blueprint Grid Lines */}
        {showGrid && <div className={styles.gridOverlay} />}

        {/* Optional Watermark Typography Behind Cards */}
        {watermarkText && (
          <div className={styles.backgroundWatermark}>
            <span>{watermarkText.toUpperCase()}</span>
          </div>
        )}

        {/* Overlapping Card Frames Stage */}
        <div ref={framesRef} className={styles.framesContainer}>
          {resolvedFrames.map(({ item, className: framePosClass, key }) => (
            <div key={key} className={`${styles.artFrame} ${framePosClass}`}>
              <div className={styles.cardMediaWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt || "Portfolio visual"}
                  className={styles.frameImage}
                  loading="lazy"
                />
                <div className={styles.frameOverlay} />
                public/videos/hero_background_1.mp4
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

LayeredImageComposition.displayName = "LayeredImageComposition";

// Export primary name and convenience aliases
export const OverlappingCards = LayeredImageComposition;
export const LayeredComposition = LayeredImageComposition;

export default LayeredImageComposition;
