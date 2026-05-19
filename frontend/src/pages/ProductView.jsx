// src/pages/ProductView.jsx

import { useEffect } from "react";
import { ProductDetail } from "@sections/ProductDetail";
import { ProductGrid } from "@sections/ProductGrid";

export const ProductView = () => {
  useEffect(() => {
    document.title = "Disnal AU - Product Detail";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        padding: "20px",
      }}
    >
      {/* Sección principal con la información del queso seleccionado */}
      <ProductDetail />

      {/* Bloque de recomendados / productos relacionados */}
      <div>
        <h2
          style={{
            color: "#1e293b",
            marginBottom: "15px",
            paddingLeft: "10px",
          }}
        >
          Related Products
        </h2>
        <ProductGrid />
      </div>
    </div>
  );
};
