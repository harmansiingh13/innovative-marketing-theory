"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesSection.module.css";
import { ServiceCard } from "./elements/ServiceCard";
import { FlyInText } from "@/shared/animations";

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

export const ServicesSection = () => {
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !cardsGridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsGridRef.current?.children;
      if (!cards || cards.length === 0) return;

      const isMobile = window.innerWidth < 768;
      const mult = isMobile ? 0.45 : 1;

      // Dispersed fly-in vectors for each card in the grid:
      // Row 1: Top-Left, Top-Center, Top-Right
      // Row 2: Bottom-Left, Bottom-Center, Bottom-Right
      const flyVectors = [
        { x: -180 * mult, y: -110 * mult, rotateZ: -9, rotateY: 14, rotateX: 10, scale: 0.75 },
        { x: 0, y: -170 * mult, rotateZ: 3, rotateY: 0, rotateX: 16, scale: 0.75 },
        { x: 180 * mult, y: -110 * mult, rotateZ: 9, rotateY: -14, rotateX: 10, scale: 0.75 },
        { x: -180 * mult, y: 110 * mult, rotateZ: 7, rotateY: 14, rotateX: -10, scale: 0.75 },
        { x: 0, y: 170 * mult, rotateZ: -3, rotateY: 0, rotateX: -16, scale: 0.75 },
        { x: 180 * mult, y: 110 * mult, rotateZ: -7, rotateY: -14, rotateX: -10, scale: 0.75 },
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsGridRef.current,
          start: "top 78%",
          once: true,
        },
      });

      Array.from(cards).forEach((card, i) => {
        const vec = flyVectors[i % flyVectors.length];
        tl.fromTo(
          card,
          {
            opacity: 0,
            x: vec.x,
            y: vec.y,
            rotateZ: vec.rotateZ,
            rotateY: vec.rotateY,
            rotateX: vec.rotateX,
            scale: vec.scale,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateZ: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          i * 0.08,
        );
      });
    }, cardsGridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className={styles.section}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingLabel}>
            <span className={styles.headingLine} />
            <FlyInText as="span" distance={25}>
              WHAT WE OFFER
            </FlyInText>
          </div>

          <div className={styles.headingRow}>
            <div className={styles.headingContent}>
              <h2 className={styles.title}>
                <FlyInText distance={32} delay={0.1}>
                  Everything your
                  <br />
                  <span>brand needs.</span>
                </FlyInText>
              </h2>
            </div>

            <div className={styles.headingAside}>
              <p className={styles.description}>
                <FlyInText distance={30} delay={0.25} seed={70}>
                  Strategy, creativity, and execution — all working together to make your brand
                  stand out.
                </FlyInText>
              </p>
            </div>
          </div>
        </div>

        <div ref={cardsGridRef} className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
