"use client";
import styles from "./ServicesSection.module.css";
import { ServiceCard } from "./elements/ServiceCard";

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
    href: "/services/advertisement-running",
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
  return (
    <section id="services" className={styles.section}>
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
                Everything your
                <br />
                <span>brand needs.</span>
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
