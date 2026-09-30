"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowUp, createLucideIcon } from "lucide-react";
import logo from "@/app/designSystem/images/imt-logooo.png";
import styles from "./Footer.module.css";
import { Button } from "@/shared/components/Button";

export const InstagramIcon = createLucideIcon("Instagram", [
  [
    "rect",
    {
      width: "20",
      height: "20",
      x: "2",
      y: "2",
      rx: "5",
      ry: "5",
      key: "rect",
    },
  ],
  [
    "path",
    {
      d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
      key: "path",
    },
  ],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "line" }],
]);

export const LinkedinIcon = createLucideIcon("Linkedin", [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "path1",
    },
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "rect" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "circle" }],
]);

export const YoutubeIcon = createLucideIcon("Youtube", [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "path1",
    },
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "path2" }],
]);

interface SocialLink {
  label: string;
  url: string;
  icon?: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/innovativemarketingtheory?stkn=MWFscWhkZGUyY2Rjbg%3D%3D",
    icon: InstagramIcon,
  },
];

const CONTACT_PHONE = "+91 86996 60333";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const phoneHref = `tel:${CONTACT_PHONE.replace(/[\s()-]/g, "")}`;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.topHairline} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left: Brand Identity & Copyright */}
        <div className={styles.brandCol}>
          <Link
            href="/"
            className={styles.brandLogoLink}
            aria-label="Innovative Marketing Theory home"
          >
            <Image src={logo} alt="IMT Logo" width={22} height={22} className={styles.logoImg} />
          </Link>

          <div className={styles.brandMeta}>
            <span className={styles.brandTitle}>Innovative Marketing Theory</span>

            <span className={styles.brandSub}>
              &copy; {currentYear} &bull; All Rights Reserved.
            </span>
          </div>
        </div>

        {/* Right: Interactive Minimal Links */}
        <div className={styles.actionsCol}>
          {/* Phone */}
          <Button
            variant="text"
            leftIcon={<Phone size={13} className={styles.linkIcon} />}
            onClick={() => {
              window.location.href = phoneHref;
            }}
            className={styles.phoneBtn}
            aria-label={`Call us at ${CONTACT_PHONE}`}
          >
            {CONTACT_PHONE}
          </Button>

          {/* Social Links */}
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
                aria-label={`Visit our ${link.label}`}
              >
                {Icon && <Icon size={13} className={styles.linkIcon} aria-hidden="true" />}

                <span>{link.label}</span>
              </a>
            );
          })}

          <Button
            variant="text"
            onClick={handleScrollToTop}
            rightIcon={<ArrowUp size={13} />}
            className={styles.phoneBtn}
          >
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};
