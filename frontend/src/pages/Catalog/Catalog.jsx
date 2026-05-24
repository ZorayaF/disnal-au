// src/pages/Catalog.jsx
import { useEffect, useState } from "react";
import { CatalogToolbar } from "@sections/CatalogToolbar";
import { CatalogFilters } from "@sections/CatalogFilters";
import { ProductGrid } from "@sections/ProductGrid";
// 🌟 IMPORTACIÓN CLAVE: Traemos tu hook de cuadrícula para capturar la data cruda aquí arriba
import { useProductGrid } from "@hooks/useProductGrid";

export const Catalog = () => {
  // 1. Estados de control compuestos intactos
  const [filtrosActivos, setFiltrosActivos] = useState({
    categorias: [],
    marcas: [],
    presentaciones: [],
  });
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [criterioOrden, setCriterioOrden] = useState("alfabetico-az");

  useEffect(() => {
    document.title = "Disnal AU - Catalog";
  }, []);

  // 2. 🌟 PUENTE DE DATA REAL: Ejecutamos el hook aquí para obtener los productos crudos
  // Pasamos los filtros vacíos o activos para capturar la lista inicial del servidor
  const { productos } = useProductGrid(
    filtrosActivos,
    terminoBusqueda,
    criterioOrden,
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        alignItems: "flex-start",
      }}
    >
      {/* Columna Izquierda: Filtros laterales dinámicos */}
      <div style={{ flex: "0 0 280px" }}>
        {/* 3. 🌟 ACTUALIZADO: Le inyectamos la data de productos al componente de filtros 
            para que useCatalogFilters procese las marcas y categorías automáticamente */}
        <CatalogFilters
          productos={productos}
          onAplicarFiltros={setFiltrosActivos}
        />
      </div>

      {/* Columna Derecha: Barra de herramientas superior + Cuadrícula de productos */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <CatalogToolbar
          onBuscar={setTerminoBusqueda}
          onCambiarOrden={setCriterioOrden}
        />

        {/* 4. Tu renderizado de grilla sigue funcionando exactamente igual */}
        <ProductGrid
          filtros={filtrosActivos}
          terminoBusqueda={terminoBusqueda}
          criterioOrden={criterioOrden}
        />
      </div>
    </div>
  );
};
