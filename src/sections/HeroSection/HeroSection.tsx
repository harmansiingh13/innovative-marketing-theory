import Link from "next/link";
import styles from "./HeroSection.module.css";
import Image from "next/image";
import logo from "@/app/designSystem/images/imt-logooo.png";

export const HeroSection = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridPattern} />

      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Image src={logo} alt="Marketing" width={100} height={50} priority />
        </Link>

        <div className={styles.navLinks}>
          <Link href="/#about">About</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        {/* <Link href="/#contact" className={styles.navButton}>
          Let's Talk <span>↗</span>
        </Link> */}
      </nav>

      <main className={styles.content}>
        <div className={styles.topLabel}>
          {/* <span className={styles.labelLine} /> */}
          {/* <span>CREATIVE MARKETING AGENCY</span> */}
          {/* <span className={styles.labelYear}>EST. 2026</span> */}
        </div>

        <div className={styles.heroHeading}>
          <span className={styles.headingLine}>INNOVATIVE</span>

          <span className={styles.headingLine}>
            <span className={styles.headingAccent}>MARKETING</span>
            {/* <span>BRAND</span> */}
          </span>

          <span className={styles.headingLine}>THEORY.</span>
        </div>

        <div className={styles.bottomContent}>
          <div className={styles.descriptionBlock}>
            {/* <span className={styles.descriptionLabel}>01 / INTRODUCING</span> */}

            <p className={styles.description}>
              We are a full-service digital marketing agency built on precision,
              creativity, and execution. We don't just run campaigns — we build
              brand authority.
            </p>
          </div>

          <div className={styles.ctaBlock}>
            <Link href="/#contact" className={styles.primaryCta}>
              <span>Let's Connect</span>
              <span className={styles.ctaArrow}>↗</span>
            </Link>

            <Link href="/#services" className={styles.secondaryCta}>
              Explore Services <span>↓</span>
            </Link>
          </div>
        </div>
      </main>

      <div className={styles.footer}>
        <span>STRATEGY / CREATIVE / EXECUTION</span>
        <span className={styles.footerRight}>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
};
