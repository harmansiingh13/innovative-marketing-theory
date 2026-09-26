import { ServiceType } from "@/shared/components/ServiceProcess";

export interface CardMediaItem {
  src: string;
  alt: string;
  label?: string;
}

export interface LayeredCardsSet {
  watermarkText: string;
  topRight: CardMediaItem;
  center: CardMediaItem;
  bottomLeft: CardMediaItem;
}

export const defaultLayeredCardsData: Record<ServiceType, LayeredCardsSet> = {
  "video-shoots": {
    watermarkText: "SHOOTS",
    topRight: {
      src: "/images/director_monitor_bts.jpg",
      alt: "Director monitor and camera crew on production set",
      label: "DIRECTOR MONITOR // BTS",
    },
    center: {
      src: "/images/cinema_production_graded.jpg",
      alt: "Cinema camera rig with anamorphic lens on set",
      label: "ARRI CINEMA RIG // LIVE",
    },
    bottomLeft: {
      src: "/images/cinematic_reel_portrait.jpg",
      alt: "Dramatic cinema lighting and film scene",
      label: "GRADED NARRATIVE FRAME",
    },
  },
  "video-editing": {
    watermarkText: "EDITING",
    topRight: {
      src: "/images/director_monitor_bts.jpg",
      alt: "Footage logging and narrative selects",
      label: "INGEST & SELECTS",
    },
    center: {
      src: "/images/cinema_production_graded.jpg",
      alt: "Multi-track NLE timeline master cut",
      label: "HIGH-RETENTION CUT",
    },
    bottomLeft: {
      src: "/images/cinematic_reel_portrait.jpg",
      alt: "DaVinci Wide Gamut graded scene",
      label: "DAVINCI GRADE",
    },
  },
  "social-media": {
    watermarkText: "SOCIAL",
    topRight: {
      src: "/images/cinema_production_graded.jpg",
      alt: "Kinetic short-form content production",
      label: "CONTENT ENGINE",
    },
    center: {
      src: "/images/director_monitor_bts.jpg",
      alt: "Audience analytics and narrative strategy",
      label: "ALGORITHMIC AUTHORITY",
    },
    bottomLeft: {
      src: "/images/cinematic_reel_portrait.jpg",
      alt: "High-retention visual hooks and engagement",
      label: "COMMUNITY REACH",
    },
  },
  advertisement: {
    watermarkText: "ADS",
    topRight: {
      src: "/images/cinematic_reel_portrait.jpg",
      alt: "High-converting brand narrative visual",
      label: "PERFORMANCE ASSET",
    },
    center: {
      src: "/images/cinema_production_graded.jpg",
      alt: "Commercial ad production and filming",
      label: "4.8X ROAS CAMPAIGN",
    },
    bottomLeft: {
      src: "/images/director_monitor_bts.jpg",
      alt: "Creative audit and multivariate testing",
      label: "CREATIVE TESTING",
    },
  },
  "web-development": {
    watermarkText: "CODE",
    topRight: {
      src: "/images/director_monitor_bts.jpg",
      alt: "Architecture planning and design systems",
      label: "DESIGN SYSTEM",
    },
    center: {
      src: "/images/cinematic_reel_portrait.jpg",
      alt: "Interactive digital flagship and web platform",
      label: "100% LIGHTHOUSE",
    },
    bottomLeft: {
      src: "/images/cinema_production_graded.jpg",
      alt: "Sub-second load speeds and responsive web",
      label: "HIGH-PERF STACK",
    },
  },
  "event-organization": {
    watermarkText: "EVENTS",
    topRight: {
      src: "/images/director_monitor_bts.jpg",
      alt: "Stage ops control and live run-of-show",
      label: "STAGE CONTROL",
    },
    center: {
      src: "/images/cinema_production_graded.jpg",
      alt: "Keynote reveal and live arena production",
      label: "MAIN STAGE PRODUCTION",
    },
    bottomLeft: {
      src: "/images/cinematic_reel_portrait.jpg",
      alt: "Atmospheric spatial lighting and attendee experience",
      label: "VIP EXPERIENCE",
    },
  },
};
