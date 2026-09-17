export interface HeroImage {
  src: string;
  alt: string;
  badge?: string;
}

export interface CapabilityItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ProjectItem {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  layout?: "image-left" | "image-right" | "full-width";
}

export interface WorkflowStage {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  deliverables: string[];
}

export interface ImpactPillar {
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  aliases?: string[];
  title: string;
  eyebrow: string;
  headline: {
    line1: string;
    line2Prefix?: string;
    highlight: string;
    line2Suffix?: string;
  };
  description: string;
  heroImages: HeroImage[];
  intro: {
    label: string;
    statement: string;
    paragraph: string;
  };
  capabilities: CapabilityItem[];
  process: ProcessStep[];
  projects: ProjectItem[];
  workflow: WorkflowStage[];
  impactStatements: ImpactPillar[];
  cta: {
    title: string;
    highlightTitle?: string;
    description: string;
    buttonText?: string;
  };
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  "video-shoots": {
    slug: "video-shoots",
    aliases: ["professional-video-shoots"],
    title: "Professional Video Shoots",
    eyebrow: "PROFESSIONAL VIDEO SHOOTS",
    headline: {
      line1: "WE DON'T JUST SHOOT.",
      line2Prefix: "WE CREATE ",
      highlight: "PRESENCE.",
    },
    description:
      "Cinematic video built to give your brand a distinct visual identity and a stronger presence.",
    heroImages: [
      {
        src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
        alt: "Professional cinema camera setup",
        badge: "01 / CINEMA CAMERA",
      },
      {
        src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80",
        alt: "Studio lighting and production rig",
        badge: "02 / LIGHTING RIG",
      },
      {
        src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80",
        alt: "Director at work behind the scenes",
        badge: "03 / DIRECTOR ON SET",
      },
      {
        src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80",
        alt: "Cinematic camera operator framing",
        badge: "04 / CAMERA OPERATOR",
      },
    ],
    intro: {
      label: "THE IDEA",
      statement: "YOUR BRAND DESERVES TO BE SEEN DIFFERENTLY.",
      paragraph:
        "Professional video transforms ideas, products and stories into visual experiences people remember.",
    },
    capabilities: [
      {
        number: "01",
        title: "COMMERCIAL FILMS",
        description:
          "High-production commercial films designed to elevate brand identity and drive market distinction.",
        tags: ["Commercials", "4K Cinema", "Art Direction"],
      },
      {
        number: "02",
        title: "BRAND VIDEOS",
        description:
          "Story-led brand films capturing your vision, culture, and core mission.",
        tags: ["Brand Identity", "Storytelling", "Executive Vision"],
      },
      {
        number: "03",
        title: "PRODUCT VIDEOGRAPHY",
        description:
          "Precision macro lighting and dynamic product movement bringing details to life.",
        tags: ["Macro Studio", "Product Motion", "Lighting Control"],
      },
      {
        number: "04",
        title: "CORPORATE FILMS",
        description:
          "Polished corporate & executive communications built for authority and clarity.",
        tags: ["Corporate Communications", "Interviews", "Executive Coaching"],
      },
      {
        number: "05",
        title: "SOCIAL MEDIA VIDEO",
        description:
          "Short-form cinematic video engineered specifically for feed retention and engagement.",
        tags: ["Short-Form Video", "Reels & Shorts", "Social First"],
      },
      {
        number: "06",
        title: "EVENT COVERAGE",
        description:
          "Dynamic multi-cam event documentation capturing high-energy moments.",
        tags: ["Event Cinema", "Live Coverage", "Highlights"],
      },
    ],
    process: [
      {
        step: "01",
        title: "DISCOVER",
        subtitle: "Brand & Objective Alignment",
        description: "Understand the brand, audience and objective.",
      },
      {
        step: "02",
        title: "CONCEPT",
        subtitle: "Visual Story Development",
        description: "Develop the creative direction and visual story.",
      },
      {
        step: "03",
        title: "PRE-PRODUCTION",
        subtitle: "Logistics & Planning",
        description: "Plan locations, shots, talent, lighting and production.",
      },
      {
        step: "04",
        title: "PRODUCTION",
        subtitle: "Cinematic Shooting",
        description: "Capture cinematic footage with professional equipment and direction.",
      },
      {
        step: "05",
        title: "POST-PRODUCTION",
        subtitle: "Polished Visuals",
        description: "Turn raw footage into a polished visual experience.",
      },
    ],
    projects: [
      {
        number: "PROJECT 01",
        title: "NEO-LUXE AUTOMOTIVE FILM",
        category: "COMMERCIAL CINEMATOGRAPHY",
        description:
          "A high-speed night cinematic shoot combining anamorphic lenses with dynamic car-rigged tracking systems.",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        layout: "image-left",
      },
      {
        number: "PROJECT 02",
        title: "ARCHITECTURAL HARMONY DOCUMENTARY",
        category: "BRAND DOCUMENTARY",
        description:
          "On-location documentary capture exploring minimalist structural design across four coastal residences.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        layout: "image-right",
      },
      {
        number: "PROJECT 03",
        title: "APEX HOROLOGY BRAND ANTHEM",
        category: "PRODUCT CINEMATOGRAPHY",
        description:
          "Precision macro camera movement and high-frame-rate studio lighting highlighting hand-crafted watchmaking.",
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80",
        layout: "full-width",
      },
    ],
    workflow: [
      {
        id: "concept",
        num: "01",
        name: "CONCEPT",
        subtitle: "Creative Direction & Storyboarding",
        description:
          "Establishing creative direction, visual storyboards, and shoot objectives.",
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Creative Moodboard", "Visual Storyboard", "Shot List"],
      },
      {
        id: "pre-production",
        num: "02",
        name: "PRE-PRODUCTION",
        subtitle: "Location & Talent Planning",
        description:
          "Coordinating locations, call sheets, talent, and technical gear matrices.",
        image:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Call Sheet & Schedule", "Location Scouting", "Equipment Spec"],
      },
      {
        id: "production",
        num: "03",
        name: "PRODUCTION",
        subtitle: "On-Set Cinema Capture",
        description:
          "Executing multi-cam footage capture with broadcast lighting and sound.",
        image:
          "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["4K RAW Ingest", "Multi-Angle Coverage", "Studio Audio Logs"],
      },
      {
        id: "post-production",
        num: "04",
        name: "POST-PRODUCTION",
        subtitle: "Edit, Grade & Sound",
        description:
          "Editing, color grading, and spatial audio mastering into a finished film.",
        image:
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Master Cut", "Color Grade", "Sound Master"],
      },
      {
        id: "delivery",
        num: "05",
        name: "DELIVERY",
        subtitle: "Multi-Format Masters",
        description:
          "Delivering optimized master files across social, web, and broadcast ratios.",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Final 4K Master", "Social Ratios (9:16 / 16:9)", "Archive Drives"],
      },
    ],
    impactStatements: [
      {
        title: "VISUAL IDENTITY",
        subtitle: "DISTINCT BRAND IMAGE",
        description: "A signature aesthetic that sets your brand apart in competitive markets.",
      },
      {
        title: "CINEMATIC QUALITY",
        subtitle: "FEATURE-FILM STANDARDS",
        description: "Uncompromised camera work, lighting, and sound direction.",
      },
      {
        title: "BRAND PRESENCE",
        subtitle: "AUTHORITY & PRESTIGE",
        description: "Elevated video production that commands immediate market respect.",
      },
      {
        title: "MEMORABLE STORYTELLING",
        subtitle: "AUDIENCE CONNECTION",
        description: "Visual stories crafted to resonate deeply and spark action.",
      },
    ],
    cta: {
      title: "GIVE YOUR BRAND",
      highlightTitle: "A STRONGER PRESENCE.",
      description: "Let us produce cinematic video content that sets your brand apart.",
      buttonText: "LET'S TALK ↗",
    },
  },

