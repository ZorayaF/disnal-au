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
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          background: "#fff",
          margin: "10px 0",
        }}
      >
        <h3>Sección: Productos Destacados (Espacio de ProductGrid)</h3>
        <p>
          Aquí el Integrante 2 debe maquetar las tarjetas de productos estrella
          o recomendados.
        </p>
      </div>

      <AboutSection />
      <FaqSection />
    </div>
  );
};
