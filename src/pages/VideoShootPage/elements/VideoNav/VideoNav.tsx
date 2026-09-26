"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/app/designSystem/images/imt-logooo.png";
import styles from "./VideoNav.module.css";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const VideoNav = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logoLink} aria-label="Innovative Marketing Theory Home">
            <Image
              src={logo}
              alt="IMT Logo"
              width={82}
              height={40}
              priority
              className={styles.logoImg}
            />
          </Link>
          <span className={styles.divider} />
          <Link href="/#services" className={styles.backLink}>
            <ArrowLeft size={14} className={styles.backArrow} />
            <span>ALL SERVICES</span>
          </Link>
        </div>

        <div className={styles.centerBadge}>
          <span className={styles.pulseDot} />
          <span className={styles.badgeText}>SERVICE 01 // PRODUCTION</span>
        </div>

        <div className={styles.right}>
          <a href="#inquire" className={styles.ctaButton}>
            <span>BOOK A SHOOT</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default VideoNav;
