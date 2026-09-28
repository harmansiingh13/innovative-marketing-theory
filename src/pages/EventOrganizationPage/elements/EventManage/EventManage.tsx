"use client";

import { forwardRef, useState } from "react";
import styles from "./EventManage.module.css";
import { ArrowUpRight, Camera } from "lucide-react";

export interface EventManageProps {
  headerRef?: React.RefObject<HTMLDivElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "01",
    number: "01",
    title: "CONCEPT & STRATEGY",
    description: "Event concept, creative direction and spatial experience planning.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    tag: "CREATIVE DIRECTION",
  },
  {
    id: "02",
    number: "02",
    title: "VENUE & LOGISTICS",
    description: "Venue planning, schedules, vendors and micro-second event logistics.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop",
    tag: "SPATIAL PLANNING",
  },
  {
    id: "03",
    number: "03",
    title: "STAGE & SET",
    description: "Stage design, set design, custom branding and spatial engineering.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    tag: "STAGE ARCHITECTURE",
  },
  {
    id: "04",
    number: "04",
    title: "LIGHTING / SOUND / AV",
    description: "DMX lighting, tuned sound systems, LED screens and technical production.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
    tag: "TECHNICAL RIGGING",
  },
  {
    id: "05",
    number: "05",
    title: "PHOTOGRAPHY",
    description: "Professional cinema-grade event photography and key moments.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop",
    tag: "STILLS & PORTRAITS",
  },
  {
    id: "06",
    number: "06",
    title: "VIDEOGRAPHY",
    description: "Event films, highlight sizzles, interviews and 4K cinematic content.",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
    tag: "4K CINEMA FILM",
  },
  {
    id: "07",
    number: "07",
    title: "LIVE CONTENT",
    description: "Behind-the-scenes, social content and real-time live event coverage.",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000&auto=format&fit=crop",
    tag: "REAL-TIME MEDIA",
  },
  {
    id: "08",
    number: "08",
    title: "EVENT-DAY MANAGEMENT",
    description: "On-ground command coordination and complete production execution.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
    tag: "COMMAND EXECUTION",
  },
];

export const EventManage = forwardRef<HTMLElement, EventManageProps>(
  ({ headerRef, contentRef }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
      <section ref={ref} id="productions" className={styles.section}>
        {/* Subtle Background Pattern & Ambient Glow */}
        <div className={styles.gridPattern} />
        <div className={styles.ambientGlow} />

        <div className={styles.container}>
          {/* Eyebrow & Headline */}
          <div ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDash}>—</span>
              <span>EVENT MANAGEMENT // WHAT WE HANDLE</span>
            </div>
            <h2 className={styles.headline}>ONE TEAM. EVERY DETAIL.</h2>
          </div>

          {/* Asymmetric 2-Part Layout */}
          <div ref={contentRef} className={styles.asymmetricGrid}>
            {/* LEFT SIDE: Big Statement & High-Tech Visual Preview HUD */}
            <div className={styles.leftColumn}>
              <div className={styles.statementCard}>
                <div className={styles.statementHeaderGroup}>
                  <div className={styles.yellowVerticalBar} />
                  <h3 className={styles.leftStatement}>
                    FROM THE FIRST IDEA
                    <br />
                    TO THE FINAL APPLAUSE.
                  </h3>
                </div>

                <p className={styles.leftParagraph}>
                  Eliminate the stress of juggling multiple disparate vendors. Our unified creative
                  &amp; production team takes total end-to-end ownership of your event — designing
                  the spatial concept, engineering the stage, managing technical sound/AV, and
                  capturing cinema-grade photography and live video.
                </p>

                {/* High-Tech Viewfinder Active Image Preview Frame */}
                <div className={styles.activeImageFrame}>
                  <img
                    src={SERVICES[activeIndex].image}
                    alt={SERVICES[activeIndex].title}
                    className={styles.activeImage}
                  />
                  <div className={styles.imageOverlay} />

                  {/* Viewfinder Corner Brackets */}
                  <div className={`${styles.cornerBracket} ${styles.cornerTL}`} />
                  <div className={`${styles.cornerBracket} ${styles.cornerTR}`} />
                  <div className={`${styles.cornerBracket} ${styles.cornerBL}`} />
                  <div className={`${styles.cornerBracket} ${styles.cornerBR}`} />

                  {/* Top Live Badge */}
                  <div className={styles.liveFeedBadge}>
                    <span className={styles.pulseDot} />
                    <Camera className={styles.cameraIcon} />
                    <span>FEED ACTIVE // {SERVICES[activeIndex].tag}</span>
                  </div>

                  {/* Bottom Glassmorphic Overlay Badge */}
                  <div className={styles.activeImageBadge}>
                    <span className={styles.badgeNumber}>{SERVICES[activeIndex].number}</span>
                    <span className={styles.badgeTitle}>{SERVICES[activeIndex].title}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Sophisticated Interactive Service Grid */}
            <div className={styles.rightColumn}>
              <div className={styles.serviceList}>
                {SERVICES.map((service, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={service.id}
                      className={`${styles.serviceItem} ${isActive ? styles.activeItem : ""}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div className={styles.serviceRowHeader}>
                        <span className={styles.serviceNumber}>{service.number}</span>
                        <h4 className={styles.serviceTitle}>{service.title}</h4>
                        <ArrowUpRight className={styles.serviceArrow} />
                      </div>

                      <div className={styles.accentLine} />

                      <p className={styles.serviceDescription}>{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

EventManage.displayName = "EventManage";
export default EventManage;
