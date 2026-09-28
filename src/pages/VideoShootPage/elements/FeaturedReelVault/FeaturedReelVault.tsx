"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import styles from "./FeaturedReelVault.module.css";
import { Play, Pause, Volume2, VolumeX, Layers } from "lucide-react";

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
  aspectRatio: string;
  metric: string;
  metricLabel: string;
  videoSrc: string;
  posterSrc: string;
  year: string;
}

export const featuredProjects: ProjectReel[] = [
  // --- BRAND ANTHEMS ---
  {
    id: "proj-01",
    category: "BRAND ANTHEMS",
    client: "AETHER DYNAMICS",
    title: "The Velocity Anthem",
    tagline: "A monumental cinematic launch film engineered for 9:16 mobile immersion.",
    synopsis:
      "Capturing raw propulsion and quiet precision across 3 days of soundstage and desert runway shoots, engineered to command immediate category supremacy on mobile screens.",
    deliverable: "9:16 4K Master // Reels // Stories",
    runtime: "00:45",
    timecode: "TC 00:00:45:12",
    optics: "ARRI ALEXA 35 // VERTICAL CAGE // COOKE 25MM",
    aspectRatio: "9:16 Native Vertical",
    metric: "+340%",
    metricLabel: "Vertical Reel Completion Rate",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinematic_reel_portrait.jpg",
    year: "2024",
  },
  {
    id: "proj-05",
    category: "BRAND ANTHEMS",
    client: "VALIANT HYPERDRIVE",
    title: "Apex Ignition",
    tagline: "High-adrenaline hypercar launch film built for full-screen vertical impact.",
    synopsis:
      "Night soundstage lighting and gyro-stabilized high-speed tracking rigs capturing automotive engineering at the absolute limit of speed.",
    deliverable: "9:16 Hero Launch Film // Social Master",
    runtime: "00:42",
    timecode: "TC 00:00:42:04",
    optics: "RED V-RAPTOR XL // ZEISS SUPREME PRIMES",
    aspectRatio: "9:16 Native Vertical",
    metric: "3.8M",
    metricLabel: "First-Week Organic Reach",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/welcome_consultation.jpg",
    year: "2024",
  },
  {
    id: "proj-09",
    category: "BRAND ANTHEMS",
    client: "CHRONOS PROTOCOL",
    title: "The Monument Frame",
    tagline: "Futuristic brand anthem illuminating next-generation distributed systems.",
    synopsis:
      "Architectural soundstage builds and volumetric lighting choreography shaping a monumental brand identity for a frontier technology firm.",
    deliverable: "9:16 Global Brand Anthem // Keynote Cut",
    runtime: "00:50",
    timecode: "TC 00:00:50:18",
    optics: "ARRI ALEXA MINI LF // ANAMORPHIC RIG",
    aspectRatio: "9:16 Native Vertical",
    metric: "+280%",
    metricLabel: "Executive Audience Retention",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/client_welcome_lounge.jpg",
    year: "2023",
  },

  // --- PRODUCT CINEMA ---
  {
    id: "proj-02",
    category: "PRODUCT CINEMA",
    client: "KALLISTO HOROLOGY",
    title: "Sculpted in Shadow",
    tagline: "Ultra-high-definition tactile macro cinematography for haute horlogerie.",
    synopsis:
      "Precision probe lenses and controlled rim-lighting revealing hand-finished tourbillon escapements with museum-grade visual drama in 9:16 vertical detail.",
    deliverable: "9:16 Macro Cinema // Global Campaign",
    runtime: "00:30",
    timecode: "TC 00:00:30:00",
    optics: "RED V-RAPTOR 8K // 9:16 RIG // LAOWA PROBE",
    aspectRatio: "9:16 Native Vertical",
    metric: "4.2M",
    metricLabel: "Organic Views on Mobile Feeds",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinema_production_graded.jpg",
    year: "2024",
  },
  {
    id: "proj-06",
    category: "PRODUCT CINEMA",
    client: "NOCTURNE TIMEPIECES",
    title: "Obsidian Tourbillon",
    tagline: "Extreme close-up cinema capturing hand-crafted horological mechanics.",
    synopsis:
      "Micro-lighting and robotic camera motion passing through sapphire crystal chambers, unveiling microscopic luxury finishings.",
    deliverable: "9:16 Tactile Product Reel // Digital Master",
    runtime: "00:28",
    timecode: "TC 00:00:28:10",
    optics: "SONY FX9 // LAOWA 24MM PERIPROBE",
    aspectRatio: "9:16 Native Vertical",
    metric: "98.2%",
    metricLabel: "Positive Sentiment Score",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinematic_reel_portrait.jpg",
    year: "2024",
  },
  {
    id: "proj-10",
    category: "PRODUCT CINEMA",
    client: "LUMEN OPTRONICS",
    title: "Prism of Pure Light",
    tagline: "Optical physics and glass manufacturing rendered with tactile realism.",
    synopsis:
      "Laser-illuminated soundstage environments revealing microscopic optical coatings, crafted to convert luxury design enthusiasts.",
    deliverable: "9:16 Product Feature // Macro Suite",
    runtime: "00:32",
    timecode: "TC 00:00:32:15",
    optics: "ARRI ALEXA 35 // COOKE MACRO 60MM",
    aspectRatio: "9:16 Native Vertical",
    metric: "+215%",
    metricLabel: "Direct Conversion Lift",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/welcome_consultation.jpg",
    year: "2024",
  },

  // --- COMMERCIALS ---
  {
    id: "proj-03",
    category: "COMMERCIALS",
    client: "VERVE AUDIO LABS",
    title: "Sonic Architecture",
    tagline: "A high-cadence commercial capturing acoustic physics and pure resonance.",
    synopsis:
      "Synchronized high-speed optical capture paired with spatial lighting choreography, crafting visceral desire for luxury acoustic monitoring systems in full-screen vertical format.",
    deliverable: "9:16 Paid Performance // 30s & 15s Cutdowns",
    runtime: "00:35",
    timecode: "TC 00:00:35:08",
    optics: "SONY VENICE 2 // VERTICAL RIG // ZEISS PRIMES",
    aspectRatio: "9:16 Native Vertical",
    metric: "+185%",
    metricLabel: "Direct ROAS on Vertical Ad Formats",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/director_monitor_bts.jpg",
    year: "2023",
  },
  {
    id: "proj-07",
    category: "COMMERCIALS",
    client: "AURA ACOUSTICS",
    title: "Pure Harmonic Wave",
    tagline: "Fluid dynamics and acoustic frequencies manifested in physical form.",
    synopsis:
      "High-speed Phantom Flex capture at 1000 FPS mapping liquid soundwave reactions across black obsidian glass surfaces.",
    deliverable: "9:16 Broadcast Spot // Performance Assets",
    runtime: "00:30",
    timecode: "TC 00:00:30:12",
    optics: "PHANTOM FLEX 4K // MASTER PRIMES T1.3",
    aspectRatio: "9:16 Native Vertical",
    metric: "2.4M",
    metricLabel: "Viral Ad Impressions",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinema_production_graded.jpg",
    year: "2024",
  },
  {
    id: "proj-11",
    category: "COMMERCIALS",
    client: "STRATA ENERGY",
    title: "Kinetic Velocity",
    tagline: "A raw, rhythmic brand commercial driving athletic propulsion.",
    synopsis:
      "Explosive lighting shifts and anamorphic flares capturing high-intensity movement, cut to an unrelenting 140 BPM sound design cadence.",
    deliverable: "9:16 Social Campaign // Cutdown Suite",
    runtime: "00:25",
    timecode: "TC 00:00:25:20",
    optics: "RED KOMODO-X // ATLAS ANAMORPHIC GLASS",
    aspectRatio: "9:16 Native Vertical",
    metric: "91%",
    metricLabel: "Video Hook Rate (First 3s)",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/cinematic_reel_portrait.jpg",
    year: "2024",
  },

  // --- FOUNDER STORIES ---
  {
    id: "proj-04",
    category: "FOUNDER STORIES",
    client: "KINESIS PROTOCOL",
    title: "The Architect's Monologue",
    tagline: "An intimate, docu-style founder portrait illuminating visionary engineering.",
    synopsis:
      "Nuanced lighting, vintage cinema glass, and unscripted conviction crafting unquestioned authority for a disruptive Silicon Valley founder, framed vertically for intimate connection.",
    deliverable: "9:16 Series Keynote // Vertical Doc",
    runtime: "00:58",
    timecode: "TC 00:00:58:18",
    optics: "ARRI AMIRA // CANON K35 VINTAGE PRIMES",
    aspectRatio: "9:16 Native Vertical",
    metric: "94%",
    metricLabel: "Average Vertical Retention Rate",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/client_welcome_lounge.jpg",
    year: "2024",
  },
  {
    id: "proj-08",
    category: "FOUNDER STORIES",
    client: "SOLIS AEROSPACE",
    title: "Orbit Beyond Horizon",
    tagline: "An inspiring aerospace visionary chronicle on orbital robotics.",
    synopsis:
      "Intimate interview setups blended with high-tech cleanroom imagery, building unquestioned founder gravitas and deep investor trust.",
    deliverable: "9:16 Investor Keynote // Episodic Doc",
    runtime: "00:55",
    timecode: "TC 00:00:55:06",
    optics: "ARRI ALEXA MINI // KOWA PROMINAR ANAMORPHIC",
    aspectRatio: "9:16 Native Vertical",
    metric: "+410%",
    metricLabel: "Investor Inbound Lift",
    videoSrc: "/videos/cinema_production_graded.mp4",
    posterSrc: "/images/director_monitor_bts.jpg",
    year: "2023",
  },
  {
    id: "proj-12",
    category: "FOUNDER STORIES",
    client: "NEXUS QUANTUM",
    title: "The Sovereign Code",
    tagline: "A raw documentary portrait of deep-tech founders building quantum hardware.",
    synopsis:
      "Naturalistic low-key lighting and vintage Cooke glass bringing human soul and raw conviction to deep-tech frontier science.",
    deliverable: "9:16 Founder Feature // Brand Film",
    runtime: "00:52",
    timecode: "TC 00:00:52:14",
    optics: "SONY VENICE // COOKE PANCHRO CLASSIC",
    aspectRatio: "9:16 Native Vertical",
    metric: "88%",
    metricLabel: "Completion Rate on LinkedIn",
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
    const [progress, setProgress] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);

    // Auto-update video source when project changes
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
        setProgress(0);
      }
    }, [selectedProject]);

    // Track video playback progress
    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.duration) {
        const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(pct);
      }
    };

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

    // Filter projects based on the active tab
    const filteredProjects =
      activeFilter === "ALL"
        ? featuredProjects
        : featuredProjects.filter((p) => p.category === activeFilter);

    // Category filter click handler: filters videos and selects first match if current is filtered out
    const handleFilterChange = (cat: CategoryFilter) => {
      setActiveFilter(cat);
      const matching =
        cat === "ALL" ? featuredProjects : featuredProjects.filter((p) => p.category === cat);
      if (matching.length > 0 && !matching.some((p) => p.id === selectedProject.id)) {
        setSelectedProject(matching[0]);
      }
    };

    // Project card click handler: selects project directly
    const handleSelectProject = (project: ProjectReel) => {
      setSelectedProject(project);
    };

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
                  Engineered for high-retention 9:16 portrait feeds and mobile-first authority.
                  Every vertical frame is crafted with custom lighting rigs, cinema glass, and
                  narrative pacing that commands undivided focus.
                </p>
              </div>
            </div>
          </div>

          {/* Main Cinema Suite: Left Portrait Video Monitor & Right Feature Card */}
          <div ref={canvasRef} className={styles.theaterWrapper}>
            <div className={styles.cinemaStage}>
              {/* Left Column: Portrait Cinema Monitor (9:16) */}
              <div className={styles.monitorOuter}>
                <div className={styles.portraitScreen}>
                  <video
                    ref={videoRef}
                    src={selectedProject.videoSrc}
                    poster={selectedProject.posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    className={styles.portraitVideo}
                  />

                  {/* Cinematic Vignette */}
                  <div className={styles.screenVignette} />

                  {/* Optical Crop Crosshairs (9:16 Viewfinder) */}
                  <span className={styles.cropMarkTopLeft}>⌜</span>
                  <span className={styles.cropMarkTopRight}>⌝</span>
                  <span className={styles.cropMarkBottomLeft}>⌞</span>
                  <span className={styles.cropMarkBottomRight}>⌟</span>

                  {/* Top Monitor Status HUD */}
                  <div className={styles.screenHudTop}>
                    <div className={styles.recBadge}>
                      <span className={styles.recDot} />
                      <span className={styles.recText}>REC</span>
                      <span className={styles.hudFormatBadge}>9:16 CINEMA</span>
                    </div>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className={styles.screenAudioBtn}
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      <span>{isMuted ? "UNMUTE" : "MUTED"}</span>
                    </button>
                  </div>

                  {/* Center Play Button Overlay (when paused) */}
                  {!isPlaying && (
                    <div className={styles.screenCenterControls}>
                      <button
                        type="button"
                        onClick={togglePlay}
                        className={styles.centerPlayBtn}
                        aria-label="Play reel"
                      >
                        <Play size={28} />
                      </button>
                    </div>
                  )}

                  {/* Progress Line */}
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                  </div>

                  {/* Bottom HUD Inside Screen */}
                  <div className={styles.screenHudBottom}>
                    <div className={styles.screenActiveDetails}>
                      <span className={styles.screenCategoryTag}>
                        {selectedProject.category} {"//"} {selectedProject.year}
                      </span>
                      <h3 className={styles.screenProjectTitle}>{selectedProject.title}</h3>
                    </div>

                    <button
                      type="button"
                      onClick={togglePlay}
                      className={styles.screenPlayBtn}
                      aria-label={isPlaying ? "Pause reel" : "Play reel"}
                    >
                      {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Feature Card (Top Tab Bar, 4-Col 2-Row Scrollable Grid & Impact Standards) */}
              <div className={styles.dossierPanel}>
                {/* 1. Top Bar: Header & Category Filter Tabs */}
                <div className={styles.reelSelectorHeader}>
                  <div className={styles.vaultTitleRow}>
                    <div className={styles.vaultTitleGroup}>
                      <span className={styles.vaultKickerBullet} />
                      <h3 className={styles.vaultTitleKicker}>
                        SELECT PORTRAIT FILM TO PREVIEW IN THEATER
                      </h3>
                    </div>
                    <span className={styles.vaultFormatBadge}>
                      <Layers size={11} />
                      <span>{filteredProjects.length} REELS // 9:16 MASTER</span>
                    </span>
                  </div>

                  {/* Category Filter Tabs Bar */}
                  <div
                    className={styles.categoryFilterTabs}
                    role="tablist"
                    aria-label="Reel categories"
                  >
                    {filterOptions.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={activeFilter === cat}
                        className={`${styles.categoryTabBtn} ${
                          activeFilter === cat ? styles.categoryTabBtnActive : ""
                        }`}
                        onClick={() => handleFilterChange(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. 4-Column 2-Row Grid with Smooth Vertical Scroll if items exceed */}
                <div className={styles.reelGridScrollArea}>
                  <div
                    className={styles.reelImageGrid}
                    role="tablist"
                    aria-label="Portrait Reel Selection"
                  >
                    {filteredProjects.map((project, idx) => {
                      const isActive = project.id === selectedProject.id;

                      return (
                        <button
                          key={project.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`${styles.reelImageCard} ${
                            isActive ? styles.reelImageCardActive : ""
                          }`}
                          onClick={() => handleSelectProject(project)}
                          aria-label={`Preview Reel 0${idx + 1}: ${project.title}`}
                        >
                          <div className={styles.reelImageWrapper}>
                            <Image
                              src={project.posterSrc}
                              alt={project.title}
                              width={280}
                              height={420}
                              className={styles.reelImage}
                            />

                            {/* Cinematic Gradient Overlays */}
                            <div className={styles.reelImageGradient} />

                            {/* Top Badges */}
                            <div className={styles.reelImageTopBadges}>
                              <span className={styles.reelNumberBadge}>
                                {idx < 9 ? `0${idx + 1}` : idx + 1}
                              </span>
                              <span className={styles.reelRuntimeBadge}>{project.runtime}</span>
                            </div>

                            {/* Active Indicator Badge with Equalizer */}
                            {isActive && (
                              <div className={styles.reelActiveBadge}>
                                <div className={styles.equalizerWrap}>
                                  <span className={styles.eqBar} />
                                  <span className={styles.eqBar} />
                                  <span className={styles.eqBar} />
                                </div>
                                <span>ON AIR</span>
                              </div>
                            )}

                            {/* Hover Play Icon Overlay */}
                            <div className={styles.reelHoverOverlay}>
                              <div className={styles.reelHoverPlayCircle}>
                                <Play size={20} />
                              </div>
                            </div>

                            {/* Bottom Info Details */}
                            <div className={styles.reelImageBottomDetails}>
                              <span className={styles.reelCategoryTag}>{project.category}</span>
                              <h4 className={styles.reelTitleText}>{project.title}</h4>
                              <div className={styles.reelClientRow}>
                                <span className={styles.reelClientDot} />
                                <span className={styles.reelClientText}>{project.client}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Studio Impact & Cinema Standards Bar */}
                <div className={styles.impactCardContainer}>
                  <div className={styles.impactCardHeader}>
                    <span className={styles.impactLedgerTitle}>
                      STUDIO PRODUCTION STANDARDS // HIGH-RETENTION 9:16
                    </span>
                    <span className={styles.impactLiveIndicator}>
                      <span className={styles.impactLiveDot} />
                      ACTIVE CINEMA PROFILE
                    </span>
                  </div>

                  <div className={styles.cardImpactGrid}>
                    <div className={styles.cardImpactItem}>
                      <span className={styles.cardImpactValue}>
                        9:16 <span>NATIVE</span>
                      </span>
                      <span className={styles.cardImpactTitle}>Vertical Framing</span>
                      <p className={styles.cardImpactDesc}>
                        Custom blocked for mobile feeds with zero awkward cropping.
                      </p>
                    </div>

                    <div className={styles.cardImpactItem}>
                      <span className={styles.cardImpactValue}>
                        4K <span>DCI</span>
                      </span>
                      <span className={styles.cardImpactTitle}>Cinema HDR</span>
                      <p className={styles.cardImpactDesc}>
                        Shot on full-frame sensors mounted vertically in DaVinci Gamut.
                      </p>
                    </div>

                    <div className={styles.cardImpactItem}>
                      <span className={styles.cardImpactValue}>
                        8.4<span>M+</span>
                      </span>
                      <span className={styles.cardImpactTitle}>Mobile Reach</span>
                      <p className={styles.cardImpactDesc}>
                        High-retention narrative pacing driving peak completion rates.
                      </p>
                    </div>

                    <div className={styles.cardImpactItem}>
                      <span className={styles.cardImpactValue}>
                        24 <span>FPS</span>
                      </span>
                      <span className={styles.cardImpactTitle}>Film Cadence</span>
                      <p className={styles.cardImpactDesc}>
                        True optical motion blur calibrated to stop the scroll instantly.
                      </p>
                    </div>
                  </div>
                </div>
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
