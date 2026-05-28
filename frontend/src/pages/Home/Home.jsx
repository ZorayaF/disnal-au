// src/pages/Home.jsx
import { useEffect } from "react";
import { Hero } from "@sections/Hero";
import { ValueProposal } from "@/components/sections/ValueProposal";
import { ProductGrid } from "@sections/ProductGrid"; // Lo dejamos importado por si lo necesitan luego
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
