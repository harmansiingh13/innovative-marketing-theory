"use client";

import React from "react";
import styles from "./WebIntro.module.css";

interface WebIntroProps {
  label?: string;
  statement?: string;
  paragraph?: string;
}

export const WebIntro: React.FC<WebIntroProps> = ({
  label = "THE IDEA",
  statement = "“YOUR WEBSITE IS PART OF YOUR BRAND.”",
  paragraph = "A website should not only look good. It should communicate clearly, perform smoothly and make every interaction feel intentional.",
}) => {
  return (
    <section id="intro" className={styles.section}>
      <div className={styles.gridOverlay} />
      <div className={styles.container}>
        <div className={styles.contentBox}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>{label}</span>
          </div>

          <h2 className={styles.statement}>{statement}</h2>

          <div className={styles.goldDivider} />

          <p className={styles.paragraph}>{paragraph}</p>
        </div>
      </div>
    </section>
  );
};

export default WebIntro;
