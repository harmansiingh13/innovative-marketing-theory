"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Film, Heart, Zap } from "lucide-react";
import styles from "./SocialMediaContentUniverse.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ECOSYSTEM_COLUMNS = [
  {
    id: "educate",
    num: "01",
    pillar: "EDUCATE",
    icon: BookOpen,
    objective: "Establish Industry Authority",
    items: [
      { title: "Educational Frameworks", desc: "Complex concepts made simple & actionable" },
      { title: "Product Deep-Dives", desc: "Showcasing core value props & feature mechanics" },
      { title: "Market Insights", desc: "Data trends & forward-looking analysis" },
    ],
  },
  {
    id: "entertain",
    num: "02",
    pillar: "ENTERTAIN",
    icon: Film,
    objective: "Capture Feed Attention & Virality",
    items: [
      { title: "Storytelling Reels", desc: "Cinematic short-form video & narrative epics" },
      { title: "Behind The Scenes", desc: "Authentic culture, craftsmanship & behind-the-lens" },
      { title: "Trend Adaptation", desc: "Cultural moments tailored to brand identity" },
    ],
  },
  {
    id: "connect",
    num: "03",
    pillar: "CONNECT",
    icon: Heart,
    objective: "Foster Community Affinity",
    items: [
      { title: "Founder Stories", desc: "Visionary leadership journey & company ethos" },
      { title: "Community Dialogue", desc: "Interactive polls, Q&As & active response" },
      { title: "User Spotlight", desc: "Celebrating customer stories & community wins" },
    ],
  },
  {
    id: "convert",
    num: "04",
    pillar: "CONVERT",
    icon: Zap,
    objective: "Drive Measurable Action",
    items: [
      { title: "Case Studies & Proof", desc: "High-impact testimonials & client results" },
      { title: "Promotional Campaigns", desc: "Psychology-backed launch strategy & offers" },
      { title: "Direct Response", desc: "Conversion-optimized CTAs & link-in-bio flows" },
    ],
  },
];

export const SocialMediaContentUniverse = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (spreadRef.current) {
        const cols = spreadRef.current.querySelectorAll(`.${styles.column}`);
        gsap.fromTo(
          cols,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="content-universe" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>05 / CONTENT ARCHITECTURE</span>
          </div>

          <h2 className={styles.title}>
            ONE BRAND.
            <br />
            <span className={styles.goldText}>MANY STORIES.</span>
          </h2>

          <p className={styles.subtitle}>
            &ldquo;A strong social strategy creates multiple ways for your audience to discover,
            understand and connect with your brand.&rdquo;
          </p>
        </div>

        {/* Editorial Architecture Columns Spread */}
        <div ref={spreadRef} className={styles.spreadGrid}>
          {ECOSYSTEM_COLUMNS.map((col) => {
            const IconComp = col.icon;
            return (
              <div key={col.id} className={styles.column}>
                <div className={styles.columnTop}>
                  <span className={styles.colNumber}>{col.num}</span>
                  <div className={styles.pillarHeader}>
                    <IconComp className={styles.pillarIcon} />
                    <h3 className={styles.pillarTitle}>{col.pillar}</h3>
                  </div>
                  <span className={styles.objectiveTag}>{col.objective}</span>
                </div>

                <div className={styles.colDivider} />

                <div className={styles.itemList}>
                  {col.items.map((item) => (
                    <div key={item.title} className={styles.itemRow}>
                      <span className={styles.goldBullet}>—</span>
                      <div>
                        <h4 className={styles.itemTitle}>{item.title}</h4>
                        <p className={styles.itemDesc}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaContentUniverse;
