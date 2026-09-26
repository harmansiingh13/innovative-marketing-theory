"use client";

import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import styles from "./CaptureToCinema.module.css";
import { SlidersHorizontal, Sparkles, Camera, Play, Pause } from "lucide-react";

export interface CaptureToCinemaProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  videoSrc?: string;
  rawImageSrc?: string;
  gradedImageSrc?: string;
}

export const CaptureToCinema = forwardRef<HTMLElement, CaptureToCinemaProps>(
  ({ headerRef, canvasRef, videoSrc, rawImageSrc, gradedImageSrc }, ref) => {
    const [sliderPos, setSliderPos] = useState(52); // Percentage 0 - 100
    const [isDragging, setIsDragging] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const gradedVideoRef = useRef<HTMLVideoElement>(null);
    const rawVideoRef = useRef<HTMLVideoElement>(null);

    // Fallback high-fidelity cinematography assets
    const activeVideoSrc = videoSrc || "/videos/cinema_production_graded.mp4";
    const defaultGraded = gradedImageSrc || "/images/cinema_production_graded.jpg";
    const defaultRaw = rawImageSrc || defaultGraded;

    // Synchronize both video layers in lockstep
    useEffect(() => {
      const v1 = gradedVideoRef.current;
      const v2 = rawVideoRef.current;
      if (!v1 || !v2) return;

      const syncTime = () => {
        if (Math.abs(v1.currentTime - v2.currentTime) > 0.04) {
          v2.currentTime = v1.currentTime;
        }
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      v1.addEventListener("timeupdate", syncTime);
      v1.addEventListener("play", handlePlay);
      v1.addEventListener("pause", handlePause);

      // Autoplay both muted videos
      v1.play().catch(() => {});
      v2.play().catch(() => {});

      return () => {
        v1.removeEventListener("timeupdate", syncTime);
        v1.removeEventListener("play", handlePlay);
        v1.removeEventListener("pause", handlePause);
      };
    }, []);

    const togglePlay = () => {
      const v1 = gradedVideoRef.current;
      const v2 = rawVideoRef.current;
      if (!v1 || !v2) return;

      if (v1.paused) {
        v1.play().catch(() => {});
        v2.play().catch(() => {});
        setIsPlaying(true);
      } else {
        v1.pause();
        v2.pause();
        setIsPlaying(false);
      }
    };

    const updateSliderPosition = useCallback((clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      updateSliderPosition(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging) {
        setIsDragging(false);
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        setSliderPos((prev) => Math.max(0, prev - 5));
      } else if (e.key === "ArrowRight") {
        setSliderPos((prev) => Math.min(100, prev + 5));
      }
    };

    return (
      <section ref={ref} id="transformation" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>THE TRANSFORMATION ENGINE</span>
            </div>

            <div className={styles.headerRow}>
              <div className={styles.headingBlock}>
                <h2 className={styles.title}>
                  From Capture
                  <span className={styles.arrowSymbol}> → </span>
                  <span>To Cinema.</span>
                </h2>
                <p className={styles.manifestoQuote}>
                  &ldquo;Every frame starts with an idea. We turn it into something worth
                  remembering.&rdquo;
                </p>
              </div>

              <div className={styles.headerControls}>
                <div className={styles.modePills}>
                  {/* Play / Pause Toggle */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className={`${styles.pillBtn} ${isPlaying ? styles.pillLive : ""}`}
                    aria-label={
                      isPlaying ? "Pause cinematic reel motion" : "Play cinematic reel motion"
                    }
                  >
                    {isPlaying ? <Pause size={11} /> : <Play size={11} />}
                    <span>{isPlaying ? "LIVE MOTION" : "PAUSED"}</span>
                  </button>

                  <div className={styles.pillDivider} />

                  <button
                    type="button"
                    onClick={() => setSliderPos(15)}
                    className={`${styles.pillBtn} ${sliderPos <= 20 ? styles.pillActive : ""}`}
                    aria-label="Show original capture"
                  >
                    <Camera size={11} />
                    <span>RAW LOG</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSliderPos(50)}
                    className={`${styles.pillBtn} ${sliderPos > 20 && sliderPos < 80 ? styles.pillActive : ""}`}
                    aria-label="Split 50/50 view"
                  >
                    <SlidersHorizontal size={11} />
                    <span>50/50</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSliderPos(85)}
                    className={`${styles.pillBtn} ${sliderPos >= 80 ? styles.pillActive : ""}`}
                    aria-label="Show cinema master grade"
                  >
                    <Sparkles size={11} />
                    <span>CINEMA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Cinema Comparison Canvas */}
          <div ref={canvasRef} className={styles.canvasOuterWrapper}>
            <div
              ref={containerRef}
              className={`${styles.comparisonContainer} ${isDragging ? styles.isDragging : ""}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={handleKeyDown}
              role="slider"
              tabIndex={0}
              aria-label="Interactive reveal comparing original camera capture to final cinema grade in real-time motion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPos)}
            >
              {/* Corner Crop Marks */}
              <span className={styles.cropMarkTopLeft}>⌜</span>
              <span className={styles.cropMarkTopRight}>⌝</span>
              <span className={styles.cropMarkBottomLeft}>⌞</span>
              <span className={styles.cropMarkBottomRight}>⌟</span>

              {/* 1. Underlying Layer: FINAL CINEMATIC MASTER GRADE (Synchronized Live Video) */}
              <div className={styles.gradedLayer}>
                <video
                  ref={gradedVideoRef}
                  src={activeVideoSrc}
                  poster={defaultGraded}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.comparisonMedia}
                />
                <div className={styles.gradedOverlay} />

                {/* Right Bottom Telemetry Tag */}
                <div className={styles.gradedTelemetryBadge}>
                  <div className={styles.telemetryDotGold} />
                  <span>OUTPUT: 4K DCI MASTER GRADE // 35MM ANAMORPHIC</span>
                </div>
              </div>

              {/* 2. Overlying Layer: ORIGINAL FLAT SENSOR LOG CAPTURE (Synchronized Live Video with Sensor LOG Profile) */}
              <div
                className={styles.rawLayer}
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <video
                  ref={rawVideoRef}
                  src={activeVideoSrc}
                  poster={defaultRaw}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`${styles.comparisonMedia} ${styles.rawLogFilter}`}
                />
                <div className={styles.rawGridOverlay} />

                {/* Left Bottom Telemetry Tag */}
                <div className={styles.rawTelemetryBadge}>
                  <div className={styles.telemetryDotMuted} />
                  <span>SOURCE: ARRI RAW LOG 3200K // FLAT PROFILE</span>
                </div>
              </div>

              {/* 3. Gold Precision Wipe Divider Hairline & Handle */}
              <div className={styles.sliderDivider} style={{ left: `${sliderPos}%` }}>
                <div className={styles.goldLine} />

                <div className={styles.sliderHandle}>
                  <span className={styles.handleArrowLeft}>‹</span>
                  <span className={styles.handleKnobGlow} />
                  <span className={styles.handleArrowRight}>›</span>
                </div>

                <div className={styles.percentBadge}>
                  <span>{Math.round(sliderPos)}%</span>
                </div>
              </div>

              {/* Top Status Bar: HUD Indicators */}
              <div className={styles.topHud}>
                <div className={styles.hudLeftTag}>
                  <span className={styles.hudDot} />
                  <span>SENSOR CAPTURE (FLAT)</span>
                </div>
                <div className={styles.hudInstruction}>
                  <span>DRAG OR TAP TO COMPARE REAL-TIME MOTION</span>
                </div>
                <div className={styles.hudRightTag}>
                  <span>CINEMA GRADE (MASTER)</span>
                  <span className={styles.hudDotGold} />
                </div>
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className={styles.canvasFooterBar}>
              <div className={styles.footerNote}>
                <span className={styles.notePrefix}>PRODUCTION REALITY:</span>
                <span>
                  Un-graded sensor capture preserves raw dynamic range. IMT sculpts color science,
                  lighting rolloff, and spatial atmosphere to forge brand prestige in motion.
                </span>
              </div>
              <div className={styles.focalReadout}>
                <span>COLOR SCIENCE // DAVINCI WIDE GAMUT 24 FPS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

CaptureToCinema.displayName = "CaptureToCinema";
export default CaptureToCinema;
