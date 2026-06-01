// src/pages/Home.jsx
import { useEffect } from "react";
import { Hero } from "@/features/marketing/components/Hero";
import { ValueProposal } from "@/features/marketing/components/ValueProposal";
import { PartnerBrands } from "@/features/catalog/components/PartnerBrands";
import { HowItWorks } from "@/features/marketing/components/HowItWorks";
import { FeaturedProducts } from "@/features/catalog/components/FeaturedProducts"; // nuevo
import { FaqSection } from "@/features/marketing/components/FaqSection";
import { AboutSection } from "@/features/marketing/components/AboutSection";
import { FactoryGallery } from "@/features/marketing/components/FactoryGallery";

export const Home = () => {
  useEffect(() => {
    document.title = "Disnal AU - Home";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
      }}
    >
      <Hero />
      <ValueProposal />
      <FactoryGallery />
      <PartnerBrands />
      <HowItWorks />
      <FeaturedProducts /> {/*  va justo después de HowItWorks, como en el diseño */}
      <AboutSection />
      <FaqSection />
    </div>
  );
};