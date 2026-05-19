// src/pages/Home.jsx

import { useEffect } from "react";
import { Hero } from "@sections/Hero";
import { CategorySection } from "@sections/CategorySection";
import { ProductGrid } from "@sections/ProductGrid";
import { PartnerBrands } from "@sections/PartnerBrands";
import { HowItWorks } from "@sections/HowItWorks";
import { FaqSection } from "@sections/FaqSection";
import { AboutSection } from "@sections/AboutSection";
import { FactoryGallery } from "@sections/FactoryGallery";

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
      <CategorySection />
      <ProductGrid />
      <PartnerBrands />
      <HowItWorks />
      <FaqSection />
      <AboutSection />
      <FactoryGallery />
    </div>
  );
};
