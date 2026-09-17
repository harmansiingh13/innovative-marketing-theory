"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/shared/components/Button";
import styles from "./SocialMediaSelectedWork.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "01",
    name: "MUMMY KE LYE",
    niche: "CLINICAL NUTRITION & HEALTH",
    description:
      "Educational storytelling designed to make complex health information simple, relatable and accessible.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=80",
    alt: "Clinical Nutrition & Health creative storytelling",
    layout: "imageLeft",
  },
  {
    id: "02",
    name: "CORPORATE MARKETING",
    niche: "CORPORATE MARKETING",
    description:
      "Strategic positioning and professional storytelling designed to establish authority, communicate value and strengthen brand presence.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80",
    alt: "Corporate Marketing authority presentation",
    layout: "imageRight",
  },
  {
    id: "03",
    name: "CAFÉS & LUXURY DINING",
    niche: "CAFÉS & LUXURY DINING",
    description:
      "Cinematic visuals and engaging campaigns designed to elevate the dining experience and drive attention.",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Cafés & Luxury Dining cinematic campaign visual",
    layout: "imageImmersive",
  },
];

export const SocialMediaSelectedWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (listRef.current) {
        const spreads = listRef.current.querySelectorAll(`.${styles.projectSpread}`);
        spreads.forEach((spread) => {
          const imgContainer = spread.querySelector(`.${styles.imageContainer}`);
          const img = spread.querySelector(`.${styles.portfolioImage}`);
          const info = spread.querySelector(`.${styles.infoContainer}`);

          // Image mask reveal
          if (imgContainer) {
            gsap.fromTo(
              imgContainer,
              { clipPath: "inset(20% 0% 20% 0%)", opacity: 0, y: 50 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                y: 0,
                duration: 1.3,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: spread,
                  start: "top 75%",
                },
              }
            );
          }

          // Subtle parallax on scroll inside image container
          if (img) {
            gsap.to(img, {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: imgContainer,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          // Info container slide-in
          if (info) {
            gsap.fromTo(
              info,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: spread,
                  start: "top 75%",
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="selected-work" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>06 / PORTFOLIO CASE STUDIES</span>
          </div>

          <h2 className={styles.title}>SELECTED WORK</h2>
        </div>

        <div ref={listRef} className={styles.spreadsList}>
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className={`${styles.projectSpread} ${
                project.layout === "imageLeft"
                  ? styles.layoutLeft
                  : project.layout === "imageRight"
                  ? styles.layoutRight
                  : styles.layoutImmersive
              }`}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className={styles.portfolioImage}
                />
                <div className={styles.imageOverlay} />
                <span className={styles.imageBadge}>CASE STUDY {project.id}</span>
              </div>

              <div className={styles.infoContainer}>
                <span className={styles.hugeNumber}>{project.id}</span>

                <h3 className={styles.projectName}>{project.name}</h3>

                <span className={styles.nicheTitle}>{project.niche}</span>

                <p className={styles.description}>{project.description}</p>

                <div className={styles.ctaWrapper}>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    shape="pill"
                    rightIcon={<ArrowUpRight className={styles.arrowIcon} />}
                  >
                    VIEW CASE STUDY
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSelectedWork;
