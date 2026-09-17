"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SocialMediaWhatWeDo.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES_DATA = [
  {
    number: "01",
    title: "DEEP-DIVE RESEARCH & STRATEGY",
    description:
      "Before we create a single post, we analyze your industry, audience, competitors and positioning to understand what your audience actually wants to see.",
    tags: ["Audience Intelligence", "Competitor Audit", "Content Pillars"],
  },
  {
    number: "02",
    title: "HIGH-IMPACT CONTENT CREATION",
    description:
      "From cinematic short-form reels to beautifully designed graphics, we produce original social-first content that captures attention and strengthens your brand identity.",
    tags: ["Cinematic Reels", "Brand Graphic Design", "Motion & Carousel"],
  },
  {
    number: "03",
    title: "COPYWRITING & STRATEGIC POSTING",
    description:
      "We craft engaging, psychologically-driven captions and manage your daily publishing so every post supports your brand story and reaches your audience at the right moment.",
    tags: ["Psychology-Driven Copy", "Strategic Scheduling", "Hashtag Frameworks"],
  },
  {
    number: "04",
    title: "ANALYTICS & CONTINUOUS OPTIMIZATION",
    description:
      "We continuously track engagement, reach and conversion metrics to refine our approach and improve performance month over month.",
    tags: ["Performance Telemetry", "Retention Tuning", "Monthly Strategy Audits"],
  },
];

export const SocialMediaWhatWeDo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (blocksRef.current) {
        const items = blocksRef.current.querySelectorAll(`.${styles.editorialBlock}`);
        gsap.fromTo(
          items,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
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
    <section id="what-we-do" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>04 / CORE CAPABILITIES</span>
          </div>

          <h2 className={styles.title}>WHAT WE DO</h2>
        </div>

        {/* 4 Large Editorial Blocks */}
        <div ref={blocksRef} className={styles.editorialGrid}>
          {SERVICES_DATA.map((item) => (
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

export default SocialMediaWhatWeDo;
