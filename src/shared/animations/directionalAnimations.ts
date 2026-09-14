import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type Direction =
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "top"
  | "bottom";

export interface DirectionalConfig {
  distance?: number;
  subtle?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number | gsap.StaggerVars;
  scrollTrigger?: ScrollTrigger.Vars;
  clearProps?: string;
  initialOpacity?: number;
}

/**
 * Checks if prefers-reduced-motion is active in the user's browser.
 */
export const isReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Calculates responsive directional offsets to ensure controlled movement
 * without causing horizontal overflow or jarring animations on mobile/tablet.
 */
export const getDirectionVector = (
  direction: Direction,
  options: { distance?: number; subtle?: boolean } = {},
): { x: number; y: number } => {
  if (typeof window === "undefined" || isReducedMotion()) {
    return { x: 0, y: 0 };
  }

  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  let baseDistance: number;

  if (options.distance !== undefined) {
    const scale = isMobile ? 0.45 : isTablet ? 0.7 : 1;
    baseDistance = options.distance * scale;
  } else if (options.subtle) {
    baseDistance = isMobile ? 14 : isTablet ? 20 : 28;
  } else {
    baseDistance = isMobile ? 26 : isTablet ? 45 : 68;
  }

  // Diagonal component multiplier (sin/cos of 45deg ~ 0.707)
  const diag = baseDistance * 0.78;

  switch (direction) {
    case "left":
      return { x: -baseDistance, y: 0 };
    case "right":
      return { x: baseDistance, y: 0 };
    case "top":
      return { x: 0, y: -baseDistance };
    case "bottom":
      return { x: 0, y: baseDistance };
    case "topLeft":
      return { x: -diag, y: -diag };
    case "topRight":
      return { x: diag, y: -diag };
    case "bottomLeft":
      return { x: -diag, y: diag };
    case "bottomRight":
      return { x: diag, y: diag };
    default:
      return { x: 0, y: 0 };
  }
};

/**
 * Generates from/to vars for GSAP tweens and timelines.
 */
export const getDirectionalVars = (
  direction: Direction,
  config: DirectionalConfig = {},
): {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
} => {
  const reduced = isReducedMotion();
  const vector = getDirectionVector(direction, {
    distance: config.distance,
    subtle: config.subtle,
  });

  const duration = config.duration ?? 0.95;
  const ease = config.ease ?? "power3.out";
  const initialOpacity = reduced ? 0.2 : (config.initialOpacity ?? 0);

  const fromVars: gsap.TweenVars = {
    opacity: initialOpacity,
    x: vector.x,
    y: vector.y,
  };

  const toVars: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    y: 0,
    duration,
    ease,
    clearProps: config.clearProps ?? "transform,opacity",
  };

  if (config.delay !== undefined) {
    toVars.delay = config.delay;
  }

  if (config.stagger !== undefined) {
    toVars.stagger = config.stagger;
  }

  if (config.scrollTrigger) {
    toVars.scrollTrigger = config.scrollTrigger;
  }

  return { from: fromVars, to: toVars };
};

/**
 * Animates a target or targets with directional movement.
 */
export const animateDirectional = (
  target: gsap.DOMTarget,
  direction: Direction,
  config: DirectionalConfig = {},
): gsap.core.Tween => {
  const { from, to } = getDirectionalVars(direction, config);
  return gsap.fromTo(target, from, to);
};

export const animateFromLeft = (target: gsap.DOMTarget, config?: DirectionalConfig) =>
  animateDirectional(target, "left", config);

export const animateFromRight = (target: gsap.DOMTarget, config?: DirectionalConfig) =>
  animateDirectional(target, "right", config);

export const animateFromTopLeft = (target: gsap.DOMTarget, config?: DirectionalConfig) =>
  animateDirectional(target, "topLeft", config);

export const animateFromTopRight = (target: gsap.DOMTarget, config?: DirectionalConfig) =>
  animateDirectional(target, "topRight", config);

export const animateFromBottomLeft = (target: gsap.DOMTarget, config?: DirectionalConfig) =>
  animateDirectional(target, "bottomLeft", config);

export const animateFromBottomRight = (target: gsap.DOMTarget, config?: DirectionalConfig) =>
  animateDirectional(target, "bottomRight", config);

export const animateFromBottom = (target: gsap.DOMTarget, config?: DirectionalConfig) =>
  animateDirectional(target, "bottom", config);
