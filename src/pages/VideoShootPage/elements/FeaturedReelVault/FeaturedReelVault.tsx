"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedReelVault.module.css";
import { Play, Pause, Volume2, VolumeX, ArrowUpRight, Sparkles } from "lucide-react";

export interface ProjectReel {
  id: string;
  category: "BRAND ANTHEMS" | "COMMERCIALS" | "FOUNDER STORIES" | "PRODUCT CINEMA";
  client: string;
  title: string;
  tagline: string;
  synopsis: string;
  deliverable: string;
  runtime: string;
  timecode: string;
  optics: string;
  metric: string;
  metricLabel: string;
  videoSrc: string;
  posterSrc: string;
  year: string;
}

export const featuredProjects: ProjectReel[] = [
  {
    id: "proj-01",
    category: "BRAND ANTHEMS",
    client: "AETHER DYNAMICS",
    title: "The Velocity Anthem",
    tagline: "A monumental cinematic launch film for hypersonic private aerospace.",
    synopsis:
      "Capturing raw propulsion and quiet precision across 3 days of soundstage and desert runway shoots, engineered to establish immediate category supremacy.",
    deliverable: "4K Master Anthem // 60s TVC // 30s Cutdowns",
    runtime: "01:45",
    timecode: "TC 00:01:45:12",
    optics: "ARRI ALEXA MINI LF // COOKE ANAMORPHIC /I",
    metric: "+340%",
    metricLabel: "Executive Engagement vs. Baseline",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinema_production_graded.jpg",
    year: "2024",
  },
  {
    id: "proj-02",
    category: "PRODUCT CINEMA",
    client: "KALLISTO HOROLOGY",
    title: "Sculpted in Shadow",
    tagline: "Ultra-high-definition tactile macro cinematography for haute horlogerie.",
    synopsis:
      "Precision probe lenses and controlled rim-lighting revealing hand-finished tourbillon escapements with museum-grade visual drama.",
    deliverable: "Global Product Campaign // Macro 4K Digital Master",
    runtime: "00:50",
    timecode: "TC 00:00:50:00",
    optics: "RED V-RAPTOR 8K // LAOWA 24MM PROBE // KEY LIGHT RIG",
    metric: "4.2M",
    metricLabel: "Organic Views in Launch Week",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinematic_reel_portrait.jpg",
    year: "2024",
  },
  {
    id: "proj-03",
    category: "COMMERCIALS",
    client: "VERVE AUDIO LABS",
    title: "Sonic Architecture",
    tagline: "A high-cadence commercial capturing acoustic physics and pure resonance.",
    synopsis:
      "Synchronized high-speed optical capture paired with spatial lighting choreography, crafting visceral desire for luxury acoustic monitoring systems.",
    deliverable: "Broadcast TVC // 30s & 15s Performance Assets",
    runtime: "01:10",
    timecode: "TC 00:01:10:08",
    optics: "SONY VENICE 2 // ZEISS MASTER PRIMES T1.3",
    metric: "+185%",
    metricLabel: "Direct ROAS on Paid Digital Broadcast",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/director_monitor_bts.jpg",
    year: "2023",
  },
  {
    id: "proj-04",
    category: "FOUNDER STORIES",
    client: "KINESIS PROTOCOL",
    title: "The Architect's Monologue",
    tagline: "An intimate, docu-style founder portrait illuminating visionary engineering.",
    synopsis:
      "Nuanced lighting, vintage cinema glass, and unscripted conviction crafting unquestioned authority for a disruptive Silicon Valley technology founder.",
    deliverable: "Series Keynote // Long-Form Brand Documentary",
    runtime: "02:15",
    timecode: "TC 00:02:15:18",
    optics: "ARRI AMIRA // CANON K35 VINTAGE PRIMES",
    metric: "94%",
    metricLabel: "Average Audience Completion Rate",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinema_production_graded.jpg",
    year: "2024",
  },
];

type CategoryFilter =
  "ALL" | "BRAND ANTHEMS" | "COMMERCIALS" | "FOUNDER STORIES" | "PRODUCT CINEMA";

const filterOptions: CategoryFilter[] = [
  "ALL",
  "BRAND ANTHEMS",
  "COMMERCIALS",
  "FOUNDER STORIES",
  "PRODUCT CINEMA",
];

