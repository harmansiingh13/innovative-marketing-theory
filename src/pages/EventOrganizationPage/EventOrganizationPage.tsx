"use client";

import React from "react";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { SERVICES_DATA } from "@/data/servicesData";

export const EventOrganizationPage = () => {
  const serviceData = SERVICES_DATA["event-organization"];
  return <ServiceDetailPage service={serviceData} />;
};

export default EventOrganizationPage;
