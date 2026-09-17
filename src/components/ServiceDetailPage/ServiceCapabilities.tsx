"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/data/servicesData";
import styles from "./ServiceCapabilities.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCapabilitiesProps {
  service: ServiceData;
}

export const ServiceCapabilities = ({ service }: ServiceCapabilitiesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const blocks = gridRef.current.querySelectorAll(`.${styles.editorialBlock}`);
        gsap.fromTo(
          blocks,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>02 / CORE CAPABILITIES</span>
          </div>

          <h2 className={styles.title}>
            WHAT WE <span className={styles.goldText}>DELIVER.</span>
          </h2>
        </div>

        <div ref={gridRef} className={styles.editorialGrid}>
          {service.capabilities.map((item) => (
            <div key={item.number} className={styles.editorialBlock}>
              <div className={styles.blockLeft}>
                <span className={styles.hugeNumber}>{item.number}</span>
              </div>

              <div className={styles.blockRight}>
                <div className={styles.blockTitleGroup}>
                  <h3 className={styles.blockTitle}>{item.title}</h3>
                  <div className={styles.tagList}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tagBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className={styles.blockDescription}>&ldquo;{item.description}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
