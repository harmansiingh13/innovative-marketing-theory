"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/data/servicesData";
import styles from "./ServiceShowcase.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceShowcaseProps {
  service: ServiceData;
}

export const ServiceShowcase = ({ service }: ServiceShowcaseProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const { projects } = service;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (projectsRef.current) {
        const items = projectsRef.current.querySelectorAll(`.${styles.projectRow}`);
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>04 / SELECTED WORK</span>
          </div>

          <h2 className={styles.title}>
            PORTFOLIO & <span className={styles.goldText}>CASE STUDIES.</span>
          </h2>
        </div>

        <div ref={projectsRef} className={styles.projectsContainer}>
          {projects.map((item) => {
            const layoutClass =
              item.layout === "image-right"
                ? styles.layoutRight
                : item.layout === "full-width"
                ? styles.layoutFull
                : styles.layoutLeft;

            return (
              <div key={item.number} className={`${styles.projectRow} ${layoutClass}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.projectImage}
                  />
                  <div className={styles.imageOverlay} />
                  <span className={styles.projectBadge}>{item.category}</span>
                </div>

                <div className={styles.contentWrapper}>
                  <span className={styles.projectNum}>{item.number}</span>
                  <h3 className={styles.projectTitle}>{item.title}</h3>
                  <p className={styles.projectDesc}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
