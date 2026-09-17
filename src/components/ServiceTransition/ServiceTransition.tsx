"use client";

import React, { createContext, useContext, useState, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import styles from "./ServiceTransition.module.css";

interface ServiceTransitionContextType {
  navigateWithTransition: (href: string, serviceTitle: string) => void;
}

const ServiceTransitionContext = createContext<ServiceTransitionContextType | undefined>(undefined);

export const ServiceTransitionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTitle, setTargetTitle] = useState("");
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const navigateWithTransition = (href: string, serviceTitle: string) => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      router.push(href);
      return;
    }

    setTargetTitle(serviceTitle);
    setIsTransitioning(true);

    // Run short GSAP wipe sequence
    requestAnimationFrame(() => {
      if (!overlayRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
          // Outro transition after router push
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 0.35,
            ease: "power3.inOut",
            onComplete: () => {
              setIsTransitioning(false);
              gsap.set(overlayRef.current, { yPercent: 0, opacity: 0 });
            },
          });
        },
      });

      // 1. Overlay fade/slide in
      tl.fromTo(
        overlayRef.current,
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0, duration: 0.3, ease: "power3.out" }
      );

      // 2. Gold line sweep
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.25, ease: "power2.inOut" },
          "-=0.15"
        );
      }

      // 3. Service title reveal
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "-=0.1"
        );
      }
    });
  };

  return (
    <ServiceTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      
      {/* Overlay transition element */}
      <div
        ref={overlayRef}
        className={`${styles.transitionOverlay} ${isTransitioning ? styles.activeOverlay : ""}`}
        aria-hidden={!isTransitioning}
      >
        <div className={styles.transitionContent}>
          <span className={styles.transitionEyebrow}>NEXT SERVICE</span>
          <div ref={textRef} className={styles.transitionTitle}>
            {targetTitle}
          </div>
          <div ref={lineRef} className={styles.goldLine} />
        </div>
      </div>
    </ServiceTransitionContext.Provider>
  );
};

export const useServiceTransition = () => {
  const context = useContext(ServiceTransitionContext);
  if (!context) {
    throw new Error("useServiceTransition must be used within a ServiceTransitionProvider");
  }
  return context;
};
