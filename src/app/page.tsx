import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/sections/Footer";
import { FounderSection } from "@/sections/FounderSection";
import { HeroSection } from "@/sections/HeroSection";
import { ServicesSection } from "@/sections/ServicesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <FounderSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
