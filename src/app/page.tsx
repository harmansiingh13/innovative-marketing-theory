import { ContactSection } from "@/sections/ContactSection";
import { FounderSection } from "@/sections/FounderSection";
import { HeroSection } from "@/sections/HeroSection";
import { ServicesSection } from "@/sections/ServicesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FounderSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
