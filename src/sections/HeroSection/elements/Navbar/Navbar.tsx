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

type NavbarLink = {
  name: string;
  href: string;
};

type NavbarProps = {
  links: NavbarLink[];
};

export const Navbar = ({ links }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>("about");

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

    const sectionIds = ["about", "services", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
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
  }, []);

  return (
    <nav ref={navRef} className={styles.navbar}>
      <Link ref={logoRef} href="/" className={styles.logo}>
        <Image src={logo} alt="Marketing" width={100} height={50} priority />
      </Link>

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
                document.getElementById(sectionId)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
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
};
