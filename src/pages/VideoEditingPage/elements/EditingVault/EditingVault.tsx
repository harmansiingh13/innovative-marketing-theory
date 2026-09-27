"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./EditingVault.module.css";
import { Play, Pause, Volume2, VolumeX, ArrowUpRight, Sparkles } from "lucide-react";

export interface EditingProject {
  id: string;
  category:
    "SHORT-FORM REELS" | "COMMERCIALS" | "PODCASTS & TALKING HEAD" | "DOCUMENTARY & YOUTUBE";
  client: string;
  title: string;
  tagline: string;
  synopsis: string;
  deliverable: string;
  runtime: string;
  aspectRatio: string;
  specs: string;
  metric: string;
  metricLabel: string;
  videoSrc: string;
  posterSrc: string;
  year: string;
}

export const editingProjects: EditingProject[] = [
  {
    id: "edit-01",
    category: "SHORT-FORM REELS",
    client: "NEXUS FINTECH",
    title: "The Pulse Protocol",
    tagline: "Hyper-retention vertical reels engineered for algorithmic momentum.",
    synopsis:
      "Engineered from a 45-minute executive keynote into 6 hyper-condensed, hook-driven vertical reels that generated 3.8M organic impressions across Instagram and TikTok.",
    deliverable: "9:16 Vertical Master // Dynamic Kinetic Captions",
    runtime: "00:42",
    aspectRatio: "9:16 NATIVE VERTICAL",
    specs: "HOOK VELOCITY // J-CUT SPEED RAMPS // SFX LAYERS",
    metric: "+380%",
    metricLabel: "Watch Time vs Industry Average",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinematic_reel_portrait.jpg",
    year: "2024",
  },
  {
    id: "edit-02",
    category: "COMMERCIALS",
    client: "AURA ACOUSTICS",
    title: "Sonic Transient",
    tagline: "High-cadence 30-second commercial synchronized to acoustic rhythm.",
    synopsis:
      "Raw multi-camera soundstage clips edited to an exacting musical cadence, matching audio transients with kinetic macro product reveals and DaVinci color sculpting.",
    deliverable: "16:9 4K Broadcast Master // 1:1 Paid Cutdowns",
    runtime: "00:30",
    aspectRatio: "16:9 WIDESCREEN",
    specs: "DAVINCI WIDE GAMUT // SPATIAL BEAT MAPPING",
    metric: "4.2X",
    metricLabel: "ROAS Lift on Paid Social Campaigns",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinema_production_graded.jpg",
    year: "2024",
  },
  {
    id: "edit-03",
    category: "DOCUMENTARY & YOUTUBE",
    client: "FOUNDERS GUILD",
    title: "The Sovereign Mind",
    tagline: "Immersive cinematic documentary pacing built for undivided retention.",
    synopsis:
      "Crafting narrative tension across an intimate 12-minute documentary, blending archival materials, ambient soundscapes, and color-sculpted founder interviews.",
    deliverable: "Long-Form 4K YouTube Cut // Chapter Markers & Stems",
    runtime: "12:45",
    aspectRatio: "2.39:1 CINEMATIC WIDE",
    specs: "A/B ROLL NARRATIVE CUT // VINTAGE 35MM GRAIN",
    metric: "78%",
    metricLabel: "Average View Duration on YouTube",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/director_monitor_bts.jpg",
    year: "2023",
  },
  {
    id: "edit-04",
    category: "PODCASTS & TALKING HEAD",
    client: "VENTURE FRONTIERS",
    title: "The Capital Frontier",
    tagline: "Multi-cam podcast post-production with automated viral cutouts.",
    synopsis:
      "Raw multi-cam studio recordings transformed into polished episodic YouTube broadcasts and synchronized viral short cutouts with custom brand typography.",
    deliverable: "Full Episode Cut // 10 Micro-Clips with Dynamic B-Roll",
    runtime: "45:00",
    aspectRatio: "MULTI-CAM AUTO SWITCH",
    specs: "DYNAMIC NOISE REDUCTION // B-ROLL INSERTS",
    metric: "1.4M",
    metricLabel: "Combined Downloads & Views",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinema_production_graded.jpg",
    year: "2024",
  },
];

type CategoryFilter =
  "ALL" | "SHORT-FORM REELS" | "COMMERCIALS" | "PODCASTS & TALKING HEAD" | "DOCUMENTARY & YOUTUBE";

