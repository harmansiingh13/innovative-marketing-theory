"use client";

import React from "react";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { SERVICES_DATA } from "@/data/servicesData";

export const WebDevelopmentPage = () => {
  const serviceData = SERVICES_DATA["web-development"];
  return <ServiceDetailPage service={serviceData} />;
};

export default WebDevelopmentPage;
