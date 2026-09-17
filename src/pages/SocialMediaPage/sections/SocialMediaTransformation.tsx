"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SocialMediaTransformation.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSFORMATION_STEPS = [
  {
    stage: "01",
    label: "RANDOM POSTS",
    subtext: "Uncoordinated, sporadic publishing without clear direction",
    status: "BEFORE",
  },
  {
    stage: "02",
    label: "CONSISTENT CONTENT",
    subtext: "Structured publishing rhythm and polished aesthetic standards",
    status: "FOUNDATION",
  },
  {
    stage: "03",
    label: "STRONGER STORY",
    subtext: "Compelling narrative pillars aligned with brand positioning",
    status: "ENGAGEMENT",
  },
  {
    stage: "04",
    label: "AUDIENCE CONNECTION",
    subtext: "Deep active community, high retention and brand affinity",
    status: "RESONANCE",
  },
  {
    stage: "05",
    label: "BRAND AUTHORITY",
    subtext: "Industry market leader status, high trust and sustainable growth",
    status: "TARGET",
  },
];

export const SocialMediaTransformation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (flowRef.current) {
        const nodes = flowRef.current.querySelectorAll(`.${styles.flowNode}`);
        gsap.fromTo(
          nodes,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
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
    <section id="transformation" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>07 / VALUE EVOLUTION</span>
          </div>

          <h2 className={styles.title}>
            FROM CONTENT
            <br />
            <span className={styles.goldText}>TO BRAND AUTHORITY.</span>
          </h2>
        </div>

        {/* Visual Progression Timeline Flow */}
        <div ref={flowRef} className={styles.flowContainer}>
          <div className={styles.flowGrid}>
            {TRANSFORMATION_STEPS.map((item, idx) => (
              <React.Fragment key={item.stage}>
                <div
                  className={`${styles.flowNode} ${
                    idx === TRANSFORMATION_STEPS.length - 1 ? styles.nodeFinal : ""
                  }`}
                >
                  <div className={styles.nodeHeader}>
                    <span className={styles.nodeStage}>{item.stage}</span>
                    <span className={styles.nodeStatus}>{item.status}</span>
                  </div>

                  <h3 className={styles.nodeLabel}>{item.label}</h3>
                  <p className={styles.nodeSubtext}>{item.subtext}</p>
                </div>

                {idx < TRANSFORMATION_STEPS.length - 1 && (
                  <div className={styles.flowConnector}>
                    <ArrowRight className={styles.arrowDesktop} />
                    <ChevronDown className={styles.arrowMobile} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaTransformation;
