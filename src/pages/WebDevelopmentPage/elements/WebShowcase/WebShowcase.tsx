"use client";

import React, { useState } from "react";
import styles from "./WebShowcase.module.css";
import { ReusableCarousel, CarouselItem } from "@/components/carousel";

const WEB_CASE_STUDIES: CarouselItem[] = [
  {
    id: "01",
    eyebrow: "PROJECT 01",
    category: "PRODUCT EXPERIENCE",
    title: "AURA LUXURY HOME AUDIO",
    description:
      "Interactive digital experience designed to showcase high-ticket luxury product details.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "02",
    eyebrow: "PROJECT 02",
    category: "E-COMMERCE FLAGSHIP",
    title: "NOVA E-COMMERCE PLATFORM",
    description:
      "High-performance e-commerce experience designed around conversion, speed and premium product presentation.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "03",
    eyebrow: "PROJECT 03",
    category: "FINTECH SYSTEM",
    title: "APEX HOROLOGY DASHBOARD",
    description:
      "Precision UI engineering and high-frame-rate interaction systems built for financial clarity.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
];

export const WebShowcase = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <section id="showcase" className={styles.section}>
      <div className={styles.container}>
        {/* Top Header Row with Top-Right Counter */}
        <div className={styles.topRow}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>04 / SELECTED WORK</span>
            </div>

            <h2 className={styles.title}>
              PORTFOLIO &amp; <span className={styles.goldText}>CASE STUDIES.</span>
            </h2>
          </div>

          <div className={styles.counter}>
            <span className={styles.counterCurrent}>
              {String(activeSlideIndex + 1).padStart(2, "0")}
            </span>
            <span className={styles.counterDivider}> / </span>
            <span className={styles.counterTotal}>
              {String(WEB_CASE_STUDIES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Generic Reusable Carousel */}
        <ReusableCarousel
          items={WEB_CASE_STUDIES}
          autoplay={true}
          autoplayInterval={5000}
          showArrows={true}
          showIndicators={true}
          showCounter={false}
          pauseOnHover={true}
          animateOnScroll={true}
          onSlideChange={(index) => setActiveSlideIndex(index)}
        />
      </div>
    </section>
  );
};

export default WebShowcase;