export interface FeaturedReelVaultProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const FeaturedReelVault = forwardRef<HTMLElement, FeaturedReelVaultProps>(
  ({ headerRef, canvasRef }, ref) => {
    const [activeFilter, setActiveFilter] = useState<CategoryFilter>("ALL");
    const [selectedProject, setSelectedProject] = useState<ProjectReel>(featuredProjects[0]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);

    // Auto-update video source when project changes
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, [selectedProject]);

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

    const toggleMute = () => {
      if (!videoRef.current) return;
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    };

    const filteredProjects =
      activeFilter === "ALL"
        ? featuredProjects
        : featuredProjects.filter((p) => p.category === activeFilter);

    return (
      <section ref={ref} id="showreel" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>THE SHOWREEL VAULT</span>
            </div>

            <div className={styles.headerRow}>
              <div className={styles.headingBlock}>
                <h2 className={styles.title}>
                  Cinematic Works in Motion.{" "}
                  <span className={styles.titleHighlight}>Built for High-Stakes Brands.</span>
                </h2>
                <p className={styles.manifestoSubtitle}>
                  From commercial broadcasts to intimate founder portraits. Every frame is
                  engineered with precision lighting, cinema glass, and narrative authority that
                  converts.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className={styles.filterTabs} role="tablist" aria-label="Reel categories">
                {filterOptions.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === cat}
                    className={`${styles.filterBtn} ${
                      activeFilter === cat ? styles.filterBtnActive : ""
                    }`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Cinema Theater */}
          <div ref={canvasRef} className={styles.theaterWrapper}>
            <div className={styles.theaterFrame}>
              <video
                ref={videoRef}
                src={selectedProject.videoSrc}
                poster={selectedProject.posterSrc}
                autoPlay
                muted
                loop
                playsInline
                className={styles.theaterVideo}
              />

              {/* Cinematic Vignette */}
              <div className={styles.theaterVignette} />

              {/* Corner Crop Marks */}
              <span className={styles.cropMarkTopLeft}>⌜</span>
              <span className={styles.cropMarkTopRight}>⌝</span>
              <span className={styles.cropMarkBottomLeft}>⌞</span>
              <span className={styles.cropMarkBottomRight}>⌟</span>

              {/* Center Play Button Overlay (when paused) */}
              {!isPlaying && (
                <div className={styles.theaterCenterControls}>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className={styles.centerPlayBtn}
                    aria-label="Play video"
                  >
                    <Play size={28} />
                  </button>
                </div>
              )}

              {/* Bottom HUD Overlay */}
              <div className={styles.theaterHudBottom}>
                <div className={styles.hudActiveDetails}>
                  <span className={styles.hudCategoryTag}>
                    {selectedProject.category} {"//"} {selectedProject.year}
                  </span>
                  <h3 className={styles.hudProjectTitle}>{selectedProject.title}</h3>
                </div>

                <div className={styles.hudControlsRow}>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className={styles.hudControlBtn}
                    aria-label={isPlaying ? "Pause reel" : "Play reel"}
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                    <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className={styles.hudControlBtn}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    <span>{isMuted ? "UNMUTE" : "MUTED"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Theater Information Ledger */}
            <div className={styles.theaterMetaRow}>
              <div className={styles.metaColLead}>
                <span className={styles.metaColLabel}>DIRECTOR&apos;S TREATMENT & SYNOPSIS</span>
                <p className={styles.metaColValue}>{selectedProject.synopsis}</p>
              </div>

              <div className={styles.metaColStat}>
                <span className={styles.statHighlight}>{selectedProject.metric}</span>
                <span className={styles.statLabel}>{selectedProject.metricLabel}</span>
              </div>

              <div className={styles.metaColStat}>
                <span className={styles.statHighlight}>{selectedProject.runtime}</span>
                <span className={styles.statLabel}>{selectedProject.deliverable}</span>
              </div>
            </div>

            {/* Project Cards Vault Grid */}
            <div className={styles.vaultSection}>
              <div className={styles.vaultHeader}>
                <span className={styles.vaultTitle}>
                  SELECT FILM TO PREVIEW IN THEATER ({filteredProjects.length} REELS)
                </span>
              </div>

              <div className={styles.vaultGrid}>
                {filteredProjects.map((project) => {
                  const isActive = project.id === selectedProject.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className={`${styles.projectCard} ${
                        isActive ? styles.projectCardActive : ""
                      }`}
                      aria-pressed={isActive}
                      aria-label={`Select ${project.title}`}
                    >
                      <div className={styles.cardThumbnailWrapper}>
                        <Image
                          src={project.posterSrc}
                          alt={project.title}
                          width={480}
                          height={270}
                          className={styles.cardThumbnail}
                        />
                        {isActive && <div className={styles.cardActiveOverlay} />}
                        <span className={styles.cardRuntimeBadge}>{project.runtime}</span>
                        {isActive && (
                          <div className={styles.cardPlayingIndicator}>
                            <Sparkles size={9} />
                            <span>ON SCREEN</span>
                          </div>
                        )}
                      </div>

                      <div className={styles.cardContent}>
                        <span className={styles.cardCategory}>{project.category}</span>
                        <h4 className={styles.cardTitle}>{project.title}</h4>
                        <div className={styles.cardMetaRow}>
                          <span className={styles.cardClient}>{project.client}</span>
                          <span className={styles.cardResultHighlight}>{project.metric}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Studio Impact Metrics Bar */}
            <div className={styles.studioImpactBar}>
              <div className={styles.impactItem}>
                <span className={styles.impactValue}>
                  100<span>%</span>
                </span>
                <span className={styles.impactTitle}>Bespoke Cinematography</span>
                <p className={styles.impactDesc}>
                  Zero stock footage. Every shot is custom lighted, blocked, and filmed on location.
                </p>
              </div>

              <div className={styles.impactItem}>
                <span className={styles.impactValue}>
                  4K <span>DCI</span>
                </span>
                <span className={styles.impactTitle}>Cinema HDR Mastering</span>
                <p className={styles.impactDesc}>
                  DaVinci Wide Gamut color science formatted for broadcast, web, and ultra-large
                  displays.
                </p>
              </div>

              <div className={styles.impactItem}>
                <span className={styles.impactValue}>
                  8.4<span>M+</span>
                </span>
                <span className={styles.impactTitle}>Client Impressions</span>
                <p className={styles.impactDesc}>
                  Collective organic reach and high-retention engagement generated across our films.
                </p>
              </div>

              <div className={styles.impactItem}>
                <span className={styles.impactValue}>
                  24 <span>FPS</span>
                </span>
                <span className={styles.impactTitle}>Film Cadence & Rhythm</span>
                <p className={styles.impactDesc}>
                  Authentic motion blur and pacing calibrated to command undivided viewer focus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

FeaturedReelVault.displayName = "FeaturedReelVault";
export default FeaturedReelVault;
