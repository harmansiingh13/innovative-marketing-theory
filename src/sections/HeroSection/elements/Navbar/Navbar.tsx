"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import clsx from "clsx";
import styles from "./Navbar.module.css";
import logo from "@/app/designSystem/images/imt-logooo.png";
import { Divider } from "@/shared/components/Divider";
import { Button } from "@/shared/components/Button";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export type NavbarLink = {
  name: string;
  href: string;
};

export type NavbarBackLink = {
  name: string;
  href: string;
};

export type NavbarCtaButton = {
  name: string;
  href: string;
  onClick?: () => void;
};

export type NavbarProps = {
  links: NavbarLink[];
  backLink?: NavbarBackLink;
  fixed?: boolean;
};

export const Navbar = ({ links, backLink, fixed = true }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const backBtnRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>(() => {
    return links[0]?.href.split("#")[1] || "about";
  });

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined" || !navRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.1,
            clearProps: "transform,opacity",
          },
          0,
        );
      }

      if (backBtnRef.current) {
        tl.fromTo(
          backBtnRef.current,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            delay: 0.16,
            clearProps: "transform,opacity",
          },
          0,
        );
      }

      if (linksRef.current && linksRef.current.children.length > 0) {
        tl.fromTo(
          linksRef.current.children,
          { opacity: 0, y: -12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            delay: 0.2,
            clearProps: "transform,opacity",
          },
          0,
        );
      }

      if (ctaBtnRef.current) {
        tl.fromTo(
          ctaBtnRef.current,
          { opacity: 0, x: 14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            delay: 0.22,
            clearProps: "transform,opacity",
          },
          0,
        );
      }

      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.35,
            ease: "power2.inOut",
            clearProps: "transform,opacity",
          },
          0,
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = links.map((link) => link.href.split("#")[1]).filter(Boolean);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Dynamic Hide on Scroll Down / Show on Scroll Up
      if (currentScrollY <= 20) {
        // At the very top: always visible, not scrolled
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);

        const diff = currentScrollY - lastScrollY.current;

        // Ignore micro-jitters to prevent flickering
        if (Math.abs(diff) >= 8) {
          if (diff > 0 && currentScrollY > 70) {
            // Scrolling down and past hero threshold -> hide
            setIsVisible(false);
          } else if (diff < 0) {
            // Scrolling up -> show
            setIsVisible(true);
          }
        }
      }

      lastScrollY.current = currentScrollY;

      // 2. Active Section Spy
      const scrollPos = currentScrollY + 250;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + currentScrollY;
          if (scrollPos >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  const navContent = (
    <nav ref={navRef} className={clsx(styles.navbar, fixed && styles.navbarFixed)}>
      <div className={styles.navLeft}>
        <Link ref={logoRef} href="/" className={styles.logo} aria-label="Home">
          <Image src={logo} alt="Innovative Marketing Theory" width={100} height={50} priority />
        </Link>

        {backLink && (
          <div ref={backBtnRef} className={styles.backGroup}>
            <span className={styles.backDivider} />
            <Link href={backLink.href} className={styles.backButton}>
              <ArrowLeft size={13} className={styles.backArrow} />
              <span>{backLink.name}</span>
            </Link>
          </div>
        )}
      </div>

      <div ref={linksRef} className={styles.navLinks}>
        {links.map((link) => {
          const sectionId = link.href.split("#")[1];
          const isActive = activeSection === sectionId;

          return (
            <Button
              key={link.href}
              type="button"
              variant="text"
              size="md"
              className={clsx(styles.navLinkButton, isActive && styles.navLinkActive)}
              onClick={() => {
                const el = document.getElementById(sectionId);
                if (el) {
                  el.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  window.location.href = link.href;
                }
              }}
            >
              {link.name}
            </Button>
          );
        })}
      </div>

      <div ref={dividerRef} className={styles.divider}>
        <Divider size={2} />
      </div>
    </nav>
  );

  if (fixed) {
    return (
      <header
        className={clsx(
          styles.fixedHeader,
          isVisible ? styles.headerVisible : styles.headerHidden,
          isScrolled ? styles.headerScrolled : styles.headerTop,
        )}
        onFocus={() => setIsVisible(true)}
      >
        {navContent}
      </header>
    );
  }

  return navContent;
};

export default Navbar;
