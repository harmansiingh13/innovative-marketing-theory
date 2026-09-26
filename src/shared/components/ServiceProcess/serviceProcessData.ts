export type ServiceType =
  | "video-shoots"
  | "video-editing"
  | "social-media"
  | "advertisement"
  | "web-development"
  | "event-organization";

export interface ServiceProcessMedia {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}

export interface ServiceProcessStep {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  deliverables: string[];
  timecode: string;
  optics: string;
  sceneTag: string;
  media: ServiceProcessMedia;
}

export interface ServiceProcessData {
  kicker: string;
  title: string;
  titleHighlight: string;
  description: string;
  steps: ServiceProcessStep[];
}

export const serviceProcessData: Record<ServiceType, ServiceProcessData> = {
  "video-shoots": {
    kicker: "THE PRODUCTION METHODOLOGY // HOW WE MAKE IT",
    title: "How we make it.",
    titleHighlight: "From blueprint to final frame.",
    description:
      "Select a stage to explore our cinematic methodology. Every phase is an uncompromising convergence of brand strategy, lighting architecture, and master post-production.",
    steps: [
      {
        id: "shoot-01",
        number: "01",
        category: "PRE-PRODUCTION & STRATEGY",
        title: "Concept & Strategic Blueprint",
        description:
          "Every iconic frame begins with strategic clarity. We immerse ourselves in your brand identity, architect scene storyboards, scout location and lighting, and script every camera movement before power is switched on.",
        deliverables: [
          "Creative Treatment Deck",
          "Detailed Shot Architecture",
          "Lighting & Mood Blueprint",
          "Talent & Location Curation",
        ],
        timecode: "SEQ 01 // 00:00:00",
        optics: "OPTICS: 35MM T1.5 // SCRIPT BLOCKING",
        sceneTag: "OPTICAL BLOCKING & SCENE FRAMING",
        media: {
          id: "shoot-01-media",
          type: "image",
          src: "/images/director_monitor_bts.jpg",
          alt: "Director monitor displaying scene framing and camera telemetry",
        },
      },
      {
        id: "shoot-02",
        number: "02",
        category: "PRINCIPAL PHOTOGRAPHY",
        title: "Cinematic On-Set Execution",
        description:
          "On set, precision is paramount. We build controlled lighting architecture, deploy high-dynamic-range cinema sensors, record pristine multi-track studio audio, and direct scenes with relentless visual discipline.",
        deliverables: [
          "4K DCI Raw Cinema Capture",
          "Controlled Key & Rim Lighting",
          "Gimbal & Dolly Camera Rigs",
          "Studio Multi-Track Audio",
        ],
        timecode: "SEQ 02 // 00:15:30",
        optics: "SENSOR: 4K DCI // SHUTTER: 180° // 5600K",
        sceneTag: "4K DCI SENSOR LIVE CAPTURE",
        media: {
          id: "shoot-02-media",
          type: "video",
          src: "/videos/cinema_production_graded.mp4",
          poster: "/images/cinema_production_graded.jpg",
          alt: "Cinema camera shoot on set with dynamic lighting",
        },
      },
      {
        id: "shoot-03",
        number: "03",
        category: "POST-PRODUCTION & CRAFT",
        title: "From Raw Footage to Final Frame",
        description:
          "Raw footage transforms into brand prestige. We craft kinetic editorial pacing for viewer retention, sculpt bespoke color grades matched to your brand palette, and engineer immersive spatial sound.",
        deliverables: [
          "Bespoke Brand Color Grade",
          "Spatial Sound Design & Foley",
          "High-Retention Narrative Cut",
          "Multi-Platform Master Delivery",
        ],
        timecode: "SEQ 03 // 00:45:00",
        optics: "GRADE: DCI-P3 // PRORES 4444 XQ MASTER",
        sceneTag: "DAVINCI WIDE GAMUT COLOR SCULPTING",
        media: {
          id: "shoot-03-media",
          type: "image",
          src: "/images/cinematic_reel_portrait.jpg",
          alt: "Cinematic color grading and editorial suite",
        },
      },
    ],
  },

  "video-editing": {
    kicker: "THE EDITORIAL PIPELINE // HOW WE PACE IT",
    title: "How we cut it.",
    titleHighlight: "From raw footage to master export.",
    description:
      "Select a stage to explore our high-retention editorial pipeline. Every second is micro-paced, color-graded, and sound-engineered to convert.",
    steps: [
      {
        id: "edit-01",
        number: "01",
        category: "INGESTION & SELECTS",
        title: "Footage Ingestion & Narrative Selects",
        description:
          "Every great edit begins with ruthless organization. We log raw footage, curate the strongest emotional and narrative takes, synchronize multi-cam angles, and build a cohesive assembly cut that establishes tension and rhythm.",
        deliverables: [
          "Footage Ingestion & Proxy Transcode",
          "Emotional A-Roll Selects",
          "Multi-Cam Audio Synchronization",
          "Assembly Narrative Cut",
        ],
        timecode: "SEQ 01 // 00:00:00",
        optics: "INGEST: PRORES 422 HQ // LOG ARCHIVE",
        sceneTag: "FOOTAGE LOGGING & SELECTS CURATION",
        media: {
          id: "edit-01-media",
          type: "image",
          src: "/images/director_monitor_bts.jpg",
          alt: "Footage logging and selects curation",
        },
      },
      {
        id: "edit-02",
        number: "02",
        category: "RETENTION ARCHITECTURE",
        title: "Kinetic Micro-Pacing & Retention Hooks",
        description:
          "Attention is won or lost in the first 3 seconds. We engineer visual hooks, rapid J/L audio transitions, kinetic zooms, and micro-cuts that eliminate dead air and keep viewer eyes locked on screen.",
        deliverables: [
          "3-Second Hook Velocity Engineering",
          "Dynamic Speed Ramps & J-Cuts",
          "Visual Pattern Interrupts",
          "Dead-Air & Filler Pruning",
        ],
        timecode: "SEQ 02 // 00:00:03",
        optics: "HOOK VELOCITY: 0.8S AVERAGE CUT INTERVAL",
        sceneTag: "HIGH-RETENTION PATTERN INTERRUPTS",
        media: {
          id: "edit-02-media",
          type: "video",
          src: "/videos/cinema_production_graded.mp4",
          poster: "/images/cinema_production_graded.jpg",
          alt: "Kinetic hook edit and velocity pacing",
        },
      },
      {
        id: "edit-03",
        number: "03",
        category: "MOTION & AUDIO DESIGN",
        title: "Bespoke Typography & Spatial Audio Foley",
        description:
          "Sound is 50% of the cinematic experience. We layer multi-channel spatial foley, risers, and impact hits matched to brand cadence, alongside bespoke kinetic subtitles and animated lower thirds.",
        deliverables: [
          "Bespoke Animated Brand Subtitles",
          "Spatial Sound FX & Impacts",
          "Voiceover EQ, Compression & Denoise",
          "Dynamic Lower Thirds & Kinetic Overlays",
        ],
        timecode: "SEQ 03 // 00:00:18",
        optics: "AUDIO: 18 STEMS // 32-BIT FLOAT STEREO",
        sceneTag: "MULTI-LAYER SPATIAL SOUND DESIGN",
        media: {
          id: "edit-03-media",
          type: "image",
          src: "/images/cinema_production_graded.jpg",
          alt: "Motion graphics and sound design suite",
        },
      },
      {
        id: "edit-04",
        number: "04",
        category: "COLOR & FINAL EXPORT",
        title: "DaVinci Color Science & Master Multi-Export",
        description:
          "The final polish that separates amateur edits from prestigious brand media. We grade in DaVinci Wide Gamut, match camera color profiles, balance skin tones, and export platform-optimized masters.",
        deliverables: [
          "DaVinci Resolve Wide Gamut Grade",
          "Film Grain & Atmosphere Calibration",
          "9:16 Vertical & 16:9 4K Master Deliveries",
          "Clean & Subtitled High-Bitrate Exports",
        ],
        timecode: "SEQ 04 // 00:00:45",
        optics: "COLOR: DAVINCI WIDE GAMUT // DCI-P3",
        sceneTag: "NODE-BASED COLOR SCULPTING",
        media: {
          id: "edit-04-media",
          type: "image",
          src: "/images/cinematic_reel_portrait.jpg",
          alt: "Color grading and multi-format delivery master",
        },
      },
    ],
  },

  "social-media": {
    kicker: "THE GROWTH FORMULA // HOW WE SCALE IT",
    title: "How we grow it.",
    titleHighlight: "From fleeting attention to compounding authority.",
    description:
      "Select a stage to explore our organic distribution engine. Every sprint is engineered for viral retention, daily consistency, and community conversion.",
    steps: [
      {
        id: "social-01",
        number: "01",
        category: "RESEARCH & POSITIONING",
        title: "Audience Audit & Narrative Thesis",
        description:
          "We dissect your current audience retention, audit top category players, and isolate the contrarian viewpoints and intellectual frameworks that establish your unique brand authority.",
        deliverables: [
          "Brand Voice & Tone Guide",
          "Competitor White-Space Analysis",
          "Core Content Pillar Matrix",
          "90-Day Algorithmic Roadmap",
        ],
        timecode: "PHASE 01 // DAY 01-07",
        optics: "RESEARCH: COMPETITOR VOID AUDIT // 4 PLATFORMS",
        sceneTag: "AUDIENCE DISCOVERY & CONTENT PILLARS",
        media: {
          id: "social-01-media",
          type: "image",
          src: "/images/director_monitor_bts.jpg",
          alt: "Audience research and positioning architecture",
        },
      },
      {
        id: "social-02",
        number: "02",
        category: "CONTENT FORGE",
        title: "High-Volume Asset Batching & Scripting",
        description:
          "Consistency is won through systematic batching. We script viral hooks, direct remote or studio film sessions, and edit high-volume visual assets ready for weekly scheduled drops.",
        deliverables: [
          "Hook-Engine Short-Form Scripts",
          "High-Volume Asset Batching",
          "Custom Motion Typography",
          "Clickpack Carousel Graphics",
        ],
        timecode: "PHASE 02 // DAY 08-18",
        optics: "VELOCITY: 30 ASSETS PRODUCED PER SPRINT",
        sceneTag: "BATCH REEL PRODUCTION & MICRO-CUTS",
        media: {
          id: "social-02-media",
          type: "video",
          src: "/videos/cinema_production_graded.mp4",
          poster: "/images/cinema_production_graded.jpg",
          alt: "Batch short form video production",
        },
      },
      {
        id: "social-03",
        number: "03",
        category: "ALGORITHMIC DEPLOYMENT",
        title: "Omnichannel Distribution & Timing",
        description:
          "Deploying content at peak engagement windows across TikTok, Instagram, LinkedIn, and YouTube. We calibrate hashtags, sound trends, and SEO descriptions for maximum discoverability.",
        deliverables: [
          "Cross-Platform Scheduling & Publishing",
          "Platform-Native Sound & SEO Tags",
          "Active First-Hour Velocity Boost",
          "Omnichannel Repurposing Flow",
        ],
        timecode: "PHASE 03 // DAY 19-25",
        optics: "DEPLOYMENT: TIKTOK, REELS, LINKEDIN, SHORTS",
        sceneTag: "PEAK ENGAGEMENT ALGORITHMIC SYNDICATION",
        media: {
          id: "social-03-media",
          type: "image",
          src: "/images/cinema_production_graded.jpg",
          alt: "Omnichannel publishing schedule and syndication",
        },
      },
      {
        id: "social-04",
        number: "04",
        category: "CONVERSION & RETENTION",
        title: "Community Cultivation & Inbound Funnels",
        description:
          "Turning vanity impressions into tangible enterprise value. We engage every comment, nurture top brand advocates, and route high-intent viewers through DM automations directly to sales.",
        deliverables: [
          "Daily Comment & DM Engagement",
          "Automated Inbound Lead Routing",
          "Weekly Analytics Optimization Loop",
          "Monthly ROI & Conversion Reporting",
        ],
        timecode: "PHASE 04 // DAY 26-30",
        optics: "FUNNEL: DM CONVERSION 14.8% BENCHMARK",
        sceneTag: "INBOUND LEAD PIPELINE AUTOMATION",
        media: {
          id: "social-04-media",
          type: "image",
          src: "/images/cinematic_reel_portrait.jpg",
          alt: "Community engagement and lead generation funnel",
        },
      },
    ],
  },

  advertisement: {
    kicker: "PAID MEDIA ARCHITECTURE // HOW WE SCALE IT",
    title: "How we scale it.",
    titleHighlight: "From wasted spend to profitable ROAS.",
    description:
      "Select a stage to explore our systematic acquisition engine. Every campaign is governed by server-side telemetry, rapid hook iteration, and sub-second funnels.",
    steps: [
      {
        id: "ad-01",
        number: "01",
        category: "FOUNDATION",
        title: "Server-Side Tracking & First-Party Infrastructure",
        description:
          "We eliminate signal loss from iOS and ad-blockers by engineering first-party server-side tracking (Meta Conversions API, Google Enhanced Conversions, GA4 event pipelines) and syncing offline CRM purchase revenue for uncompromised ROAS clarity.",
        deliverables: [
          "Meta Conversions API (CAPI)",
          "Google Enhanced Conversions",
          "Triple Whale & Northbeam Setup",
          "CRM Lifetime Value Pipeline",
        ],
        timecode: "PHASE 01 // DATA SYNC",
        optics: "SIGNAL MATCH: 98.4% // 0% LOSS",
        sceneTag: "FIRST-PARTY SERVER TELEMETRY",
        media: {
          id: "ad-01-media",
          type: "image",
          src: "/images/director_monitor_bts.jpg",
          alt: "Server-side tracking and attribution dashboard",
        },
      },
      {
        id: "ad-02",
        number: "02",
        category: "CREATIVE ENGINE",
        title: "High-Velocity Creative & Hook Architecture",
        description:
          "Creative is modern targeting. We write, produce, and iterate 15+ custom angle variations per sprint—ranging from direct-response creator UGC and cinematic macro product reels to high-converting statics and problem-agitate-solve hooks.",
        deliverables: [
          "15+ Weekly Angle & Hook Tests",
          "Direct Response Storyboarding",
          "3-Second Hook Retention Matrix",
          "Dynamic Native Motion Design",
        ],
        timecode: "PHASE 02 // ITERATION",
        optics: "CREATIVE FORGE // 4K LOG MASTER",
        sceneTag: "CREATIVE ANGLE VELOCITY TESTING",
        media: {
          id: "ad-02-media",
          type: "video",
          src: "/videos/cinema_production_graded.mp4",
          poster: "/images/cinema_production_graded.jpg",
          alt: "Creative video iterations for paid ads",
        },
      },
      {
        id: "ad-03",
        number: "03",
        category: "MEDIA BUYING",
        title: "Algorithmic Media Buying & Bid Management",
        description:
          "Leveraging Advantage+ and Performance Max frameworks governed by cost-cap safeguards, custom audience segmentation, and algorithmic dayparting. We scale winning spend exponentially while cutting fatigue before CAC can rise.",
        deliverables: [
          "Advantage+ & P-Max Architecture",
          "Cost-Cap & Target ROAS Guardrails",
          "Dynamic Budget Escalation Pacing",
          "Cross-Channel Cannibalization Checks",
        ],
        timecode: "PHASE 03 // SCALING",
        optics: "ALGO BIDDER // $10K/DAY PACING",
        sceneTag: "ADVANTAGE+ & P-MAX SCALING FRAMEWORK",
        media: {
          id: "ad-03-media",
          type: "image",
          src: "/images/cinema_production_graded.jpg",
          alt: "Algorithmic media buying dashboard",
        },
      },
      {
        id: "ad-04",
        number: "04",
        category: "CONVERSION & LTV",
        title: "Post-Click Funnel & Lifetime Value Optimization",
        description:
          "Media spend is useless without ruthless conversion mechanics. We deploy sub-second custom advertorial landing pages, 1-click checkout order bumps, and post-purchase lifecycle workflows to maximize Average Order Value and 60-day repeat purchase rate.",
        deliverables: [
          "Sub-Second Advertorial Landing Pages",
          "Dynamic 1-Click Order Bumps",
          "Cart Friction Elimination",
          "Post-Purchase Klaviyo Sequences",
        ],
        timecode: "PHASE 04 // RETENTION",
        optics: "LANDING PAGE // 4.9% CONV RATE",
        sceneTag: "POST-CLICK FUNNEL OPTIMIZATION",
        media: {
          id: "ad-04-media",
          type: "image",
          src: "/images/cinematic_reel_portrait.jpg",
          alt: "Post-click funnel and conversion rate optimization",
        },
      },
    ],
  },

  "web-development": {
    kicker: "ENGINEERING ARCHITECTURE // HOW WE BUILD IT",
    title: "How we build it.",
    titleHighlight: "From schema blueprint to sub-second edge deployment.",
    description:
      "Select a stage to explore our full-stack engineering workflow. Every project is engineered for zero-jank frame rates, 100/100 Lighthouse performance, and category dominance.",
    steps: [
      {
        id: "web-01",
        number: "01",
        category: "SPECIFICATION",
        title: "System Architecture & High-Converting UX Blueprint",
        description:
          "We begin by modeling relational database schemas, state management diagrams, component hierarchies, and checkout user journeys to eliminate technical debt before writing a single line of production code.",
        deliverables: [
          "Relational Database Schemas (Prisma / SQL)",
          "Information Architecture & User Journeys",
          "Strict API Interface & Endpoint Contracts",
          "Interactive Low-Fi UX Wireframe Blueprints",
        ],
        timecode: "PHASE 01 // ARCHITECTURE",
        optics: "BLUEPRINT: 0% ARCH DEBT // TYPESAFE",
        sceneTag: "SCHEMA MODELING & USER JOURNEYS",
        media: {
          id: "web-01-media",
          type: "image",
          src: "/images/director_monitor_bts.jpg",
          alt: "Architecture planning and schema design",
        },
      },
      {
        id: "web-02",
        number: "02",
        category: "DESIGN SYSTEM",
        title: "Dark Luxury Art Direction & Kinetic Micro-Interactions",
        description:
          "Developing bespoke responsive design systems with Figma tokens, dark luxury typography, custom iconographies, and interactive kinetic prototypes modeling every hover state, micro-interaction, and layout transition.",
        deliverables: [
          "Atomic Design System & Token Library",
          "Dark Luxury Editorial Art Direction",
          "Interactive Micro-Physics Prototypes",
          "Fluid Responsive Grid Breakpoints",
        ],
        timecode: "PHASE 02 // PROTOTYPING",
        optics: "DESIGN SYSTEM // 60 FPS MOTION",
        sceneTag: "BESPOKE TOKENS & KINETIC PROTOTYPING",
        media: {
          id: "web-02-media",
          type: "video",
          src: "/videos/cinema_production_graded.mp4",
          poster: "/images/cinema_production_graded.jpg",
          alt: "Kinetic UI prototypes and micro-interactions",
        },
      },
      {
        id: "web-03",
        number: "03",
        category: "FULL-STACK BUILD",
        title: "Next.js 15 Server Components & Fluid GSAP Motion",
        description:
          "Writing clean, type-safe Next.js 15 App Router code with React Server Components, server actions, optimistic UI updates, and frictionless GSAP ScrollTrigger timeline animations engineered for zero-jank frame rates.",
        deliverables: [
          "Next.js 15 Server Components & Actions",
          "Strict TypeScript Type-Safety Across All APIs",
          "GSAP ScrollTrigger & Timeline Sequencing",
          "Zero-Jank Layout Shift (CLS: 0.000)",
        ],
        timecode: "PHASE 03 // FULL-STACK BUILD",
        optics: "CODE QUALITY // 100% TESTED & TYPED",
        sceneTag: "REACT SERVER COMPONENTS & ACTIONS",
        media: {
          id: "web-03-media",
          type: "image",
          src: "/images/cinema_production_graded.jpg",
          alt: "Full stack engineering in Next.js",
        },
      },
      {
        id: "web-04",
        number: "04",
        category: "EDGE DEPLOYMENT",
        title: "100/100 Lighthouse Optimization & Global Edge CDN Handover",
        description:
          "Stress-testing across 50+ device viewport configurations, automated Lighthouse audits, edge cache rule tuning, enterprise security penetration checks, and a white-glove CMS handover with complete source code ownership.",
        deliverables: [
          "Automated 100/100 Lighthouse CI/CD Pipeline",
          "Edge Cache Caching & Geo-Routing",
          "Enterprise SSL & Security Hardening",
          "Full Source Code & Admin Handover",
        ],
        timecode: "PHASE 04 // EDGE DEPLOY",
        optics: "DEPLOYMENT // 24ms GLOBAL TTFB",
        sceneTag: "LIGHTHOUSE 100/100 CI/CD AUDIT",
        media: {
          id: "web-04-media",
          type: "image",
          src: "/images/cinematic_reel_portrait.jpg",
          alt: "Edge deployment and speed optimization audit",
        },
      },
    ],
  },

  "event-organization": {
    kicker: "EXPERIENTIAL ARCHITECTURE // HOW WE STAGE IT",
    title: "How we stage it.",
    titleHighlight: "From 3D spatial CAD to global broadcast.",
    description:
      "Select a stage to explore our experiential production pipeline. Every event is engineered with zero-failure redundancy, concert-grade rigging, and turnkey broadcast.",
    steps: [
      {
        id: "event-01",
        number: "01",
        category: "CONCEPT & CAD",
        title: "Spatial Concept, Venue Scouting & 3D CAD Blueprinting",
        description:
          "We initiate every commission with precision spatial planning. We scout historic or industrial venues, model photorealistic 3D architectural CAD sets, simulate acoustic reflections, and map complete VIP pedestrian flows.",
        deliverables: [
          "Photorealistic 3D Spatial CAD Renders",
          "Acoustic Reflection & Dispersion Modeling",
          "VIP Pedestrian & Egress Flow Schematics",
          "Structural Load Permitting & Clearances",
        ],
        timecode: "PHASE 01 // ARCHITECTURE",
        optics: "SPATIAL CAD: 0.0mm TOLERANCE",
        sceneTag: "3D VENUE MODELING & VIP FLOWS",
        media: {
          id: "event-01-media",
          type: "image",
          src: "/images/director_monitor_bts.jpg",
          alt: "3D architectural CAD blueprint and venue scouting",
        },
      },
      {
        id: "event-02",
        number: "02",
        category: "RIGGING & AV",
        title: "Concert-Grade Truss Rigging, LED Volume & DMX Lighting",
        description:
          "Deploying enterprise concert-grade truss rigging, synchronized DMX automated moving heads, high-nit curved MicroLED backdrop volumes, and acoustically tuned line-array sound systems backed by redundant power generators.",
        deliverables: [
          "Truss Rigging & Rigorous Load Calculations",
          "Synchronized DMX Moving Head Lighting",
          "MicroLED Video Wall Color Calibration",
          "Dual Secondary Generator Power Backup",
        ],
        timecode: "PHASE 02 // RIGGING",
        optics: "DMX RIG // 240 FIXTURES SYNCED",
        sceneTag: "CONCERT-GRADE TRUSS & MICROLED SETUP",
        media: {
          id: "event-02-media",
          type: "video",
          src: "/videos/cinema_production_graded.mp4",
          poster: "/images/cinema_production_graded.jpg",
          alt: "LED video wall staging and lighting rigging",
        },
      },
      {
        id: "event-03",
        number: "03",
        category: "CHOREOGRAPHY",
        title: "Timecode-Synced Show Calling & Backstage Protocol",
        description:
          "Executing precision timecode-locked rehearsal passes with executive speakers, keynote teleprompter coaching, live wireless in-ear monitoring, stage cue calling, and white-glove VIP diplomatic security dry runs.",
        deliverables: [
          "Second-by-Second Run-of-Show Protocols",
          "Speaker Teleprompter Coaching Passes",
          "Wireless In-Ear Monitor (IEM) Tuning",
          "VIP Diplomatic Security Protocols",
        ],
        timecode: "PHASE 03 // REHEARSAL",
        optics: "RUN-OF-SHOW // TIMECODE LOCKED",
        sceneTag: "TIMECODE SHOW CALLING & VIP REHEARSALS",
        media: {
          id: "event-03-media",
          type: "image",
          src: "/images/cinema_production_graded.jpg",
          alt: "Run of show rehearsal and executive stage calling",
        },
      },
      {
        id: "event-04",
        number: "04",
        category: "BROADCAST & PR",
        title: "4K Multi-Camera Live Broadcast & Same-Day Sizzle Delivery",
        description:
          "Directing live multi-camera television broadcast with cinema glass, jib cranes, and wireless Steadicams. Same-day on-site editing suites cut and syndicate high-energy highlight sizzles to global press and media desks.",
        deliverables: [
          "Ultra-Low Latency 4K Global Broadcast",
          "Same-Day High-Impact Sizzle Reel Delivery",
          "Full Master Audio & Multi-Cam Archival",
          "Global PR Press Kit Asset Distribution",
        ],
        timecode: "PHASE 04 // LIVE SHOW",
        optics: "BROADCAST // 4K 60FPS RECORDING",
        sceneTag: "MULTI-CAM LIVE BROADCAST & PR SIZZLES",
        media: {
          id: "event-04-media",
          type: "image",
          src: "/images/cinematic_reel_portrait.jpg",
          alt: "4K live broadcast control and same day sizzle delivery",
        },
      },
    ],
  },
};
