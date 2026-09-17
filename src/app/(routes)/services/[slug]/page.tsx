import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/data/servicesData";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const serviceData = getServiceBySlug(slug);

  if (!serviceData) {
    notFound();
  }

  return <ServiceDetailPage service={serviceData} />;
}
