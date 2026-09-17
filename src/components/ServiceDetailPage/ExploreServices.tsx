"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES_DATA, ServiceData } from "@/data/servicesData";
import { useServiceTransition } from "@/components/ServiceTransition";
import styles from "./ExploreServices.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExploreServicesProps {
  currentSlug: string;
}

export const ExploreServices = ({ currentSlug }: ExploreServicesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useServiceTransition();

  const servicesList = Object.values(SERVICES_DATA);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (listRef.current) {
        const rows = listRef.current.querySelectorAll(`.${styles.serviceRow}`);
        gsap.fromTo(
          rows,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="explore-services" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>NAVIGATION</span>
          </div>

          <h2 className={styles.title}>
            EXPLORE OTHER <span className={styles.goldText}>SERVICES.</span>
          </h2>
        </div>

        <div ref={listRef} className={styles.servicesList}>
          {servicesList.map((service: ServiceData, index: number) => {
            const isCurrent =
              service.slug === currentSlug ||
              (service.aliases && service.aliases.includes(currentSlug));

            const numStr = String(index + 1).padStart(2, "0");

            if (isCurrent) {
              return (
                <div key={service.slug} className={`${styles.serviceRow} ${styles.currentRow}`}>
                  <div className={styles.rowLeft}>
                    <span className={styles.serviceNum}>{numStr}</span>
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceName}>{service.title}</span>
                      <p className={styles.serviceDesc}>{service.description}</p>
                    </div>
                  </div>

                  <div className={styles.rowRight}>
                    <span className={styles.currentBadge}>CURRENTLY VIEWING</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={service.slug}
                className={styles.serviceRow}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigateWithTransition(`/services/${service.slug}`, service.title)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigateWithTransition(`/services/${service.slug}`, service.title);
                  }
                }}
              >
                <div className={styles.rowLeft}>
                  <span className={styles.serviceNum}>{numStr}</span>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceName}>{service.title}</span>
                    <p className={styles.serviceDesc}>{service.description}</p>
                  </div>
                </div>

                <div className={styles.rowRight}>
                  <span className={styles.exploreText}>EXPLORE</span>
                  <ArrowUpRight className={styles.arrowIcon} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
