/**
 * Design: "Plomberie Méditerranéen" – Premium Local
 * Page principale du site plombier Perpignan
 * Colors: Navy #0A1628, Yellow #06b6d4
 * Fonts: Montserrat (titles), Inter (body)
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ZoneSection from "@/components/sections/ZoneSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function Home() {
  // SEO optimisé : titre ≤60 car., description ≤160 car., 6 mots-clés ciblés
  useSEO({
    title: "Plombier Perpignan 66 – Devis Gratuit | Le Plombier du 66",
    description:
      "Plombier RGE à Perpignan (66). Installation, dépannage 7j/7, recherche de fuite, débouchage, rénovation salle de bain. Devis gratuit sous 24h.",
    canonical: "/",
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ZoneSection />
        <WhyUsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
