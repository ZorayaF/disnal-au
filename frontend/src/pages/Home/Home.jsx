// src/pages/Home.jsx
import { useEffect } from "react";
import { Hero } from "@/features/marketing/components/Hero";
import { ValueProposal } from "@/features/marketing/components/ValueProposal";
import { ProductGrid } from "@/features/catalog/components/ProductGrid"; // Lo dejamos importado por si lo necesitan luego
import { PartnerBrands } from "@/features/catalog/components/PartnerBrands";
import { HowItWorks } from "@/features/marketing/components/HowItWorks";
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

      {/* CONTRATO SEGURO: Reemplazamos la etiqueta vacia por este bloque plano.
        Evita el colapso de la app y le indica a tu compañero donde meter las tarjetas destacadas.
      */}

      <AboutSection />
      <FaqSection />
    </div>
  );
};
