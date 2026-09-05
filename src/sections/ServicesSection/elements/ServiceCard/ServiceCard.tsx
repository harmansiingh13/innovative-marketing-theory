import Link from "next/link";

import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

export const ServiceCard = ({ title, description, href, image, alt }: ServiceCardProps) => {
  return (
    <Link href={href} className={styles.serviceCard}>
      <div className={styles.cardImage}>
        <img src={image} alt={alt} />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.serviceTitle}>{title}</h3>

        <p className={styles.serviceDescription}>{description}</p>
      </div>

      <div className={styles.cardBottom}>
        <span>EXPLORE SERVICE</span>

        <span className={styles.cardArrow}>↗</span>
      </div>
    </Link>
  );
};
