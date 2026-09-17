"use client";

import React from "react";
import { Navbar } from "@/sections/HeroSection/elements/Navbar";
import { ServiceData } from "@/data/servicesData";
import { ServiceTransitionProvider } from "@/components/ServiceTransition";
import { ServiceHero } from "./ServiceHero";
import { ServiceIntro } from "./ServiceIntro";
import { ServiceCapabilities } from "./ServiceCapabilities";
import { ServiceProcess } from "./ServiceProcess";
import { ServiceShowcase } from "./ServiceShowcase";
import { ServiceWorkflow } from "./ServiceWorkflow";
import { ServiceImpact } from "./ServiceImpact";
import { ServiceCTA } from "./ServiceCTA";
import styles from "./ServiceDetailPage.module.css";

interface ServiceDetailPageProps {
  service: ServiceData;
}

export const ServiceDetailPage = ({ service }: ServiceDetailPageProps) => {
  const navbarLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <ServiceTransitionProvider>
      <div className={styles.pageContainer}>
        <Navbar links={navbarLinks} />

        <main className={styles.mainContent}>
          <ServiceHero service={service} />
          <ServiceIntro service={service} />
          <ServiceCapabilities service={service} />
          <ServiceProcess service={service} />
          <ServiceShowcase service={service} />
          <ServiceWorkflow service={service} />
          <ServiceImpact service={service} />
          <ServiceCTA service={service} />
        </main>

        <footer className={styles.pageFooter}>
          <div className={styles.footerContent}>
            <span>© {new Date().getFullYear()} INNOVATIVE MARKETING THEORY. ALL RIGHTS RESERVED.</span>
            <span className={styles.footerAccent}>STRATEGY / CREATIVE / EXECUTION</span>
          </div>
        </footer>
      </div>
    </ServiceTransitionProvider>
  );
};

export default ServiceDetailPage;
