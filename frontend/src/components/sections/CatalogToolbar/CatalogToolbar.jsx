import { SearchBar } from '@components/molecules/SearchBar';
import { SortSelector } from '@components/molecules/SortSelector';
import './CatalogToolbar.css';

export const CatalogToolbar = ({ onBuscar, onCambiarOrden }) => (
  <div className="catalog-toolbar">
    <SearchBar onBuscar={onBuscar} />
    <SortSelector onCambiarOrden={onCambiarOrden} />
  </div>
);
