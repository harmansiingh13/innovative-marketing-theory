"use client";

import React from "react";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { SERVICES_DATA } from "@/data/servicesData";

export const SocialMediaPage = () => {
  const serviceData = SERVICES_DATA["social-media"];
  return <ServiceDetailPage service={serviceData} />;
};

export default SocialMediaPage;
