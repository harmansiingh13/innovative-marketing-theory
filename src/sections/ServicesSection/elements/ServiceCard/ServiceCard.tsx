"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  index?: number;
};

export const ServiceCard = ({ title, description, href, image, alt }: ServiceCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Link ref={cardRef} href={href} className={styles.serviceCard} onMouseMove={handleMouseMove}>
      <div className={styles.spotlight} />

      <div className={styles.cardImage}>
        <img src={image} alt={alt} />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.serviceTitle}>{title}</h3>

        <p className={styles.serviceDescription}>{description}</p>
      </div>

      <div className={styles.cardBottom}>
        <span className={styles.cardBottomLabel}>EXPLORE SERVICE</span>

        <span className={styles.cardArrow}>↗</span>
      </div>
    </Link>
  );
};
