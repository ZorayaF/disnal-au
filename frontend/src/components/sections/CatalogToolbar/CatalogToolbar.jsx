// src/components/sections/CatalogToolbar.jsx
import { SearchBar } from "@components/molecules/SearchBar";
import { SortSelector } from "@components/molecules/SortSelector";

export const CatalogToolbar = ({ onBuscar, onCambiarOrden }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "#fff",
        padding: "12px",
        border: "1px solid #ccc",
      }}
    >
      {/* Molécula encargada de la captura de texto */}
      <SearchBar onBuscar={onBuscar} />

      {/* Molécula encargada del criterio de ordenamiento */}
      <SortSelector onCambiarOrden={onCambiarOrden} />
    </div>
  );
};
