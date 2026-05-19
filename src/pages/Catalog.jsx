// src/pages/Catalog.jsx

import { useEffect } from "react";
import { CatalogToolbar } from "@sections/CatalogToolbar";
import { CatalogFilters } from "@sections/CatalogFilters";
import { ProductGrid } from "@sections/ProductGrid";

export const Catalog = () => {
  useEffect(() => {
    document.title = "Disnal AU - Catalog";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        alignItems: "flex-start",
      }}
    >
      {/* Columna Izquierda: Filtros laterales */}
      <div style={{ flex: "0 0 280px" }}>
        <CatalogFilters />
      </div>

      {/* Columna Derecha: Controles superiores + Cuadrícula de productos */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <CatalogToolbar /> <ProductGrid />
      </div>
    </div>
  );
};
