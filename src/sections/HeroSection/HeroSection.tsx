"use client";
import Link from "next/link";
import styles from "./HeroSection.module.css";
import Image from "next/image";
import logo from "@/app/designSystem/images/imt-logooo.png";
import { Navbar } from "./elements/Navbar";
import { Button } from "@/shared/components/Button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Divider } from "@/shared/components/Divider";

export const HeroSection = () => {
  const navbarLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/#contact" },
  ];
  return (
    <section id="about" className={styles.section}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridPattern} />

      <Navbar links={navbarLinks} />

      <main className={styles.content}>
        <div className={styles.topLabel}>
          <span className={styles.labelLine} />
          <span>YOUR GROWTH PARTNER</span>
        </div>
        <div className={styles.heroHeading}>
          <span className={styles.headingLine}>INNOVATIVE</span>

          <span className={styles.headingLine}>
            <span className={styles.headingAccent}>MARKETING</span>
          </span>

          <span className={styles.headingLine}>THEORY.</span>
        </div>

        <div className={styles.bottomContent}>
          <div className={styles.descriptionBlock}>
            <p className={styles.description}>
              We are a full-service digital marketing agency built on precision, creativity, and
              execution. We don't just run campaigns — we build brand authority.
            </p>
          </div>

          <div className={styles.ctaBlock}>
            <Button
              type="button"
              variant="primary"
              size="lg"
              shape="pill"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              rightIcon={<ArrowUpRight className={styles.ctaArrow} />}
            >
              Let's Connect
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              shape="pill"
              onClick={() => {
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              rightIcon={<ArrowDown className={styles.secondaryArrow} />}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </main>

      <div className={styles.footer}>
        <Divider size={2} />

        <div className={styles.footerContent}>
          <span>STRATEGY / CREATIVE / EXECUTION</span>

          <span className={styles.footerRight}>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
};
