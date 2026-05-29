import { SearchBar } from "@/features/catalog/components/SearchBar";
import { SortSelector } from "@/features/catalog/components/SortSelector";
import "./CatalogToolbar.css";

export const CatalogToolbar = ({ onBuscar, onCambiarOrden }) => (
  <div className="catalog-toolbar">
    <SearchBar onBuscar={onBuscar} />
    <SortSelector onCambiarOrden={onCambiarOrden} />
  </div>
);
