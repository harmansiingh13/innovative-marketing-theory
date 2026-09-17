"use client";

import React from "react";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { SERVICES_DATA } from "@/data/servicesData";

export const AdvertisementPage = () => {
  const serviceData = SERVICES_DATA["advertisement"];
  return <ServiceDetailPage service={serviceData} />;
};

export default AdvertisementPage;