  "video-editing": {
    slug: "video-editing",
    aliases: ["video-editing"],
    title: "Video Editing",
    eyebrow: "VIDEO EDITING",
    headline: {
      line1: "WE DON'T JUST EDIT.",
      line2Prefix: "WE CREATE ",
      highlight: "MOMENTUM.",
    },
    description:
      "Sharp, high-retention edits built for social feeds, campaigns and digital platforms.",
    heroImages: [
      {
        src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
        alt: "Timeline editing workstation",
        badge: "01 / TIMELINE MASTERY",
      },
      {
        src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
        alt: "Color grading panel",
        badge: "02 / COLOR SUITE",
      },
      {
        src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80",
        alt: "Motion graphics & sound editing",
        badge: "03 / MOTION & SOUND",
      },
      {
        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
        alt: "High-retention video cutdowns",
        badge: "04 / RETENTION EDIT",
      },
    ],
    intro: {
      label: "THE IDEA",
      statement: "RAW FOOTAGE IS ONLY THE BEGINNING.",
      paragraph:
        "Great editing turns footage into a story, a feeling and an experience that keeps people watching.",
    },
    capabilities: [
      {
        number: "01",
        title: "SHORT-FORM VIDEO",
        description:
          "Fast-paced, hook-driven edits built for Instagram Reels, Shorts, and TikTok.",
        tags: ["Reels & Shorts", "Hook Design", "Subtitles"],
      },
      {
        number: "02",
        title: "REELS & SOCIAL CONTENT",
        description:
          "Engaging social-first edits structured to maximize watch time and shares.",
        tags: ["Social Cutdowns", "Pacing", "Engagement"],
      },
      {
        number: "03",
        title: "LONG-FORM EDITING",
        description:
          "Documentary cuts, YouTube masterclasses, and corporate videos with narrative depth.",
        tags: ["YouTube Editing", "Documentaries", "Narrative Arc"],
      },
      {
        number: "04",
        title: "MOTION GRAPHICS",
        description:
          "Dynamic kinetic typography, animated lower-thirds, and visual title design.",
        tags: ["Kinetic Type", "Overlay FX", "Brand Graphics"],
      },
      {
        number: "05",
        title: "COLOR GRADING",
        description:
          "DaVinci Resolve color passes for filmic skin tones and signature brand looks.",
        tags: ["DaVinci Resolve", "Color Passes", "LUT Tuning"],
      },
      {
        number: "06",
        title: "SOUND DESIGN",
        description:
          "Foley sound effects, dialogue cleanup, and stereo field widening for impact.",
        tags: ["Foley Audio", "Dialogue Cleanup", "Sound Design"],
      },
    ],
    process: [
      {
        step: "01",
        title: "UNDERSTAND",
        subtitle: "Objective & Footage Review",
        description: "Understand the footage, audience and objective.",
      },
      {
        step: "02",
        title: "SELECT",
        subtitle: "Strongest Moments",
        description: "Find the strongest moments.",
      },
      {
        step: "03",
        title: "STRUCTURE",
        subtitle: "Story & Rhythm",
        description: "Build rhythm, pacing and storytelling.",
      },
      {
        step: "04",
        title: "ENHANCE",
        subtitle: "Sound, Color & Motion",
        description: "Add sound, color, motion and visual effects.",
      },
      {
        step: "05",
        title: "DELIVER",
        subtitle: "Platform-Ready Content",
        description: "Export platform-ready content.",
      },
    ],
    projects: [
      {
        number: "PROJECT 01",
        title: "KINETIC FITNESS CAMPAIGN",
        category: "SHORT-FORM POST-PRODUCTION",
        description:
          "High-octane sound design and snappy cutdowns yielding strong watch-time metrics across feeds.",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
        layout: "image-left",
      },
      {
        number: "PROJECT 02",
        title: "FOUNDER STORIES DOCUMENTARY",
        category: "CINEMATIC EDITING",
        description:
          "A corporate documentary polished with subtle film emulations and warm acoustic soundscapes.",
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        layout: "image-right",
      },
      {
        number: "PROJECT 03",
        title: "FINTECH AD MATRIX",
        category: "COMMERCIAL AD CUTS",
        description:
          "Multiple ad variations created from raw footage, optimized for conversion performance.",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
        layout: "full-width",
      },
    ],
    workflow: [
      {
        id: "raw-footage",
        num: "01",
        name: "RAW FOOTAGE",
        subtitle: "Ingest & Selection",
        description: "Reviewing raw assets and selecting peak moments.",
        image:
          "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Footage Audit", "Clip Assembly", "Rough Cuts"],
      },
      {
        id: "story",
        num: "02",
        name: "STORY",
        subtitle: "Pacing & Structure",
        description: "Structuring narrative flow and pacing.",
        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Assembly Edit", "Timing Pass", "Hook Structure"],
      },
      {
        id: "edit",
        num: "03",
        name: "EDIT",
        subtitle: "Kinetic Cutdowns",
        description: "Trimming filler and refining scene transitions.",
        image:
          "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Fine Cut", "Subtitles", "Motion Overlays"],
      },
      {
        id: "polish",
        num: "04",
        name: "POLISH",
        subtitle: "Sound & Color",
        description: "Balancing audio levels and applying custom color grade.",
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Color Master", "Audio Mix", "Sound Effects"],
      },
      {
        id: "final-cut",
        num: "05",
        name: "FINAL CUT",
        subtitle: "Platform Exports",
        description: "Delivering platform-ready exports across aspect ratios.",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["4K Master", "9:16 Social Ratios", "Subtitles (SRT)"],
      },
    ],
    impactStatements: [
      {
        title: "STRONGER RETENTION",
        subtitle: "AUDIENCE FOCUS",
        description: "Edits structured to hook scrollers and keep attention through the final frame.",
      },
      {
        title: "CLEARER STORYTELLING",
        subtitle: "NARRATIVE CLARITY",
        description: "Pacing and cuts that make your message easy to digest and remember.",
      },
      {
        title: "BETTER VISUAL QUALITY",
        subtitle: "POST-PRODUCTION POLISH",
        description: "Color grading, clean typography, and sound design that elevate perception.",
      },
      {
        title: "PLATFORM-READY CONTENT",
        subtitle: "MULTI-FORMAT EXPORTS",
        description: "Optimized aspect ratios ready to publish straight to your feeds.",
      },
    ],
    cta: {
      title: "TURN FOOTAGE INTO",
      highlightTitle: "SOMETHING PEOPLE WATCH.",
      description: "Let our post-production studio turn your video clips into compelling visual stories.",
      buttonText: "LET'S TALK ↗",
    },
  },

  "social-media": {
    slug: "social-media",
    aliases: ["social-media-management"],
    title: "Social Media Management",
    eyebrow: "SOCIAL MEDIA MANAGEMENT",
    headline: {
      line1: "WE DON'T JUST POST.",
      line2Prefix: "WE BUILD ",
      highlight: "ATTENTION.",
    },
    description:
      "A consistent content strategy that turns attention into an active brand community.",
    heroImages: [
      {
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
        alt: "Social media visual composition",
        badge: "01 / BRAND STRATEGY",
      },
      {
        src: "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1000&q=80",
        alt: "Cinematic reel production",
        badge: "02 / SHORT-FORM REELS",
      },
      {
        src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
        alt: "Data analytics telemetry",
        badge: "03 / TELEMETRY & METRICS",
      },
      {
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        alt: "Editorial portrait shoot",
        badge: "04 / CREATIVE DIRECTION",
      },
    ],
    intro: {
      label: "THE IDEA",
      statement: "IN A WORLD OF INFINITE FEED NOISE, CONSISTENT ATTENTION IS THE ULTIMATE LEVERAGE.",
      paragraph:
        "Posting randomly doesn't build brands. We engineer cohesive social ecosystems combining strategy, high-craft content, and algorithmic optimization.",
    },
    capabilities: [
      {
        number: "01",
        title: "DEEP-DIVE RESEARCH & STRATEGY",
        description:
          "Before creating a single post, we analyze your industry, audience, competitors, and positioning.",
        tags: ["Audience Intelligence", "Competitor Audit", "Content Pillars"],
      },
      {
        number: "02",
        title: "HIGH-IMPACT CONTENT CREATION",
        description:
          "From cinematic short-form reels to beautifully designed carousels, we produce original social-first content.",
        tags: ["Cinematic Reels", "Brand Graphic Design", "Motion Carousels"],
      },
      {
        number: "03",
        title: "COPYWRITING & STRATEGIC POSTING",
        description:
          "We craft psychologically-driven captions and manage daily publishing schedules.",
        tags: ["Psychology Copywriting", "Strategic Scheduling", "Hashtag Frameworks"],
      },
      {
        number: "04",
        title: "ANALYTICS & CONTINUOUS OPTIMIZATION",
        description:
          "We continuously track engagement, reach, and conversion metrics to refine performance.",
        tags: ["Performance Telemetry", "Retention Tuning", "Monthly Strategy Audits"],
      },
    ],
    process: [
      {
        step: "01",
        title: "AUDIENCE & BRAND AUDIT",
        subtitle: "Baseline & Persona Mapping",
        description:
          "Analyzing historical performance, competitor playbooks, and audience interests.",
      },
      {
        step: "02",
        title: "CONTENT SYSTEM DESIGN",
        subtitle: "Pillars & Style Blueprint",
        description:
          "Defining visual direction, caption voice tone, posting cadence, and brand graphics.",
      },
      {
        step: "03",
        title: "PRODUCTION & SCHEDULING",
        subtitle: "Reels, Graphics & Copy",
        description:
          "Executing monthly content batches, editing video clips, and staging publishing.",
      },
      {
        step: "04",
        title: "TELEMETRY & ITERATION",
        subtitle: "Monthly Analytics & Growth",
        description:
          "Reviewing engagement metrics and refining content pillars based on data.",
      },
    ],
    projects: [
      {
        number: "CASE STUDY 01",
        title: "LUXURY WELLNESS BRAND REPOSITIONING",
        category: "SOCIAL STRATEGY & REELS",
        description:
          "Transformed static social feeds into editorial short-form reels, generating significant organic reach.",
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        layout: "image-left",
      },
      {
        number: "CASE STUDY 02",
        title: "FINTECH COMMUNITY EXPANSION",
        category: "CONTENT PILLARS & COPY",
        description:
          "Built a LinkedIn and Instagram content engine focused on financial literacy and brand authority.",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
        layout: "image-right",
      },
      {
        number: "CASE STUDY 03",
        title: "EDITORIAL APPAREL LAUNCH CAMPAIGN",
        category: "FULL SOCIAL MANAGEMENT",
        description:
          "A 60-day product launch rollout combining teaser reels, aesthetic carousels, and collaborations.",
        image:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
        layout: "full-width",
      },
    ],
    workflow: [
      {
        id: "discover",
        num: "01",
        name: "DISCOVER",
        subtitle: "Audience Intelligence",
        description:
          "Deep dive into brand DNA, target demographics, and competitor positioning.",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Audience Persona Map", "Competitor Matrix", "Brand Audit Report"],
      },
      {
        id: "define",
        num: "02",
        name: "DEFINE",
        subtitle: "Creative Blueprint",
        description:
          "Formulating core content pillars, visual style guides, and editorial roadmaps.",
        image:
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Content Pillars Strategy", "Visual Style Guide", "Editorial Calendar"],
      },
      {
        id: "create",
        num: "03",
        name: "CREATE",
        subtitle: "Content Production",
        description:
          "Shooting reels, designing carousels, and writing engaging captions.",
        image:
          "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Reels & Shorts", "Custom Carousels", "Psychology Copywriting"],
      },
      {
        id: "publish",
        num: "04",
        name: "PUBLISH",
        subtitle: "Strategic Scheduling",
        description:
          "Publishing during peak activity windows and managing community interactions.",
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Peak-Time Scheduling", "Metadata & SEO Tags", "Community Protocols"],
      },
      {
        id: "optimize",
        num: "05",
        name: "OPTIMIZE",
        subtitle: "Performance Telemetry",
        description:
          "Analyzing watch time, retention, and engagement metrics to refine performance.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Performance Dashboard", "Retention Deep-Dive", "Strategy Updates"],
      },
    ],
    impactStatements: [
      {
        title: "BRAND AUTHORITY",
        subtitle: "INDUSTRY RECOGNITION",
        description: "Consistent high-craft content establishes leadership in your niche.",
      },
      {
        title: "ORGANIC REACH",
        subtitle: "ALGORITHMIC TRACTION",
        description: "Reels and graphics engineered for viral discovery.",
      },
      {
        title: "COMMUNITY LOYALTY",
        subtitle: "ENGAGEMENT & TRUST",
        description: "Turning casual scrollers into an active brand community.",
      },
      {
        title: "SUSTAINABLE SYSTEM",
        subtitle: "PREDICTABLE OUTPUT",
        description: "A publishing engine delivering premium content consistently.",
      },
    ],
    cta: {
      title: "READY TO BUILD A",
      highlightTitle: "DOMINANT BRAND?",
      description: "Let us build a strategic social media system tailored to your growth goals.",
      buttonText: "START A CONVERSATION ↗",
    },
  },

  advertisement: {
    slug: "advertisement",
    aliases: ["advertisement-running"],
    title: "Advertisement Running",
    eyebrow: "ADVERTISEMENT RUNNING",
    headline: {
      line1: "WE DON'T JUST RUN ADS.",
      line2Prefix: "WE BUILD ",
      highlight: "ATTENTION.",
    },
    description:
      "Targeted campaigns designed to reach the right people and drive meaningful results.",
    heroImages: [
      {
        src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
        alt: "Paid media analytics console",
        badge: "01 / CAMPAIGN PLANNING",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
        alt: "Audience targeting & analytics dashboard",
        badge: "02 / TARGETING & ANALYTICS",
      },
      {
        src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80",
        alt: "Advertising creative development workspace",
        badge: "03 / AD CREATIVES",
      },
      {
        src: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1000&q=80",
        alt: "Social advertisements campaign review",
        badge: "04 / SOCIAL ADS",
      },
    ],
    intro: {
      label: "THE IDEA",
      statement: "THE RIGHT MESSAGE. IN FRONT OF THE RIGHT PEOPLE.",
      paragraph:
        "Effective advertising combines creative thinking, audience understanding and continuous optimization.",
    },
    capabilities: [
      {
        number: "01",
        title: "CAMPAIGN STRATEGY",
        description:
          "Defining campaign objectives, channel positioning, and budget allocation models.",
        tags: ["Strategy Blueprint", "Budget Allocation", "KPI Setup"],
      },
      {
        number: "02",
        title: "AUDIENCE TARGETING",
        description:
          "In-depth demographic, behavioral, and interest-based audience segmentation.",
        tags: ["Demographics", "Lookalikes", "Custom Audiences"],
      },
      {
        number: "03",
        title: "CREATIVE DEVELOPMENT",
        description:
          "Designing high-impact ad copy, static visuals, and video hooks engineered for conversion.",
        tags: ["Ad Creatives", "Copywriting", "Visual Hooks"],
      },
      {
        number: "04",
        title: "SOCIAL ADVERTISING",
        description:
          "Full-funnel campaign deployment across Meta, TikTok, LinkedIn, and YouTube.",
        tags: ["Meta Ads", "TikTok Ads", "YouTube Ads"],
      },
      {
        number: "05",
        title: "CAMPAIGN MANAGEMENT",
        description:
          "Daily campaign monitoring, bidding adjustment, and pixel telemetry optimization.",
        tags: ["Daily Oversight", "Bid Tuning", "Pixel Telemetry"],
      },
      {
        number: "06",
        title: "PERFORMANCE OPTIMIZATION",
        description:
          "Continuous testing of creative variants, headlines, and landing pages to refine efficiency.",
        tags: ["A/B Testing", "Conversion Refinement", "Scale Strategy"],
      },
    ],
    process: [
      {
        step: "01",
        title: "RESEARCH",
        subtitle: "Audience & Market Analysis",
        description: "Understand audience, market and competition.",
      },
      {
        step: "02",
        title: "STRATEGY",
        subtitle: "Objectives & Direction",
        description: "Define objectives, targeting and campaign direction.",
      },
      {
        step: "03",
        title: "CREATIVE",
        subtitle: "High-Impact Assets",
        description: "Develop high-impact advertising creatives.",
      },
      {
        step: "04",
        title: "LAUNCH",
        subtitle: "Multi-Platform Deployment",
        description: "Deploy campaigns across relevant platforms.",
      },
      {
        step: "05",
        title: "OPTIMIZE",
        subtitle: "Continuous Refinement",
        description: "Monitor performance and continuously refine campaigns.",
      },
    ],
    projects: [
      {
        number: "PROJECT 01",
        title: "SAAS B2B ACQUISITION CAMPAIGN",
        category: "MULTI-CHANNEL PAID MEDIA",
        description:
          "Scaled pipeline acquisition through targeted search and social campaign architectures.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        layout: "image-left",
      },
      {
        number: "PROJECT 02",
        title: "E-COMMERCE REVENUE SCALING",
        category: "META & GOOGLE ADS",
        description:
          "Deployed conversion-focused social ads combining UGC video hooks and carousel formats.",
        image:
          "https://images.unsplash.com/photo-1556742049-0a670c400716?auto=format&fit=crop&w=1200&q=80",
        layout: "image-right",
      },
      {
        number: "PROJECT 03",
        title: "D2C BRAND GLOBAL EXPANSION",
        category: "CREATIVE TESTING MATRIX",
        description:
          "Tested distinct visual ad angles to uncover high-converting audience messaging.",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
        layout: "full-width",
      },
    ],
    workflow: [
      {
        id: "research",
        num: "01",
        name: "RESEARCH",
        subtitle: "Audience & Competitor Intelligence",
        description: "Analyzing target demographics, search intent, and competitor ad messaging.",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Market Intelligence Report", "Audience Profiles", "Competitive Matrix"],
      },
      {
        id: "strategy",
        num: "02",
        name: "STRATEGY",
        subtitle: "Campaign Blueprint",
        description: "Mapping campaign structure, budget allocation, and target metrics.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Campaign Hierarchy Plan", "Targeting Parameters", "Budget Breakdown"],
      },
      {
        id: "creative",
        num: "03",
        name: "CREATIVE",
        subtitle: "Ad Copy & Design",
        description: "Crafting engaging headlines, visual formats, and clear call-to-actions.",
        image:
          "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Ad Creatives Matrix", "Copy Variations", "Video Hooks"],
      },
      {
        id: "launch",
        num: "04",
        name: "LAUNCH",
        subtitle: "Deployment & Pixel Tracking",
        description: "Setting up tracking pixels, testing links, and deploying live campaigns.",
        image:
          "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Live Campaigns", "Pixel Verification", "Tracking Dashboard"],
      },
      {
        id: "optimize",
        num: "05",
        name: "OPTIMIZE",
        subtitle: "Telemetry & Iteration",
        description: "Monitoring daily performance metrics and refining budget towards top performers.",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Performance Reports", "Creative Refresh", "Budget Scaling"],
      },
    ],
    impactStatements: [
      {
        title: "TARGETED REACH",
        subtitle: "QUALIFIED AUDIENCES",
        description: "Putting your brand directly in front of the people most likely to engage.",
      },
      {
        title: "STRONGER CREATIVE",
        subtitle: "HIGH-CONVERTING AD ASSETS",
        description: "Ad copy and visual designs built to capture immediate attention.",
      },
      {
        title: "MEASURABLE CAMPAIGNS",
        subtitle: "TRANSPARENT METRICS",
        description: "Clear telemetry tracking campaign performance and user response.",
      },
      {
        title: "CONTINUOUS OPTIMIZATION",
        subtitle: "ITERATIVE REFINEMENT",
        description: "Ongoing testing to maximize performance and efficiency over time.",
      },
    ],
    cta: {
      title: "READY TO PUT YOUR BRAND",
      highlightTitle: "IN FRONT OF THE RIGHT PEOPLE?",
      description: "Let's launch targeted advertising campaigns designed to drive meaningful results.",
      buttonText: "START A CONVERSATION ↗",
    },
  },

  "web-development": {
    slug: "web-development",
    aliases: ["web-development"],
    title: "Web Development",
    eyebrow: "WEB DEVELOPMENT",
    headline: {
      line1: "WE DON'T JUST BUILD WEBSITES.",
      line2Prefix: "WE BUILD ",
      highlight: "DIGITAL EXPERIENCES.",
    },
    description:
      "Fast, responsive websites designed to look exceptional and turn visitors into customers.",
    heroImages: [
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        alt: "Modern web development interface",
        badge: "01 / MODERN INTERFACE",
      },
      {
        src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
        alt: "Responsive browser layouts on multiple screens",
        badge: "02 / RESPONSIVE LAYOUTS",
      },
      {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
        alt: "Clean code development environment",
        badge: "03 / CODE ENVIRONMENT",
      },
      {
        src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1000&q=80",
        alt: "Premium UI visual components",
        badge: "04 / PREMIUM UI",
      },
    ],
    intro: {
      label: "THE IDEA",
      statement: "YOUR WEBSITE IS PART OF YOUR BRAND.",
      paragraph:
        "A website should not only look good. It should communicate clearly, perform smoothly and make every interaction feel intentional.",
    },
    capabilities: [
      {
        number: "01",
        title: "WEBSITE DESIGN",
        description:
          "Custom UI/UX layouts engineered for brand authority and clear visual hierarchy.",
        tags: ["UI/UX Design", "Wireframing", "Editorial Aesthetics"],
      },
      {
        number: "02",
        title: "FRONTEND DEVELOPMENT",
        description:
          "Modern frontend builds using clean React and Next.js code structures.",
        tags: ["React 19", "Next.js", "TypeScript"],
      },
      {
        number: "03",
        title: "RESPONSIVE DEVELOPMENT",
        description:
          "Fluid responsiveness ensuring flawless presentation on mobile, tablet, and desktop.",
        tags: ["Mobile First", "Cross-Browser", "Adaptive Layouts"],
      },
      {
        number: "04",
        title: "INTERACTIVE EXPERIENCES",
        description:
          "Subtle animations, micro-interactions, and scroll effects that engage users.",
        tags: ["GSAP Animations", "Micro-Interactions", "Smooth Scroll"],
      },
      {
        number: "05",
        title: "PERFORMANCE OPTIMIZATION",
        description:
          "Optimized page speed, Core Web Vitals, and lightweight asset delivery.",
        tags: ["Speed Optimization", "Core Web Vitals", "SEO Baseline"],
      },
      {
        number: "06",
        title: "MAINTENANCE & SUPPORT",
        description:
          "Ongoing updates, performance audits, and technical support to keep your site fast.",
        tags: ["Technical Support", "Code Maintenance", "Security Audits"],
      },
    ],
    process: [
      {
        step: "01",
        title: "DISCOVER",
        subtitle: "Goals & Requirements",
        description: "Understand business goals, audience and requirements.",
      },
      {
        step: "02",
        title: "PLAN",
        subtitle: "Architecture & User Journeys",
        description: "Define information architecture, user journeys and technology.",
      },
      {
        step: "03",
        title: "DESIGN",
        subtitle: "Visual & Interaction System",
        description: "Create a strong visual and interaction system.",
      },
      {
        step: "04",
        title: "DEVELOP",
        subtitle: "Frontend Build",
        description: "Build a fast, responsive and scalable experience.",
      },
      {
        step: "05",
        title: "LAUNCH",
        subtitle: "Test & Deploy",
        description: "Test, optimize and deploy.",
      },
    ],
    projects: [
      {
        number: "PROJECT 01",
        title: "VANGUARD ARCHITECTURE PLATFORM",
        category: "NEXT.JS & GSAP ANIMATIONS",
        description:
          "A minimalist, editorial website for an architectural studio with interactive project showcases.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        layout: "image-left",
      },
      {
        number: "PROJECT 02",
        title: "QUANTUM VENTURES PORTFOLIO",
        category: "CORPORATE DIGITAL FLAGSHIP",
        description:
          "A high-speed web platform featuring dark aesthetics, custom typography, and fluid page transitions.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        layout: "image-right",
      },
      {
        number: "PROJECT 03",
        title: "AURA LUXURY HOME AUDIO",
        category: "PRODUCT EXPERIENCE",
        description:
          "Interactive digital experience designed to showcase high-ticket luxury product details.",
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80",
        layout: "full-width",
      },
    ],
    workflow: [
      {
        id: "discover",
        num: "01",
        name: "DISCOVER",
        subtitle: "Research & Scope",
        description: "Analyzing site objectives, content architecture, and tech specs.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Project Discovery Document", "Site Sitemap", "Tech Stack Definition"],
      },
      {
        id: "plan",
        num: "02",
        name: "PLAN",
        subtitle: "User Journeys",
        description: "Structuring page wireframes, navigation flow, and conversion points.",
        image:
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Page Wireframes", "UX Navigation Map", "Content Specifications"],
      },
      {
        id: "design",
        num: "03",
        name: "DESIGN",
        subtitle: "UI & Style Tokens",
        description: "Crafting dark-mode layout designs, typography tokens, and UI components.",
        image:
          "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["UI Design System", "High-Fidelity Mockups", "Responsive Layout Specs"],
      },
      {
        id: "develop",
        num: "04",
        name: "DEVELOP",
        subtitle: "Frontend Build",
        description: "Coding modular React/Next.js components and integrating smooth animations.",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Next.js Codebase", "GSAP Interactions", "CSS Modules"],
      },
      {
        id: "launch",
        num: "05",
        name: "LAUNCH",
        subtitle: "Testing & Go-Live",
        description: "Cross-browser testing, Core Web Vitals optimization, and domain deployment.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Speed Audit 95+", "SEO Metadata", "Live Deployment"],
      },
    ],
    impactStatements: [
      {
        title: "FAST EXPERIENCE",
        subtitle: "SUB-SECOND SPEEDS",
        description: "Optimized code structures ensuring fast page loads and smooth navigation.",
      },
      {
        title: "RESPONSIVE DESIGN",
        subtitle: "ALL DEVICE TYPES",
        description: "Layouts recomposed to look exceptional on mobile, tablet, and desktop.",
      },
      {
        title: "STRONG USER EXPERIENCE",
        subtitle: "INTENTIONAL INTERACTIONS",
        description: "Clear visual hierarchy and intuitive flows that make every interaction easy.",
      },
      {
        title: "SCALABLE FOUNDATION",
        subtitle: "FUTURE-PROOF BUILD",
        description: "Modular codebase designed to grow effortlessly as your brand expands.",
      },
    ],
    cta: {
      title: "LET'S BUILD YOUR NEXT",
      highlightTitle: "DIGITAL EXPERIENCE.",
      description: "Ready to design and build a website that turns visitors into customers?",
      buttonText: "START A PROJECT ↗",
    },
  },

  "event-organization": {
    slug: "event-organization",
    aliases: ["event-organization"],
    title: "Event Organization",
    eyebrow: "EVENT ORGANIZATION",
    headline: {
      line1: "WE DON'T JUST ORGANIZE EVENTS.",
      line2Prefix: "WE CREATE ",
      highlight: "EXPERIENCES.",
    },
    description:
      "Memorable experiences brought to life through thoughtful planning and flawless execution.",
    heroImages: [
      {
        src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
        alt: "Event stage with production lighting",
        badge: "01 / STAGE & PRODUCTION",
      },
      {
        src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
        alt: "Event audience and venue atmosphere",
        badge: "02 / VENUE ATMOSPHERE",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
        alt: "Corporate event celebration",
        badge: "03 / CORPORATE EVENT",
      },
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
        alt: "Executive keynote stage lighting",
        badge: "04 / KEYNOTE STAGE",
      },
    ],
    intro: {
      label: "THE IDEA",
      statement: "GREAT EVENTS ARE EXPERIENCED, NOT JUST ATTENDED.",
      paragraph:
        "From the first idea to the final moment, every detail contributes to an experience people remember.",
    },
    capabilities: [
      {
        number: "01",
        title: "CORPORATE EVENTS",
        description:
          "High-level corporate conferences, executive summits, and annual gala gatherings.",
        tags: ["Executive Summits", "Corporate Galas", "Conferences"],
      },
      {
        number: "02",
        title: "BRAND ACTIVATIONS",
        description:
          "Immersive brand pop-ups and experiential installations designed to spark social engagement.",
        tags: ["Pop-Ups", "Experiential", "Installations"],
      },
      {
        number: "03",
        title: "LAUNCH EVENTS",
        description:
          "High-impact product unveilings and media launch experiences executed with precision.",
        tags: ["Product Unveilings", "Media Launches", "VIP Events"],
      },
      {
        number: "04",
        title: "LIVE EXPERIENCES",
        description:
          "Concert-grade sound reinforcement, stage lighting, and live show production.",
        tags: ["Live Production", "AV Lighting", "Concert Sound"],
      },
      {
        number: "05",
        title: "EVENT PRODUCTION",
        description:
          "Stage set design, LED wall video mapping, spatial audio, and technical coordination.",
        tags: ["Stage Set Design", "LED Wall Mapping", "Technical Rigging"],
      },
      {
        number: "06",
        title: "ON-GROUND MANAGEMENT",
        description:
          "Flawless run-of-show management, speaker cueing, guest hospitality, and vendor logistics.",
        tags: ["Run of Show", "Vendor Logistics", "Guest Hospitality"],
      },
    ],
    process: [
      {
        step: "01",
        title: "DISCOVER",
        subtitle: "Event Goals & Scope",
        description: "Understand the event, audience and objective.",
      },
      {
        step: "02",
        title: "CONCEPT",
        subtitle: "Theme & Experience",
        description: "Develop the theme, experience and creative direction.",
      },
      {
        step: "03",
        title: "PLAN",
        subtitle: "Logistics & Production",
        description: "Coordinate venue, production, schedule, vendors and logistics.",
      },
      {
        step: "04",
        title: "EXECUTE",
        subtitle: "Precise Coordination",
        description: "Bring the event to life with precise coordination.",
      },
      {
        step: "05",
        title: "DELIVER",
        subtitle: "Flawless End-to-End",
        description: "Ensure every detail is completed and the experience ends strong.",
      },
    ],
    projects: [
      {
        number: "PROJECT 01",
        title: "NEXUS TECH SUMMIT 2026",
        category: "MULTI-DAY CONFERENCE PRODUCTION",
        description:
          "Produced a multi-day technology summit featuring dual LED main stages and live streaming.",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        layout: "image-left",
      },
      {
        number: "PROJECT 02",
        title: "SOLARIS AUTOMOTIVE UNVEILING",
        category: "VIP PRODUCT LAUNCH",
        description:
          "An exclusive invite-only car reveal complete with spatial audio, lighting, and VIP lounges.",
        image:
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
        layout: "image-right",
      },
      {
        number: "PROJECT 03",
        title: "MODERNIST ART & BRAND GALA",
        category: "EXPERIENTIAL DINNER GALA",
        description:
          "Curated an experiential gala combining projection artwork, live acoustic scoring, and fine dining.",
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
        layout: "full-width",
      },
    ],
    workflow: [
      {
        id: "concept",
        num: "01",
        name: "CONCEPT",
        subtitle: "Theme & Direction",
        description: "Defining event creative theme, guest experience, and venue requirements.",
        image:
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Event Theme Concept", "Venue Options Matrix", "Budget Overview"],
      },
      {
        id: "planning",
        num: "02",
        name: "PLANNING",
        subtitle: "Logistics & Schedule",
        description: "Coordinating venue contracts, vendor agreements, and production timelines.",
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Master Schedule", "Vendor Contracts", "Run of Show Blueprint"],
      },
      {
        id: "production",
        num: "03",
        name: "PRODUCTION",
        subtitle: "Stage & AV Set",
        description: "Managing technical AV load-in, stage rigging, soundchecks, and lighting setup.",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Stage Rigging", "AV Soundcheck Logs", "Rehearsal Passes"],
      },
      {
        id: "execution",
        num: "04",
        name: "EXECUTION",
        subtitle: "Live Management",
        description: "Directing live show cues, speaker entrances, and guest flow during the event.",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Live Stage Directing", "Guest Coordination", "On-Ground Management"],
      },
      {
        id: "experience",
        num: "05",
        name: "EXPERIENCE",
        subtitle: "Final Delivery & Recap",
        description: "Ensuring event ends on a high note and capturing highlight video/photo assets.",
        image:
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80",
        deliverables: ["Event Wrap-Up", "Recap Photo/Video Assets", "Attendee Feedback"],
      },
    ],
    impactStatements: [
      {
        title: "MEMORABLE EXPERIENCES",
        subtitle: "LASTING IMPRESSIONS",
        description: "Engaging event environments designed to leave a lasting impact on guests.",
      },
      {
        title: "SEAMLESS EXECUTION",
        subtitle: "PRECISION SHOW CONTROL",
        description: "Meticulous run-of-show timing ensuring flawless audio, video, and stage flow.",
      },
      {
        title: "STRONG BRAND PRESENCE",
        subtitle: "AUTHORITY & PRESTIGE",
        description: "High-grade production that reinforces your brand's market standing.",
      },
      {
        title: "ATTENTION TO DETAIL",
        subtitle: "FLAWLESS LOGISTICS",
        description: "Every touchpoint handled with care from initial planning through load-out.",
      },
    ],
    cta: {
      title: "LET'S CREATE AN",
      highlightTitle: "EXPERIENCE PEOPLE REMEMBER.",
      description: "Ready to produce a memorable event brought to life through thoughtful planning?",
      buttonText: "LET'S TALK ↗",
    },
  },
};

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  const normalizedSlug = slug.toLowerCase();

  // Direct match
  if (SERVICES_DATA[normalizedSlug]) {
    return SERVICES_DATA[normalizedSlug];
  }

  // Alias match
  return Object.values(SERVICES_DATA).find(
    (service) =>
      service.slug === normalizedSlug ||
      (service.aliases && service.aliases.includes(normalizedSlug))
  );
};
