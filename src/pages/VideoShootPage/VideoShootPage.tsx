"use client";

import React from "react";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { SERVICES_DATA } from "@/data/servicesData";

export const VideoShootPage = () => {
  const serviceData = SERVICES_DATA["video-shoots"];
  return <ServiceDetailPage service={serviceData} />;
};

export default VideoShootPage;
