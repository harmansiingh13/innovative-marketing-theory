"use client";

import { useRef } from "react";
import styles from "./ServicesSection.module.css";
import { ServiceCard } from "./elements/ServiceCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Professional Video Shoots",
    description: "Cinematic visuals that give your brand a distinct look and a stronger presence.",
    href: "/services/video-shoots",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    alt: "Professional camera equipment",
  },
  {
    title: "Video Editing",
    description:
      "Sharp, high-retention edits built for social feeds, campaigns, and digital platforms.",
    href: "/services/video-editing",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative workspace with laptop",
  },
  {
    title: "Social Media Management",
    description:
      "A consistent content strategy that turns attention into an active brand community.",
    href: "/services/social-media",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative team collaborating",
  },
  {
    title: "Advertisement Running",
    description:
      "Targeted campaigns designed to reach the right people and drive meaningful results.",
    href: "/services/advertisement",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative advertising workspace",
  },
  {
    title: "Web Development",
    description:
      "Fast, responsive websites that look exceptional and turn visitors into customers.",
    href: "/services/web-development",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    alt: "Laptop displaying a website",
  },
  {
    title: "Event Organization",
    description: "Memorable experiences brought to life through thoughtful planning and execution.",
    href: "/services/event-organization",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    alt: "Event stage with lighting",
  },
];

const renderAnimatedWord = (word: string, offset: number) => {
  return word.split("").map((char, i) => (
    <span key={i} className={styles.char} data-char-index={offset + i}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export const ServicesSection = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 769px)",
          isMobile: "(max-width: 768px)",
        },
        (context) => {
          const { isMobile } = (context.conditions || {}) as { isMobile?: boolean };

          // 4-Way Letter Collision Assembly Animation for Services Heading ("Everything your brand needs.")
          const chars = gsap.utils.toArray<HTMLElement>(`.${styles.char}`);

          const get4WayDirection = (index: number) => {
            const directions = [
              { x: 0, y: -140, rotation: -25 },   // Top
              { x: 160, y: 0, rotation: 25 },     // Right
              { x: 0, y: 140, rotation: -20 },    // Bottom
              { x: -160, y: 0, rotation: 20 },    // Left
              { x: -120, y: -100, rotation: -30 },// Top-Left
              { x: 120, y: -100, rotation: 30 },  // Top-Right
              { x: 120, y: 100, rotation: -25 },  // Bottom-Right
              { x: -120, y: 100, rotation: 25 },  // Bottom-Left
            ];
            const dir = directions[index % directions.length];
            const mult = isMobile ? 0.5 : 1;
            return {
              x: dir.x * mult,
              y: dir.y * mult,
              rotation: dir.rotation,
            };
          };

          const headingTl = gsap.timeline({
            scrollTrigger: {
              trigger: `.${styles.header}`,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });

          // Label
          headingTl.fromTo(
            `.${styles.headingLabel}`,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 }
          );

          // 4-Way Letters Collision Assembly
          chars.forEach((char, i) => {
            const vec = get4WayDirection(i);
            headingTl.fromTo(
              char,
              {
                x: vec.x,
                y: vec.y,
                rotation: vec.rotation,
                scale: 0.35,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 0.85,
                ease: "back.out(1.5)",
              },
              i === 0 ? "-=0.3" : `<+=${0.018}`
            );
          });

          // Description Aside
          headingTl.fromTo(
            `.${styles.headingAside}`,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.5"
          );

          // 2. Service Cards Far-Corner & Side Entry Assembly
          const cardElements = gsap.utils.toArray<HTMLElement>(`.${styles.servicesGrid} > a`);

          const getCardDirection = (index: number) => {
            const directions = [
              { x: -500, y: -350, rotation: -20 }, // Card 1: Top-Left Corner
              { x: 0, y: -450, rotation: 15 },    // Card 2: Top Edge
              { x: 500, y: -350, rotation: 20 },  // Card 3: Top-Right Corner
              { x: -550, y: 350, rotation: -25 }, // Card 4: Bottom-Left Corner
              { x: 0, y: 450, rotation: -15 },    // Card 5: Bottom Edge
              { x: 550, y: 350, rotation: 25 },   // Card 6: Bottom-Right Corner
            ];
            const dir = directions[index % directions.length];
            const mult = isMobile ? 0.4 : 1;
            return {
              x: dir.x * mult,
              y: dir.y * mult,
              rotation: dir.rotation,
            };
          };

          const cardsTl = gsap.timeline({
            scrollTrigger: {
              trigger: `.${styles.servicesGrid}`,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });

          cardElements.forEach((card, i) => {
            const vec = getCardDirection(i);
            const img = card.querySelector("img");

            cardsTl.fromTo(
              card,
              {
                x: vec.x,
                y: vec.y,
                rotation: vec.rotation,
                scale: 0.4,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1.1,
                ease: "expo.out",
              },
              i === 0 ? 0 : `<+=${0.08}`
            );

            // Image Reveal & Zoom
            if (img) {
              cardsTl.fromTo(
                img,
                { scale: 1.25, opacity: 0.3 },
                { scale: 1.0, opacity: 1, duration: 1.15, ease: "power3.out" },
                "<"
              );
            }
          });

          // 3. 3D Magnetic Tilt (Desktop)
          if (!isTouchDevice && !isMobile) {
            // Card Hover Micro-Interactions
            cardElements.forEach((card) => {
              const img = card.querySelector("img");
              const arrow = card.querySelector("span:last-child");

              const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const normX = (x / rect.width - 0.5) * 2;
                const normY = (y / rect.height - 0.5) * 2;

                // 3D Magnetic Tilt on Card
                gsap.to(card, {
                  rotateX: -normY * 7,
                  rotateY: normX * 7,
                  x: normX * 5,
                  y: normY * 5 - 6,
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: "auto",
                });

                // Depth Parallax on Image
                if (img) {
                  gsap.to(img, {
                    scale: 1.08,
                    x: normX * -8,
                    y: normY * -8,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }

                // Arrow rotation
                if (arrow) {
                  gsap.to(arrow, {
                    rotation: 45,
                    scale: 1.1,
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }
              };

              const handleMouseLeave = () => {
                // Reset card position & tilt
                gsap.to(card, {
                  rotateX: 0,
                  rotateY: 0,
                  x: 0,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                });

                if (img) {
                  gsap.to(img, {
                    scale: 1.0,
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                  });
                }

                if (arrow) {
                  gsap.to(arrow, {
                    rotation: 0,
                    scale: 1.0,
                    duration: 0.4,
                    ease: "power2.out",
                  });
                }
              };

              card.addEventListener("mousemove", handleMouseMove);
              card.addEventListener("mouseleave", handleMouseLeave);
            });
          }
        }
      );
    },
    { scope: servicesRef }
  );

  return (
    <section id="services" ref={servicesRef} className={styles.section}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingLabel}>
            <span className={styles.headingLine} />
            <span>WHAT WE OFFER</span>
          </div>

          <div className={styles.headingRow}>
            <div className={styles.headingContent}>
              <h2 className={styles.title}>
                <span className={styles.titleLine}>
                  {renderAnimatedWord("Everything your", 0)}
                </span>
                <span className={styles.titleLine}>
                  {renderAnimatedWord("brand needs.", 15)}
                </span>
              </h2>
            </div>

            <div className={styles.headingAside}>
              <p className={styles.description}>
                Strategy, creativity, and execution — all working together to make your brand stand
                out.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};