const filterOptions: CategoryFilter[] = [
  "ALL",
  "SHORT-FORM REELS",
  "COMMERCIALS",
  "PODCASTS & TALKING HEAD",
  "DOCUMENTARY & YOUTUBE",
];

export interface EditingVaultProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const EditingVault = forwardRef<HTMLElement, EditingVaultProps>(
  ({ headerRef, canvasRef }, ref) => {
    const [activeFilter, setActiveFilter] = useState<CategoryFilter>("ALL");
    const [selectedProject, setSelectedProject] = useState<EditingProject>(editingProjects[0]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);

    // Refresh video player when project changes
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
        ? editingProjects
        : editingProjects.filter((p) => p.category === activeFilter);

    return (
      <section ref={ref} id="edits" className={styles.section}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          {/* Section Header */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>POST-PRODUCTION REEL VAULT</span>
            </div>

            <div className={styles.headerRow}>
              <div className={styles.headingBlock}>
                <h2 className={styles.title}>
                  Edits That Command Attention.{" "}
                  <span className={styles.titleHighlight}>Built for Every Screen.</span>
                </h2>
                <p className={styles.manifestoSubtitle}>
                  From viral 9:16 retention reels to widescreen commercials and YouTube documentary
                  episodes. Precision pacing, bespoke motion graphics, and audio mix that converts.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className={styles.filterTabs} role="tablist" aria-label="Editing categories">
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

          {/* Active Cinema Theater Player */}
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

              {/* Vignette */}
              <div className={styles.theaterVignette} />

              {/* Corner Crop Marks */}
              <span className={styles.cropMarkTL}>⌜</span>
              <span className={styles.cropMarkTR}>⌝</span>
              <span className={styles.cropMarkBL}>⌞</span>
              <span className={styles.cropMarkBR}>⌟</span>

              {/* Top HUD Overlay */}
              <div className={styles.theaterHudTop}>
                <div className={styles.hudBadge}>
                  <span className={styles.recDot} />
                  <span>EDIT SUITE // {selectedProject.client}</span>
                </div>
                <div className={styles.hudOptics}>
                  <span>{selectedProject.specs}</span>
                </div>
              </div>

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
                    {selectedProject.category} {"//"} {selectedProject.aspectRatio}
                  </span>
                  <h3 className={styles.hudProjectTitle}>{selectedProject.title}</h3>
                </div>

                <div className={styles.hudControlsRow}>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className={styles.hudControlBtn}
                    aria-label={isPlaying ? "Pause edit preview" : "Play edit preview"}
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

            {/* Information Ledger */}
            <div className={styles.theaterMetaRow}>
              <div className={styles.metaColLead}>
                <span className={styles.metaColLabel}>POST-PRODUCTION ARCHITECTURE</span>
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
                  SELECT CUT TO PREVIEW IN SUITE ({filteredProjects.length} PROJECTS)
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
                      className={`${styles.projectCard} ${isActive ? styles.projectCardActive : ""}`}
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

            {/* Bottom Proof Strip */}
            <div className={styles.studioImpactBar}>
              <div className={styles.impactItem}>
                <span className={styles.impactValue}>
                  48<span>H</span>
                </span>
                <span className={styles.impactTitle}>Sprint Turnaround</span>
                <p className={styles.impactDesc}>
                  Rapid ingestion, assembly cut, and master delivery calibrated for dynamic content
                  cycles.
                </p>
              </div>

              <div className={styles.impactItem}>
                <span className={styles.impactValue}>
                  85<span>%+</span>
                </span>
                <span className={styles.impactTitle}>Retention Benchmark</span>
                <p className={styles.impactDesc}>
                  Pacing and pattern interrupts engineered to minimize drop-off in the first 3
                  seconds.
                </p>
              </div>

              <div className={styles.impactItem}>
                <span className={styles.impactValue}>
                  18<span>+</span>
                </span>
                <span className={styles.impactTitle}>Audio Stems Per Cut</span>
                <p className={styles.impactDesc}>
                  Multilayered whooshes, risers, ambient textures, and sound design that elevate
                  perception.
                </p>
              </div>

              <div className={styles.impactItem}>
                <span className={styles.impactValue}>
                  100<span>%</span>
                </span>
                <span className={styles.impactTitle}>Custom Motion Graphics</span>
                <p className={styles.impactDesc}>
                  No generic templates. Every kinetic caption, lower third, and graphic is
                  brand-bespoke.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

EditingVault.displayName = "EditingVault";
export default EditingVault;
