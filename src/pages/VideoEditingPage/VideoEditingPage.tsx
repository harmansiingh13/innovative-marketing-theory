"use client";

import React from "react";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { SERVICES_DATA } from "@/data/servicesData";

export const VideoEditingPage = () => {
  const serviceData = SERVICES_DATA["video-editing"];
  return <ServiceDetailPage service={serviceData} />;
};

export default VideoEditingPage;
