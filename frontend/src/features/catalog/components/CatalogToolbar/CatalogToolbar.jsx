// src/features/catalog/components/CatalogToolbar.jsx
import { SearchBar } from "@/features/catalog/components/SearchBar";
import { SortSelector } from "@/features/catalog/components/SortSelector";

export const CatalogToolbar = ({ onBuscar, onCambiarOrden }) => (
  <div
    className={`
      flex flex-col sm:flex-row sm:justify-between sm:items-center 
      gap-3 sm:gap-[1.2rem] mb-7 w-full font-sans
    `
      .trim()
      .replace(/\s+/g, " ")}
  >
    <SearchBar onBuscar={onBuscar} />
    <SortSelector onCambiarOrden={onCambiarOrden} />
  </div>
);
