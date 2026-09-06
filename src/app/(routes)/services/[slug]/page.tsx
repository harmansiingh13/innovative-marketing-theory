import { AdvertisementPage } from "@/pages/AdvertisementPage";
import { EventOrganizationPage } from "@/pages/EventOrganizationPage";
import { SocialMediaPage } from "@/pages/SocialMediaPage";
import { VideoEditingPage } from "@/pages/VideoEditingPage";
import { VideoShootPage } from "@/pages/VideoShootPage";
import { WebDevelopmentPage } from "@/pages/WebDevelopmentPage";
import { notFound } from "next/navigation";

const serviceComponents = {
  "video-shoots": VideoShootPage,
  "video-editing": VideoEditingPage,
  "social-media": SocialMediaPage,
  advertisement: AdvertisementPage,
  "web-development": WebDevelopmentPage,
  "event-organization": EventOrganizationPage,
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const ServiceComponent = serviceComponents[slug as keyof typeof serviceComponents];

  if (!ServiceComponent) {
    notFound();
  }

  return <ServiceComponent />;
}
